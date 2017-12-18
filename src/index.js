import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as ASUMI from 'asumi'
import Header from './components/header'
import Panel from './components/panel'
import TreeSelect from './components/treeSelect'
import CodePreview from './components/codePreview'
import componentsData, { category } from './constants/data'
import actionsData, { actionTypes, events } from './constants/actions'
import styleMap from './constants/style'
import CompWrapper from './components/compWrapper'

import 'asumi/style/asumi-default-theme.css'
import './assets/style/public.css'

const BASE = {
  key: 'root',
  type: 'div',
  props: {
    style: {width: 800}
  },
  children: [{
    key: 'root-button-0',
    parentKey: 'root',
    type: 'Button',
    props: {
      type: 'success',
      children: '显示'
    },
    children: [],
    controls: [],
    events: {
      onClick: [{
        functionName: 'handleClick',
        actions: [{
          actionType: 'toggleVisibility',
          actionComp: 'root-div-2',
          actionConfig: {
            visible: 'visible'
          }
        }]
      }]
    }
  }, {
    key: 'root-button-1',
    type: 'Button',
    parentKey: 'root',
    props: {
      type: 'danger',
      children: '隐藏'
    },
    children: [],
    controls: [],
    events: {
      onClick: [{
        functionName: 'handleClick1',
        actions: [{
          actionType: 'toggleVisibility',
          actionComp: 'root-div-2',
          actionConfig: {
            visible: 'hide'
          }
        }]
      }]
    }
  }, {
    key: 'root-div-2',
    type: 'div',
    parentKey: 'root',
    props: {
      style: {width: 500, backgroundColor: 'pink'}
    },
    children: [],
    controls: [{
      controlName: 'visible',
      actionType: 'toggleVisibility',
      conditions: [{
        triggerKey: 'root-button-0',
        conditionType: 'equal',
        conditionValue: true
      }, {
        triggerKey: 'root-button-1',
        conditionType: 'equal',
        conditionValue: true
      }]
    }],
    events: {}
  }],
  controls: [],
  events: {}
}

function getMap (item, map) {
  map[item.key] = item
  item.children && item.children.forEach(child => {
    getMap(child, map)
  })
}

function getKey (focus, type, length) {
  return focus + '-' + type.toLowerCase() + '-' + length
}

class Index extends Component {
  constructor () {
    super()
    const MAP = {}
    getMap(BASE, MAP)
    this.funcNames = {}
    this.controlNames = {}
    this.state = {
      map: MAP,
      base: BASE,
      active: '',
      focus: 'root',
      eventName: '',
      visible: false,
      actions: [],
      functionName: '',
      currentEvent: -1,
      currentAction: -1,
      stateMap: {visible: true},
      components: ['Message', 'Loading', 'Modal'],
      configData: Object.assign({}, componentsData['div'].config)
    }
  }

  // 增加組件
  handleAdd (type) {
    let model
    let {components, focus} = this.state
    let defProps = {}
    Object.keys(componentsData[type].config).forEach(k => {
      if (~styleMap.indexOf(k)) {
        if (!defProps.style) {
          defProps.style = {}
        }
        defProps.style[k] = componentsData[type].config[k]
      } else {
        defProps[k] = componentsData[type].config[k]
      }
    })
    this.setState(prev => {
      if (/[A-Z]/.test(type[0]) && components.indexOf(type) < 0) {
        prev.components.push(type)
      }
      let children = prev.map[focus].children
      let key = getKey(focus, type, children.length)
      model = {
        key: key,
        type: type,
        events: {},
        children: [],
        controls: [],
        props: defProps,
        parentKey: focus
      }
      prev.map[key] = model
      children.push(model)
      return prev
    }, () => {
      this.handleFocus(model)
    })
  }

  // 增加屬性
  handleAddProps (key) {
    let props = {}
    let config = this.state.configData
    Object.keys(config).forEach(k => {
      if (~styleMap.indexOf(k)) {
        if (!props.style) {
          props.style = {}
        }
        props.style[k] = config[k]
      } else {
        props[k] = config[k]
      }
    })
    this.setState(prev => {
      prev.map[key].props = props
      return prev
    })
  }

