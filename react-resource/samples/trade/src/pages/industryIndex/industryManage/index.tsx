import * as React from 'react';
import  './style.scss';
import DragSortingTable from './components/dragSortingTable';

interface IProps{
  history?:any
}

interface IState{

}

export default class IndustryManage extends  React.Component<IProps, IState>  {
  constructor(props:any) {
    super(props);
  }

  state:IState={

  }

  componentDidMount () {
    
  }
  render(){
    return (
      <div className="industry-manage">
        <div className="header_wrap">
          行业列表
       </div>
       <div className="content_wrap">
          <DragSortingTable history={this.props.history}/>
       </div>
      </div>
    )
  }
}
