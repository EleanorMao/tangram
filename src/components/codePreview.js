import React, { Component } from 'react'
import PropType from 'prop-types'
import SyntaxHighlighter from 'react-syntax-highlighter'

function getJSXStr ({type, props, children}) {
  let propsInItem = []
  let childrenArr = []
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
  if (children) {
    childrenArr = childrenArr.concat(children.map(child => {
      return getJSXStr(child)
    }))
  }
  return (`<${type}${propsInItem.length ? ' ' : ''}${propsInItem.join(' ')}${childrenArr.length ? `>
  ${childrenArr.join('')}
</${type}>` : ' />'}`)
}

export default class CodePreview extends Component {
  render () {
    let {data, components} = this.props
    let code = [data].map(item => {
      return getJSXStr(item)
    })[0]
    return (
      <SyntaxHighlighter>
        {`
  import React, { Component } from 'react'
  import ReactDOM from 'react-dom'${components.length ? `
  import {${components.join(', ')}} from 'asumi'` : ''}

  export default Class Main extends Component {
    constructor () {
      super()
      this.state = {}
    }

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
  data: PropType.object,
  components: PropType.array
}
