import * as React from 'react';
import { Modal, Form, Select, Upload, Icon, Button, Table,message as Message } from 'antd';
import { FormComponentProps } from "antd/lib/form";
import { API,URL } from "@/api/index";
import Http from "@/utils/http";

const { Option } = Select;
const Dragger = Upload.Dragger;

interface IProps extends FormComponentProps{
  visible: boolean,
  entId:string,
  senseId:string,
  handleImportModalCancel: any,
  indexLocation: Array<any>
}

interface IState{
  // importModalVisible: boolean,
  title:string,
  type:string,
  selectFile: Array<any>,
  sceneSelectValue:Array<any>,
  sceneSelectOption: Array<any>,
  failDetailData: Array<any>,
  code: string,
  isFailed:string,
  isSucceed:string,
}

class TemplateImport extends  React.Component<IProps, IState>  {
  constructor(props:any) {
    super(props);
  }

  state:IState={
    title: 'Excel模板导入',
    type:'0',
    selectFile: [],
    sceneSelectValue:[],
    sceneSelectOption: [[]],
    code: '',
    isFailed:'',
    isSucceed:'',
    failDetailData: [],
  }

  componentDidMount () {
    this.getParentSenseUsingGet();
    this.setIndexLocation();
  }
  componentWillReceiveProps (nextProps: any){
    if (this.props.indexLocation != nextProps.indexLocation) {
      this.getParentSenseUsingGet();
      this.setIndexLocation();
    }
  }
  setIndexLocation = () => {
    const { indexLocation } = this.props;
    if(indexLocation&&indexLocation.length){
      this.setState({
        sceneSelectValue:indexLocation.map(item=>item.id),
      });
      indexLocation.forEach((ele,index) => {
        if(index<2){
          this.getChildrenSenseUsingGet(index+1,ele.id);
        }
      });
    }
  }
  getParentSenseUsingGet = () => { // 获取一级业务场景
    API.getParentSenseUsingGet({
      entId: this.props.entId,
    }).then((response: any) =>{ 
      const { message, success, data } = response;
      if (success) {
        this.setState({
          sceneSelectOption: [data]
        })
      } else {
        Message.error(message);
      }
    });
  }
  getChildrenSenseUsingGet = (index: number, id: any) => { // 获取子业务场景
    API.getChildrenSenseUsingGet({
      senseId: id
    }).then((response: any) =>{ 
      const { message, success, data } = response;
      if (success) {
        let { sceneSelectOption } = this.state;
        let newSelectOption =[...sceneSelectOption]
        newSelectOption[index]=data;
        this.setState({
          sceneSelectOption:newSelectOption,
        }, () => {
        })
      } else {
        Message.error(message);
      }
    });
  }

  handleLocationSelectChange = (index: number, value: string) => {
    const { sceneSelectOption, sceneSelectValue } = this.state;
    this.props.form.setFieldsValue({sceneId: value});
    let newSceneSelect = [...sceneSelectValue];
    let newSelectOption = sceneSelectOption;
    if(index==1){
      newSceneSelect[2]=undefined;
      newSelectOption = [sceneSelectOption[0],sceneSelectOption[1],[]];
    }else if(index==0){
      newSceneSelect[1]=undefined;
      newSceneSelect[2]=undefined;
      newSelectOption = [sceneSelectOption[0],[]];
    }
    newSceneSelect[index]=value;
    this.setState({
      sceneSelectValue:newSceneSelect,
      sceneSelectOption: newSelectOption
    }, () => {
      if(index!==2){
        this.getChildrenSenseUsingGet(index+1,value)
      }
    });
  }

  locationValidator = (rule, value, callback) => {
    if (!value) {
        callback('请选择指标位置')
    }
    callback()
  }
  handleImportModalOk = () => {
    this.props.handleImportModalCancel();
  };

