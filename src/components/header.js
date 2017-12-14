import React, { Component } from 'react'

export default class Header extends Component {
  render () {
    return (
      <header className='header'>
        <h1 className='title'><a>TANGRAM 七巧板 <span style={{fontSize: 16}}>可视化页面生成编辑器</span></a></h1>
      </header>
    )
  }
}
