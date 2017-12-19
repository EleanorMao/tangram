export default {
  'base': {
    displayName: '默认',
    modules: {
      'asumi': ['Message', 'Loading', 'Modal']
    },
    state: {}
  },
  'list': {
    displayName: 'C网列表页',
    modules: {
      'asumi': ['Message', 'Button', 'Modal', 'Col'],
      'lib/js': ['MainPanel', 'RemoteTable']
    },
    state: {
      data: {},
      page: 1,
      modalData: '',
      totalSize: 0,
      showLoad: false,
      showModal: false,
      optionsList: [],
      sizePerPage: 10,
      checkedList: []
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
    props: {
      form: [{
        name: 'loginNam',
        text: '用户名'
      }],
      buttons: [],
      data: '%sdata',
      showLoad: '%sshowLoad'
    },
    children: [{
      key: 'root-table-0',
      parentKey: 'root',
      type: 'RemoteTable',
      props: {
        isKey: 'id',
        page: '%spage',
        data: '%soptionsList',
        totalSize: '%stotalSize',
        selected: '%scheckedList',
        sizePerPage: '%ssizePerPage'
      },
      children: [{
        key: 'root-table-tablerow-0',
        parentKey: 'root-table-0',
        type: 'Col',
        props: {
          dataField: 'id',
          children: '操作'
        },
        children: [],
        controls: [],
        events: {
          dataFormat: [{
            functionName: 'controlRender'
          }]
        }
      }],
      controls: [],
      events: {
        pageChange: [{
          functionName: 'init'
        }],
        handleSelect: [{
          functionName: 'handleSelect'
        }],
        handleSelectAll: [{
          functionName: 'handleSelectAll'
        }]
      }
    }],
    controls: [],
    events: {
      init: [{
        functionName: 'init'
      }],
      handleChange: [{
        functionName: 'handleChange'
      }],
      handleReset: [{
        functionName: 'handleReset'
      }]
    }
  }
}
