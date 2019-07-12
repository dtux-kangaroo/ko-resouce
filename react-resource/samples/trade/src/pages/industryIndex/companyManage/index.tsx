import * as React from 'react';
import { Input, Button, Tag, List, Card, Avatar, Modal, Pagination } from 'antd';
import  './style.scss';
import ModalForm from './components/modalForm';
import { API, URL } from "@/api/index";
import Http from '@/utils/http';
import { message as Message } from 'antd';

const Search = Input.Search;
const confirm = Modal.confirm;
const CheckableTag = Tag.CheckableTag;
const { Meta } = Card;

interface IProps{
  history: any,
  location: any,
}

interface IState{
  searchValue: any,
  industryTags: Array<any>,
  selectedIndustry: number,
  conmpanyList: Array<any>,
  modalVisible: boolean,
  currentEditItem: any,
  pageNo: number,
  pageSize: number,
  total: number,
}

export default class CompanyManage extends  React.Component<IProps, IState>  {
  constructor(props:any) {
    super(props);
  }

  state:IState={
    searchValue: '',
    industryTags: [],
    selectedIndustry: -2,
    pageNo: 1,
    pageSize: 9,
    total: 0,
    conmpanyList: [],
    modalVisible: false,
    currentEditItem: {},
  }

  modalForm: any

  componentDidMount () {
    const { location } = this.props;
    if (location.state && location.state.id) {
      this.setState({
        selectedIndustry: location.state.id
      }, () => {
        this.getIndustryListUsingGet();
        this.listEntsUsingPost();
      })
    } else {
      this.getIndustryListUsingGet();
      this.listEntsUsingPost();
    }
  }

  listEntsUsingPost = () => { // 获取企业列表
    const { pageNo, pageSize, searchValue, selectedIndustry } = this.state;
    let params: any = {
      pageNo: pageNo,
      pageSize: pageSize,
    }
    if (searchValue != '') {
      params.search = searchValue;
    }
    if (selectedIndustry != -2) {
      params.industryId = selectedIndustry;
    }
    API.listEntsUsingPost(params).then((response: any) =>{ 
      const { message, success, data } = response;
      if (success) {
        this.setState({
          conmpanyList: data ? data.contentList : [],
          total: data ? data.total : 0
        })
      } else {
        Message.error(message);
      }
    });
  }

  getIndustryListUsingGet = () => { // 获取行业列表
    API.getIndustryListUsingGet().then((response: any) =>{ 
      const { message, success, data } = response;
      if (success) {
        this.setState({
          industryTags: [{id: -2,industryName: '全部'}, ... data, {id: -1,industryName: '未分配'}]
        })
      } else {
        Message.error(message);
      }
    });
  }

  handlePageChange = (page: number, pageSize: number) => {
    this.setState({
      pageNo: page,
      pageSize: pageSize,
    }, () => {
      this.listEntsUsingPost();
    })
  }

  handleSearchChange = (e: any) => {
    this.setState({ searchValue: e.target.value });
  }

  handleSearch = () => {
    this.listEntsUsingPost();
  }

  handleConfirmDelete = (item: any, e: any) => {
    e.stopPropagation();
    const _this = this;
    confirm({
      title: '请确认是否要删除企业？',
      okText: "确认",
      cancelText: "取消",
      onOk() {
        API.deleteUsingPost({
          id: item.id
        }).then((response: any) =>{ 
          const { message, success } = response;
          if (success) {
            Message.success("删除成功");
            _this.setState({
              pageNo: 1
            }, () => {
              _this.listEntsUsingPost();
            })
          } else {
            Message.error(message);
          }
        });
      },
      onCancel() {
        
      },
    });
  }
  
  handleConfirmToTop = (item: any, e: any) => {
    e.stopPropagation();
    const _this = this;
    confirm({
      title: '是否要进行置顶？',
      okText: "确认",
      cancelText: "取消",
      onOk() {
        API.isStickUsingGet({
          id: item.id
        }).then((response: any) =>{ 
          const { message, success } = response;
          if (success) {
            Message.success("置顶成功");
            _this.setState({
              pageNo: 1
            }, () => {
              _this.listEntsUsingPost();
            })
          } else {
            Message.error(message);
          }
        });
      },
      onCancel() {
        
      },
    });
  }
    
  handleConfirmCancelTop = (item: any, e: any) => {
    e.stopPropagation();
    const _this = this;
    confirm({
      title: '是否要进行取消置顶？',
      okText: "确认",
      cancelText: "取消",
      onOk() {
        API.isStickUsingGet({
          id: item.id
        }).then((response: any) =>{ 
          const { message, success } = response;
          if (success) {
            Message.success("取消置顶成功");
            _this.setState({
              pageNo: 1
            }, () => {
              _this.listEntsUsingPost();
            })
          } else {
            Message.error(message);
          }
        });
      },
      onCancel() {
        
      },
    });
  }

