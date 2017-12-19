import React, { Component } from 'react'
import { Modal } from 'asumi'

export default class Header extends Component {
  handleConfirm () {
    Modal.confirm({
      title: 'TODOLIST',
      size: 'small',
      content: (
        <ol>
          <li>联动代码生成</li>
          <li>组件可以配置Object属性</li>
          <li>编辑默认state，给属性指定state</li>
          <li>编辑一个事件下的多个函数</li>
          <li>组件属性表补完</li>
          <li>校验方法名的唯一性</li>
        </ol>
      )
    })
  }

  render () {
    return (
      <header className='header'>
        <h1 className='title'>
          <a>TANGRAM 七巧板 <span style={{fontSize: 16}}>可视化页面生成编辑器</span></a>
        </h1>
        <a style={{float: 'right', color: '#fff'}} onClick={() => this.handleConfirm()}>TODOLIST</a>
      </header>
    )
  }
}