  // 增加事件
  handleAddEvent (eventName) {
    this.setState(prev => {
      if (prev.map[prev.focus].events[eventName]) {
        // TODO
        prev.functionName = prev.map[prev.focus].events[eventName][0].functionName
        prev.actions = prev.map[prev.focus].events[eventName][0].actions
        prev.currentAction = 0
        prev.currentEvent = 0
      }
      prev.eventName = eventName
      prev.visible = true
      return prev
    })
  }

  // 关闭弹窗
  handleClose () {
    this.setState({visible: false, eventName: ''})
  }

  // 选择组件
  handleChooseComp ({key}) {
    this.setState(prev => {
      prev.actions[prev.currentAction].actionComp = key
      return prev
    })
  }

  // 选择动作
  handleChoseAction (actionType) {
    let f = this.getFunctionName(actionsData[actionType].functionName)
    let c = this.getControlName(actionsData[actionType].config.controlName)
    let action = {
      actionType,
      actionConfig: Object.assign({}, actionsData[actionType].config)
    }
    if (actionsData[actionType].choseComp) {
      action.actionComp = this.state.focus
    }
    if (actionsData[actionType].config.controlName) {
      action.actionConfig.controlName = c
    }
    this.setState(prev => {
      if (!prev.functionName) prev.functionName = f
      prev.actions.splice(++prev.currentAction, 0, action)
      return prev
    })
  }

  handleClickAction (index) {
    this.setState(prev => {
      prev.currentAction = index
      return prev
    })
  }

  handleRemoveAction (index) {
    this.setState(prev => {
      prev.currentAction = index === 0 ? 0 : index - 1
      prev.actions.splice(index, 1)
      return prev
    })
  }

  // 修改方法名
  handleChangeF ({value}) {
    this.setState(prev => {
      prev.functionName = value
      return prev
    })
  }

  // 获取方法名
  getFunctionName (f) {
    if (this.funcNames[f]) {
      f = f + (this.funcNames[f].length ? Math.max.apply(null, this.funcNames[f]) + 1 : 1)
    }
    return f
  }

  // 获取控制名
  getControlName (c) {
    if (c && this.controlNames[c]) {
      c = c + (this.controlNames[c].length ? Math.max.apply(null, this.controlNames[c]) + 1 : 1)
    }
    return c
  }

  // 修改事件属性
  handleChangeAction ({name, value}) {
    this.setState(prev => {
      prev.actions[prev.currentAction].actionConfig[name] = value
      return prev
    })
  }

  // 添加事件属性 TODO: 校验方法名的唯一性
  handleSaveAction () {
    let {actions, focus, eventName, functionName} = this.state
    let fNum = functionName.match(/\d*$/)[0]
    let f = fNum ? functionName.replace(/\d*$/, '') : functionName
    if (!this.funcNames[f]) {
      this.funcNames[f] = []
    }
    if (fNum) this.funcNames[f].push(fNum)
    // if (actionConfig.controlName) {
    //   let cNum = actionConfig.controlName.match(/\d*$/)[0]
    //   let c = cNum ? actionConfig.controlName.replace(/\d*$/, '') : actionConfig.controlName
    //   if (!this.controlNames[c]) {
    //     this.controlNames[c] = []
    //   }
    //   if (cNum) this.controlNames[c].push(cNum)
    // }
    this.setState(prev => {
      // 添加事件记录
      if (!prev.map[focus].events[eventName]) {
        prev.map[focus].events[eventName] = []
      }
      // 推入动作属性(方法名，配置，动作类型)
      prev.map[focus].events[eventName][prev.currentEvent] = {
        functionName,
        actions
      }
      // 添加默认state
      // if (actionConfig.controlName) {
      //   prev.stateMap[actionConfig.controlName] = actionConfig.defaultControlValue
      // }
      // 如果有联动，增加判断条件
      // if (actionConfig.actionComp) {
      //   prev.map[actionConfig.actionComp].controls.push({
      //     controlName: actionConfig.controlName, // 变量名
      //     conditions: actionsData[actionType].conditionRender(actionConfig)
      //   })
      // }
      prev.currentAction = -1
      prev.functionName = ''
      prev.actions = []
      return prev
    })
    this.handleClose()
  }

