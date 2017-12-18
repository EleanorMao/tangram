export default {
  'link': {
    displayName: '跳转链接',
    functionName: 'handleHref',
    config: {
      preventDefault: true,
      target: '_self',
      href: 'http://'
    },
    props: [{
      label: '打开位置',
      name: 'target',
      type: 'select',
      options: [{
        label: '当前页',
        value: '_self'
      }, {
        label: '新标签',
        value: '_blank'
      }]
    }, {
      label: '链接',
      name: 'href'
    }, {
      label: '阻止默认事件',
      name: 'preventDefault',
      type: 'switch',
      off: false,
      on: true
    }],
    render (actionConfig) {
      let output = []
      if (actionConfig.preventDefault) {
        output.push('e.preventDefault()')
      }
      let href = JSON.stringify(actionConfig.href)
      if (actionConfig.target === '_blank') {
        output.push('window.open(' + href + ');')
      } else {
        output.push('location.href = ' + href + ';')
      }
      return output.join('\r\n')
    }
  },
  'reload': {
    displayName: '刷新',
    functionName: 'handleReload',
    config: {},
    props: [],
    render () {
      return 'location.reload();'
    }
  },
  'back': {
    displayName: '返回',
    functionName: 'handleBack',
    config: {},
    props: [],
    render () {
      return 'history.back();'
    }
  },
  'showHide': {
    displayName: '显示/隐藏',
    functionName: 'handleVisible',
    choseComp: true,
    config: {
      visible: 'hide',
      preventDefault: true,
      controlName: 'visible',
      defaultControlValue: true
    },
    props: [{
      label: '显示',
      name: 'visible',
      type: 'radiogroup',
      options: [{
        label: '显示',
        value: 'show'
      }, {
        label: '隐藏',
        value: 'hide'
      }, {
        label: '切换可见性',
        value: 'toggle'
      }]
    }, {
      label: '默认显示',
      name: 'defaultControlValue',
      type: 'switch',
      off: false,
      on: true
    }, {
      label: '阻止默认事件',
      name: 'preventDefault',
      type: 'switch',
      off: false,
      on: true
    }],
    render (actionConfig) {
      let output = []
      if (actionConfig.preventDefault) {
        output.push('e.preventDefault()')
      }
      if (actionConfig.visible === 'hide') {
        output.push(`this.setState({${actionConfig.controlName}: false})`)
      }
      if (actionConfig.visible === 'show') {
        output.push(`this.setState({${actionConfig.controlName}: true})`)
      }
      if (actionConfig.visible === 'toggle') {
        output.push(`this.setState({${actionConfig.controlName}: !this.state.${actionConfig.controlName}})`)
      }
      return output.join('\r\n')
    }
  },
  'setText': {
    displayName: '设置文本',
    functionName: 'handleSetText',
    choseComp: true,
    config: {
      controlName: 'value',
      text: ''
    },
    props: [{
      name: 'text',
      label: '文本内容',
      type: 'textarea'
    }],
    render (actionConfig) {
      return `this.setState({${actionConfig.controlName}: ${actionConfig.text})`
    }
  }
}

export const actionTypes = {
  '链接': ['link', 'reload', 'back'],
  '联动': ['showHide']
}

export const events = {
  'onClick': {
    displayName: '点击'
  },
  'onDoubleClick': {
    displayName: '双击'
  },
  'onChange': {
    displayName: '输入',
    expect: ['Form', 'FormItem', 'Input', 'NumberInput', 'TagInput', 'Select', 'Option', 'Radio', 'RadioGroup', 'Checkbox', 'CheckboxGroup', 'Upload', 'Datetime', 'Transfer', 'Editor']
  },
  'onFocus': {
    displayName: '聚焦',
    expect: ['a', 'Form', 'FormItem', 'Button', 'Input', 'NumberInput', 'TagInput', 'Select', 'Option', 'Radio', 'RadioGroup', 'Checkbox', 'CheckboxGroup', 'Upload', 'Datetime', 'Transfer', 'Editor']
  },
  'onBlur': {
    displayName: '失焦',
    expect: ['a', 'Form', 'FormItem', 'Button', 'Input', 'NumberInput', 'TagInput', 'Select', 'Option', 'Radio', 'RadioGroup', 'Checkbox', 'CheckboxGroup', 'Upload', 'Datetime', 'Transfer', 'Editor']
  },
  'onPressEnter': {
    displayName: '回车',
    expect: ['Input']
  },
  'onSubmit': {
    displayName: '提交',
    expect: ['Form']
  },
  'onClose': {
    displayName: '关闭',
    expect: ['Modal', 'Loading']
  }
}

/*
  影响类型:
    1. 影响组件渲染 visible && <div />
    2. 影响children显示 <div>{visible && 'abc'}</div>
    3. 影响children内容 <div>{value}</div>
  条件判断:
    1. if...elseif...else
    1. && 和
    2. || 或
  controls: [{
    controlName: '', //state的名字
  }]
 */
