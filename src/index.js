import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as ASUMI from 'asumi'
import classnames from 'classnames'
import Header from './components/header'
import Panel from './components/panel'
import TreeSelect from './components/treeSelect'
import CodePreview from './components/codePreview'
import componentsData, { category } from './constants/data'
import styleMap from './constants/style'

import 'asumi/style/asumi-default-theme.css'
import './assets/style/public.css'

const BASE = {
  key: 'root',
  type: 'div',
  props: {
    style: {width: 800}
  },
  children: []
}

function getMap (item, map) {
  map[item.key] = item
  item.children && item.children.forEach(child => {
    getMap(child, map)
  })
}

class Index extends Component {
  constructor () {
    super()
    const MAP = {}
    getMap(BASE, MAP)
    this.state = {
      map: MAP,
      base: BASE,
      active: '',
      focus: 'root',
      components: ['Input'],
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
      let key = focus + '-' + type.toLowerCase() + '-' + children.length
      model = {
        key: key,
        type: type,
        children: [],
        props: defProps,
        parentKey: focus
      }
      prev.map[key] = model
      children.push(model)
      return prev
    }, () => {
      this.handleFocus('', model)
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

  // 修改屬性
  handleChange ({name, value, type}) {
    this.setState(prev => {
      prev.configData[name] = ~styleMap.indexOf(name) && value === '' ? value : type === 'number' ? Number(value) : value
      return prev
    }, () => this.handleAddProps(this.state.focus))
  }

  // 聚焦到組件
  handleFocus (e, {key, props}) {
    if (e) e.stopPropagation()
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
  handleActive (e, key) {
    if (e) e.stopPropagation()
    this.setState({active: key})
  }

  // 移除組件
  handleRemove (e, key, parentKey, type) {
    e.stopPropagation()
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
  handleMoveUp (e, child) {
    e.stopPropagation()
    let parent = this.state.map[child.parentKey]
    let siblings = parent.children
    if (siblings && siblings.length && siblings[0].key === child.key) {
      // 如果没有上级兄弟则与父同级
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

  handleMoveDown (e, child) {
    e.stopPropagation()
    let parent = this.state.map[child.parentKey]
    let siblings = parent.children
    let length = siblings.length
    if (siblings && length && siblings[length - 1].key === child.key) {
      // 如果没有下级兄弟则与父同级
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
    let isComp = /[A-Z]/.test(type[0])
    let className = classnames({
      'component': true,
      'component-focus': focus === key,
      'component-active': active === key
    })
    let displayName = componentsData[type].displayName
    let Comp = isComp ? type.indexOf('.') > -1 ? ASUMI[type.split('.')[0]][type.split('.')[1]] : ASUMI[type] : type
    let previewProps = {
      key,
      className,
      onMouseOut: (e) => this.handleActive(e, ''),
      onMouseOver: focus === key ? null : (e) => this.handleActive(e, key),
      onClick: (e) => {
        e.preventDefault()
        this.handleFocus(e, child)
      }
    }
    let focusLabel = focus === key
      ? <span className='component-name'
        style={{minWidth: displayName.length * 13 + 10}}>{displayName}</span> : null
    return (
      componentsData[type].single
        ? <div style={{display: 'inline-block'}} {...previewProps}>{focusLabel}<Comp {...props} /></div>
        : <Comp
          {...props}
          {...previewProps}
        >
          {focusLabel}
          {props.children}
          {children.map(child => {
            return this.previewRender(child)
          })}
        </Comp>
    )
  }

  render () {
    let {base, map, focus, active, components, configData} = this.state
    let focusedType = map[focus].type
    let currentConfig = componentsData[focusedType]
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
                onActive={(e, key) => this.handleActive(e, key)}
                onClick={(e, child) => this.handleFocus(e, child)}
                onMoveUp={(e, child) => this.handleMoveUp(e, child)}
                onMoveDown={(e, child) => this.handleMoveDown(e, child)}
                onRemove={(e, key, parentKey, type) => this.handleRemove(e, key, parentKey, type)}
              />
            </div>
            <div className='config-config-panel' style={{width: 150}}>
              <ASUMI.Button type='primary' className='config-bar-title'>组件列表</ASUMI.Button>
              {Object.keys(category).map(c => {
                return (
                  <Panel title={c} key={c}>
                    <ul className='config-bar-components'>
                      {category[c].map(comp => {
                        if (!componentsData[comp]) return
                        let invalid = componentsData[focusedType].single || (componentsData[focusedType].invalid && ~componentsData[focusedType].invalid.indexOf(comp)) || (componentsData[focusedType].expect && !~componentsData[focusedType].expect.indexOf(comp))
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
                  submitText='保存'
                  hideSubmitButton
                  data={configData}
                  options={currentConfig.props}
                  submitButtonProps={{size: 'small'}}
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
            </div>
          </div>
          <div className='config-preview'>
            <h2>页面预览</h2>
            <div>{this.previewRender(base)}</div>
            <h2>代码预览</h2>
            <CodePreview data={base} components={components} />
          </div>
        </section>
      </div>
    )
  }
}

ReactDOM.render(<Index />, document.querySelector('#app'))
