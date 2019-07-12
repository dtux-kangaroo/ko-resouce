import * as React from "react";
import { Modal, Input, Form, Upload, message as Message, Icon } from "antd";
import { FormComponentProps } from 'antd/lib/form';
import Http from '@/utils/http';
import {URL} from '@/api';
import "./style.scss";

interface IProps extends FormComponentProps{
  visible: boolean;
  handleOk: Function;
  handleCancel: Function;
  data:any,
  form: any;
}
interface IState {
  loading: boolean;
  fileList: any,
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
class SelfMessage extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }
  state: IState = {
    loading: false,
    fileList:[]
  };
  componentWillReceiveProps(nextProps) {
    const {visible,data} = nextProps;
    if(visible&&visible!=this.props.visible){
      const initFileList = [
        {
          uid: '-1',
          name: '头像.png',
          status: 'done',
          url: this.props.data.avatar,
        },
      ]
      this.setState({
        fileList:initFileList ,
      });
      this.props.form.setFieldsValue(Object.assign({},data,{file:initFileList}));
    }
  }
  handleOk = e => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }else{
          const {phone,email,nickname} = fieldsValue;
          const { fileList } = this.state;
          let newFile = '';
          let oldAvatar = '';
          // if (file && file.length > 0) {
          //   if  (file[0].uid!='-1') {
          //     newFile = file[0].originFileObj;
          //   }  else {
          //     oldAvatar = file[0].url;
          //   }
          // }
          if (fileList && fileList.length > 0) {
            if  (fileList[0].uid!='-1') {
              newFile = fileList[0];
            }  else {
              oldAvatar = fileList[0].url;
            }
          }
          const params = {
            id:this.props.data.userId,
            phone,
            email,
            file:newFile,
            nickName:nickname,
            userAvatar:oldAvatar
          }
          fieldsValue.id = this.props.data.userId;
          Http.postForm(URL.updateUserUsingPost,params,{}).then(res=>{
            const {message,success} = res;
            if(success){
              Message.success('修改成功！');
              this.props.form.resetFields();
               this.props.handleOk();
            }else{
              Message.error(message);
              
            }
          })

      }
  })
  };
  handleCancel = e => {
    this.props.form.resetFields();
    this.props.handleCancel();
  };
  // normFile = e => {
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e && e.fileList;
  // };
  normFile = (e: any) => {
    if (e.fileList.length == 0) {
      return e.fileList
    }
    let flg: boolean = this.beforeUpload(e.file);
    if (flg) {
      this.setState(state => ({
        fileList: [e.file],
      }));
      return e && e.fileList;
    } else {
      return []
    }
  };
  onRemove = (file) => {
    this.setState(state => {
      const index = state.fileList.indexOf(file);
      const newFileList = state.fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList,
      };
    });
  }
  // beforeUpload = file => {
  //   if (!/.(gif|jpg|jpeg|png|gif|jpg|png)$/.test(file.name)) {
  //     Message.error("图片类型必须是.gif,jpeg,jpg,png中的一种!");
  //     return false;
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     Message.error("Image must smaller than 2MB!");
  //   }else{
  //     this.setState(state => ({
  //       fileList: [...state.fileList, file],
  //     }));
  //   }
  //   return false;
  // };
  beforeUpload = (file: any) => {
    const isJPG = /.(gif|jpg|jpeg|png|gif|jpg|png)$/.test(file.name);
    if (!isJPG) {
      Message.error('图片类型必须是.gif,jpeg,jpg,png中的一种!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Message.error('图片大小不可超过2MB!');
    }
    return isJPG && isLt2M;
  };
  render() {
    const { visible ,form} = this.props;
    const {fileList} = this.state;
    const { getFieldDecorator } = form;
    return (
      <div className="addUser">
        <Modal
          title="修改个人信息"
          width={600}
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
          <Form.Item {...formItemLayout} label="账号昵称">
            {getFieldDecorator("nickname", {
              rules: [
                {
                  required: false,
                  message: "请输入账号昵称"
                }
              ]
            })(<Input placeholder="请输入账号昵称" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="邮箱地址">
            {getFieldDecorator("email", {
              rules: [
                {
                  type: 'email',
                  required: false,
                  message: "请输入邮箱地址"
                }
              ]
            })(<Input placeholder="请输入邮箱地址" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="手机号">
            {getFieldDecorator("phone", {
              rules: [
                {
                  required: true,
                  message: "请输入手机号"
                }
              ]
            })(<Input placeholder="请输入手机号" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="账号头像">
            {getFieldDecorator("file", {
              valuePropName: "fileList",
              getValueFromEvent: this.normFile
            })(
              <Upload
                name="file"
                accept="image/gif,image/jpeg,image/jpg,image/png"
                listType="picture-card"
                className="avatar-uploader"
                fileList={fileList}
                showUploadList={true}
                onRemove={this.onRemove}
                beforeUpload={() => { return false; }}
              >
                { fileList.length >= 1 ? null: (
                  <div>
                    <Icon type={this.state.loading ? "loading" : "plus"} />
                  </div>
                )
                }
              </Upload>
            )}
          </Form.Item>
        </Modal>
      </div>
    );
  }
}

const HocSelfMessage = Form.create<IProps>()(SelfMessage);
export default HocSelfMessage;
