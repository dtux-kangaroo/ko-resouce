import * as React from 'react';
import { Breadcrumb, Icon, Button, Tabs, Modal } from 'antd';
import { Link } from "react-router-dom";
import  './style.scss';
import EditModalForm from './components/editModalForm';
import SystemDependent from './components/systemDependent';
import BusinessIndicators from './components/businessIndicators';
import BusinessScenario from './components/businessScenario';
import BusinessFrame from './components/businessFrame';
import { API } from "@/api/index";
import { message as Message } from 'antd';
const { TabPane } = Tabs;

interface IProps{
  history: any,
  location: any,
}

interface IState{
  modalVisible: boolean,
  // 基本信息
  entId: string,
  entName: string,
  entRemark: string,
  industryName: string,
  
}

export default class CompanyDetails extends  React.Component<IProps, IState>  {
  constructor(props:any) {
    super(props);
  }
  
  editModalForm: any

  state:IState={
    modalVisible: false,
    // 基本信息
    entId: '',
    entName: '',
    entRemark: '',
    industryName: '',
  }

  componentDidMount () {
    this.setState({
      entId: this.props.location.search.split('=')[1]
    }, () => {
      this.getEntInfoUsingGet();
    })
  }

  getEntInfoUsingGet = () => { // 获取企业详细信息
    API.getEntInfoUsingGet({
      entId: this.state.entId
    }).then((response: any) =>{ 
      const { message, success, data } = response;
      if (success) {
        this.setState({
          entName: data ? data.entName : '',
          entRemark: data ? data.entRemark : '',
          industryName: data ? data.industryName : '',
        })
      } else {
        Message.error(message);
      }
    });
  }

  handleGoBack = () => {
    this.props.history.push('/industry-index/company-manage');
  }

  handleTabChange = (key: any) => {
    
  }

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleOk = () => {
    this.editModalForm.props.form.validateFields((errors: any, values: any) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      API.editUsingPost({
        entId: this.state.entId,
        entName: values.entName,
        entRemark: values.entRemark,
      }).then((response: any) =>{ 
        const { message, success} = response;
        if (success) {
          this.setState({
            modalVisible: false,
          });
          this.getEntInfoUsingGet();
        } else {
          Message.error(message);
        }
      });
      
      this.setState({
        modalVisible: false,
      });
    });
  };

  handleCancel = ()=> {
    this.setState({
      modalVisible: false,
    });
  };

  render(){
    const { history } = this.props;
    const { modalVisible, entId, entName, entRemark, industryName } = this.state;
    const tabOption: Array<any> = [{
      title: '业务场景',
      key: 0,
      content: <BusinessScenario key={entId} entName={entName}  entId={entId} history={history} />
    }, {
      title: '业务指标',
      key: 1,
      content: <BusinessIndicators key={entId} entId={entId} />
    }, {
      title: '业务框架',
      key: 2,
      content: <BusinessFrame key={entId} entId={entId}/>
    }, {
      title: '系统依赖',
      key: 3,
      content: <SystemDependent key={entId} entId={entId} />
    }];
    return (
      <div className="company-details">
        <div className="header">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/industry-index/company-manage">企业首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{entName}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="back-btn" onClick={this.handleGoBack}>
            <Icon type="left" />
            <span style={{ marginLeft: 5 }}>返回</span>
          </div>
        </div>
        <div className="base-infor">
          <div className="infor">
            <div className="title">
              {entName}
              <span style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.447)', marginLeft: 20 }}>所属行业：{industryName}</span>
            </div>
            <div className="introduce">
              {entRemark}
            </div>
          </div>
          <Button onClick={this.showModal} style={{ marginTop: 10 }} type="primary">编辑</Button>
        </div>
        <Tabs style={{ padding: '0px 20px', marginTop: '-43px' }} defaultActiveKey="0" onChange={this.handleTabChange}>
          {tabOption.map((item: any) => (
            <TabPane tab={item.title} key={item.key}>{item.content}</TabPane>
          ))}
        </Tabs>
        <Modal
          title="修改"
          visible={modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={700}
        >
          <EditModalForm 
            key={modalVisible ? '0' : '1'} 
            wrappedComponentRef={(form: any) => this.editModalForm = form} 
            detailInfor={{
              entName: entName,
              entRemark: entRemark
            }}
          />
        </Modal>
      </div>
    )
  }
}