  // 修改组件屬性
  handleChange ({name, value, type}) {
    this.setState(prev => {
      prev.configData[name] = ~styleMap.indexOf(name) && value === '' ? value : type === 'number' ? Number(value) : value
      return prev
    }, () => this.handleAddProps(this.state.focus))
  }

  // 修改需要map的属性
  handleChangeMapProps ({name, value, type}, propName, index) {
    this.setState(prev => {
      prev.configData[propName][index][name] = ~styleMap.indexOf(name) && value === '' ? value : type === 'number' ? Number(value) : value
      return prev
    }, () => this.handleAddProps(this.state.focus))
  }

  // 移除需要map的属性
  handleRemoveMapProps (e, propName, index) {
    e.stopPropagation()
    e.preventDefault()
    this.setState(prev => {
      prev.configData[propName].splice(index, 1)
      return prev
    }, () => this.handleAddProps(this.state.focus))
  }

  // 添加需要map的属性
  handleAddMapProps (propName, config) {
    this.setState(prev => {
      if (!prev.configData[propName] || !(prev.configData[propName] instanceof Array)) {
        prev.configData[propName] = []
      }
      prev.configData[propName].push(Object.assign({}, config))
      return prev
    })
  }

  // 聚焦到組件
  handleFocus ({key, props}) {
    let configData = Object.assign({}, props)
    if (configData.style) {
      Object.keys(configData.style).forEach(k => {
        configData[k] = configData.style[k]
      })
      delete configData.style
    }
    this.setState({focus: key, active: '', configData})
  }

  // hover到組件
  handleActive (key) {
    this.setState({active: key})
  }

  // 移除組件
  handleRemove ({key, parentKey, type}) {
    let parentChild = this.state.map[parentKey].children
    this.setState(prev => {
      prev.focus = parentKey
      prev.components.splice(prev.components.indexOf(type), 1)
      delete prev.map[key]
      prev.map[parentKey].children = parentChild.filter(child => {
        return child.key !== key
      })
      return prev
    })
  }

  // 上移
  handleMoveUp (child) {
    let parent = this.state.map[child.parentKey]
    let siblings = parent.children
    if (siblings && siblings.length && siblings[0].key === child.key) {
      let parentSiblings = this.state.map[parent.parentKey].children
      let index = parentSiblings.findIndex(c => { return c.key === child.parentKey })
      if (index === -1) return
      this.setState(prev => {
        let current = prev.map[child.parentKey].children.splice(0, 1)[0]
        if (current) {
          prev.active = ''
          current.parentKey = parent.parentKey
          prev.map[parent.parentKey].children.splice(index - 1, 0, current)
        }
        return prev
      })
    } else {
      let index = siblings.findIndex(c => { return c.key === child.key })
      if (index === -1) return
      let current = siblings.splice(index, 1)[0]
      if (current) siblings.splice(index - 1, 0, current)
      this.setState(prev => {
        prev.active = ''
        prev.map[child.parentKey].children = siblings
        return prev
      })
    }
  }

  // 下移
  handleMoveDown (child) {
    let parent = this.state.map[child.parentKey]
    let siblings = parent.children
    let length = siblings.length
    if (siblings && length && siblings[length - 1].key === child.key) {
      let parentSiblings = this.state.map[parent.parentKey].children
      let index = parentSiblings.findIndex(c => { return c.key === child.parentKey })
      if (index === -1) return
      this.setState(prev => {
        let current = prev.map[child.parentKey].children.splice(length - 1, 1)[0]
        if (current) {
          current.parentKey = parent.parentKey
          prev.map[parent.parentKey].children.splice(index + 1, 0, current)
        }
        return prev
      })
    } else {
      let index = siblings.findIndex(c => { return c.key === child.key })
      if (index === -1) return
      let current = siblings.splice(index, 1)[0]
      if (current) siblings.splice(index + 1, 0, current)
      this.setState(prev => {
        prev.map[child.parentKey].children = siblings
        return prev
      })
    }
  }

