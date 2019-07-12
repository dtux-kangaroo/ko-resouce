import * as React from 'react';
import { Form, Input } from 'antd';

const { TextArea } = Input;

interface IProps{
  form: any,
  detailInfor: any
}

interface IState{
  
}

class EditModalForm extends  React.Component<IProps, IState>  {
  constructor(props:any) {
    super(props);
  }

  state:IState={
    
  }

  componentDidMount () {
    
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const { detailInfor } = this.props;
    const formItemLayout: any = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 17,
      },
    };
    return (
      <Form>
        <Form.Item label="企业名称" {...formItemLayout}>
          {getFieldDecorator('entName', {
            initialValue: detailInfor ? detailInfor.entName : '',
            rules: [{
              required: true, message: '必填项'
            }],
          })(
            <Input placeholder="请输入企业名称" />
          )}
        </Form.Item>
        <Form.Item label="企业简介" {...formItemLayout}>
          {getFieldDecorator('entRemark', {
            initialValue: detailInfor ? detailInfor.entRemark : '',
            rules: [{
              required: true, message: '必填项'
            }],
          })(
            <TextArea
              placeholder="请输入企业简介"
              autosize={{ minRows: 5, maxRows: 10 }}
            />
          )}
        </Form.Item>
      </Form>
    )
  }
}

//export default Form.create()(EditModalForm);
const HocModalForm:any = Form.create()(EditModalForm);
export default HocModalForm;