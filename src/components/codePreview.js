import React, { Component } from 'react'
import PropType from 'prop-types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import actionsData from '../constants/actions'
import conditionMap from '../constants/condition'

function getPropsArr (props) {
  let propsItems = []
  let childrenItems = []
  if (props) {
    Object.keys(props).forEach(k => {
      let item = props[k]
      if (k === 'children') {
        childrenItems.push(item)
      } else {
        if (typeof item === 'string') {
          propsItems.push(`${k}=${JSON.stringify(item)}`)
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
            if (valid) propsItems.push(`${k}={${JSON.stringify(style)}}`)
          } else {
            propsItems.push(`${k}={${JSON.stringify(item)}}`)
          }
        }
      }
    })
  }
  return {propsItems, childrenItems}
}

function getEventsArr (events) {
  let eventsItems = []
  if (events) {
    Object.keys(events).forEach(eventType => {
      /* eventType: [{
        functionName: String,
        actions: [{
          actionType: String,
          actionConfig: Object
        }]
      }]
    */
      let funcs = events[eventType].map(({functionName}) => {
        return `this.${functionName}`
      })
      if (funcs.length === 1) {
        eventsItems.push(`${eventType}={${funcs[0]}.bind(this)}`)
      } else if (funcs.length) {
        eventsItems.push(`${eventType}={(e) => {
          ${funcs.map(f => { return `${f}(e)` }).join(';')}
        }}`)
      }
    })
  }
  return eventsItems
}

function getJSXStr ({type, key, props, events, controls, children}) {
  let controlsForSelf = []
  let controlsForChildren = []
  let {propsItems, childrenItems} = getPropsArr(props)
  let eventsItems = getEventsArr(events)
  if (children && children.length) {
    childrenItems = childrenItems.concat(children.map(child => {
      return getJSXStr(child)
    }))
  }
  if (controls) {
    // controls.forEach(({controlName, conditions}) => {
    //   conditions.forEach(({conditionType, conditionValue, type}) => {
    //     let conditionStr = `${conditionMap[conditionType]('this.state.' + controlName, conditionValue)} &&`
    //     if (type === 'self' || !type) {
    //       controlsForSelf.push(conditionStr)
    //     } else if (type === 'children') {
    //       controlsForChildren.push(conditionStr)
    //     }
    //   })
    // })
  }
  return (`${controlsForSelf.length ? `{${controlsForSelf.join(' ')} ` : ''}<${type}${propsItems.length ? ` ${propsItems.join(' ')}` : ''}
            ${eventsItems.length ? ` ${eventsItems.join(' ')}` : ''}${controls && controls.length ? `ref='${key}'` : ''}${childrenItems.length ? `>
  ${controlsForChildren.length ? `{ ${controlsForChildren.join(' ')} ` : ''}${childrenItems.join('')}${controlsForChildren.length ? '}' : ''}
</${type}>` : ' />'}${controlsForSelf.length ? `}` : '' }`)
}

function getFuncStr (map) {
  let output = []
  /* eventType: [{
      functionName: String,
      actions: [{
        actionType: String,
        actionConfig: Object
      }]
    }]
  */
  Object.keys(map).forEach(key => {
    let events = map[key].events
    if (events) {
      Object.keys(events).forEach(eventType => {
        let funcs = events[eventType]
        funcs.forEach(({functionName, actions}) => {
          let funcArr = []
          let stop = false
          actions.forEach(({actionType, actionConfig, actionComp}, index) => {
            if (stop) return
            stop = actionType === 'wait'
            funcArr.push(actionsData[actionType].render(actionConfig, actionComp, actions, index))
          })
          output.push(`
    ${functionName} (e) {
      ${funcArr.join('\r\n')}
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