  // 页面预览
  previewRender (child) {
    let {focus, active} = this.state
    let {type, key, props, children} = child
    let previewProps = {
      onClick: () => this.handleFocus(child),
      onMouseOut: () => this.handleActive(''),
      onMouseOver: focus === key ? null : () => this.handleActive(key)
    }

    return (
      <CompWrapper
        key={key}
        __id={key}
        __type={type}
        __focus={focus}
        __active={active}
        {...props}
        {...previewProps}
      >
        {props.children}
        {children.map(child => {
          return this.previewRender(child)
        })}
      </CompWrapper>
    )
  }

  // 配置渲染
  configRender () {
    let {map, focus, configData} = this.state
    let focusedType = map[focus].type
    let currentConfig = componentsData[focusedType]
    let mapableProps = currentConfig.mapableProps && Object.keys(currentConfig.mapableProps)
    return (
      <div className='config-config-panel'>
        <ASUMI.Button type='success' className='config-bar-title'>
          当前组件：
          <span className='config-bar-current'>{componentsData[focusedType].displayName}</span>
        </ASUMI.Button>
        <div className='config-bar-config'>
          <ASUMI.Form
            colon
            colNum={1}
            title='属性配置'
            labelWidth={80}
            hideSubmitButton
            data={configData}
            options={currentConfig.props}
            onChange={(e) => this.handleChange(e)}
          />
          {!!mapableProps &&
          mapableProps.map(propName => {
            let mapItem = currentConfig.mapableProps[propName]
            if (mapItem.condition && !mapItem.condition(configData)) return null
            return (
              <div key={propName} style={{marginBottom: 10}}>
                {configData[propName] && configData[propName].map((item, index) => {
                  return (
                    <ASUMI.Form
                      colon
                      key={index}
                      data={item}
                      labelWidth={40}
                      title={<div className='el-removable-title'>
                        第{index + 1}项
                        <i className='fa fa-close' onClick={(e) => this.handleRemoveMapProps(e, propName, index)} />
                      </div>}
                      layout='inline'
                      hideSubmitButton
                      options={mapItem.props}
                      className='el-small-form'
                      onChange={(e) => this.handleChangeMapProps(e, propName, index)}
                    />
                  )
                })}
                <ASUMI.Button
                  size='small'
                  type='primary'
                  onClick={() => this.handleAddMapProps(propName, mapItem.config)}>
                  <i className='fa fa-plus' /> 添加{mapItem.displayName || propName}
                </ASUMI.Button>
              </div>
            )
          })
          }
        </div>
      </div>
    )
  }

  // 动作渲染
  actionRender () {
    let {map, focus} = this.state
    let focusedType = map[focus].type
    return (
      <div className='config-config-panel' style={{width: 200}}>
        <ASUMI.Button type='secondary' className='config-bar-title'>添加事件</ASUMI.Button>
        <div className='config-bar-config'>
          <ul className='config-ul'>
            {Object.keys(events).map(e => {
              let invalid = events[e].expect && !~events[e].expect.indexOf(focusedType)
              return (
                <li key={e}>{events[e].displayName}
                  {invalid
                    ? <ASUMI.Button type='text' size='small' disabled>不可添加</ASUMI.Button>
                    : <ASUMI.Button
                      type='text'
                      size='small'
                      onClick={() => this.handleAddEvent(e)}>添加</ASUMI.Button>}
                </li>)
            })}
          </ul>
        </div>
      </div>
    )
  }

