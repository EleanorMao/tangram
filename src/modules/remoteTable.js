import '../assets/style/mainPanel.css'
import React, { Component } from 'react'
import { Table } from 'asumi'

/* eslint-disable */
export default class RemoteTable extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  pageChange (page, sizePerPage) {
    page = page < 1 ? 1 : page
    this.props.pageChange(page, (page - 1) * sizePerPage, sizePerPage)
  }

  render () {
    const {
      data,
      page,
      isKey,
      isTree,
      selected,
      children,
      totalSize,
      pagination,
      sizePerPage,
      handleSelect,
      onArrowClick,
      expandRowKeys,
      handleSelectAll,
      childrenPropertyName
    } = this.props
    let options = {
      page: page,
      noDataText: '暂无数据',
      sizePerPage: sizePerPage,
      sizePageList: [10, 30, 50, 100, 200],
      sizePerPageList: [10, 30, 50, 100, 200],
      onPageChange: this.pageChange.bind(this)
    }
    let selectRow = {
      mode: 'checkbox',
      onSelect: handleSelect,
      onSelectAll: handleSelectAll
    }
    if (selected) {
      selectRow.selected = selected
    }
    if (totalSize !== -1) {
      return (
        <div className="pdl20 pdr20">
          <Table
            data={data}
            hover={true}
            remote={true}
            isKey={isKey}
            isTree={isTree}
            striped={!isTree}
            pagination={true}
            options={options}
            dataSize={totalSize}
            clickToCloseAll={false}
            onArrowClick={onArrowClick}
            expandRowKeys={expandRowKeys}
            title={<div>共{totalSize}条数据</div>}
            childrenPropertyName={childrenPropertyName}
            selectRow={handleSelect ? selectRow : {}}
          >
            {children}
          </Table>
        </div>
      )
    } else {
      options = {
        noDataText: '暂无数据',
        sizePerPageList: [10, 30, 50, 100, 200]
      }
      return (
        <div className="pdl20 pdr20">
          <Table
            data={data}
            isKey={isKey}
            title={<div>共{data && data.length || 0}条数据</div>}
            striped={true} hover={true} pagination={!pagination}
            options={options} selectRow={handleSelect ? selectRow : {}}
          >
            {children}
          </Table>
        </div>
      )
    }
  }
}

RemoteTable.defaultProps = {
  data: [],
  isKey: 'id',
  search: false,
  totalSize: -1,
  sizePerPage: 10,
  childrenPropertyName: 'children'
}
