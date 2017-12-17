import React, { Component } from 'react'
import PropType from 'prop-types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import actionsData from '../constants/actions'

function getJSXStr ({type, props, events, controls, children}) {
  let eventsItem = []
  let propsInItem = []
  let childrenArr = []
  let controlsArr = []
  if (props) {
    Object.keys(props).forEach(k => {
      let item = props[k]
      if (k === 'children') {
        childrenArr.push(item)
      } else {
        if (typeof item === 'string') {
          propsInItem.push(`${k}=${JSON.stringify(item)}`)
        } else {
          if (k === 'style') {
            let style = {}
            let valid = false
            Object.keys(item).forEach(s => {
              if (item[s] != null && item[s] !== '') {
                valid = true
                style[s] = item[s]
              }
            })
            if (valid) propsInItem.push(`${k}={${JSON.stringify(style)}}`)
          } else {
            propsInItem.push(`${k}={${JSON.stringify(item)}}`)
          }
        }
      }
    })
  }
  if (events) {
    Object.keys(events).forEach(trigger => {
      let actions = events[trigger] // Array<object> functionName, actionType, actionConfig
      let funcs = actions.map(action => {
        return `this.${action.functionName}`
      })
      if (funcs.length === 1) {
        eventsItem.push(`${trigger}={${funcs[0]}.bind(this)}`)
      } else if (funcs.length) {
        eventsItem.push(`${trigger}={(e) => {
          ${funcs.map(f => { return `${f}(e)` }).join(';')}
        }}`)
      }
    })
  }
  if (controls) {
    controls.forEach(v => {
      controlsArr.push(v + ' &&')
    })
  }
  if (children) {
    childrenArr = childrenArr.concat(children.map(child => {
      return getJSXStr(child)
    }))
  }
  return (`${controlsArr.length ? '{ ' + controlsArr.join('') + ' ' : ''}<${type}${propsInItem.length ? ' ' : ''}${propsInItem.join(' ')}${eventsItem.length ? ' ' : ''}${eventsItem.join(' ')}${childrenArr.length ? `>
  ${childrenArr.join('')}
</${type}>` : ' />'}${controlsArr.length ? '}' : '' }`)
}

function getFuncStr (map) {
  let output = []
  Object.keys(map).forEach(key => {
    let events = map[key].events
    if (events) {
      Object.keys(events).forEach(trigger => {
        let actions = events[trigger]
        actions.forEach(func => { // Array<object> functionName, actionType, actionConfig
          output.push(`
    ${func.functionName} (e) {
      ${actionsData[func.actionType].render(func.actionConfig)}
    }`)
        })
      })
    }
  })
  return output
}

export default class CodePreview extends Component {
  render () {
    let {data, map, stateMap, components} = this.props
    let code = [data].map(item => {
      return getJSXStr(item)
    })[0]
    let func = getFuncStr(map)
    return (
      <SyntaxHighlighter>
        {`
  import React, { Component } from 'react'
  import ReactDOM from 'react-dom'${components.length ? `
  import {${components.join(', ')}} from 'asumi'` : ''}

  export default Class Main extends Component {
    constructor () {
      super()
      this.state = ${JSON.stringify(stateMap)}
    }
    ${func.join('\r\n')}
    render () {
      return (
        ${code}
    )
  }
}
          `}
      </SyntaxHighlighter>
    )
  }
}

CodePreview.propTypes = {
  map: PropType.object,
  data: PropType.object,
  stateMap: PropType.object,
  components: PropType.array
}