  modalRender () {
    let {map, base, actions, visible, currentAction, functionName} = this.state
    return (
      <ASUMI.Modal visible={visible} title='编辑事件' onClose={() => this.handleClose()}
        onOk={() => this.handleSaveAction()}>
        <ASUMI.Grid.Row>
          <ASUMI.Grid.Col col={2}>
            {Object.keys(actionTypes).map(a => {
              return (
                <Panel title={a} key={a} open>
                  <ul className='config-ul'>
                    {actionTypes[a].map(aT => {
                      if (!actionsData[aT]) return null
                      return (
                        <li key={aT}>{actionsData[aT].displayName}
                          <ASUMI.Button
                            type='text'
                            size='small'
                            onClick={() => this.handleChoseAction(aT)}>添加</ASUMI.Button>
                        </li>)
                    })}
                  </ul>
                </Panel>
              )
            })}
          </ASUMI.Grid.Col>
          <ASUMI.Grid.Col col={2}>
            <p>组织动作</p>
            <ul className='config-ul'>
              {actions.map((action, index) => {
                return (
                  <li key={index}
                    onClick={currentAction !== index ? () => this.handleClickAction(index) : null}
                    className={currentAction === index ? 'active' : ''}>
                    {actionsData[action.actionType].displayName}
                    <i className='fa fa-close' onClick={e => this.handleRemoveAction(index)} />
                  </li>
                )
              })}
            </ul>
          </ASUMI.Grid.Col>
          {!!~currentAction && actions.length && actionsData[actions[currentAction].actionType].choseComp &&
          <ASUMI.Grid.Col col={3}>
            <div>请选择联动对象</div>
            <TreeSelect
              map={map}
              data={base}
              showHandler={false}
              focus={actions[currentAction].actionComp}
              onClick={(child) => this.handleChooseComp(child)}
            />
          </ASUMI.Grid.Col>}
          {!!~currentAction && actions.length &&
          <ASUMI.Grid.Col col={5}>
            <ASUMI.FormItem
              onChange={(e) => this.handleChangeF(e)}
              value={functionName}
              name='functionName'
              label='方法名'
            />
            <ASUMI.Form
              colon
              labelWidth={100}
              hideSubmitButton
              data={actions[currentAction].actionConfig}
              onChange={(e) => this.handleChangeAction(e)}
              options={actionsData[actions[currentAction].actionType].props}
              title={`编辑${actionsData[actions[currentAction].actionType].displayName}`}
            />
          </ASUMI.Grid.Col>}
        </ASUMI.Grid.Row>
      </ASUMI.Modal>
    )
  }

  render () {
    let {base, map, focus, active, stateMap, components} = this.state
    let focusedType = map[focus].type
    return (
      <div>
        <Header />
        <section style={{marginTop: 60}}>
          <div className='config-bar'>
            <div className='config-dom-tree'>
              <TreeSelect
                map={map}
                data={base}
                focus={focus}
                active={active}
                onActive={(key) => this.handleActive(key)}
                onClick={(child) => this.handleFocus(child)}
                onRemove={(child) => this.handleRemove(child)}
                onMoveUp={(child) => this.handleMoveUp(child)}
                onMoveDown={(child) => this.handleMoveDown(child)}
              />
            </div>
            <div className='config-config-panel' style={{width: 150}}>
              <ASUMI.Button type='primary' className='config-bar-title'>组件列表</ASUMI.Button>
              {Object.keys(category).map(c => {
                return (
                  <Panel title={c} key={c}>
                    <ul className='config-ul'>
                      {category[c].map(comp => {
                        if (!componentsData[comp]) return
                        let invalid = componentsData[focusedType].single ||
                          (componentsData[focusedType].invalid && ~componentsData[focusedType].invalid.indexOf(comp)) ||
                          (componentsData[focusedType].expect && !~componentsData[focusedType].expect.indexOf(comp))
                        return (
                          <li key={comp}>{componentsData[comp].displayName}
                            {invalid
                              ? <ASUMI.Button type='text' size='small' disabled>不可添加</ASUMI.Button>
                              : <ASUMI.Button type='text' size='small'
                                onClick={() => this.handleAdd(comp)}>添加</ASUMI.Button>}
                          </li>)
                      })}
                    </ul>
                  </Panel>
                )
              })}
            </div>
            {this.configRender()}
            {this.actionRender()}
          </div>
          <div className='config-preview'>
            <h2>页面预览</h2>
            <div className='config-live-preview'>{this.previewRender(base)}</div>
            <h2>代码预览</h2>
            <CodePreview data={base} map={map} components={components} stateMap={stateMap} />
          </div>
        </section>
        {this.modalRender()}
      </div>
    )
  }
}

ReactDOM.render(<Index />, document.querySelector('#app'))
