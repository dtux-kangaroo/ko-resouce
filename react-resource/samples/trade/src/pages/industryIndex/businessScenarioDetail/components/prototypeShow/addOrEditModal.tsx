import * as React from 'react';
import { Form, Input, Upload,Icon, Modal, message as Message } from 'antd';
import { FormComponentProps } from "antd/lib/form";
import Http from '@/utils/http';
import { URL } from "@/api/index";


interface IProps extends FormComponentProps {
  form: any,
  senseId:string,
  editItem: any,
  visible: boolean,
  onOk: Function,
  onCancel: Function,
}

interface IState{
  loading: boolean,
  fileList: any,
}

class AddOrEditModal extends  React.Component<IProps, IState>  {
  constructor(props:any) {
    super(props);
  }

  state:IState={
    loading: false,
    fileList:[],
  }

  componentDidMount () {
    this.resetFieldsValue(this.props.editItem);
  }

  componentWillReceiveProps (nextProps: any){
    if (this.props.editItem != nextProps.editItem) {
      this.resetFieldsValue(nextProps.editItem);
    }
  }

  resetFieldsValue = (editItem: any) => {
    if(editItem.prcId){
      const initFileList = [
        {
          uid: '-1',
          name: '原型图.png',
          status: 'done',
          url: editItem.prcImage,
        },
      ]
      this.setState({
        fileList:initFileList
      })
      this.props.form.setFieldsValue({file:initFileList, prcName: editItem.prcName});
    } else {
      this.setState({
        fileList:[]
      })
      this.props.form.setFieldsValue({file:[], prcName: ''});
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
  prototypeValidator = (rule, value, callback) => {
    if (!value || (value && value.length == 0)) {
      callback('请选择选择原型图')
    }
    callback()
  }
  onHandleOk = () => {
       const { editItem,senseId } = this.props;
       this.props.form.validateFields((errors: any, values: any) => {
        if (errors) {
          console.log('errors', errors);
          return;
        }
        const {fileList} = this.state;
        values.file = fileList && fileList.length  > 0 ? fileList[0] : '';
        let params: any = { ...values,sceneId:senseId };
        if (editItem.prcId) {
          params.prcId = editItem.prcId;
          params.prcImage=editItem.prcImage;
        }
        
        Http.postForm(URL.importImageUsingPost,params, {}).then((response: any) =>{ 
          const { message, success} = response;
          if (success) {
            Message.success(!editItem.id ? "添加成功" : "修改成功");
            this.props.onOk();
          } else {
            Message.error(message);
          }
        });
      });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { fileList, loading } = this.state;
    const { editItem, visible } = this.props;
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
      title={!editItem.prcId ? "新增" : "编辑"}
      visible={visible}
      onOk={this.onHandleOk}
      onCancel={() => { this.props.onCancel(); }}
      width={700}
      >
        <Form>
          <Form.Item label="名称" {...formItemLayout}>
            {getFieldDecorator('prcName', {
              rules: [{
                required: true, message: '必填项'
              }],
            })(
              <Input placeholder="请输入名称" />
            )} 
          </Form.Item>
          <Form.Item label="原型图" required={true} {...formItemLayout}>
            {getFieldDecorator("file", {
              valuePropName: "fileList",
              getValueFromEvent: this.normFile,
              rules: [{
                validator: this.prototypeValidator
              }],
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

const HocModalForm:any = Form.create()(AddOrEditModal);
export default HocModalForm;