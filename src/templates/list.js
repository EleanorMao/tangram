export default (code, func, modules, state) => {
  return (
    `
  import React, { Component } from 'react'
  import ReactDOM from 'react-dom'
  ${modules.join('\r\n  ')}

  export default Class List extends Component {
    constructor () {
      super()
      this.state = ${JSON.stringify(state)}
    }
    ${func.join('\r\n    ')}
    render () {
      return (
        ${code}
    )
  }
}
          `
  )
}
