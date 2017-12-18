import React, { Component } from 'react'
import PropType from 'prop-types'
import classnames from 'classnames'
import componentsData from '../constants/components'

export default class TreeSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  handleAction (e, name, data) {
    e.preventDefault()
    e.stopPropagation()
    this.props[name] && this.props[name](data)
  }

  leafRender (data, level = 0) {
    let output = []
    let {map, focus, active, showHandler} = this.props
    if (data && data.length) {
      data.forEach((child, index) => {
        let focused = focus === child.key
        let actived = active === child.key
        let hasChildren = !!(child.children && child.children.length)
        let isRoot = child.key === 'root' && !map[child.parentKey]
        let siblings = !isRoot && map[child.parentKey].children
        let showMoveUp = !isRoot && siblings.length && (siblings[0].key !== child.key || child.parentKey !== 'root')
        let showMoveDown = !isRoot && siblings.length && siblings[siblings.length - 1].key !== child.key
        output.push(
          <div
            key={child.key + '-' + index + '-' + level}
            className={classnames({
              'el-tree-select-leaf': true,
              'el-tree-select-leaf-focus': focused,
              'el-tree-select-leaf-active': actived
            })}
            style={{paddingLeft: 13 + (level * 13)}}
            onMouseLeave={(e) => this.handleAction(e, 'onActive', '')}
            onClick={focused ? null : (e) => this.handleAction(e, 'onClick', child)}
            onMouseOver={focused ? null : (e) => this.handleAction(e, 'onActive', child.key)}
          >
            {hasChildren && <i className='fa fa-caret-down'
              style={{marginRight: 3}} />}{componentsData[child.type] ? componentsData[child.type].displayName : child.type }{isRoot && '【根节点】'}
            {!isRoot && (actived || focused) && showHandler &&
            <div className='el-tree-select-handler'>
              {!!showMoveUp && <i className='fa fa-arrow-up' onClick={(e) => this.handleAction(e, 'onMoveUp', child)} />}
              {!!showMoveDown && <i className='fa fa-arrow-down' onClick={(e) => this.handleAction(e, 'onMoveDown', child)} />}
              <i className='fa fa-close component-remove'
                onClick={(e) => this.handleAction(e, 'onRemove', child)} />
            </div>
            }

          </div>
        )
        if (hasChildren) {
          output = output.concat(this.leafRender(child.children, level + 1))
        }
      })
    }
    return output
  }

  render () {
    let {data} = this.props
    return (
      <div className='el-tree-select'>
        {this.leafRender([data], 0)}
      </div>
    )
  }
}

TreeSelect.defaultProps = {
  showHandler: true
}

TreeSelect.propTypes = {
  map: PropType.object,
  data: PropType.object,
  focus: PropType.string,
  active: PropType.any,
  showHandler: PropType.bool
}
