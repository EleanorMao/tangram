const getDefaultStyle = () => {
  return {
    paddingLeft: '',
    paddingRight: '',
    paddingTop: '',
    paddingBottom: '',
    marginLeft: '',
    marginRight: '',
    marginTop: '',
    marginBottom: ''
  }
}

const getDefaultStyleOptions = () => {
  return [{
    label: '内边距(左)',
    name: 'paddingLeft',
    type: 'number',
    icon: 'px'
  }, {
    label: '内边距(右)',
    name: 'paddingRight',
    type: 'number',
    icon: 'px'
  }, {
    label: '内边距(上)',
    name: 'paddingTop',
    type: 'number',
    icon: 'px'
  }, {
    label: '内边距(下)',
    name: 'paddingBottom',
    type: 'number',
    icon: 'px'
  }, {
    label: '外边距(左)',
    name: 'marginLeft',
    type: 'number',
    icon: 'px'
  }, {
    label: '外边距(右)',
    name: 'marginRight',
    type: 'number',
    icon: 'px'
  }, {
    label: '外边距(上)',
    name: 'marginTop',
    type: 'number',
    icon: 'px'
  }, {
    label: '外边距(下)',
    name: 'marginBottom',
    type: 'number',
    icon: 'px'
  }]
}
export default {
  div: {
    displayName: '区块(div)',
    config: Object.assign({
      width: 800,
      background: ''
    }, getDefaultStyle()),
    props: [{
      label: '宽度',
      name: 'width',
      type: 'number',
      icon: 'px'
    }, {
      label: '背景色',
      name: 'background',
      type: 'color'
    }].concat(getDefaultStyleOptions())
  },
  span: {
    displayName: '行内文本(span)',
    invalid: ['p'],
    config: Object.assign({
      children: '文字',
      fontSize: '',
      color: ''
    }, getDefaultStyle()),
    props: [{
      label: '内容',
      name: 'children',
      type: 'text'
    }, {
      label: '字号',
      name: 'fontSize',
      type: 'number',
      tips: '不要小于12px'
    }, {
      label: '文字颜色',
      name: 'color',
      type: 'color'
    }].concat(getDefaultStyleOptions())
  },
  p: {
    displayName: '段落(p)',
    expect: ['span', 'a'],
    config: Object.assign({
      children: '段落',
      fontSize: '',
      color: ''
    }, getDefaultStyle()),
    props: [{
      label: '内容',
      name: 'children',
      type: 'textarea'
    }, {
      label: '字号',
      name: 'fontSize',
      type: 'number',
      tips: '不要小于12px'
    }, {
      label: '文字颜色',
      name: 'color',
      type: 'color'
    }].concat(getDefaultStyleOptions())
  },
  a: {
    displayName: '超链接(a)',
    invalid: ['a'],
    config: Object.assign({
      children: '链接',
      href: '#',
      fontSize: '',
      color: ''
    }, getDefaultStyle()),
    props: [{
      label: '内容',
      name: 'children',
      type: 'text'
    }, {
      label: '链接',
      name: 'href',
      type: 'text'
    }, {
      label: '字号',
      name: 'fontSize',
      type: 'number',
      tips: '不要小于12px'
    }, {
      label: '文字颜色',
      name: 'color',
      type: 'color'
    }].concat(getDefaultStyleOptions())
  },
  h1: {
    displayName: '标题H1',
    config: Object.assign({
      children: '标题',
      fontSize: '',
      color: ''
    }, getDefaultStyle()),
    props: [{
      label: '内容',
      name: 'children',
      type: 'text'
    }, {
      label: '字号',
      name: 'fontSize',
      type: 'number',
      tips: '不要小于12px'
    }, {
      label: '文字颜色',
      name: 'color',
      type: 'color'
    }].concat(getDefaultStyleOptions())
  },
  h2: {
    displayName: '标题H2',
    config: Object.assign({
      children: '标题',
      fontSize: '',
      color: ''
    }, getDefaultStyle()),
    props: [{
      label: '内容',
      name: 'children',
      type: 'text'
    }, {
      label: '字号',
      name: 'fontSize',
      type: 'number',
      tips: '不要小于12px'
    }, {
      label: '文字颜色',
      name: 'color',
      type: 'color'
    }].concat(getDefaultStyleOptions())
  },
  h3: {
    displayName: '标题H3',
    config: Object.assign({
      children: '标题',
      fontSize: '',
      color: ''
    }, getDefaultStyle()),
    props: [{
      label: '内容',
      name: 'children',
      type: 'text'
    }, {
      label: '字号',
      name: 'fontSize',
      type: 'number',
      tips: '不要小于12px'
    }, {
      label: '文字颜色',
      name: 'color',
      type: 'color'
    }].concat(getDefaultStyleOptions())
  },
  h4: {
    displayName: '标题H4',
    config: Object.assign({
      children: '标题',
      fontSize: '',
      color: ''
    }, getDefaultStyle()),
    props: [{
      label: '内容',
      name: 'children',
      type: 'text'
    }, {
      label: '字号',
      name: 'fontSize',
      type: 'number',
      tips: '不要小于12px'
    }, {
      label: '文字颜色',
      name: 'color',
      type: 'color'
    }].concat(getDefaultStyleOptions())
  },
  h5: {
    displayName: '标题H5',
    config: Object.assign({
      children: '标题',
      fontSize: '',
      color: ''
    }, getDefaultStyle()),
    props: [{
      label: '内容',
      name: 'children',
      type: 'text'
    }, {
      label: '字号',
      name: 'fontSize',
      type: 'number',
      tips: '不要小于12px'
    }, {
      label: '文字颜色',
      name: 'color',
      type: 'color'
    }].concat(getDefaultStyleOptions())
  },
  'Grid.Row': {
    displayName: '栅格(行)',
    config: {
      className: ''
    },
    props: [{
      label: '样式类',
      name: 'className',
      type: 'text'
    }]
  },
  'Grid.Col': {
    displayName: '栅格(列)',
    config: {
      className: '',
      col: 2
    },
    props: [{
      label: '样式类',
      name: 'className',
      type: 'text'
    }, {
      label: '占比',
      name: 'col',
      type: 'number',
      icon: '份',
      min: 1,
      max: 12
    }]
  },
  Input: {
    displayName: '输入框',
    single: true,
    config: {
      name: 'name',
      type: 'text'
    },
    props: [{
      name: 'name',
      type: 'text',
      label: 'name'
    }, {
      name: 'type',
      label: '类型',
      type: 'select',
      options: [{
        label: '输入框',
        value: 'text'
      }, {
        label: '文本区域',
        value: 'textarea'
      }]
    }]
  },
  Button: {
    displayName: '按钮',
    config: {
      type: 'default',
      children: '按钮'
    },
    props: [{
      name: 'children',
      label: '内容',
      type: 'text'
    }, {
      name: 'type',
      label: '类型',
      type: 'select',
      options: [{
        label: '默认',
        value: 'default'
      }, {
        label: '主题',
        value: 'primary'
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
        label: '文字',
        value: 'text'
      }]
    }]
  },
  Tag: {
    displayName: '标签',
    config: {
      type: 'default',
      closeable: false,
      children: '标签'
    },
    props: [{
      name: 'children',
      label: '内容',
      type: 'text'
    }, {
      name: 'type',
      label: '类型',
      type: 'select',
      options: [{
        label: '默认',
        value: 'default'
      }, {
        label: '主题',
        value: 'primary'
      }, {
        label: '成功',
        value: 'success'
      }, {
        label: '危险',
        value: 'danger'
      }, {
        label: '警告',
        value: 'warning'
      }]
    }, {
      name: 'closeable',
      label: '显示叉叉',
      type: 'switch',
      on: true,
      off: false
    }]
  }
}

export const category = {
  '文本/标题': ['div', 'span', 'p', 'a', 'h1', 'h2', 'h3', 'h4', 'h5'],
  '布局': ['div', 'Grid.Row', 'Grid.Col'],
  '表单': ['Form', 'FormItem', 'Button', 'Input', 'NumberInput', 'TagInput', 'Select', 'Radio', 'Checkbox', 'Upload', 'Datetime', 'Transfer', 'Editor'],
  '展示': ['Tag', 'Button', 'Table', 'Loading'],
  '消息': ['Message', 'Tooltip', 'Popover'],
  '导航': ['Dropdown', 'Tabs', 'Menu', 'MenuItem', 'SubMenu', 'MenuItemGroup'],
  '弹窗': ['Modal']
}
