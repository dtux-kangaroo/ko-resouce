import * as React from "react";
import { Modal, Input, Form,message as Message } from "antd";
import {API} from '@/api';
import "./style.scss";

interface IProps {
  visible: boolean;
  title:string;
  handleOk: Function;
  handleCancel: Function;
  form: any;
  data:any
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
    sm: { span: 18 }
  }
};
class AddTrade extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }
  state: IState = {

  };
  componentWillReceiveProps(nextProps){
    const {title,data,visible} = nextProps;
    if(visible&&data.id&&visible!=this.props.visible){
      if(title=='编辑行业'){
        this.props.form.setFieldsValue(data);
      }
    }
  }
  saveTrade = (params) => {
    if(this.props.title=='编辑行业'){
      params.id = this.props.data.id
    }
    API.persistUsingPost_1(params).then(res=>{
      const {message,success} = res;
      if(success){
        this.props.form.resetFields();
        this.props.handleOk();
      }else{
        Message.error(message)
      }
  })
  }
  handleOk = e => {
    this.props.form.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }else{
            this.saveTrade(fieldsValue);
        }
    })
    
  };

  handleCancel = e => {
    this.props.form.resetFields();
    this.props.handleCancel();
  };
  render() {
    const { visible,title } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="addUser">
        <Modal
          title={title}
          width={600}
          maskClosable={false}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form.Item {...formItemLayout} label="行业名称：">
            {getFieldDecorator("industryName", {
              rules: [
                {
                  required: true,
                  message: "请行业名称"
                }
              ]
            })(<Input maxLength={32} placeholder="请行业名称" />)}
          </Form.Item>
         <Form.Item {...formItemLayout} label="行业描述：">
            {getFieldDecorator("industryRemark", {
              rules: [
                {
                  required: false,
                  message: "请输入行业描述"
                }
              ]
            })(<Input.TextArea maxLength={64} rows={4} placeholder="请输入行业描述" />)}
          </Form.Item>
        </Modal>
      </div>
    );
  }
}
//export default Form.create()(AddTrade);

const HocAddTrade:any = Form.create()(AddTrade);
export default HocAddTrade;
