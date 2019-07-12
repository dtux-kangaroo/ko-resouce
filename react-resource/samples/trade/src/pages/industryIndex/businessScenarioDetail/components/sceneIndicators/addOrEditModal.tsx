import * as React from 'react';
import { Tag, Tooltip, Icon, Form, Input, Select, Modal, Radio } from 'antd';
import { FormComponentProps } from "antd/lib/form";
import { API } from "@/api/index";
import { message as Message } from 'antd';
import {uniqBy,some} from 'lodash'; 

const { Option } = Select;
const canBeRealOption: any = [{ label: '是', value: '0' },{ label: '否', value: '1' }];
const { TextArea } = Input;

interface IProps extends FormComponentProps {
  form: any,
  editItem: any,
  visible: boolean,
  onOk: Function,
  onCancel: Function,
  entId: string,
  indexLocation: Array<any>
}

interface IState{
  tagsOfType: Array<any>,
  tagInputVisibleOfType: boolean,
  tagInputValueOfType: any,
  openDropMenuOfType: boolean,
  tagsOfDS: Array<any>,
  tagInputVisibleOfDS: boolean,
  tagInputValueOfDS: any,
  openDropMenuOfDS: boolean,

  sceneSelectValue: Array<any>,
  sceneSelectOption: Array<any>,

  dsOption: Array<any>,
  typeOption: Array<any>,

  isRealize: string,
}

class AddOrEditModal extends  React.Component<IProps, IState>  {
  constructor(props:any) {
    super(props);
  }

  tagInputOfType: any
  tagInputOfDS: any

  state:IState={
    tagsOfType: [],
    tagInputVisibleOfType: false,
    tagInputValueOfType: [],
    openDropMenuOfType: false,
    
    tagsOfDS: [],
    tagInputVisibleOfDS: false,
    tagInputValueOfDS: [],
    openDropMenuOfDS: false,
    sceneSelectValue:[],
    sceneSelectOption: [[]],

    dsOption: [],  // 数据源下拉选项
    typeOption: [],  // 类型下拉选项

    isRealize: '',
  }

  componentDidMount () {
    this.resetFieldsValue(this.props.editItem);
    this.getParentSenseUsingGet();
    this.dropListUsingGet();
    this.getTypeSelectOptions();
  }
  
  componentWillReceiveProps (nextProps: any){
    if (this.props.editItem != nextProps.editItem) {
      this.getParentSenseUsingGet();
      this.resetFieldsValue(nextProps.editItem);
      this.dropListUsingGet();
      this.getTypeSelectOptions();
    }
  }

