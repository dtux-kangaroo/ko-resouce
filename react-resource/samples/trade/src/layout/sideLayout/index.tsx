import * as React from 'react';
import { Layout } from "antd";
import { connect } from "react-redux";
import SideBar from "./sideBar";
import TopBar from "./topBar";
import * as global from "pages/global/action";
import ErrorBoundary from '@/components/ErrorBoundary';
import { bindActionCreators } from "redux";
import './style.scss';

interface IProps {
  getNavData:(params:any) => void,
  getUserData:(params:any) => void,
  userData:any,
  navData:{
    topNav:Array<string>,
    sideNav:Array<string>,
  },
  location:any,
  history:any
}
interface IState{
  loading:boolean
}
@connect(
  state => ({ ...state.global }),
  dispatch => bindActionCreators({ ...global }, dispatch)
)
export default class MainLayout extends React.Component<IProps,IState> {
  constructor(IProps:any) {
    super(IProps);
  }
  state:IState={
    loading:false
}
  componentDidMount() {
    this.props.getNavData({});
    this.props.getUserData({});
  }
  componentWillReceiveProps(nextProps) {}


  render() {
    const {  navData, location, history, userData } = this.props;
    return (
      <Layout className="side-layout" style={{minHeight:'100vh'}}>
        <ErrorBoundary>
          <TopBar location={location} history={history} topNav={navData.topNav} syncFunc={()=>this.props.getUserData({})} userData={userData}/>
          <Layout>
            <SideBar location={location} history={history} navData={navData.sideNav}/>
            <Layout>
              <div className="content">{this.props.children}</div>
              {/* <Foot/> */}
            </Layout>
          </Layout>
        </ErrorBoundary>
      </Layout>
    );
  }
}
