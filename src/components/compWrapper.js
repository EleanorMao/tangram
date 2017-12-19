/* eslint-disable */
import componentsData from '../constants/components'
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import classnames from 'classnames'
import PropType from 'prop-types'
import * as ASUMI from 'asumi'

export default class CompWrapper extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
  }

  componentWillMount () {
    let {__type, __focus, __id, __active, onClick, onMouseOut, onMouseOver, children, ...others} = this.props
    if (!__type) return
    let config = componentsData[__type]
    if (!config || !config.defaultState) return
    let state = {}
    Object.keys(others).forEach(p => {
      if (typeof others[p] === 'string' && /^%s/.test(others[p])) {
        state[others[p].replace(/^%s/, '')] = componentsData[__type].defaultState[p]
      }
    })
    this.setState(state)
  }

  componentDidMount () {
    this.instanceRef = findDOMNode(this)
    if (this.instanceRef) {
      this.instanceRef.addEventListener('click', this.handleClick, false)
      this.instanceRef.addEventListener('mouseout', this.handleMouseOut, false)
      this.instanceRef.addEventListener('mouseover', this.handleMouseOver, false)
    }
  }

  componentWillUnmount () {
    if (this.instanceRef) {
      this.instanceRef.removeEventListener('click', this.handleClick, false)
      this.instanceRef.removeEventListener('mouseout', this.handleMouseOut, false)
      this.instanceRef.removeEventListener('mouseover', this.handleMouseOver, false)
    }
  }

  handleClick (e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.onClick && this.props.onClick(e)
  }

  handleMouseOut (e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.onMouseOut && this.props.onMouseOut(e)
  }

  handleMouseOver (e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.onMouseOver && this.props.onMouseOver(e)
  }

  render () {
    let {__type, __focus, __id, __active, onClick, onMouseOut, onMouseOver, children, ...others} = this.props
    if (!__type) return null
    let Comp = 'div'
    let props = {}
    Object.keys(others).forEach(p => {
      if (typeof others[p] === 'string' && /^%s/.test(others[p])) {
        props[p] = this.state[others[p].replace(/^%s/, '')]
      } else {
        props[p] = others[p]
      }
    })
    let config = componentsData[__type]
    let isComp = /[A-Z]/.test(__type[0])
    let className = classnames({
      'component': true,
      'component-focus': __focus === __id,
      'component-active': __active === __id
    })
    let focusLabel = config && __focus === __id && !((config.invalid && ~config.invalid.indexOf('span')) ||
      (config.expect && !~config.expect.indexOf('span')))
      ? <span className='component-name'
              style={{minWidth: config.displayName.length * 13 + 10}}>{config.displayName}</span> : null
    if (config) Comp = config.compPath ? config.compPath : (isComp ? __type.indexOf('.') > -1 ? ASUMI[__type.split('.')[0]][__type.split('.')[1]] : ASUMI[__type] : __type)
    if (config && config.single) {
      return <ASUMI.Tooltip title={config.displayName} placement='top'><Comp
        className={className} {...props} /></ASUMI.Tooltip>
    } else {
      return <Comp key={__id} {...props} className={className}>{focusLabel}{children}</Comp>
    }
  }
}

CompWrapper.propTypes = {
  __type: PropType.any,
  __id: PropType.any,
  __focus: PropType.any,
  __active: PropType.any,
  children: PropType.any,
  onClick: PropType.func,
  onMouseOut: PropType.func,
  onMouseOver: PropType.func
}