  resetFieldsValue = (editItem: any) => {
    if(editItem.id){
      this.setState({
        tagsOfType: editItem.indexTypes||[],
        tagsOfDS: editItem.systemNames||[],
        sceneSelectValue:[],
      });
      let sceneId ='';
      if(editItem.indexLocation&&editItem.indexLocation.length){
        this.setState({
          sceneSelectValue:editItem.indexLocation.map(item=>item.id),
        });
        editItem.indexLocation.forEach((ele,index) => {
          if(index<2){
            this.getChildrenSenseUsingGet(index+1,ele.id);
          }
        });
        sceneId =  editItem.indexLocation[editItem.indexLocation.length-1].id;
      }
      this.props.form.setFieldsValue(Object.assign({},editItem,{sceneId}) );
    } else {
      let sceneId ='';
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
        sceneId =  indexLocation[indexLocation.length-1].id;
      }
      this.setState({
        tagsOfType: [],
        tagsOfDS: [],
        // sceneSelectValue:[],
      })
      this.props.form.resetFields();
      this.props.form.setFieldsValue({sceneId});
    }
  }

  dropListUsingGet = () => { // 获取数据源下拉列表
    API.dropListUsingGet({
      entId: this.props.entId
    }).then((response: any) =>{ 
      const { message, success, data } = response;
      if (success) {
        this.setState({
          dsOption: data
        })
      } else {
        Message.error(message);
      }
    });
  }

  getTypeSelectOptions = () => { // 获取类型下拉列表
    API.dropTypesUsingGet({
      entId: this.props.entId
    }).then((response: any) =>{ 
      const { message, success, data } = response;
      if (success) {
        this.setState({
          typeOption: data
        })
      } else {
        Message.error(message);
      }
    });
  }

  getParentSenseUsingGet = () => { // 获取一级业务场景
    API.getParentSenseUsingGet({
      entId: this.props.entId
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
  //标签相关
  handleClose = (removedTag: string, type: string) => {
    if (type == 'type') {
      const tagsOfType = this.state.tagsOfType.filter(tag => tag !== removedTag);
      this.setState({ tagsOfType });
    } else {
      const tagsOfDS = this.state.tagsOfDS.filter(tag => tag.id !== removedTag);
      this.setState({ tagsOfDS });
    }
  };

  showInput = (type: string) => {
    if (type == 'type') {
      this.setState({ tagInputVisibleOfType: true, openDropMenuOfType: true }, () => this.tagInputOfType.focus());
    } else {
      this.setState({ tagInputVisibleOfDS: true, openDropMenuOfDS: true }, () => this.tagInputOfDS.focus());
    }
  };
  handleSelect= (type: string, val: string,option) => {
    const {value,children} = option.props;
    if (type == 'type') {
      this.setState({ tagInputValueOfType: [val] }, () => {
        this.handleInputConfirm('type');
      });
    } else {
      this.setState({ tagInputValueOfDS: {id:value,systemName:children} }, () => {
        this.handleInputConfirm('ds');
      });
    }
  }
  handleSelectBlur = (type: string) => {
    if (type == 'type') {
      this.setState({
        tagInputVisibleOfType: false,
        tagInputValueOfType: [],
        openDropMenuOfType: false,
      });
    } else {
      this.setState({
        tagInputVisibleOfDS: false,
        tagInputValueOfDS: [],
        openDropMenuOfDS: false,
      });
    }
  }
  handleInputConfirm = (type: string) => {
    if (type == 'type') {
      const { tagInputValueOfType } = this.state;
      let { tagsOfType } = this.state;
      if (tagInputValueOfType[0] && tagsOfType.indexOf(tagInputValueOfType[0]) === -1) {
        tagsOfType = [...tagsOfType, ...tagInputValueOfType];
      }
      this.setState({
        tagsOfType,
        tagInputVisibleOfType: false,
        tagInputValueOfType: [],
        openDropMenuOfType: false,
      });
    } else {
      let { tagsOfDS, tagInputValueOfDS } = this.state;
      this.setState({
        tagsOfDS:uniqBy([...tagsOfDS,tagInputValueOfDS],'systemName'),
        tagInputVisibleOfDS: false,
        tagInputValueOfDS: [],
        openDropMenuOfDS: false,
      });
    }
  };

  saveInputRefOfType = input => (this.tagInputOfType = input);
  saveInputRefOfDS = input => (this.tagInputOfDS = input);
  handleOk = () => {
    const {tagsOfDS,tagsOfType,sceneSelectValue} = this.state;
    const {editItem} = this.props;
    let delTypes = [];
    let delSystemIds = [];
    if(JSON.stringify(editItem)!='{}'){
      editItem.indexTypes&&editItem.indexTypes.forEach((item: any) => {
        if (tagsOfType.indexOf(item) == -1) {
          delTypes.push(item);
        }
      })
      editItem.systemNames&&editItem.systemNames.forEach((item: any) => {
        if (!some(tagsOfDS,item)) {
           delSystemIds.push(item.id);
        }
      })
    }
    
    this.props.form.validateFields((errors: any, values: any) => {
      if (errors) {
        return;
      }
      this.props.onOk(Object.assign({},values,{indexTypes:tagsOfType,systemIds:tagsOfDS.map(item=>item.id),delTypes,delSystemIds,sceneId:sceneSelectValue[2]||sceneSelectValue[1]||sceneSelectValue[0], unrealizedCause: values.isRealize == '否' ? values.unrealizedCause : ''}));
  
    });
  }
  handleRadioChange = (e: any) => {
    this.setState({
      isRealize: e.target.value
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { isRealize, tagsOfType, tagInputVisibleOfType, openDropMenuOfType, tagsOfDS, tagInputVisibleOfDS, openDropMenuOfDS, sceneSelectOption, sceneSelectValue, dsOption, typeOption, } = this.state;
    const { visible, editItem } = this.props;
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
        title={!editItem.id ? "添加指标" : "编辑"}
        visible={visible}
        maskClosable={false}
        onOk={this.handleOk }
        onCancel={() => { this.props.onCancel(); }}
        width={700}
      >
        <Form>
          <Form.Item label="指标名称" {...formItemLayout}>
            {getFieldDecorator('indexName', {
              rules: [{
                required: true, message: '必填项'
              }],
            })(
              <Input placeholder="请输入" />
            )}
          </Form.Item>
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
                      <Select value={sceneSelectValue[index] } placeholder={`请选择指标位置`+index+1} style={{ width: 140 }} disabled={true} onChange={this.handleLocationSelectChange.bind(this, index)}>
                        {options}
                      </Select>
                    </span>
                  )
                })}
              </div>
            )}
          </Form.Item>
          <Form.Item label="业务口径" {...formItemLayout}>
            {getFieldDecorator('caliberRemark', {
              rules: [{
                required: true, message: '必填项'
              }],
            })(
              <Input placeholder="请输入" />
            )}
          </Form.Item>

          <Form.Item label="类型" {...formItemLayout}>
            {getFieldDecorator('indexTypes', {
            })(
              <div>
                {tagsOfType.length > 0 && tagsOfType.map((tag: any) => {
                  const isLongTag = tag.length > 20;
                  const tagElem = (
                    <Tag key={tag} closable={true} onClose={() => this.handleClose(tag,'type')}>
                      {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                    </Tag>
                  );
                  return isLongTag ? (
                    <Tooltip title={tag} key={tag}>
                      {tagElem}
                    </Tooltip>
                  ) : (
                    tagElem
                  );
                })}
                {tagInputVisibleOfType && (
                  <Select 
                    mode="tags"
                    ref={this.saveInputRefOfType}
                    onSelect={this.handleSelect.bind(this,'type')} 
                    onBlur={this.handleSelectBlur.bind(this,'type')} 
                    style={{ width: 100 }}
                    size="small"
                    open={openDropMenuOfType}
                  >
                    {typeOption.map((item: any) => (
                      <Option key={`${item.id}`} value={`${item.typeName}`}>{item.typeName}</Option>
                    ))}
                  </Select>
                )}
                {!tagInputVisibleOfType && (
                  <Tag onClick={this.showInput.bind(this,'type')} style={{ background: '#fff', borderStyle: 'dashed' }}>
                    <Icon type="plus" />
                  </Tag>
                )}
              </div>
            )}
          </Form.Item>
          <Form.Item label="数据源" {...formItemLayout}>
            {getFieldDecorator('systemIds', {
            })(
              <div>
                {tagsOfDS.length > 0 && tagsOfDS.map((tag: any) => {
                  const isLongTag = tag.length > 20;
                  const tagElem = (
                    <Tag key={tag.id} closable={true} onClose={() => this.handleClose(tag.id,'ds')}>
                      {isLongTag ? `${tag.systemName.slice(0, 20)}...` : tag.systemName}
                    </Tag>
                  );
                  return isLongTag ? (
                    <Tooltip title={tag.systemName} key={tag.id}>
                      {tagElem}
                    </Tooltip>
                  ) : (
                    tagElem
                  );
                })}
                {tagInputVisibleOfDS && (
                  <Select 
                    ref={this.saveInputRefOfDS}
                    onSelect={this.handleSelect.bind(this,'ds')}onBlur={this.handleSelectBlur.bind(this,'ds')} 
                    style={{ width: 100 }} 
                    size="small"
                    open={openDropMenuOfDS}
                  >
                    {dsOption.map((item: any) => (
                      <Option key={item.id} value={item.id}>{item.systemName}</Option>
                    ))}
                  </Select>
                )}
                {!tagInputVisibleOfDS && (
                  <Tag onClick={this.showInput.bind(this,'ds')} style={{ background: '#fff', borderStyle: 'dashed' }}>
                    <Icon type="plus" />
                  </Tag>
                )}
              </div>
            )}
          </Form.Item>
          <Form.Item label="是否能够实现" {...formItemLayout}>
            {getFieldDecorator('isRealize', {
            })(
              // <Input placeholder="请输入" />
              <Radio.Group onChange={this.handleRadioChange}>
                {canBeRealOption.map((item: any) => (
                  <Radio key={item.value} value={item.label}>{item.label}</Radio>
                ))}
              </Radio.Group>
            )}
          </Form.Item>
          {isRealize == '否' && <Form.Item label="未实现原因" {...formItemLayout}>
            {getFieldDecorator('unrealizedCause', {
            })(
              <Input placeholder="请输入" />
            )}
          </Form.Item>}
          <Form.Item label="指标业务价值" {...formItemLayout}>
            {getFieldDecorator('businessValue', {
            })(
              <Input placeholder="请输入" />
            )}
          </Form.Item>
          <Form.Item label="备注" {...formItemLayout}>
            {getFieldDecorator('indexRemark', {
            })(
              // <Input placeholder="请输入" />
              <TextArea
                placeholder="请输入"
                autosize={{ minRows: 5, maxRows: 10 }}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
      
    )
  }
}

export default Form.create<IProps>()(AddOrEditModal);
