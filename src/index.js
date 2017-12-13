import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as ASUMI from 'asumi'
import classnames from 'classnames'
import Header from './components/header'
import TreeSelect from './components/treeSelect'
import CodePreview from './components/codePreview'
import componentsData from './constants/data'
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
  map[ item.key ] = item
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
      components: [ 'Input' ],
      configData: Object.assign({}, componentsData[ 'div' ].config)
    }
  }

  // 增加組件
  handleAdd (type) {
    let newKey
    let {components, focus} = this.state

    let defProps = {}
    Object.keys(componentsData[ type ].config).forEach(k => {
      if (~styleMap.indexOf(k)) {
        if (!defProps.style) {
          defProps.style = {}
        }
        defProps.style[ k ] = componentsData[ type ].config[ k ]
      } else {
        defProps[ k ] = componentsData[ type ].config[ k ]
      }
    })

    this.setState(prev => {
      if (/[A-Z]/.test(type[ 0 ]) && components.indexOf(type) < 0) {
        prev.components.push(type)
      }
      let children = prev.map[ focus ].children
      let key = focus + '-' + type.toLowerCase() + '-' + children.length
      newKey = key
      let model = {
        key: key,
        type: type,
        children: [],
        props: defProps,
        parentKey: focus
      }
      children.push(model)
      prev.map[ key ] = model
      return prev
    }, () => {
      this.handleFocus('', newKey, type)
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
        props.style[ k ] = config[ k ]
      } else {
        props[ k ] = config[ k ]
      }
    })
    this.setState(prev => {
      prev.map[ key ].props = props
      return prev
    })
  }

  // 修改屬性
  handleChange (name, value) {
    this.setState(prev => {
      prev.configData[ name ] = value
      return prev
    })
  }

  // 聚焦到組件
  handleFocus (e, key, type) {
    if (e) e.stopPropagation()
    this.setState({focus: key, active: '', configData: Object.assign({}, componentsData[ type ].config)})
  }

  // hover到組件
  handleActive (e, key) {
    if (e) e.stopPropagation()
    this.setState({active: key})
  }

  // 移除組件
  handleRemove (e, key, parentKey, type) {
    e.stopPropagation()
    let parentChild = this.state.map[ parentKey ].children
    this.setState(prev => {
      prev.focus = parentKey
      prev.components.splice(prev.components.indexOf(type), 1)
      delete prev.map[ key ]
      prev.map[ parentKey ].children = parentChild.filter(child => {
        return child.key !== key
      })
      return prev
    })
  }

  // 上移
  handleMoveUp (e, child) {
    e.stopPropagation()
    let parent = this.state.map[ child.parentKey ]
    let siblings = parent.children
    if (siblings && siblings.length && siblings[ 0 ].key === child.key) {
      // 如果没有上级兄弟则与父同级
      let parentSiblings = this.state.map[ parent.parentKey ].children
      let index = parentSiblings.findIndex(c => { return c.key === child.parentKey })
      if (index === -1) return
      this.setState(prev => {
        let current = prev.map[ child.parentKey ].children.splice(0, 1)[ 0 ]
        if (current) {
          prev.active = ''
          current.parentKey = parent.parentKey
          prev.map[ parent.parentKey ].children.splice(index - 1, 0, current)
        }
        return prev
      })
    } else {
      let index = siblings.findIndex(c => { return c.key === child.key })
      if (index === -1) return
      let current = siblings.splice(index, 1)[ 0 ]
      if (current) siblings.splice(index - 1, 0, current)
      this.setState(prev => {
        prev.active = ''
        prev.map[ child.parentKey ].children = siblings
        return prev
      })
    }
  }

  handleMoveDown (e, child) {
    e.stopPropagation()
    let parent = this.state.map[ child.parentKey ]
    let siblings = parent.children
    let length = siblings.length
    if (siblings && length && siblings[ length - 1 ].key === child.key) {
      // 如果没有下级兄弟则与父同级
      let parentSiblings = this.state.map[ parent.parentKey ].children
      let index = parentSiblings.findIndex(c => { return c.key === child.parentKey })
      if (index === -1) return
      this.setState(prev => {
        let current = prev.map[ child.parentKey ].children.splice(length - 1, 1)[ 0 ]
        if (current) {
          current.parentKey = parent.parentKey
          prev.map[ parent.parentKey ].children.splice(index + 1, 0, current)
        }
        return prev
      })
    } else {
      let index = siblings.findIndex(c => { return c.key === child.key })
      if (index === -1) return
      let current = siblings.splice(index, 1)[ 0 ]
      if (current) siblings.splice(index + 1, 0, current)
      this.setState(prev => {
        prev.map[ child.parentKey ].children = siblings
        return prev
      })
    }
  }

  // 页面预览
  previewRender ({type, key, props, children}) {
    let {focus, active} = this.state
    let isComp = /[A-Z]/.test(type[ 0 ])
    let Comp = isComp ? ASUMI[ type ] : type
    return (
      <div
        key={key}
        onMouseOut={(e) => this.handleActive(e, '')}
        onMouseOver={focus === key ? null : (e) => this.handleActive(e, key)}
        onClick={(e) => this.handleFocus(e, key, type)}
        className={classnames({
          'component': true,
          'component-focus': focus === key,
          'component-active': active === key
        })}>
        {(focus === key) && <p className='component-name'>{type}</p>}
        {componentsData[ type ].single ? <Comp {...props} />
          : <Comp {...props}>
            {props.children}
            {children.map(child => {
              return this.previewRender(child)
            })}
          </Comp>}
      </div>
    )
  }

  render () {
    let {base, map, focus, active, components, configData} = this.state
    let focusedType = map[ focus ].type
    let currentConfig = componentsData[ focusedType ]
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
                onMoveUp={(e, child) => this.handleMoveUp(e, child)}
                onMoveDown={(e, child) => this.handleMoveDown(e, child)}
                onClick={(e, key, type) => this.handleFocus(e, key, type)}
                onRemove={(e, key, parentKey, type) => this.handleRemove(e, key, parentKey, type)}
              />
            </div>
            <div className='config-config-panel'>
              <ASUMI.Button type='success' className='config-bar-title'>
                当前组件：
                <span className='config-bar-current'>{focusedType}</span>
              </ASUMI.Button>
              <div className='config-bar-config'>
                <ASUMI.Form
                  colon
                  colNum={1}
                  labelWidth={50}
                  submitText='确定'
                  data={configData}
                  options={currentConfig.props}
                  submitButtonProps={{size: 'small'}}
                  onSubmit={() => this.handleAddProps(focus)}
                  onChange={({name, value}) => this.handleChange(name, value)}
                />
              </div>
              <ASUMI.Button type='primary' className='config-bar-title'>组件列表</ASUMI.Button>
              <ul className='config-bar-components'>
                {Object.keys(componentsData).map(comp => {
                  return (
                    <li key={comp}>{comp}
                      {componentsData[ focusedType ].single ? <ASUMI.Button type='text' size='small'>不可添加</ASUMI.Button>
                        : <ASUMI.Button type='text' size='small' onClick={() => this.handleAdd(comp)}>添加</ASUMI.Button>}
                    </li>)
                })}
              </ul>
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
