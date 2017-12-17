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
      type: 'text',
      placeholder: ''
    },
    props: [{
      name: 'name',
      type: 'text',
      label: 'name'
    }, {
      name: 'placeholder',
      label: '提示暗纹'
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
  },
  Loading: {
    displayName: '加载中',
    config: {
      type: 'stretch',
      fullScreen: true,
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
    }, {
      name: 'fullScreen',
      label: '全屏',
      type: 'switch',
      on: true,
      off: false
    }]
  },
  Table: {
    displayName: '表格',
    expect: ['Col'],
    childrenType: 'Col',
    config: {
      data: [],
      isKey: 'id',
      isTree: true,
      hover: true,
      remote: false,
      pagination: true,
      title: '',
      footer: ''
    },
    props: [{
      name: 'isKey',
      label: 'key属性'
    }, {
      name: 'pagination',
      label: '分页',
      type: 'switch',
      on: true,
      off: false
    }, {
      name: 'isTree',
      label: '下钻',
      type: 'switch',
      on: true,
      off: false
    }, {
      name: 'title',
      label: '表头文字'
    }, {
      name: 'footer',
      label: '表尾文字'
    }]
  },
  Col: {
    displayName: '列',
    expect: [],
    config: {
      dataField: 'id',
      dataAlign: 'center',
      dataFixed: 'auto',
      dataSort: false,
      children: 'ID'
    },
    props: [{
      name: 'children',
      label: '列名'
    }, {
      name: 'dataField',
      label: '列属性名'
    }, {
      name: 'dataAlign',
      label: '对齐',
      type: 'select',
      options: [{
        label: '左对齐',
        value: 'left'
      }, {
        label: '右对齐',
        value: 'right'
      }, {
        label: '居中',
        value: 'center'
      }]
    }, {
      name: 'dataFixed',
      label: '固定',
      type: 'select',
      options: [{
        label: '左对齐',
        value: 'left'
      }, {
        label: '右对齐',
        value: 'right'
      }, {
        label: '自动',
        value: 'auto'
      }]
    }, {
      name: 'dataSort',
      label: '排序',
      type: 'switch',
      on: true,
      off: false
    }]
  },
  Menu: {
    displayName: '菜单',
    expect: ['MenuItem', 'SubMenu', 'MenuItemGroup'],
    config: {
      width: 220,
      openAll: false,
      openIds: []
    },
    props: [{
      label: '宽度',
      name: 'width',
      type: 'number',
      icon: 'px'
    }, {
      name: 'openAll',
      label: '展开全部',
      type: 'switch',
      on: true,
      off: false
    }, {
      name: 'openIds',
      label: '展开的目录id',
      type: 'taginput'
    }]
  },
  SubMenu: {
    displayName: '子菜单',
    expect: ['MenuItem', 'SubMenu', 'MenuItemGroup'],
    config: {
      id: '1',
      title: '子菜单',
      openAll: true,
      openIds: []
    },
    props: [{
      label: 'ID(必填)',
      name: 'id'
    }, {
      label: '菜单名',
      name: 'title'
    }, {
      name: 'openAll',
      label: '展开全部',
      type: 'switch',
      on: true,
      off: false
    }, {
      name: 'openIds',
      label: '展开的目录id',
      type: 'taginput'
    }]
  },
  MenuItemGroup: {
    displayName: '菜单项组',
    expect: ['MenuItem', 'SubMenu', 'MenuItemGroup'],
    config: {
      id: '1',
      title: '子菜单'
    },
    props: [{
      label: 'ID(必填)',
      name: 'id'
    }, {
      label: '菜单名',
      name: 'title'
    }]
  },
  MenuItem: {
    displayName: '菜单项',
    expect: ['span', 'a'],
    config: {
      id: '1'
    },
    props: [{
      label: 'ID(必填)',
      name: 'id'
    }]
  },
  Select: {
    displayName: '选择框',
    expect: ['Option'],
    config: {
      name: '',
      placeholder: '',
      multiple: false,
      selectAll: false,
      searchable: false,
      closeAfterSelect: false
    },
    props: [{
      name: 'name',
      label: 'name'
    }, {
      name: 'placeholder',
      label: '提示暗纹'
    }, {
      name: 'multiple',
      label: '多选',
      type: 'switch',
      on: true,
      off: false
    }, {
      name: 'selectAll',
      label: '全选按钮',
      type: 'switch',
      on: true,
      off: false
    }, {
      name: 'searchable',
      label: '支持搜索',
      type: 'switch',
      on: true,
      off: false
    }, {
      name: 'closeAfterSelect',
      label: '选择后关闭下拉框',
      type: 'switch',
      on: true,
      off: false
    }]
  },
  Option: {
    displayName: '选项',
    single: true,
    expect: [],
    config: {
      children: '选项',
      value: ''
    },
    props: [{
      name: 'children',
      label: '名称'
    }, {
      name: 'value',
      label: '值'
    }]
  },
  NumberInput: {
    displayName: '数字输入框',
    single: true,
    config: {
      name: 'name',
      step: 1,
      min: Number.MIN_SAFE_INTEGER,
      max: Number.MAX_SAFE_INTEGER,
      placeholder: ''
    },
    props: [{
      name: 'name',
      type: 'text',
      label: 'name'
    }, {
      name: 'placeholder',
      label: '提示暗纹'
    }, {
      name: 'step',
      label: '倍数',
      type: 'number'
    }, {
      name: 'min',
      label: '最小值',
      type: 'number'
    }, {
      name: 'max',
      label: '最大值',
      type: 'number'
    }]
  },
  TagInput: {
    displayName: '标签输入框',
    single: true,
    config: {
      value: [],
      name: '',
      placeholder: '',
      separator: 'enter'
    },
    props: [{
      name: 'name',
      type: 'text',
      label: 'name'
    }, {
      name: 'placeholder',
      label: '提示暗纹'
    }, {
      name: 'separator',
      label: '分割符',
      type: 'select',
      options: [{
        label: '回车',
        value: 'enter'
      }, {
        label: '空格',
        value: 'space'
      }]
    }]
  },
  Radio: {
    displayName: '单选框',
    single: true,
    config: {
      name: '',
      label: '',
      type: '',
      checked: false
    },
    props: [{
      name: 'name',
      type: 'text',
      label: 'name'
    }, {
      name: 'label',
      label: '文字'
    }, {
      name: 'checked',
      label: '是否选中',
      type: 'switch',
      on: true,
      off: false
    }, {
      name: 'type',
      label: '类型',
      type: 'select',
      options: [{
        label: '开关',
        value: 'switch'
      }, {
        label: '普通',
        value: ''
      }]
    }]
  },
  Checkbox: {
    displayName: '多选框',
    single: true,
    config: {
      name: '',
      label: '',
      checked: false
    },
    props: [{
      name: 'name',
      type: 'text',
      label: 'name'
    }, {
      name: 'label',
      label: '文字'
    }, {
      name: 'checked',
      label: '是否选中',
      type: 'switch',
      on: true,
      off: false
    }]
  },
  RadioGroup: {
    displayName: '单选组',
    single: true,
    config: {
      options: [],
      disableAll: false,
      name: '',
      value: ''
    },
    props: [{
      name: 'name',
      label: 'name'
    }, {
      name: 'disableAll',
      label: '全不可用',
      type: 'switch',
      on: true,
      off: false
    }],
    mapableProps: {
      options: {
        displayName: '',
        config: {
          value: '',
          label: '',
          disabled: false
        },
        props: [{
          name: 'value',
          label: '值',
          size: 'small'
        }, {
          name: 'label',
          label: '文字',
          size: 'small'
        }, {
          name: 'disabled',
          label: '可用',
          type: 'switch',
          off: true,
          on: false
        }]
      }
    }
  },
  CheckboxGroup: {
    displayName: '多选组',
    single: true,
    config: {
      options: [],
      disableAll: false,
      name: '',
      value: []
    },
    props: [{
      name: 'name',
      label: 'name'
    }, {
      name: 'disableAll',
      label: '全不可用',
      type: 'switch',
      on: true,
      off: false
    }],
    mapableProps: {
      options: {
        displayName: '',
        config: {
          value: '',
          label: '',
          disabled: false
        },
        props: [{
          name: 'value',
          label: '值',
          size: 'small'
        }, {
          name: 'label',
          label: '文字',
          size: 'small'
        }, {
          name: 'disabled',
          label: '可用',
          type: 'switch',
          off: true,
          on: false
        }]
      }
    }
  },
  FormItem: {
    displayName: '表单项',
    single: true,
    config: { // TODO 没写完
      name: '',
      tips: '',
      value: '',
      label: '',
      colon: true,
      type: 'text',
      validate: [],
      labelWidth: '',
      placeholder: '',
      required: false,
      validateType: 'error'
    },
    props: [{
      name: 'type',
      label: '类型',
      type: 'select',
      options: [{
        label: '输入框',
        value: 'text'
      }, {
        label: '文本区域',
        value: 'textarea'
      }, {
        label: '选择框',
        value: 'select'
      }, {
        label: '数字输入框',
        value: 'number'
      }]
    }, {
      name: 'name',
      label: 'name'
    }, {
      name: 'value',
      label: 'value'
    }, {
      name: 'label',
      label: '名称'
    }, {
      name: 'tips',
      label: '提示信息'
    }, {
      name: 'placeholder',
      label: '提示暗纹'
    }],
    mapableProps: {
      validate: {
        displayName: '验证',
        config: {
          message: '',
          trigger: 'submit',
          minLength: 0,
          maxLength: 255
        },
        props: [{
          name: 'trigger',
          type: 'select',
          size: 'small',
          label: '触发',
          options: [{
            label: '输入时',
            value: 'change'
          }, {
            label: '失焦时',
            value: 'blur'
          }, {
            label: '提交',
            value: 'submit'
          }]
        }, {
          label: '提示',
          name: 'message'
        }, {
          label: '最小长度',
          name: 'minLength',
          type: 'number'
        }, {
          label: '最大长度',
          name: 'maxLength',
          type: 'number'
        }]
      },
      options: {
        condition: (props) => {
          return props.type === 'select'
        },
        displayName: '选项',
        config: {
          label: '',
          value: ''
        },
        props: [{
          label: '名称',
          name: 'label',
          size: 'small'
        }, {
          label: '值',
          name: 'value',
          size: 'small'
        }]
      }
    }
  },
  Form: {
    displayName: '表单',
    config: {
      data: {},
      layout: 'horizontal',
      title: '',
      colon: true,
      colNum: '',
      hideSubmitButton: false,
      submitText: '提交'
    },
    props: [{
      label: '布局',
      name: 'layout',
      type: 'select',
      options: [{
        label: '水平',
        value: 'horizontal'
      }, {
        label: '垂直',
        value: 'vertical'
      }, {
        label: '内联',
        value: 'inline'
      }]
    }, {
      label: '表格标题',
      name: 'title'
    }, {
      label: '显示冒号',
      name: 'colon',
      type: 'switch',
      on: true,
      off: false
    }, {
      label: '每行显示N个表单项',
      name: 'colNum',
      type: 'number',
      min: 0,
      max: 12
    }, {
      label: '隐藏提交按钮',
      name: 'hideSubmitButton',
      type: 'switch',
      on: true,
      off: false
    }, {
      label: '提交按钮',
      name: 'submitText'
    }]
  }
}

export const category = {
  '文本/标题': ['div', 'span', 'p', 'a', 'h1', 'h2', 'h3', 'h4', 'h5'],
  '布局': ['div', 'Grid.Row', 'Grid.Col'],
  '表单': ['Form', 'FormItem', 'Button', 'Input', 'NumberInput', 'TagInput', 'Select', 'Option', 'Radio', 'RadioGroup', 'Checkbox', 'CheckboxGroup', 'Upload', 'Datetime', 'Transfer', 'Editor'],
  '展示': ['Tag', 'Button', 'Table', 'Col', 'Loading'],
  '消息': ['Message', 'Tooltip', 'Popover'],
  '导航': ['Dropdown', 'Tabs', 'Menu', 'MenuItem', 'SubMenu', 'MenuItemGroup'],
  '弹窗': ['Modal']
}
