import * as React from 'react';
import { Button,message as Message  } from 'antd';
import  './style.scss';
import DragSortingTable from './dragSortingTable'
import AddOrEditModal from './addOrEditModal';
import { API } from "@/api/index";
// import Http from '@/utils/http';


interface IProps{
  entId: string,
  senseId:string,
}

interface IState{
  prototypeData: Array<any>,
  modalVisible: boolean,
  editItem: any,
}

export default class PrototypeShow extends  React.Component<IProps, IState>  {
  constructor(props:any) {
    super(props);
  }
  state:IState={
    prototypeData: [],
    modalVisible: false,
    editItem: {},
  }

  carouselRef: any
  modalForm: any

  componentDidMount () {
    if (this.props.senseId) {
      this.getPrototypeList();
    }
  }
  
  componentWillReceiveProps (nextProps) {
    if (nextProps.senseId != this.props.senseId) {
      this.getPrototypeList(nextProps.senseId);
    }
  }

  getPrototypeList = (id?: string) => { 
      const { senseId } = this.props;
      API.getImageListUsingGet({ scenedId: id? id : senseId }).then(res => {
        const { message, success, data } = res;
        if (success) {
          this.setState({
            prototypeData: data
          });
        } else {
          Message.error(message);
        }
      });
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

  handleModalOk = () => {
    this.onSyncFunc();
    this.handleModalCancel();
  }
  onSyncFunc = () => {
    this.getPrototypeList()
  }
  render(){
    const { prototypeData, modalVisible, editItem } = this.state;
    const { senseId } = this.props;
    return (
      <div className="prototype-show">
        <div className="top-box">
          <span className="title">原型展示</span>
          <div className="btns">
            <Button type="primary" onClick={this.handleModalOpen.bind(this,{})} style={{ marginLeft: 10 }}>图片导入</Button>
          </div>
        </div>
        <div className="ps-content">
          <DragSortingTable sceneId={senseId} handleOpenModal={this.handleModalOpen} onSyncFunc={this.onSyncFunc} prototypeData={prototypeData} />
        </div>
        <AddOrEditModal
          senseId={senseId}
          editItem={editItem} 
          visible={modalVisible}
          onCancel={this.handleModalCancel}
          onOk={this.handleModalOk}
          wrappedComponentRef={(form: any) => this.modalForm = form}
        />
      </div>
    )
  }
}