  handleImportModalCancel = ()=> {
    this.props.handleImportModalCancel();
  };
  renderImportModalContent = () => {
    const {sceneSelectOption, sceneSelectValue} =this.state;
    const { getFieldDecorator } = this.props.form;

    const uploadProps = {
      name: 'file',
      multiple: true,
      beforeUpload: (file: any, fileList: any) => {
        if (!/.(xls|xlsx)$/.test(file.name)) {
          Message.error("Excel类型必须是.xls,.xlsx中的一种!");
          return false;
        }
        this.setState({ selectFile: [...this.state.selectFile, ...fileList] });
        return false;
      },
      onRemove: (file: any) => {
        const {selectFile} = this.state;
        let index: number = -1;
        for (let i:number = 0, len:number = selectFile.length; i < len; i++) {
          if (selectFile[i].name == file.name) {
            index = i;
            break;
          }
        }
        if (index != -1) {
          selectFile.splice(index,1);
          this.setState({ selectFile: [...selectFile] });
        }
      }
    };
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
        <Form.Item label="指标位置" required={true} {...formItemLayout}>
            {getFieldDecorator('sceneId', {
              rules: [{
                validator: this.locationValidator
              }],
            })(
              <div>
                {sceneSelectOption.map((item: any, index: number) => {
                  let options: any = item.map((cItem: any, cIndex: number) => (
                    <Option key={cIndex} value={cItem.id}>{cItem.sceneName}</Option>
                  ))
                  return (
                    <span style={{ marginRight: 10 }}>
                      <Select disabled={true} value={sceneSelectValue[index] } placeholder={`请选择指标位置`+index+1} style={{ width: 140 }} onChange={this.handleLocationSelectChange.bind(this, index)}>
                        {options}
                      </Select>
                    </span>
                  )
                })}
              </div>
            )}
          </Form.Item>
        <div style={{ width: '82%', margin: '0 auto' }}>
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">点击或将更新资源包拖拽到这里上传</p>
            <p className="ant-upload-hint">支持扩展名：.xlsx...</p>
          </Dragger>
        </div>
      </Form>
    )
  }

  renderSuccessModalContent = () => {
    const {isFailed,isSucceed} = this.state;
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center', height: 170, padding: '10px 0px' }}>
        <Icon type="check-circle" theme="filled" style={{ color: '#52c41a', fontSize: 64 }} />
        <span style={{ fontSize: 20 }}>上传文件成功！</span>
        <div>
          <span style={{ marginRight: 10 }}>{isSucceed}个指标上传成功，{isFailed}个指标上传失败</span>
          <Button type="primary" onClick={()=>{this.onHandleType('3')}}>点击查看</Button>
        </div>
      </div>
    );
  }
  
  renderErrorModalContent = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center', height: 215, padding: '10px 0px' }}>
        <Icon type="exclamation-circle" theme="filled" style={{ color: '#f5222d', fontSize: 64 }} />
        <span style={{ fontSize: 20 }}>上传格式错误，请重新上传！</span>
        <Button type="primary" onClick={()=>{this.onHandleType('0')}}>重新上传</Button>
      </div>
    );
  }
  onHandleType = (type) => {
    if(type=='3'){
      this.impSucceedUsingGet();
    }
    this.setState({
      type
    })
  }
  impSucceedUsingGet = () => {
    API.impSucceedUsingGet({
      code: this.state.code
    }).then((response: any) =>{ 
      const { message, success, data } = response;
      if (success) {
        this.setState({
          failDetailData:data
        })
      } else {
        Message.error(message);
      }
    });
  }
  renderFailDetailModalContent = () => {
    const { failDetailData } = this.state;
    const pagination: any = {
      pageSize: 10
    }
    const columns: any = [
      {
        title: '指标名称',
        dataIndex: 'indexName',
        key: 'indexName',
        width: 250
      },
      {
        title: '业务口径',
        dataIndex: 'caliberRemark',
        key: 'caliberRemark',
      }
    ];
    return (
      <Table dataSource={failDetailData} pagination={pagination} columns={columns} />
    );
  }
  onOk=()=>{
    this.props.form.validateFields((errors: any, values: any) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      const {selectFile,sceneSelectValue} = this.state;
      const {entId} = this.props;
        Http.postForm(URL.indexImportUsingGet,{entId,sceneId:sceneSelectValue[2]||sceneSelectValue[1]||sceneSelectValue[0],file:selectFile[0]}, {}).then(res => {
          const { message, success ,data} = res;
          if (success) {
            this.setState({
              type:'1',
              code: data.code,
              isFailed:data.isFailed,
              isSucceed:data.isSucceed,
            })
            Message.success("添加成功！");
          } else {
            Message.error(message);
          }
        });
    });
  }
  render () {
    const { visible } = this.props;
    const {title,type} = this.state;
    return (
      <div>
        <Modal
          title={title}
          maskClosable={false}
          width={800}
          visible={visible}
          onOk={this.onOk}
          onCancel={this.handleImportModalCancel}
        >
          {type=='0'&&this.renderImportModalContent()}
          {type=='1'&&this.renderSuccessModalContent()}
          {type=='2'&&this.renderErrorModalContent()}
          {type=='3'&&this.renderFailDetailModalContent()}
        </Modal>
      </div>
    )
  }
}
export default Form.create<IProps>()(TemplateImport);