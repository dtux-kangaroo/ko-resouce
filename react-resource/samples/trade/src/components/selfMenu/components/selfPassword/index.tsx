import * as React from "react";
import { Modal, Input, Form,message as Message } from "antd";
import { FormComponentProps } from 'antd/lib/form';
import {API} from '@/api';

import "./style.scss";

interface IProps extends FormComponentProps{
  visible: boolean;
  handleOk: Function;
  handleCancel: Function;
  data:any,
  form: any;
}
interface IState {
  
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
};
class SelfPassword extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }
  state: IState = {
    
  };

  componentWillReceiveProps(nextProps) {
    const {visible,data} = nextProps;
    if(visible&&visible!=this.props.visible){
      this.props.form.setFieldsValue(data)
    }
  }
  handleOk = e => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }else{
        const {newPwd,oldPwd} = fieldsValue;
        API.updatePwdUsingPost({
          newPwd,
          oldPwd,
          userId:this.props.data.userId,
        }).then(res => {
          const { message, success } = res;
          if (success) {
            Message.success('修改密码成功，请重新登陆！');
            this.props.form.resetFields();
            this.props.handleOk();
          } else {
            Message.error(message);
          }
        });
      }
  })
  };
  handleConfirmPassword = (rule, value, callback) => {
    const { getFieldValue } = this.props.form
    if (value && value !== getFieldValue('password')) {
        callback('两次输入不一致！')
    }
    callback()
}
  handleCancel = e => {
    this.props.form.resetFields();
    this.props.handleCancel();
  };
  render() {
    const { visible } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="selfPassword">
        <Modal
          title="修改密码"
          width={520}
          maskClosable={false}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form.Item {...formItemLayout} label="账号">
            {getFieldDecorator("account", {
              rules: [
                {
                  required: true,
                  message: "请输入账号"
                }
              ]
            })(<Input disabled placeholder="请输入账号" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="原密码">
            {getFieldDecorator("oldPwd", {
              rules: [
                {
                  required: true,
                  message: "请输入原密码"
                }
              ]
            })(<Input type="password" placeholder="请输入原密码" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="登陆密码">
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "请输入密码"
                }
              ]
            })(<Input type="password" placeholder="请输入密码" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="确认密码">
            {getFieldDecorator("newPwd", {
              rules: [
                {
                  required: true,
                  message: "请输入密码"
                },
                {
                  validator: this.handleConfirmPassword
                }
              ]
            })(<Input type="password" placeholder="请输入密码" />)}
          </Form.Item>
        </Modal>
      </div>
    );
  }
}
 const HocPassword =Form.create<IProps>()(SelfPassword);
 export default HocPassword;
