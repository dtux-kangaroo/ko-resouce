import * as React from 'react';
import { Table, Pagination, Modal, Button, Menu, Dropdown, Icon } from 'antd';
import  './style.scss';
import AddOrEditModal from './addOrEditModal';
import TemplateImport from './templateImport';
import { API,URL } from "@/api/index";
import { message as Message } from 'antd';

const confirm = Modal.confirm;

interface IProps{
  entId: string,
  senseId:string,
  indexLocation: Array<any>
}

interface IState{
  siDataSource: any,
  pageNo: number,
  pageSize: number,
  total: number,             
  modalVisible: boolean,
  editItem: any,
  selectedRows: Array<any>,
  selectedRowKeys: Array<any>,
  importModalVisible: boolean,
}

export default class BusinessIndicators extends  React.Component<IProps, IState>  {
  constructor(props:any) {
    super(props);
  }

  modalForm: any

  state:IState={
    siDataSource: [],
    pageNo: 1,
    pageSize: 10,
    total: 20,
    modalVisible: false,
    editItem: {},
    selectedRows: [],
    selectedRowKeys: [],
    importModalVisible: false,
  }

  componentDidMount () {
    if (this.props.senseId) {
      this.indexListUsingPost();
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.senseId != this.props.senseId) {
      this.indexListUsingPost(nextProps.senseId);
    }
  }

  indexListUsingPost = (senseId?:string) => { // 获取指标列表
    const { pageNo, pageSize } = this.state;
    API.indexListUsingPost({
      entId: parseInt(this.props.entId),
      sceneId: senseId? senseId : this.props.senseId,
      pageNo: pageNo,
      pageSize: pageSize
    }).then((response: any) =>{ 
      const { message, success, data } = response;
      if (success) {
        this.setState({
          siDataSource: data ? data.contentList : [],
          total: data ? data.total : 0,
        })
      } else {
        Message.error(message);
      }
    });
  }

  handlePageChange = (page: number, pageSize: number) => {
    this.setState({
      pageNo: page,
      pageSize: pageSize,
    }, () => {
      this.indexListUsingPost();
    })
  }

