import * as React from 'react';
import { Form, Tag, Input, Tooltip, Icon, Select, Modal } from 'antd';
import { FormComponentProps } from "antd/lib/form";

const { Option } = Select;

interface IProps extends FormComponentProps {
  form: any,
  editItem: any,
  departmentSelectOption: Array<any>,
  visible: boolean,
  onOk: Function,
  onCancel: Function,
}

interface IState{
  tags: Array<any>,
  tagInputVisible: boolean,
  tagInputValue: any,
  openDropMenu: boolean,
}

class AddOrEditModal extends  React.Component<IProps, IState>  {
  constructor(props:any) {
    super(props);
  }

  tagInput: any

  state:IState={
    tags: [],
    tagInputVisible: false,
    tagInputValue: [],
    openDropMenu: false,
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
    if(editItem.systemName){
      this.setState({
        tags: editItem.dept
      })
      this.props.form.setFieldsValue(editItem);
    } else {
      this.setState({
        tags:[]
      })
      this.props.form.resetFields();
    }
  }

  handleClose = (removedTag: string) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ tagInputVisible: true, openDropMenu: true }, () => this.tagInput.focus());
  };

  handleInputChange = (value: string) => {
    this.setState({ tagInputValue: value });
  };

  handleSelect= (value: string) => {
    this.setState({ tagInputValue: [value] }, () => {
      this.handleInputConfirm();
    });
  }

  handleSelectBlur = () => {
    this.setState({
      tagInputVisible: false,
      openDropMenu: false
    });
  }

  handleInputConfirm = () => {
    const { tagInputValue } = this.state;
    let { tags } = this.state;
    if (tagInputValue[0] && tags.indexOf(tagInputValue[0]) === -1) {
      tags = [...tags, ...tagInputValue];
    }
    this.setState({
      tags,
      tagInputVisible: false,
      tagInputValue: [],
      openDropMenu: false,
    });
  };

  saveInputRef = input => (this.tagInput = input);

  render(){
    const { tags, tagInputVisible, openDropMenu } = this.state;
    const { editItem, departmentSelectOption, visible } = this.props;
    const { getFieldDecorator } = this.props.form;
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
          title={!editItem.id ? "添加系统" : "编辑"}
          visible={visible}
          onOk={() => { this.props.onOk(); }}
          onCancel={() => { this.props.onCancel(); }}
      >
        <Form>
          <Form.Item label="系统名称" {...formItemLayout}>
            {getFieldDecorator('systemName', {
              rules: [{
                required: true, message: '必填项'
              }],
            })(
              <Input placeholder="请输入" />
            )}
          </Form.Item>
          <Form.Item label="生产网址" {...formItemLayout}>
            {getFieldDecorator('onlineUrl', {})(
              <Input placeholder="请输入" />
            )}
          </Form.Item>
          <Form.Item label="测试网址" {...formItemLayout}>
            {getFieldDecorator('testUrl', {})(
              <Input placeholder="请输入" />
            )}
          </Form.Item>
          <Form.Item label="系统备注" {...formItemLayout}>
            {getFieldDecorator('systemRemark', {})(
              <Input placeholder="请输入" />
            )}
          </Form.Item>
          <Form.Item label="使用部门" {...formItemLayout}>
            {getFieldDecorator('dept', {})(
              <div>
                {tags && tags.length > 0 && tags.map((tag, index) => {
                  const isLongTag = tag.length > 20;
                  const tagElem = (
                    <Tag key={tag} closable={true} onClose={() => this.handleClose(tag)}>
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
                {tagInputVisible && (
                  <Select 
                    mode="tags"
                    ref={this.saveInputRef}
                    onBlur={this.handleSelectBlur}
                    onSelect={this.handleSelect} 
                    style={{ width: 100 }} 
                    onChange={this.handleInputChange}
                    size="small"
                    open={openDropMenu}
                  >
                    {departmentSelectOption.map((item: any) => (
                      <Option key={item.id} value={item.deptName}>{item.deptName}</Option>
                    ))}
                  </Select>
                )}
                {!tagInputVisible && (
                  <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                    <Icon type="plus" />
                  </Tag>
                )}
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
      
    )
  }
}

export default Form.create<IProps>()(AddOrEditModal);
