import * as React from 'react';
import { Breadcrumb, Icon,message as Message } from 'antd';
import  './style.scss';
import UseDepartment from './components/useDepartment';
import SystemSupport from './components/systemSupport';
import ModuleValue from './components/moduleValue';
import ChildModule from './components/childModule';
import SceneIndicators from './components/sceneIndicators';
import PrototypeShow from './components/prototypeShow';
import {API} from '@/api';

interface IProps{
  location: any,
  history: any,
}

interface IState{
  senseId: string,
  entId:string,
  entName:string,
  title:string,
  deptTags:Array<any>,
  senseNamesVos:Array<any>,
  systemTags:Array<any>,
  targetValue: string,
  indexLocation: Array<any>,
}

export default class BusinessScenarioDetail extends  React.Component<IProps, IState>  {
  constructor(props:any) {
    super(props);
  }

  state:IState={
    senseId:'',
    entId:'',
    entName:'',
    title:'',
    deptTags:[],
    senseNamesVos:[],
    systemTags:[],
    targetValue: '',
    indexLocation: []
  }

  componentDidMount () {
    const { location } = this.props;
    const { id,entId,entName,title } = location.state;
    this.setState({
      senseId:id,
      entId,
      entName,
      title 
    })
    this.getSenseInfoUsingGet(location.state.id);
  }
  componentWillReceiveProps(nextProps){
    const { location } = nextProps;
    const { id,entId,entName,title } = location.state;
    if(id!==this.props.location.state.id){
      this.setState({
        senseId:id,
        entId,
        entName,
        title 
      })
      this.getSenseInfoUsingGet(location.state.id);
    }
    
  }
  getSenseInfoUsingGet = (senseId) => {
    API.getSenseInfoUsingGet({senseId}).then(res=>{
      const {message,success,data} = res;
      if(success){
        this.setState({
          "deptTags":data.deptTags,
          "senseNamesVos":data.senseNamesVos,
          "systemTags":data.systemTags,
          "targetValue": data.targetValue,
          indexLocation: data.indexLocation
        })
      }else{
        Message.error(message)
      }
    })
  }
  handleGoBack = () => {
    this.props.history.goBack();
  }
  onSyncFunc = () => {
    const {senseId} = this.state;
    this.getSenseInfoUsingGet(senseId);
  }
  render () {
    const {history,location} = this.props;
    const { entId,id } = location.state;
    const { senseId,entName,title,deptTags,targetValue,senseNamesVos,systemTags, indexLocation } = this.state;
    return (
      <div className="business-scenario-detail">
        <div className="header">
          <Breadcrumb>
            <Breadcrumb.Item>
              <a onClick={()=>{this.props.history.push('/industry-index/company-manage')}}>企业首页</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item >
              <a onClick={()=>{this.props.history.push(`/industry-index/company-details?id=`+entId)}}>{entName}</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{title}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="back-btn" onClick={this.handleGoBack}>
            <Icon type="left" />
            <span style={{ marginLeft: 5 }}>返回</span>
          </div>
        </div>
        <div className="content-box">
          <UseDepartment data={deptTags} senseId={senseId} entId={entId} onSyncFunc={this.onSyncFunc}/>
          <ModuleValue  data={targetValue} senseId={senseId} entId={entId} onSyncFunc={this.onSyncFunc}/>
          <ChildModule data={senseNamesVos} history={history} entId={entId} entName={entName}/>
          <SystemSupport data={systemTags} senseId={senseId} entId={entId} onSyncFunc={this.onSyncFunc}/>
          <SceneIndicators entId={entId} senseId={senseId} indexLocation={indexLocation} />
          <PrototypeShow entId={entId} senseId={id}/>
        </div>
      </div>
    )
  }
}
