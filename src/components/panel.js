import React, { Component } from 'react'
import PropType from 'prop-types'
import classnames from 'classnames'

export default class Panel extends Component {
  constructor (props) {
    super(props)
    this.state = {open: false}
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle () {
    this.setState({open: !this.state.open})
  }

  render () {
    return (
      <div className='el-panel'>
        <p className={classnames({'el-panel-title': true, 'el-panel-open': this.state.open})} onClick={this.handleToggle}>{this.props.title}</p>
        <div className='el-panel-body' style={{display: this.state.open ? 'block' : 'none'}}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

Panel.propTypes = {
  title: PropType.string,
  children: PropType.any
}
