const ActionsData = {
  'link': {
    displayName: '跳转链接',
    functionName: 'handleHref',
    config: {
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
  'toggleVisibility': {
    displayName: '显示/隐藏',
    functionName: 'handleVisible',
    choseComp: true,
    config: {
      visible: 'hide',
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
    conditionRender () {
      return [{
        conditionType: 'equal',
        conditionValue: true
      }]
    },
    render (actionConfig) {
      let output = []
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
  'wait': {
    displayName: '等待',
    functionName: 'handleWait',
    config: {
      duration: 1000
    },
    props: [{
      name: 'duration',
      label: '等待',
      icon: 'ms',
      type: 'number',
      step: 100
    }],
    render ({duration}, actions, index) {
      let otherActions = actions.slice(index + 1)
      let funcArr = []
      let stop = false
      otherActions.forEach(({actionType, actionConfig}, i) => {
        if (stop) return
        stop = actionType === 'wait'
        funcArr.push(ActionsData[actionType].render(actionConfig, actions, index + i + 1))
      })
      return `setTimeout(() => {
        ${funcArr.join('\r\n')}
      }, ${duration || 0})`
    }
  },
  'loading': {
    displayName: '加载中',
    functionName: 'handleLoading',
    config: {
      type: 'stretch',
      loading: false,
      mask: false,
      title: ''
    },
    props: [{
      name: 'type',
      label: '类型',
      type: 'select',
      options: [{
        label: 'stretch',
        value: 'stretch'
      }, {
        label: 'chase-dots',
        value: 'chase-dots'
      }]
    }, {
      name: 'title',
      label: '文字'
    }, {
      name: 'mask',
      label: '遮罩',
      type: 'switch',
      on: true,
      off: false
    }],
    render (actionConfig) {
      if (actionConfig.loading) {
        return `Loading.loading(${JSON.stringify(actionConfig)})`
      } else {
        return `Loading.close()`
      }
    }
  },
  'message': {
    displayName: '消息',
    functionName: 'handleMessage',
    config: {
      type: 'confirm',
      duration: 3000,
      content: ''
    },
    props: [{
      name: 'type',
      label: '类型',
      type: 'select',
      options: [{
        label: '默认',
        value: 'confirm'
      }, {
        label: '主题',
        value: 'info'
      }, {
        label: '成功',
        value: 'success'
      }, {
        label: '危险',
        value: 'danger'
      }, {
        label: '警告',
        value: 'warning'
      }, {
        label: '加载',
        value: 'loading'
      }]
    }, {
      name: 'content',
      label: '内容'
    }, {
      name: 'duration',
      label: '停留',
      type: 'number',
      icon: 'ms',
      step: 100
    }],
    render (actionConfig) {
      return `Message.${actionConfig.type}(${JSON.stringify(actionConfig)})`
    }
  },
  'confirm': {
    displayName: '确认框',
    functionName: 'handleConfirm',
    config: {
      title: '系统提示',
      content: '',
      size: 'small'
    },
    props: [{
      name: 'size',
      label: '尺寸',
      type: 'select',
      options: [{
        label: '小',
        value: 'small'
      }, {
        label: '中',
        value: 'default'
      }, {
        label: '大',
        value: 'large'
      }, {
        label: '危险',
        value: 'danger'
      }]
    }, {
      name: 'title',
      label: '标题'
    }, {
      name: 'content',
      label: '内容',
      type: 'textarea'
    }],
    render (actionConfig) {
      return `Modal.confirm(${JSON.stringify(actionConfig)})`
    }
  }
}

export default ActionsData

export const actionTypes = {
  '链接': ['link', 'reload', 'back'],
  '联动': ['toggleVisibility', 'setProps'],
  '消息': ['message', 'confirm'],
  '其他': ['wait', 'loading']
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
