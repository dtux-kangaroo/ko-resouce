import * as React from "react";
import { Input, Button, Table, Switch, Modal, message as Message } from "antd";
import AddUser from "../addUser";
import { API } from "@/api";
import "./style.scss";

const { Search } = Input;
const confirm = Modal.confirm;

interface IProps {}

interface IState {
  loading: boolean;
  pageNo: number;
  pageSize: number;
  total: number;
  search: string;
  dataSource: any;
  visible: boolean;
}
export default class ContentUser extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }

  state: IState = {
    visible: false,
    loading: true,
    pageNo: 1,
    pageSize: 10,
    total: 100,
    search: "",
    dataSource: []
  };
  componentDidMount() {
    this.listUsersUsingPost();
  }
  listUsersUsingPost = () => {
    const { pageNo, pageSize, search } = this.state;
    const params = { pageNo, pageSize, search };
    API.listUsersUsingPost(params).then(res => {
      const { data, message, success } = res;
      if (success) {
        this.setState({
          dataSource: data.contentList,
          total: data.total,
          loading: false
        });
      } else {
        Message.error(message);
      }
    });
  };
  isUseUsingGet = id => {
    API.isUseUsingGet({id}).then(res => {
      const { message, success } = res;
      if (success) {
        this.listUsersUsingPost();
      } else {
        Message.error(message);
      }
    });
  };
  onChangeSeach = e => {
    const value = e.target.value;
    this.setState({
      search: value
    });
  };
  onHandelSearch = value => {
    this.setState(
      {
        search: value,
        pageNo:1,
        loading: true
      },
      () => {
        this.listUsersUsingPost();
      }
    );
  };
  onTableChange = (pagination, filters, sorter) => {
    const { current, pageSize } = pagination;
    this.setState(
      {
        pageNo: current,
        pageSize: pageSize,
        loading: true
      },
      () => {
        this.listUsersUsingPost();
      }
    );
  };
  onReset = (id) => {
    const that = this;
    confirm({
      title: "重置操作",
      content: "是否将密码重置为“123456”？",
      onOk() {
        API.resetPasswordUsingGet({
          id
        }).then(res=>{
          const {message,success} = res;
          if(success){
            that.setState({
              loading:true
            })
            that.listUsersUsingPost()
          }else{
            Message.error(message)
          }
      })
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };
  onDelete = (id) => {
    const that = this;
    confirm({
      title: "删除操作",
      content: "是否删除该用户？",
      onOk() {
        API.deleteUsingGet_1({
          id
        }).then(res=>{
          const {message,success} = res;
          if(success){
            that.setState({
              loading:true
            })
            that.listUsersUsingPost()
          }else{
            Message.error(message)
          }
      })
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };
  onAddUser = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = () => {
    this.listUsersUsingPost();
    this.setState({
      visible: false
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    const {
      pageNo,
      pageSize,
      loading,
      total,
      search,
      visible,
      dataSource
    } = this.state;
    const columns = [
      {
        title: "成员账号",
        dataIndex: "account",
        key: "account"
      },
      {
        title: "姓名",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "邮箱号",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "手机号",
        key: "phone",
        dataIndex: "phone"
      },
      {
        title: "最后登陆时间",
        dataIndex: "loginTime",
        key: "loginTime"
      },
      {
        title: "是否启用",
        dataIndex: "status",
        key: "status",
        render: (status,record) => (
          <Switch
            defaultChecked={status ? false : true}
            onChange={e => {
              this.isUseUsingGet(record.id)
            }}
          />
        )
      },
      {
        title: "操作",
        dataIndex: "id",
        key: "id",
        render: (id, record) => {
          return (
            <div className="operate_btn_wrap">
              <a onClick={() => this.onReset(id)}>重置</a>
              <a onClick={() => this.onDelete(id)}>删除</a>
            </div>
          );
        }
      }
    ];
    return (
      <div className="content_user">
        <div className="content_title">
          <Search
            placeholder="请输入账号/姓名"
            enterButton="搜索"
            value={search}
            className="search"
            onChange={this.onChangeSeach}
            onSearch={this.onHandelSearch}
          />
          <Button type="primary" onClick={this.onAddUser}>
            添加
          </Button>
        </div>
        <Table
          className="table_wrap"
          loading={loading}
          onChange={this.onTableChange}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            current: pageNo,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            showQuickJumper: true,
            hideOnSinglePage: true,
            showTotal: () => `总共 ${total}条`
          }}
        />
        <AddUser
          visible={visible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
      </div>
    );
  }
}
