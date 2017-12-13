export default {
  div: {
    displayName: '',
    config: {
      width: 800
    },
    props: [{
      label: '宽度',
      name: 'width',
      type: 'number',
      icon: 'px'
    }]
  },
  span: {
    config: {
      children: '文字'
    },
    props: [{
      label: '内容',
      name: 'children',
      type: 'text'
    }]
  },
  Input: {
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
  }
}
