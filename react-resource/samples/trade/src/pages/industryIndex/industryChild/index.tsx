import * as React from 'react';
import  './style.scss';
import {Icon} from 'antd';
import TableWrap from './tableWrap';

interface IProps{
  history:any
}

interface IState{
  
}

export default class IndustryChild extends  React.Component<IProps, IState>  {
  constructor(props:any) {
    super(props);
  }

  state:IState={
    
  }

  componentDidMount () {
    
  }
  goBack = () => {
    this.props.history.goBack();
  }
  render(){
    return (
      <div className="industry-child">
        <div className="header_wrap">
          <div className="title_text">行业列表/<span className="sub">房地产</span></div>
          <div className="back_wrap" onClick={this.goBack}><Icon type="left" />返回上一级</div>
       </div>
       <div className="content_wrap">
          <TableWrap/>
       </div>
      </div>
    )
  }
}
