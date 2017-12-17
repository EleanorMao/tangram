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
      visible: false,
      preventDefault: true,
      controlName: 'visible',
      defaultControlValue: true
    },
    props: [{
      label: '显示模块',
      name: 'visible',
      type: 'switch',
      off: false,
      on: true
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
      output.push(`this.setState({visible: ${actionConfig.visible}})`)
      return output.join('\r\n')
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
