import * as React from "react";
import { Tag, Tooltip, Icon, Select, message as Message } from "antd";
import { API } from "@/api";
import {uniqBy,includes} from 'lodash'; 
import "./style.scss";

const { Option } = Select;

interface IProps {
  data: Array<any>;
  entId: string;
  senseId:string;
  onSyncFunc:Function
}

interface IState {
  tags: Array<any>;
  selectOPtions: Array<any>;
  tagInputVisible: boolean;
  tagInputValue: any;
  openDropMenu: boolean;
}

export default class UseDepartment extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }
  tagInput: any;
  state: IState = {
    tags: [],
    selectOPtions: [],
    tagInputVisible: false,
    tagInputValue: [],
    openDropMenu: false
  };
  componentDidMount() {
    this.deptListUsingGet();
  }
  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (data !== this.props.data) {
      this.setState({
        tags: data
      });
    }
  }
  deptListUsingGet = () => {  //获取部门列表
    const { entId } = this.props;
    API.deptListUsingGet({ entId }).then(res => {
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
  handleClose = (removedTag: string) => { //删除部门
    const {senseId} = this.props;
    API.delDeptUsingPost({ deptId:parseInt(removedTag),sceneId:senseId }).then(res => {
      const { message, success } = res;
      if (success) {
        this.props.onSyncFunc();
      } else {
        Message.error(message);
      }
    });
  };

  showInput = () => {
    this.setState({ tagInputVisible: true, openDropMenu: true }, () =>
      this.tagInput.focus()
    );
  };

  handleInputChange = (value: string) => {
    this.setState({ tagInputValue: { id: "", deptName: value } });
  };

  handleSelect = (val: string, option) => {   //添加部门
    const { children } = option.props;
    const { entId ,senseId,data} = this.props;
    if(includes(data,children)){
      return
    }
    API.addDeptUsingPost({ entId,deptName:children,senseId }).then(res => {
      const { message, success } = res;
      if (success) {
        this.setState({
          tagInputVisible: false,
          tagInputValue: {},
          openDropMenu: false
        },()=>{
          this.props.onSyncFunc();
        });
      } else {
        this.props.onSyncFunc();
        Message.error(message);
      }
    });
   
  };

  handleSelectBlur = () => {
    this.setState({
      tagInputVisible: false,
      openDropMenu: false
    });
  };

  handleInputConfirm = () => {
    let { tags, tagInputValue } = this.state;
    let newTags = uniqBy([...tags, tagInputValue],'deptName');
    this.setState({
      tags: newTags,
      tagInputVisible: false,
      tagInputValue: {},
      openDropMenu: false
    });
  };

  saveInputRef = input => (this.tagInput = input);

  render() {
    const { tags, tagInputVisible, openDropMenu, selectOPtions } = this.state;
    return (
      <div className="use-department">
        <div className="top-box">使用部门</div>
        <div className="tags-box">
          {tags.length > 0 &&
            tags.map((item, index) => {
              const isLongTag = item.deptName.length > 20;
              const tagElem = (
                <Tag
                  key={`${item.id}`}
                  closable={true}
                  onClose={() => this.handleClose(`${item.id}`)}
                >
                  {isLongTag
                    ? `${item.deptName.slice(0, 20)}...`
                    : item.deptName}
                </Tag>
              );
              return isLongTag ? (
                <Tooltip title={item.deptName} key={`${item.id}`}>
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
              size="small"
              open={openDropMenu}
            >
              {selectOPtions.map((item: any) => (
                <Option key={`${item.id}`} value={`${item.id}`}>
                  {item.deptName}
                </Option>
              ))}
            </Select>
          )}
          {!tagInputVisible && (
            <Tag
              onClick={this.showInput}
              style={{ background: "#fff", borderStyle: "dashed" }}
            >
              <Icon type="plus" />
            </Tag>
          )}
        </div>
      </div>
    );
  }
}
