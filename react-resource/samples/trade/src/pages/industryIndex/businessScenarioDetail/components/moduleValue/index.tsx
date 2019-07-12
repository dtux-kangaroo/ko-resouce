import * as React from 'react';
import { Button, Input,message as Message } from 'antd';
import  './style.scss';
import { API } from "@/api";
const { TextArea } = Input;

interface IProps{
  data: string;
  entId: string;
  senseId:string;
  onSyncFunc:Function
}

interface IState{
  status: string,
  moduleValue: string,
  textareaValue: string,
}

export default class ModuleValue extends  React.Component<IProps, IState>  {
  constructor(props:any) {
    super(props);
  }

  state:IState={
    status: 'text', // text | edit
    moduleValue: '',
    textareaValue: '',
  }
  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (data !== this.props.data) {
      this.setState({
        moduleValue: data
      });
    }
  }
  editUsingPost_1 = () => {  //编辑模块价值
    const { senseId } = this.props;
    const {moduleValue} = this.state;
    API.editUsingPost_1({ senseId,targetValue:moduleValue }).then(res => {
      const { message, success } = res;
      if (success) {
        this.props.onSyncFunc();
      } else {
        Message.error(message);
      }
    });
  };
  handleTextAreaChange = (e: any) => {
    // console.log(e.target.value);
    this.setState({ textareaValue: e.target.value })
  }

  hanleEditClick = () => {
    this.setState({ 
      status: 'edit', 
      textareaValue: this.state.moduleValue 
    });
  }

  handleCancel = () => {
    this.setState({ 
      status: 'text',
      textareaValue: ''
    });
  }

  hanleSave = () => {
    const { textareaValue } = this.state;
    this.setState({ 
      status: 'text',
      moduleValue: textareaValue,
      textareaValue: ''
    },()=>{
      this.editUsingPost_1();
    });
  }

  render(){
    const { status, moduleValue, textareaValue } = this.state;
    return (
      <div className="module-value">
        <div className="top-box">
          <span className="title">模块价值</span>
          <div className="btns">
            <Button type="primary" disabled={status == 'edit' ? true : false} onClick={this.hanleEditClick}>编辑</Button>
          </div>
        </div>
        <div className="mv-content">
          {status == 'text' && <div className="text">    
            {moduleValue}
          </div>}
          {status == 'edit' && 
          <div>
            <TextArea
              placeholder="请输入"
              autosize={{ minRows: 5, maxRows: 10 }}
              value={textareaValue}
              onChange={this.handleTextAreaChange}
            />
            <div className="edit-btns">
              <Button style={{ marginLeft: 10 }} type="primary" onClick={this.hanleSave}>保存</Button>
              <Button onClick={this.handleCancel}>取消</Button>
            </div>
          </div>
          }
        </div>
      </div>
    )
  }
}
