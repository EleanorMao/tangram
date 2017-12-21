import '../assets/style/mainPanel.css'
import React, { Component } from 'react'
import { Loading, Form, Group, Button } from 'asumi'

/* eslint-disable */
export default class MainPanel extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {
      data,
      init,
      options,
      buttons,
      showLoad,
      children,
      handleReset,
      handleChange
    } = this.props
    return (
      <div className='main-content clearfix'>
        <Form
          colNum={3}
          data={data}
          onSubmit={init}
          submitText='搜索'
          className='search mgb10'
          onChange={handleChange}
          submitItems={!!handleReset &&
          <Button type='danger' size='small' onClick={handleReset} style={{marginLeft: 10}}>清空</Button>}
          submitButtonProps={{size: 'small'}}
          options={options}
        />
        <div className='pdl20'><Group style={{marginRight: 10}}>{buttons}</Group></div>
        {children}
        <Loading fullScreen mask loading={showLoad}/>
      </div>
    )
  }
}

MainPanel.defaultProps = {
  form: [],
  data: {}
}

