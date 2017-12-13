import React, {Component} from 'react'
import PropType from 'prop-types'
import SyntaxHighlighter from 'react-syntax-highlighter'

function getJSXStr ({type, props, children}) {
  let propsInItem = []
  let childrenArr = []
  if (props) {
    propsInItem = Object.keys(props).map(k => {
      if (k === 'children') {
        childrenArr.push(props[k])
      } else {
        return `${k}={${JSON.stringify(props[k])}}`
      }
    })
  }
  if (children) {
    childrenArr = childrenArr.concat(children.map(child => {
      return getJSXStr(child)
    }))
  }
  return `<${type} ${propsInItem.join(' ')}${childrenArr.length ? '>' + childrenArr.join('') + `</${type}>` : '/>'}`
}

export default class CodePreview extends Component {
  render () {
    let {data, components} = this.props
    let code = [data].map(item => {
      return getJSXStr(item)
    })
    return (
      <SyntaxHighlighter language='javascript'>
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
                      ${code.join('')}
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