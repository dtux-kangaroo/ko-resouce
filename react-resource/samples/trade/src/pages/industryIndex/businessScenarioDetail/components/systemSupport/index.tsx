import * as React from 'react';
import { Tag, Select, Tooltip, Icon,message as Message } from 'antd';
import { API } from "@/api";

import  './style.scss';

const { Option } = Select;

interface IProps{
  data: Array<any>;
  entId: string;
  senseId:string;
  onSyncFunc:Function
}

interface IState{
  tags: Array<any>,
  tagInputVisible: boolean,
  tagInputValue: any,
  openDropMenu: boolean,
  selectOPtions:[]
}

export default class SystemSupport extends  React.Component<IProps, IState>  {
  constructor(props:any) {
    super(props);
  }

  tagInput: any

  state:IState={
    tags: [],
    tagInputVisible: false,
    tagInputValue: [],
    openDropMenu: false,
    selectOPtions:[]
  }

  componentDidMount() {
    this.dropListUsingGet();
  }
  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (data !== this.props.data) {
      this.setState({
        tags: data
      });
    }
  }
  dropListUsingGet = () => {  //获取部门列表
    const { entId } = this.props;
    API.dropListUsingGet({ entId }).then(res => {
      const { message, success, data } = res;
      if (success) {
        this.setState({
          selectOPtions: data
        });
      } else {
        Message.error(message);
      }
    });
  };
  handleClose = (removedTag: string) => { //删除系统
    const {senseId} = this.props;
    API.delSystemUsingPost({ systemId:parseInt(removedTag),sceneId:senseId }).then(res => {
      const { message, success } = res;
      if (success) {
        this.props.onSyncFunc();
      } else {
        Message.error(message);
      }
    });
  };

  showInput = () => {
    this.setState({ tagInputVisible: true, openDropMenu: true }, () => this.tagInput.focus());
  };
  handleSelect = (val: string, option) => {   //添加系统
    const { children,value } = option.props;
    const { senseId,data} = this.props;
    if(!data.some((item)=>item.systemName==children)){
      API.addSystemUsingPost({ systemId:parseInt(value),sceneId:senseId }).then(res => {
        const { message, success } = res;
        if (success) {
          this.props.onSyncFunc();
        } else {
          this.props.onSyncFunc();
          Message.error(message);
        }
      });
    }
    this.setState({
      tagInputVisible: false,
      tagInputValue: [],
      openDropMenu: false,
    });
   
  };
  handleSelectBlur = () => {
    this.setState({
      tagInputVisible: false,
      tagInputValue: [],
      openDropMenu: false,
    });
  }

  saveInputRef = input => (this.tagInput = input);

  render(){
    const { tags, tagInputVisible, openDropMenu,selectOPtions} = this.state;
    return (
      <div className="system-support">
        <div className="top-box">
          系统支撑
        </div>
        <div className="tags-box">
        {tags.length > 0 && tags.map((tag, index) => {
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag key={`${tag.id}`} closable={true} onClose={() => this.handleClose(`${tag.id}`)}>
                {isLongTag ? `${tag.slice(0, 20)}...` : tag.systemName}
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag.systemName} key={`${tag.id}`}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}
          {tagInputVisible && (
            <Select
              ref={this.saveInputRef}
              onSelect={this.handleSelect} 
              onBlur={this.handleSelectBlur}
              style={{ width: 100 }} 
              size="small"
              open={openDropMenu}
            >
              {selectOPtions.map((item: any) => (
                <Option key={`${item.id}`} value={`${item.id}`}>{item.systemName}</Option>
              ))}
            </Select>
          )}
          {!tagInputVisible && (
            <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
              <Icon type="plus" />
            </Tag>
          )}
        </div>
      </div>
    )
  }
}
