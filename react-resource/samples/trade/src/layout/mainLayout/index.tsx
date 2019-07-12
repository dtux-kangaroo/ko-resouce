import * as React from 'react';
import { Layout } from "antd";
import { connect } from "react-redux";
import TopBar from "./topBar/index";
import * as global from "pages/global/action";
import ErrorBoundary from '@/components/ErrorBoundary';

import { bindActionCreators } from "redux";
import './style.scss';
interface IProps {
  getNavData:(params:any) => void,
  getUserData:(params:any) => void,
  navData:{
    topNav:Array<string>
  },
  userData:any,
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
  componentWillReceiveProps(nextProps) {
   console.log(nextProps);
  }
  render() {
    const {  navData, location,history,userData } = this.props;
    return (
       <Layout className="main-layout">
       <ErrorBoundary>
        <TopBar location={location} history={history} topNav={navData.topNav} userData={userData} syncFunc={()=>this.props.getUserData({})}/>
        <Layout className="top-layout">
          <Layout>
            <div className="content">{this.props.children}</div>
            {/* {loading?'state':'nostate'} */}
          </Layout>
        </Layout>
        </ErrorBoundary>
      </Layout>
    );
  }
}
