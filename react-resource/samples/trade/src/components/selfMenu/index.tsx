import * as React from "react";
import { Menu, Dropdown, Avatar, message as Message } from "antd";
import SelfMessage from "./components/selfMessage";
import SelfPassword from "./components/selfPassword";
import { API } from "@/api";

const defaultAvatar = "/assets/imgs/self.png";
interface IProps {
  location: any;
  history: any;
  userData?: any;
  syncFunc:Function;
}
interface IState {
  menukey: string;
  visibleSelf: boolean;
  visiblePassword: boolean;
  [propName: string]: any;
}
export default class SelfMenu extends React.PureComponent<IProps, IState> {
  state: IState = {
    menukey: "",
    visibleSelf: false,
    visiblePassword: false
  };
  logout = () => {
    //调用推出接口，
    API.logoutUsingPost({}).then(res => {
      const { message, success } = res;
      if (success) {
        this.props.history.push("/login");
      } else {
        Message.error(message);
      }
    });
  };
  onClickMenuItem = ({ item, key, keyPath, domEvent }) => {
    switch (key) {
      case "1":
        this.setState({
          visibleSelf: true,
          visiblePassword: false,
          menukey: key
        });
        break;
      case "2":
        this.setState({
          visibleSelf: false,
          visiblePassword: true,
          menukey: key
        });
        break;
      case "3":
        this.logout();
        break;
      default:
    }
  };
  handleOk = key => {
    if(key=='visibleSelf'){
      this.props.syncFunc();
    }else{
      this.logout();
    }
    this.setState({
      [key]: false
    });
  };
  handleCancel = key => {
    this.setState({
      [key]: false
    });
  };
  render() {
    const { visibleSelf, visiblePassword } = this.state;
    const { userData } = this.props;
    const menu = (
      <Menu onClick={this.onClickMenuItem}>
        <Menu.Item key="1">修改个人信息</Menu.Item>
        <Menu.Item key="2">修改密码</Menu.Item>
        <Menu.Item key="3">退出登陆</Menu.Item>
      </Menu>
    );
    return (
      <React.Fragment>
        <Dropdown overlay={menu}>
          <div className="right user-moudle" style={{ height: 52 }}>
            <Avatar icon="user" src={userData.avatar ? userData.avatar: defaultAvatar} />
            <span className="name"> {userData.nickname}</span>
          </div>
        </Dropdown>
        <SelfMessage
          visible={visibleSelf}
          data={userData}
          handleOk={() => this.handleOk("visibleSelf")}
          handleCancel={() => this.handleCancel("visibleSelf")}
        />
        <SelfPassword
          visible={visiblePassword}
          data={userData}
          handleOk={() => this.handleOk("visiblePassword")}
          handleCancel={() => this.handleCancel("visiblePassword")}
        />
      </React.Fragment>
    );
  }
}