  handleDelete = (item: any) => {
    const _this = this;
    confirm({
      title: '是否确认删除该指标?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        API.indexDeletedUsingPost({
          idList: [item.id]
        }).then((response: any) =>{ 
          const { message, success } = response;
          if (success) {
            _this.setState({
              pageNo: 1
            }, () => {
              _this.indexListUsingPost();
            })
          } else {
            Message.error(message);
          }
        });
      },
      onCancel() {
        
      },
    });
  }

  handleDeleteSelected = () => {
    const { selectedRows } = this.state;
    let _this = this;
    if (selectedRows.length > 0) {
      confirm({
        title: '是否确认删除所选指标?',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          let idList: Array<any> = [];
          selectedRows.forEach((item: any) => {
            idList.push(item.id);
          })
          API.indexDeletedUsingPost({
            idList: idList
          }).then((response: any) =>{ 
            const { message, success } = response;
            if (success) {
              _this.setState({
                pageNo: 1,
                selectedRows: [],
                selectedRowKeys: []
              }, () => {
                _this.indexListUsingPost();
              })
            } else {
              Message.error(message);
            }
          });
        },
        onCancel() {
          
        },
      });
    }else{
      Message.warn('请先选择指标！')
    }
  }

  handleModalOpen = (item: any) => {
    this.setState({
      modalVisible: true,
      editItem: item
    });
  }

  handleModalCancel = () => {
    this.setState({
      modalVisible: false,
      editItem: {}
    });
  }

  handleModalOk = (values) => {
    const {editItem} = this.state;
    API.entPersistUsingPost_1({
      entId: this.props.entId,
      id:editItem.id||'',
      ...values
      }).then((response: any) =>{ 
        const { message, success } = response;
        if (success) {
          this.setState({
            pageNo: 1,
            modalVisible: false,
            editItem: {}
          }, () => {
            this.indexListUsingPost();
          })
        } else {
          Message.error(message);
        }
      });
  }
  
  handleMenuClick = (e: any) => {
    if( e.key == 'import' ) {
      this.setState({
        importModalVisible: true,
      });
    } else {
      let a = document.createElement('a');
      a.href = `${URL.indexExportUsingGet}?entId=${this.props.entId}&senseId=${this.props.senseId}`;
      a.click();
    }
  }
  
  handleImportModalCancel = ()=> {
    this.setState({
      importModalVisible: false,
    });
  };

  handleTableSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    this.setState({
      selectedRows: selectedRows,
      selectedRowKeys: selectedRowKeys
    });
  }

  render(){
    const { siDataSource, pageNo, total, editItem, selectedRowKeys, importModalVisible, modalVisible } = this.state;
    const { entId ,senseId, indexLocation} = this.props;
    const operationMenu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="import">
          Excel模板导入
        </Menu.Item>
        <Menu.Item key="download">
          模板下载
        </Menu.Item>
      </Menu>
    );

    const rowSelection = {
      selectedRowKeys: selectedRowKeys,
      onChange: this.handleTableSelectChange
    };
    
    const columns: any = [
      {
        title: '指标位置',
        dataIndex: 'indexLocation',
        width: 200,
        key: 'indexLocation',
        render:(value) => {
          return value.map(item=>item.sceneName).join('/')
        },
        fixed: 'left',
      },
      {
        title: '指标名称',
        dataIndex: 'indexName',
        width: 150,
        key: 'indexName',
        fixed: 'left',
      },
      {
        title: '类型',
        dataIndex: 'indexTypes',
        width: 150,
        key: 'indexTypes',
        render:(value)=>value.join(',')
      },
      {
        title: '业务口径',
        dataIndex: 'caliberRemark',
        key: 'caliberRemark',
      },
      {
        title: '数据源',
        dataIndex: 'systemNames',
        width: 150,
        key: 'systemNames',
        render:(value) => {
          return value ? value.map(item=>item.systemName).join(','):value
        },
      },
      {
        title: '是否能够实现',
        dataIndex: 'isRealize',
        width: 150,
        key: 'isRealize',
        // render: (data: any) => {
        //   return data == 0 ? <span>是</span> : data == 1 ? <span>否</span> : data;
        // }
      },
      {
        title: '未实现原因',
        dataIndex: 'unrealizedCause',
        width: 150,
        key: 'unrealizedCause',
      },
      {
        title: '指标业务价值',
        dataIndex: 'businessValue',
        width: 150,
        key: 'businessValue',
      },
      {
        title: '备注',
        dataIndex: 'indexRemark',
        width: 150,
        key: 'indexRemark',
      },
      {
        title: <span>操作<a href="javascript:;" onClick={this.handleDeleteSelected} style={{ marginLeft: 120, textDecoration: 'underline' }}>删除</a></span>,
        dataIndex: 'operate',
        key: 'operate',
        minWidth: '250',
        render: (data: string, record: any) => {
          return (
            <span>
              <a href="javascript:;" onClick={this.handleModalOpen.bind(this,record)}>编辑</a>
              <a href="javascript:;" style={{ marginLeft: 10 }} onClick={this.handleDelete.bind(this,record)}>删除</a>
            </span>
          );
        }
      }
    ];
    return (
      <div className="business-indicators">
        <div className="top-box">
          <div className="title">主要指标</div>
          <div>
            <Button style={{ marginRight: 10 }} type="primary" onClick={this.handleModalOpen.bind(this,{})}>新增指标</Button>
            <Dropdown overlay={operationMenu} trigger={['click']}>
              <Button type="primary">
              模板导入<Icon type="down" />
              </Button>
            </Dropdown>
          </div>
        </div>
        <div className="table-box">
          <Table dataSource={siDataSource} scroll={{ x: 1700 }} pagination={false} columns={columns} rowSelection={rowSelection} />
          <div className="pagination">
            <Pagination hideOnSinglePage current={pageNo} total={total} onChange={this.handlePageChange} showSizeChanger showQuickJumper/>
          </div>
        </div>
        <AddOrEditModal 
          editItem={editItem} 
          entId={entId}
          visible={modalVisible}
          onOk={this.handleModalOk}
          onCancel={this.handleModalCancel}
          indexLocation={indexLocation}
        />
        <TemplateImport 
          key={importModalVisible ? '0' : '1'} 
          entId={entId}
          senseId={senseId}
          visible={importModalVisible} 
          handleImportModalCancel={this.handleImportModalCancel} 
          indexLocation={indexLocation}
        />
      </div>
    )
  }
}
