export default {
  'base': {
    displayName: '默认',
    modules: {
      'asumi': ['Message', 'Loading', 'Modal']
    },
    state: {}
  },
  'list': {
    displayName: '列表页',
    modules: {
      'asumi': ['Message', 'Loading', 'Modal'],
      'common': ['MainPanel', 'RemoteTable']
    },
    state: {
      search: {},
      data: {},
      page: 1
    }
  }
}

export const BaseModel = {
  base: {
    key: 'root',
    type: 'div',
    props: {
      style: {width: 800}
    },
    children: [{
      key: 'root-button-0',
      parentKey: 'root',
      type: 'Button',
      props: {
        type: 'success',
        children: '显示'
      },
      children: [],
      controls: [],
      events: {
        onClick: [{
          functionName: 'handleClick',
          actions: [{
            actionType: 'toggleVisibility',
            actionComp: 'root-div-2',
            actionConfig: {
              visible: 'show'
            }
          }]
        }]
      }
    }, {
      key: 'root-button-1',
      type: 'Button',
      parentKey: 'root',
      props: {
        type: 'danger',
        children: '隐藏'
      },
      children: [],
      controls: [],
      events: {
        onClick: [{
          functionName: 'handleClick1',
          actions: [{
            actionType: 'toggleVisibility',
            actionComp: 'root-div-2',
            actionConfig: {
              visible: 'hide'
            }
          }]
        }]
      }
    }, {
      key: 'root-div-2',
      type: 'div',
      parentKey: 'root',
      props: {
        style: {width: 500, backgroundColor: 'pink'}
      },
      children: [],
      controls: [{
        controlName: 'visible',
        actionType: 'toggleVisibility',
        conditions: [{
          triggerKey: 'root-button-0',
          conditionType: 'equal',
          conditionValue: true
        }, {
          triggerKey: 'root-button-1',
          conditionType: 'equal',
          conditionValue: true
        }]
      }],
      events: {}
    }],
    controls: [],
    events: {}
  },
  list: {
    key: 'root',
    type: 'MainPanel',
    props: {},
    children: [{
      key: 'root-table-0',
      parentKey: 'root',
      type: 'RemoteTable',
      props: {
        data: []
      },
      children: [],
      controls: [],
      events: {}
    }],
    controls: [],
    events: {}
  }
}
