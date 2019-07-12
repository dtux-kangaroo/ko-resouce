import * as React from 'react';
import { Table, Modal, Button } from 'antd';
import  './style.scss';
import AddOrEditModal from './addOrEditModal';
import { API } from "@/api/index";
import { message as Message } from 'antd';

const confirm = Modal.confirm;

interface IProps{
  entId: string,
}

interface IState{
  dataSource: any,
  modalVisible: boolean,
  editItem: any,
  departmentSelectOption: Array<any>,
}

export default class SystemDependent extends  React.Component<IProps, IState>  {
  constructor(props:any) {
    super(props);
  }

  modalForm: any

  state:IState={
    dataSource: [],
    modalVisible: false,
    editItem: {},
    departmentSelectOption: [],
  }

  componentDidMount () {
    this.listUsingGet();
    this.deptListUsingGet();
  }

  listUsingGet = () => { // 获取系统依赖列表
    const { entId } = this.props;
    API.listUsingGet({
      entId: entId
    }).then((response: any) =>{ 
      const { message, success, data } = response;
      if (success) {
        this.setState({
          dataSource: data
        })
      } else {
        Message.error(message);
      }
    });
  }

  deptListUsingGet = () => { // 获取部门下拉选项
    const { entId } = this.props;
    API.deptListUsingGet({
      entId: entId
    }).then((response: any) =>{ 
      const { message, success, data } = response;
      if (success) {
        this.setState({
          departmentSelectOption: data
        })
      } else {
        Message.error(message);
      }
    });
  }

  handleDelete = (item: any) => {
    const _this = this;
    confirm({
      title: '是否确认删除该系统?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        API.deleteUsingPost_2({
          id: item.id
        }).then((response: any) =>{ 
          const { message, success } = response;
          if (success) {
            Message.success("删除成功");
            _this.listUsingGet();
          } else {
            Message.error(message);
          }
        });
      },
      onCancel() {
        
      },
    });
  }

  handleModalOpen = (item: any) => {
    this.deptListUsingGet();
    this.setState({
      modalVisible: true,
      editItem: item,
    });
  }

  handleModalCancel = () => {
    this.setState({
      modalVisible: false,
      editItem: {}
    });
  }

  handleModalOk = () => {
    const { editItem } = this.state;

    this.modalForm.props.form.validateFields((errors: any, values: any) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      const deps: any = this.modalForm.state.tags;
      let params: any = { 
        onlineUrl: values.onlineUrl,
        systemName: values.systemName,
        systemRemark: values.systemRemark,
        testUrl: values.testUrl,
        dept: deps,
        entId: this.props.entId,  
      };
      if (editItem.id) {
        params.id = editItem.id;
        let delDept: any = [];
        editItem.dept.forEach((item: any) => {
          if (deps.indexOf(item) == -1) {
            delDept.push(item);
          }
        })
        if (delDept.length > 0) {
          params.delDept = delDept; // 删除了的部门
        }
      }
      API.persistUsingPost(params).then((response: any) =>{ 
        const { message, success } = response;
        if (success) {
          Message.success(!editItem.id ? "添加成功" : "修改成功");
          this.setState({
            modalVisible: false,
            editItem: {}
          }, () => {
            this.listUsingGet();
          })
        } else {
          Message.error(message);
        }
      });
    });
  };

  render(){
    const { dataSource, editItem, departmentSelectOption, modalVisible } = this.state;
    const columns: any = [
      {
        title: '系统名称',
        dataIndex: 'systemName',
        width: 150,
        key: 'systemName',
      },
      {
        title: '生产网址',
        dataIndex: 'onlineUrl',
        width: 200,
        key: 'onlineUrl',
        render: (data: string, record: any) => {
          return (
            <a style={{ textDecoration: 'underline' }} target="_Blank" href={`http://${data}`}>{data}</a>
          )
        }
      },
      {
        title: '系统备注',
        dataIndex: 'systemRemark',
        width: 150,
        key: 'systemRemark',
      },
      {
        title: '测试网址',
        dataIndex: 'testUrl',
        width: 200,
        key: 'testUrl',
      },
      {
        title: '使用部门',
        dataIndex: 'dept',
        key: 'dept',
        width: 250,
        render: (data: any) => {
          return (data.map((item: any) => (
            <span style={{marginRight: 5}}>{item}</span>
          )))
        }
      },
      {
        title: '操作',
        dataIndex: 'operate',
        width: 250,
        key: 'operate',
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
      <div className="system-dependent">
        <div className="top-box">
          <Button type="primary" onClick={this.handleModalOpen.bind(this,{})}>新建</Button>
        </div>
        <div className="table-box">
          <Table dataSource={dataSource} pagination={false} columns={columns}/>
        </div>
        <AddOrEditModal 
          departmentSelectOption={departmentSelectOption} 
          editItem={editItem} 
          wrappedComponentRef={(form: any) => this.modalForm = form}
          visible={modalVisible}
          onOk={this.handleModalOk}
          onCancel={this.handleModalCancel}
        />
      </div>
    )
  }
}
