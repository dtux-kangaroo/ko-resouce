import * as React from 'react';
import { Layout, Menu,Icon} from 'antd';
import { Link,NavLink } from "react-router-dom";
import SelfMenu from '@/components/selfMenu/index';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
declare var  frontConf
import './style.scss';
interface IProps {
  topNav:any,
  location:any,
  userData:any,
  history:any,
  syncFunc:Function
}
interface IState{
  loading:boolean
}
export default class TopBar extends React.Component<IProps,IState> {
  render() {
    const { topNav, location ,userData} = this.props;
    let menuKeys=location.pathname.split('/');
    const topMenu=(
      <Menu  mode="horizontal"
        theme="dark"
        selectedKeys={[`/${menuKeys[1]}`,menuKeys.join('/')]}
        style={{ verticalAlign: 'middle',lineHeight: '47px'}} >
        {topNav.length?
          topNav.map((item,idx)=>(
            item.children.length?
          <SubMenu title={<span>{item.permissionName}&nbsp;<Icon type="down" /></span> }>
           { item.children.map((child,kc)=>(
              <Menu.Item key={child.permissionUrl}>  
                <NavLink to={child.permissionUrl}>{child.permissionName}</NavLink>
                testsss
              </Menu.Item>
            ))}
            </SubMenu>
            :
            <Menu.Item key={item.permissionUrl}>  
              <NavLink to={item.permissionUrl}>{item.permissionName}</NavLink>
            </Menu.Item>
          )):<Icon type="appstore" />
        }
    </Menu>
    );
    return <Header className="top-bar">
      <div className="logo">
        <Link to="/industry-index/company-manage">
          <img src={ frontConf.COMPANY_LOGO } alt="logo"/>
        </Link>
      </div>
      <div className="fl top-bar-nav">
       {topMenu}
      </div>
      <div className="fr top-bar-right">
        <SelfMenu location={this.props.location} syncFunc={this.props.syncFunc} history={this.props.history} userData={userData}/>
      </div>
    </Header>
  }
}
