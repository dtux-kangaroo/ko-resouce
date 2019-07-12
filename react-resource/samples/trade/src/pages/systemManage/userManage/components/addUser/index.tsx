import * as React from "react";
import { Modal, Input, Form, Upload, message as Message, Icon } from "antd";
import { FormComponentProps } from "antd/lib/form";
import Http from "@/utils/http";
import { URL } from "@/api";
import "./style.scss";

interface IProps extends FormComponentProps {
  visible: boolean;
  handleOk: Function;
  handleCancel: Function;
  form: any;
}
interface IState {
  loading: boolean;
  fileList: any;
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
class AddUser extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }
  state: IState = {
    loading: false,
    fileList: []
  };

  componentDidMount() {}
  handleOk = e => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      } else {
        const {fileList} = this.state;
        fieldsValue.file = fileList ? fileList[0] : '';
        Http.postForm(URL.persistUsingPost_2, fieldsValue, {}).then(res => {
          const { message, success } = res;
          if (success) {
            Message.success("添加成功！");
            this.resetData();
            this.props.handleOk();
          } else {
            Message.error(message);
          }
        });
      }
    });
  };
  handleCancel = e => {
    this.resetData();
    this.props.handleCancel();
  };
  resetData = () => {
    this.props.form.resetFields();
    this.setState({
      loading: false,
      fileList: []
    });
  };
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
  onRemove = file => {
    this.setState(state => {
      const index = state.fileList.indexOf(file);
      const newFileList = state.fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList
      };
    });
  };
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
    const { visible, form } = this.props;
    const { fileList } = this.state;
    const { getFieldDecorator } = form;
    return (
      <div className="addUser">
        <Modal
          title="添加成员"
          width={800}
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
            })(<Input placeholder="请输入账号" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="姓名">
            {getFieldDecorator("nickname", {
              initialValue: '',
              rules: [
                {
                  required: false,
                  message: "请输入姓名"
                }
              ]
            })(<Input placeholder="请输入姓名" />)}
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
          <Form.Item {...formItemLayout} label="确认密码">
            {getFieldDecorator("password", {
              initialValue: 123456,
              rules: [
                {
                  required: true,
                  message: "Please input your name"
                }
              ]
            })(<Input disabled placeholder="123456" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="邮箱地址">
            {getFieldDecorator("email", {
              initialValue: '',
              rules: [
                {
                  required: false,
                  message: "请输入邮箱地址"
                }
              ]
            })(<Input placeholder="请输入邮箱地址" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="账号头像">
            {getFieldDecorator("file", {
              valuePropName: "fileList",
              getValueFromEvent: this.normFile
            })(
              <Upload
                name="file"
                listType="picture-card"
                accept="image/gif,image/jpeg,image/jpg,image/png"
                className="avatar-uploader"
                fileList={fileList}
                showUploadList={true}
                onRemove={this.onRemove}
                beforeUpload={() => { return false; }}
              >
                {fileList.length >= 1 ? null : (
                  <div>
                    <Icon type={this.state.loading ? "loading" : "plus"} />
                  </div>
                )}
              </Upload>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="备注信息">
            {getFieldDecorator("remark", {
              initialValue: '',
              rules: [
                {
                  required: false,
                  message: "请输入备注信息"
                }
              ]
            })(<Input.TextArea placeholder="请输入备注信息" />)}
          </Form.Item>
        </Modal>
      </div>
    );
  }
}

const HocAddUser = Form.create<IProps>()(AddUser);
export default HocAddUser;
