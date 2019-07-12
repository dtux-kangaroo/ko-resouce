import * as React from "react";
import { Input, Table,Modal } from "antd";
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
  visible:boolean
}
export default class ContentUser extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }

  state: IState = {
    visible:false,
    loading: true,
    pageNo: 1,
    pageSize: 10,
    total: 100,
    search: "",
    dataSource: []
  };
  componentDidMount() {
    const that = this;
    setTimeout(function(){
      that.setState({
        loading:false
      })
    },3000)
  }
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
        loading: true
      },
      () => {}
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
      () => {}
    );
  };
  onReset = () => {
    confirm({
      title: '重置操作',
      content: '是否将密码重置为“123456”？',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  onDelete = () => {
    confirm({
      title: '删除操作',
      content: '是否删除该用户？',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  onAddUser = () => {
    this.setState({
      visible:true
    })
  }
  handleOk = () => {
    this.setState({
      visible:false
    })
  }
  handleCancel = () => {
    this.setState({
      visible:false
    })
  }
  render() {
    const { pageNo, pageSize, loading, total, search } = this.state;
    const columns = [
      {
        title: "企业名称",
        dataIndex: "a1",
        key: "a1"
      },
      {
        title: "所属行业",
        dataIndex: "a2",
        key: "a2"
      },
      {
        title: "更新时间",
        dataIndex: "a3",
        key: "a3"
      },
      {
        title: "行业描述",
        key: "a4",
        dataIndex: "a4"
      }
    ];

    const data = [
      {
        key: "1",
        a1: "万科地产",
        a2: "地产",
        a3: "@dtstack.com",
        a4: "15251718978",
      },
      {
        key: "2",
        a1: "蓝光brc",
        a2: "地产",
        a3: "@dtstack.com",
        a4: "15251718978",
      }
    ];

    return (
      <div className="content_table_wrap">
        <div className="content_title">
          <Search
            placeholder="请输入企业名称"
            enterButton="搜索"
            value={search}
            className="search"
            onChange={this.onChangeSeach}
            onSearch={this.onHandelSearch}
          />
        </div>
        <Table
          className="table_wrap"
          loading={loading}
          onChange={this.onTableChange}
          columns={columns}
          dataSource={data}
          pagination={{
            current: pageNo,
            pageSize: pageSize,
            total: total,
            showSizeChanger:true, 
            showQuickJumper:true,
            hideOnSinglePage: true,
            showTotal: () => `总共 ${total}条`
          }}
        />
      </div>
    );
  }
}
