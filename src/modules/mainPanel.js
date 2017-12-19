/**
 * Created by BG236557 on 2016/7/14.
 */
import '../assets/style/mainPanel.css'
import React, { Component } from 'react'
// const RangeTime = require('./rangeTime.js')
// const YlxCitySelect = require('./ylxCitySelect.js')
import { Loading, Form, Group, Button } from 'asumi'

/* eslint-disable */
export default class MainPanel extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  formRender (form, data, handleChange) {
    if (form && form.length) {
      return form.map(item => {
        // if (item.type === 'rangeTime') {
        //   return ({
        //     name: 'v',
        //     colSpan: 2,
        //     type: 'component',
        //     onChange: handleChange,
        //     component: <RangeTime />,
        //     endTime: item.endTime || 'endTime',
        //     beginTime: item.beginTime || 'startTime',
        //     label: (item.text || item.label || '时间') + '：',
        //     endTimeValue: item.endTime ? data[item.endTime] : data.endTime,
        //     beginTimeValue: item.beginTime ? data[item.beginTime] : data.startTime
        //   })
        // } else if (item.type === 'citySelect') {
        //   return ({
        //     type: 'component',
        //     label: '城市：',
        //     name: item.name,
        //     component: <YlxCitySelect />
        //   })
        // } else
        if (item.values) {
          let multiple = item.multi == null
          return ({
            type: 'select',
            selectAll: true,
            name: item.name,
            searchable: true,
            multiple: multiple,
            closeAfterSelect: !multiple,
            label: (item.text || item.label) + '：',
            options: item.values.map(({value, name, label}) => {
              return {label: name || label, value}
            })
          })
        } else {
          return ({
            type: 'text',
            name: item.name,
            label: (item.text || item.label) + '：'
          })
        }
      })
    }
  }

  render () {
    const {
      data,
      form,
      init,
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
          options={this.formRender(form, data, handleChange)}
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

