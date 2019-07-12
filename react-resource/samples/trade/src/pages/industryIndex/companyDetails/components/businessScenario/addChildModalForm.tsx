import * as React from 'react';
import { Form, Input } from 'antd';
const { TextArea } = Input;

interface IProps{
  form: any
}

interface IState{
  
}

class AddChildModalForm extends  React.Component<IProps, IState>  {
  constructor(props:any) {
    super(props);
  }

  state:IState={
    
  }

  componentDidMount () {
    
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout: any = {
      labelCol: {
        span: 7,
      },
      wrapperCol: {
        span: 15,
      },
    };
    return (
      <Form>
        <Form.Item label="子业务场景名称" {...formItemLayout}>
          {getFieldDecorator('sceneName', {
            initialValue: '',
            rules: [{
              required: true, message: '必填项'
            }],
          })(
            <Input placeholder="请输入" />
          )}
        </Form.Item>
        <Form.Item label="场景价值与痛点解决" {...formItemLayout}>
          {getFieldDecorator('targetValue', {
            initialValue: '',
            rules: [{
              required: true, message: '必填项'
            }],
          })(
            <TextArea
              placeholder="请输入"
              autosize={{ minRows: 5, maxRows: 10 }}
            />
          )}
        </Form.Item>
      </Form>
    )
  }
}

//export default Form.create()(AddChildModalForm);

const HocChildModalForm:any = Form.create<IProps>()(AddChildModalForm);
export default HocChildModalForm;