  handleTagChange = (item: any) => {
    this.setState({
      selectedIndustry: item.id
    }, () => {
      this.listEntsUsingPost();
    })
  }

  handleViewCompany = (item: any, e: any) => {
    e.stopPropagation();
    this.props.history.push(`/industry-index/company-details?id=${item.id}`);
  }

  handleModalOpen = (item: any: e: any) => {
    e.stopPropagation();
    this.setState({
      modalVisible: true,
      currentEditItem: item,
    });
  }

  handleModalCancel = () => {
    this.setState({
      modalVisible: false,
      currentEditItem: {},
    });
  }

  handleModalOk = () => {
    const { currentEditItem } = this.state;
    this.modalForm.props.form.validateFields((errors: any, values: any) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      values.file = this.modalForm.state.fileList && this.modalForm.state.fileList.length  > 0 ? this.modalForm.state.fileList[0] :'';
      let params: any = { ...values };
      if (currentEditItem.id) {
        params.id = currentEditItem.id;
        params.entImage = this.modalForm.state.fileList && this.modalForm.state.fileList.length > 0 ? currentEditItem.entImage : '';
      }
      Http.postForm(URL.entPersistUsingPost,params, {}).then((response: any) =>{ 
        const { message, success} = response;
        if (success) {
          Message.success(!currentEditItem.id ? "添加成功" : "修改成功");
          this.setState({
            modalVisible: false,
            currentEditItem: {},
          });
          this.listEntsUsingPost();
        } else {
          Message.error(message);
        }
      });
    });
  }

  render(){
    const { searchValue, industryTags, selectedIndustry, conmpanyList, currentEditItem, pageNo, pageSize, total, modalVisible } = this.state;
    return (
      <div className="company-manage">
        <div className="top-box">
          <Search
            placeholder="请输入企业名称"
            enterButton="搜索"
            value={searchValue}
            onChange={this.handleSearchChange}
            onSearch={this.handleSearch}
            style={{ width: '25%' }}
            // size={"large"}
          />
          <Button type="primary" onClick={this.handleModalOpen.bind(this,{})}>新增企业</Button>
        </div>
        <div className="cm-content">
          <div className="industry-filter">
            <div className="left-box">行业名称：</div>
            <div className="right-box">
              {industryTags.map((item: any) => (
                <CheckableTag
                  key={item.id}
                  checked={item.id == selectedIndustry}
                  onChange={this.handleTagChange.bind(this,item)}
                >
                  {item.industryName}
                </CheckableTag>
              ))}
            </div>
          </div>
          <div className="company-list-box">
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={conmpanyList}
              renderItem={(item: any) => (
                <List.Item style={{ cursor: 'pointer' }} key={item.id} onClick={this.handleViewCompany.bind(this,item)}>
                  <Card 
                    // title={item.title}
                    actions={[<span onClick={this.handleModalOpen.bind(this,item)}>编辑</span>,<span style={{ color: 'red' }} onClick={this.handleConfirmDelete.bind(this,item)}>删除</span>]}
                    // extra={<a href="#">More</a>}
                  >
                    <div className="top-operate-box">
                      {item.isStick == 1 && <img onClick={this.handleConfirmCancelTop.bind(this,item)} src={require(`assets/imgs/top.png`)} style={{ width: 22, marginLeft: 5 }} />}
                      {item.isStick == 0 && <img onClick={this.handleConfirmToTop.bind(this,item)} src={require(`assets/imgs/totop.png`)} style={{ width: 22, marginLeft: 5 }} />}
                      {/* <img src={require(`assets/imgs/delete3.png`)} onClick={this.handleConfirmDelete.bind(this,item)} style={{ marginLeft: 5 }} /> */}
                    </div>
                    <Meta
                      avatar={<Avatar src={item.entImage} />}
                      title={item.entName}
                      description={<div className="company-intro">
                        {item.entRemark}<br /><br />{item.createAt}
                      </div>}
                    />
                  </Card>
                </List.Item>
              )}
            />
            <div className="pagination">
              <Pagination hideOnSinglePage current={pageNo} total={total} pageSizeOptions={['9','18','27','36']} pageSize={pageSize} onChange={this.handlePageChange} showSizeChanger showQuickJumper/>
            </div>
          </div>
        </div>
        <ModalForm 
          industryTags={industryTags}
          currentEditItem={currentEditItem}
          visible={modalVisible}
          onOk={this.handleModalOk}
          onCancel={this.handleModalCancel}
          wrappedComponentRef={(form: any) => this.modalForm = form}
        />
      </div>
    )
  }
}
