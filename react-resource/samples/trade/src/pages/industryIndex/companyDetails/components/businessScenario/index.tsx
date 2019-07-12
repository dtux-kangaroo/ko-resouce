import * as React from 'react';
import { Button, Icon, Collapse, List, Modal } from 'antd';
import  './style.scss';
import AddChildModalForm from './addChildModalForm';
import AddModalForm from './addModalForm';
import EditModalForm from './editModalForm';
import { API } from "@/api/index";
import { message as Message } from 'antd';

const Panel = Collapse.Panel;
const confirm = Modal.confirm;

interface IProps{
  history: any,
  entId: string,
  entName:string,
}

interface IState{
  addModalVisible: boolean,
  editModalVisible: boolean,
  addChildModalVisible: boolean,
  editItem: any,
  businessScenarioData: Array<any>,
}

export default class BusinessDcenario extends  React.Component<IProps, IState>  {
  constructor(props:any) {
    super(props);
  }

  editModalForm: any
  addModalForm: any
  addChildModalForm: any

  state:IState={
    addModalVisible: false,
    editModalVisible: false,
    addChildModalVisible: false,
    editItem: {},
    businessScenarioData: [],
  }

  componentDidMount () {
    if (this.props.entId) {
      this.senseTreeUsingGet();
    }
  }

  senseTreeUsingGet = () => { // 获取业务场景列表
    API.senseTreeUsingGet({
      entId: this.props.entId
    }).then((response: any) =>{ 
      const { message, success, data } = response;
      if (success) {
        this.setState({
          businessScenarioData: data
        })
      } else {
        Message.error(message);
      }
    });
  }

  handleViewClick = (item: any, e: any) => {
    const {id,title} = item
    const {entName,entId} = this.props;
    this.props.history.push(`/industry-index/business-scenario-detail`,{entName,entId,id,title})
    e.stopPropagation();
  }

  showModal = (type: string, item: any, e: any) => {
    switch (type) {
      case 'add':
        this.setState({
          addModalVisible: true,
        });
        e.stopPropagation();
        break;
      case 'edit':
        this.setState({
          editModalVisible: true,
          editItem: item
        });
        e.stopPropagation();
        break;
      case 'addChild':
        this.setState({
          addChildModalVisible: true,
          editItem: item
        });
        e.stopPropagation();
        break;
      default:;
    }
  };

  handleOk = (type: string) => {
    switch (type) {
      case 'add':
        this.addModalForm.props.form.validateFields((errors: any, values: any) => {
          if (errors) {
            console.log('errors', errors);
            return;
          }
          // 请求添加接口
          API.addSenseInfoUsingPost({
            entId: this.props.entId,
            sceneName: values.sceneName,
            targetValue: values.targetValue
          }).then((response: any) =>{ 
            const { message, success } = response;
            if (success) {
              this.setState({
                addModalVisible: false,
              });
              this.senseTreeUsingGet();
            } else {
              Message.error(message);
            }
          });
        });
        break;
      case 'edit':
        this.editModalForm.props.form.validateFields((errors: any, values: any) => {
          if (errors) {
            console.log('errors', errors);
            return;
          }
          // 请求编辑接口
          API.updateSenseUsingPost({
            senseId: this.state.editItem.id,
            sceneName: values.sceneName,
            targetValue: values.targetValue
          }).then((response: any) =>{ 
            const { message, success } = response;
            if (success) {
              this.setState({
                editModalVisible: false,
                editItem: {}
              });
              this.senseTreeUsingGet();
            } else {
              Message.error(message);
            }
          });
        });
        break;
      case 'addChild':
        this.addChildModalForm.props.form.validateFields((errors: any, values: any) => {
          if (errors) {
            console.log('errors', errors);
            return;
          }
          // 请求添加子业务接口
          API.addSenseInfoUsingPost({
            parentId: this.state.editItem.id,
            entId: this.props.entId,
            sceneName: values.sceneName,
            targetValue: values.targetValue
          }).then((response: any) =>{ 
            const { message, success } = response;
            if (success) {
              this.setState({
                addChildModalVisible: false,
                editItem: {}
              });
              this.senseTreeUsingGet();
            } else {
              Message.error(message);
            }
          });
        });
        break;
      default:;
    }
  };

  handleCancel = (type: string) => {
    switch (type) {
      case 'add':
        this.setState({
          addModalVisible: false,
        });
        break;
      case 'edit':
        this.setState({
          editModalVisible: false,
          editItem: {}
        });
        break;
      case 'addChild':
        this.setState({
          addChildModalVisible: false,
          editItem: {}
        });
        break;
      default:;
    }
  };

