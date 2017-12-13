import React, { Component } from 'react'
import PropType from 'prop-types'
import classnames from 'classnames'

export default class TreeSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  leafRender (data, level = 0) {
    let output = []
    let {map, focus, active, onActive, onRemove, onMoveDown, onMoveUp, onClick} = this.props
    if (data && data.length) {
      data.forEach((child, index) => {
        let focused = focus === child.key
        let actived = active === child.key
        let hasChildren = !!(child.children && child.children.length)
        let isRoot = child.key === 'root' && !map[ child.parentKey ]
        let siblings = !isRoot && map[ child.parentKey ].children
        let showMoveUp = !isRoot && siblings.length && (siblings[ 0 ].key !== child.key || child.parentKey !== 'root')
        let showMoveDown = !isRoot && siblings.length && siblings[ siblings.length - 1 ].key !== child.key
        output.push(
          <div
            key={child.key + '-' + index + '-' + level}
            className={classnames({
              'el-tree-select-leaf': true,
              'el-tree-select-leaf-focus': focused,
              'el-tree-select-leaf-active': actived
            })}
            style={{paddingLeft: 13 + (level * 13)}}
            onMouseLeave={(e) => onActive(e, '')}
            onMouseOver={focused ? null : (e) => onActive(e, child.key)}
            onClick={focused ? null : (e) => onClick(e, child.key, child.type)}
          >
            {hasChildren && <i className='fa fa-caret-down' style={{marginRight: 3}} />}{child.type}{isRoot && '(根节点)'}
            {!isRoot && (actived || focused) &&
            <div className='el-tree-select-handler'>
              {!!showMoveUp && <i className='fa fa-arrow-up' onClick={(e) => onMoveUp(e, child)} />}
              {!!showMoveDown && <i className='fa fa-arrow-down' onClick={(e) => onMoveDown(e, child)} />}
              <i className='fa fa-close component-remove'
                onClick={(e) => onRemove(e, child.key, child.parentKey, child.type)} />
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
        {this.leafRender([ data ], 0)}
      </div>
    )
  }
}

TreeSelect.propTypes = {
  map: PropType.object,
  data: PropType.object,
  focus: PropType.string,
  active: PropType.string,
  onClick: PropType.func,
  onMoveUp: PropType.func,
  onRemove: PropType.func,
  onActive: PropType.func,
  onMoveDown: PropType.func
}
