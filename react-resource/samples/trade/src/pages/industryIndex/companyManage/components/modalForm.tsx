import * as React from 'react';
import { Form, Input, Select, Upload, Icon, Modal, message as Message } from 'antd';
import { FormComponentProps } from "antd/lib/form";
import { API } from "@/api/index";

const { TextArea } = Input;
const { Option } = Select;

interface IProps extends FormComponentProps {
  form: any,
  industryTags: Array<any>,
  currentEditItem: any,
  visible: boolean,
  onOk: Function,
  onCancel: Function,
}

interface IState{
  loading: boolean,
  fileList: any,
}

class ModalForm extends  React.Component<IProps, IState>  {
  constructor(props :any) {
    super(props);
  }

  state:IState={
    loading: false,
    fileList:[],
  }

  componentDidMount () {
    this.resetFieldsValue(this.props.currentEditItem);
  }
  
  componentWillReceiveProps (nextProps: any){
    if (this.props.currentEditItem != nextProps.currentEditItem) {
      this.resetFieldsValue(nextProps.currentEditItem);
    }
  }

  emptNameValidate = (rule, value, callback) => {
    API.existUsingGet({
      entName: value
    }).then((response: any) =>{ 
      const { message, success, data } = response;
      if (success) {
        if (data) {
          callback();
        } else {
          callback('该企业名已存在，请重新输入')
        }
      } else {
        Message.error(message);
      }
    });
  }

  resetFieldsValue = (currentEditItem: any) => {
    if(currentEditItem.entName){
      const initFileList = [
        {
          uid: '-1',
          name: '企业.png',
          status: 'done',
          url: currentEditItem.entImage,
        },
      ]
      this.setState({
        fileList:initFileList
      })
      this.props.form.setFieldsValue({file:initFileList, ...currentEditItem});
    } else {
      this.setState({
        fileList:[]
      })
      this.props.form.setFieldsValue({file:[], ...{
        entName: '',
        entRemark: '',
        industryId: -1,
      }});
    }
  }

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

  onRemove = (file: any) => {
    this.setState(state => {
      const index = state.fileList.indexOf(file);
      const newFileList = state.fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList,
      };
    });
  }

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
  resetData = () => {
    this.props.form.resetFields();
    this.setState({
      loading: false,
      fileList: []
    });
  };
  render(){
    const { getFieldDecorator } = this.props.form;
    const { industryTags, currentEditItem, visible } = this.props;
    const { fileList, loading } = this.state;
    const formItemLayout: any = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 17,
      },
    };
    return (
      <Modal
          title={!currentEditItem.id ? "新增企业" : "编辑"}
          visible={visible}
          onOk={() => { this.props.onOk(); }}
          onCancel={() => { this.props.onCancel(); }}
          width={700}
      >
        <Form>
          <Form.Item label="企业名称" {...formItemLayout}>
            {getFieldDecorator('entName', {
              rules: [{
                required: true, message: '必填项'
              }, {
                validator: this.emptNameValidate
              }],
            })(
              <Input placeholder="请输入企业名称" />
            )} 
          </Form.Item>
          <Form.Item label="所属行业" {...formItemLayout}>
            {getFieldDecorator('industryId', {})(
              <Select style={{ width: '100%' }}>
                {industryTags.map((item: any, index: number) => {
                  return index == 0 ? '' : (
                    <Option key={item.id} value={item.id}>{item.industryName}</Option>
                  );
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="企业简介" {...formItemLayout}>
            {getFieldDecorator('entRemark', {})(
              <TextArea
                placeholder="请输入企业简介"
                autosize={{ minRows: 5, maxRows: 10 }}
              />
            )}
          </Form.Item>
          <Form.Item label="企业LOGO" {...formItemLayout}>
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
                defaultFileList={fileList}
                onRemove={this.onRemove}
                beforeUpload={() => { return false; }}
              >
                { fileList.length >= 1 ? null: (
                  <div>
                    <Icon type={ loading ? "loading" : "plus" } />
                  </div>
                )
                }
              </Upload>
            )}
          </Form.Item>
          
        </Form>
      </Modal>
    )
  }
}

const HocModalForm = Form.create<IProps>()(ModalForm);
export default HocModalForm;