  handleDeleteClick = (item: any, e: any) => { // 请求删除业务场景
    e.stopPropagation();
    const _this = this;
    confirm({
      title: '是否确认删除该业务场景?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        API.deleteUsingPost_1({
          id: item.id
        }).then((response: any) =>{ 
          const { message, success } = response;
          if (success) {
            Message.success("删除成功");
            _this.senseTreeUsingGet();
          } else {
            Message.error(message);
          }
        });
      },
      onCancel() {
        
      },
    });
  }

  renderBSList = (list: any, level: number) => {
    return list.map((itemL: any, index: number) => {
      if (itemL.children && itemL.children.length > 0) {
        return (
          <Collapse bordered={false}>
            <Panel 
              header={
                <div className="panal-header" onClick={this.handleViewClick.bind(this,itemL)}>
                  <div className="panal-name">
                    <span style={{ fontSize: 18 }}>{itemL.title}</span>
                    <span>
                      <a href="javascript:;" onClick={this.handleViewClick.bind(this,itemL)}>查看</a>
                      <a href="javascript:;" style={{ marginLeft: 10 }} onClick={this.showModal.bind(this,'edit',itemL)}>编辑</a>
                      <a href="javascript:;" style={{ marginLeft: 10 }} onClick={this.handleDeleteClick.bind(this,itemL)}>删除</a>
                      {level < 3 && <a href="javascript:;" style={{ marginLeft: 10 }} onClick={this.showModal.bind(this,'addChild',itemL)}>增加子业务</a>}
                    </span>
                  </div>
                  <div className="panal-intro">{itemL.targetValue}</div>
                </div>
              }
              key="1" 
            >
              {this.renderBSList(itemL.children, level + 1)}
            </Panel>
          </Collapse>
        )
      } else {
        return (
          <List
            itemLayout="horizontal"
            dataSource={[itemL]}
            renderItem={(itemC: any) => (
              <List.Item>
                <div className="panal-header" style={{ padding: '0px 16px' }} onClick={this.handleViewClick.bind(this,itemC)}>
                  <div className="panal-name">
                    <span style={{ fontSize: 18 }}>{itemC.title}</span>
                    <span>
                      <a href="javascript:;" onClick={this.handleViewClick.bind(this,itemC)}>查看</a>
                      <a href="javascript:;" style={{ marginLeft: 10 }} onClick={this.showModal.bind(this,'edit',itemC)}>编辑</a>
                      <a href="javascript:;" style={{ marginLeft: 10 }} onClick={this.handleDeleteClick.bind(this,itemC)}>删除</a>
                      {level < 3 && <a href="javascript:;" style={{ marginLeft: 10 }} onClick={this.showModal.bind(this,'addChild',itemC)}>增加子业务</a>}
                    </span>
                  </div>
                  <div className="panal-intro">{itemC.targetValue}</div>
                </div>
              </List.Item>
            )}
          />
        )
      }
    })
    
    
  }

  render(){
    const { addModalVisible, editModalVisible, addChildModalVisible, editItem, businessScenarioData } = this.state;
    return (
      <div className="business-scenario">
        <div className="top-box">
          <Button type="primary" onClick={this.showModal.bind(this,'add',{})}><Icon type="plus" />添加</Button>
        </div>
        <div className="content-box">
          {this.renderBSList(businessScenarioData, 1)}
        </div>
        <Modal
          title="添加业务场景"
          visible={addModalVisible}
          onOk={this.handleOk.bind(this,'add')}
          onCancel={this.handleCancel.bind(this,'add')}
          width={700}
        >
          <AddModalForm key={addModalVisible ? '0' : '1'} wrappedComponentRef={(form: any) => this.addModalForm = form} />
        </Modal>
        <Modal
          title="编辑"
          visible={editModalVisible}
          onOk={this.handleOk.bind(this,'edit')}
          onCancel={this.handleCancel.bind(this,'edit')}
          width={700}
        >
          <EditModalForm key={editModalVisible ? '0' : '1'} wrappedComponentRef={(form: any) => this.editModalForm = form} editItem={editItem} />
        </Modal>
        <Modal
          title="增加子业务场景"
          visible={addChildModalVisible}
          onOk={this.handleOk.bind(this,'addChild')}
          onCancel={this.handleCancel.bind(this,'addChild')}
          width={700}
        >
          <AddChildModalForm key={addChildModalVisible ? '0' : '1'} wrappedComponentRef={(form: any) => this.addChildModalForm = form} />
        </Modal>
      </div>
    )
  }
}
