import * as React from 'react';
import { Icon} from 'antd';
import ContentUser from './components/contentUser';
import  './style.scss';


interface IProps{

}

interface IState{
  nowKey:number
}

export default class UserManage extends  React.Component<IProps, IState>  {
  constructor(props:any) {
    super(props);
  }

  state:IState={
    nowKey:Date.now()
  }

  componentDidMount () {
    
  }
  onReload = () => {
    this.setState({
      nowKey:Date.now()
    })
  }
  render(){
    const {nowKey} = this.state;
     return (
      <div className="user-manage">
        <div className="header_reLoad">
          <div className="title_text">成员管理</div>
          <div className="reload_btn" onClick={this.onReload}><Icon type="sync" className="reload" />刷新</div>
        </div>
        <ContentUser key={nowKey}/>
      </div>
    )
  }
}
