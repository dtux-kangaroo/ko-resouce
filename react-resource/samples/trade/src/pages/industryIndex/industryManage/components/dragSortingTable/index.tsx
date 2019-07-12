import * as React from "react";
import { Table, Modal, Button, message as Message } from "antd";
import { DragDropContext} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from "immutability-helper";
import AddTrade from "../addTrade";
import BodyRow from '@/components/bodyRow/index';
import { API } from "@/api";
import "./style.scss";

const confirm = Modal.confirm;

interface IProps {
  history: any;
  [propName: string]: any;
}

interface IState {
  loading: boolean;
  data: any;
  title: string;
  visible: boolean;
  editData: editData;
}
interface editData {
  id?: number;
  industryName?: string;
  industryRemark?: string;
}

class DragSortingTable extends React.PureComponent<IProps, IState> {
  state = {
    loading: true,
    visible: false,
    title: "添加成员",
    editData: {},
    data: []
  };
  componentDidMount() {
    this.getTradeList();
  }
  getTradeList = () => {
    API.listUsingGet_1({}).then(res => {
      const { data, message, success } = res;
      if (success) {
        this.setState({
          data: data,
          loading: false
        });
      } else {
        Message.error(message);
      }
    });
  };
  onLook = id => {
    this.props.history.push("/industry-index/company-manage", { id: id });
  };
  onEditTrade = record => {
    this.setState({
      title: "编辑行业",
      visible: true,
      editData: record
    });
  };
  onDelete = id => {
    const that = this;
    confirm({
      title: "确认删除此行业吗？",
      content:
        "删除后行业中的业务场景、关联企业也将无法查看。但行业下的企业实体不会被删除",
      onOk() {
        API.deleteUsingGet({
          id
        }).then(res => {
          const { message, success } = res;
          if (success) {
            that.setState({
              loading: true
            });
            that.getTradeList();
          } else {
            Message.error(message);
          }
        });
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };
  sortTradeList = data => {
    API.sortUsingPost({
      idList: data.map(item => item.id)
    }).then(res => {
      const { message, success } = res;
      if (success) {
        this.setState({
          data: data
        });
        Message.success("排序成功");
      } else {
        Message.error(message);
      }
    });
  };
  moveRow = (dragIndex, hoverIndex) => {
    const { data } = this.state;
    const dragRow = data[dragIndex];
    const newData = update(this.state, {
      data: {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]]
      }
    });
    this.sortTradeList(newData.data);
  };
  onAddTrade = () => {
    this.setState({
      visible: true,
      title: "添加成员"
    });
  };
  handleOk = () => {
    this.setState({
      visible: false,
      loading: true
    });
    this.getTradeList();
  };
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    const { data, loading, visible, title, editData } = this.state;
    const columns = [
      {
        title: "序号",
        dataIndex: "sortNumber",
        key: "sortNumber",
        render: (value, record, index) => {
          return index + 1;
        }
      },
      {
        title: "行业名称",
        dataIndex: "industryName",
        key: "industryName"
      },
      {
        title: "企业数量",
        dataIndex: "entCount",
        key: "entCount"
      },
      {
        title: "行业描述",
        key: "industryRemark",
        dataIndex: "industryRemark"
      },
      {
        title: "操作",
        dataIndex: "id",
        key: "id",
        render: (value, record) => {
          return (
            <div className="operate_btn_wrap">
              <a onClick={() => this.onLook(value)}>查看</a>
              <a onClick={() => this.onEditTrade(record)}>编辑</a>
              <a onClick={() => this.onDelete(value)}>删除</a>
            </div>
          );
        }
      }
    ];
    return (
      <div>
        <Button type="primary" onClick={this.onAddTrade}>
          新增行业
        </Button>
        <Table
          className="table_draggable_wrap"
          columns={columns}
          components={{
            body: {
              row: BodyRow
            }
          }}
          loading={loading}
          dataSource={data}
          pagination={false}
          onRow={(record, index) => ({
            index,
            moveRow: this.moveRow
          })}
        />
        <AddTrade
          title={title}
          data={editData}
          visible={visible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(DragSortingTable);
