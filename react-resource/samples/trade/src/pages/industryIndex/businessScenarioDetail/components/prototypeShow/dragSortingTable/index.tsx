import * as React from "react";
import { Table, Modal,message as Message } from "antd";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from "immutability-helper";
import ReactViewer from '../reactViewer';
import BodyRow from '@/components/bodyRow/index';

import { API } from "@/api/index";

import "./style.scss";

const confirm = Modal.confirm;

interface IProps {
  prototypeData: Array<any>,
  handleOpenModal: any,
  onSyncFunc:Function,
  sceneId:string,
  [propName: string]: any;
}

interface IState {
  loading: boolean;
  data: any;
  visible: boolean,
  activeIndex:number,
}
class DragSortingTable extends React.PureComponent<IProps, IState> {
  state = {
    loading: true,
    data: [],
    visible: false,
    activeIndex:0,
  };
  componentWillReceiveProps(nextProps) {
    const { prototypeData }= nextProps;
    if(prototypeData!==this.props.prototypeData){
      this.setState({
        data: prototypeData,
        loading:false
      });
    }
  }
  sortTradeList = data => {
    API.sortUsingPost_1({
      prcIds: data.map(item => item.prcId),
      sceneId:this.props.sceneId
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

  handleEditClick = (item: any) => {
    this.props.handleOpenModal(item);
  }

  handleDeleteClick = (prcId: any) => {
    const that= this;
    confirm({
      title: '是否确认删除该原型图？',
      onOk() {
        API.deletedPrcUsingPost({ prcId }).then(res => {
          const { message, success } = res;
          if (success) {
            Message.success('删除成功！');
            that.props.onSyncFunc()
          } else {
            Message.error(message);
          }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  handleViewImg = (record,index) => {
    this.setState({
      visible:true,
      activeIndex:index
    })
  }
  onCancel = () => {
    this.setState({
      visible:false
    })
  }
  render() {
    const { data, loading,visible ,activeIndex} = this.state;
    const columns = [
      {
        title: '序号',
        dataIndex: 'no',
        key: 'no',
        render:(value,record,index)=>index+1,
        width: 100
      },
      {
        title: '名称',
        dataIndex: 'prcName',
        key: 'prcName',
      },
      {
        title: '时间',
        dataIndex: 'createAt',
        key: 'createAt',
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (data: any, record: any,index) => {
          return (
            <span className="operate_btn_wrap">
              <a href="javascript:;" onClick={this.handleEditClick.bind(this,record)}>编辑</a>
              <a href="javascript:;" onClick={() => { this.handleViewImg(record,index); }}>预览</a>
              <a href="javascript:;" onClick={this.handleDeleteClick.bind(this,record.prcId)}>删除</a>
            </span>
          )
        }
      }
    ];
    return (
      <div>
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
      <ReactViewer activeIndex={activeIndex} visible={visible} onCancel={this.onCancel} data={data}/>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(DragSortingTable);
