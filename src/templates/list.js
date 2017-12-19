export default (code, func, modules, state) => {
  return (
    `
  import '../../../lib/style/public.less'
  
  import React, { Component } from 'react'
  import ReactDOM from 'react-dom'
  import {assign, dateFormat} from 'beyond-lib/lib'
  // 接口
  import {getList} from '../../lib/remotes/common.js'
  
  ${modules.join('\r\n  ')}

  class List extends Component {
    constructor () {
      super()
      this.state = ${JSON.stringify(state)}
    }
    
    componentDidMount() {
        this.init();
    }
    
    init(page = 1, start = 0, length = this.state.sizePerPage) {
        this.setState(old => {
            old.showLoad = true;
            return old;
        });

        getList(assign({
            start: start,
            length: length
        }, this.state.data)).then((res) => {
            this.setState((old) => {
                old.page = page;
                old.showLoad = false;
                old.checkedList = [];
                old.sizePerPage = length;
                old.totalSize = res.totalSize;
                old.optionsList = res.list || [];
                return old;
            })
        }).catch(() => {
            this.setState(old => {
                old.showLoad = false;
                return old;
            })
        })
    }

    handleReset() {
        this.setState(old => {
            old.data = ${state.data ? JSON.stringify(state.data) : '{}'};
            return old;
        })
    }
    
    handleChange({name, value}) {
        this.setState(old => {
            old.data[name] = value;
            return old;
        })
    }

    handleSelect(checked, obj) {
        if (checked) {
            this.setState(old => {
                //修改key名
                old.checkedList.push(obj.id);
                return old
            })
        } else {
            this.setState(old => {
                //修改key名
                old.checkedList.splice(old.checkedList.indexOf(obj.id), 1);
                return old;
            })
        }
    }

    handleSelectAll(checked, currentSelected) {
        if (checked) {
            let checkedList = currentSelected.map(item => {
                //修改key名
                return item.id;
            });
            this.setState(old => {
                old.checkedList = checkedList;
                return old;
            })
        } else {
            this.setState(old => {
                old.checkedList = [];
                return old;
            })
        }
    }
   
    ${func.join('\r\n    ')}
    controlRender(cell, row) {
        return (
            <span>
                <Button type="text" onClick={}>查看</Button>
            </span>
        )
    }
    
    render () {
      return (
        ${code}
    )
  }
}
          `
  )
}
