import * as React from 'react'
import { Form, Icon, Input, Button,message,Checkbox } from 'antd';
//import { NavLink } from "react-router-dom"; 
import './style.scss';
import {LocalDb} from 'roo-tool';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as global from "pages/global/action";

const FormItem = Form.Item;
interface IProps {
  loginInSaveUserData:(params:any,func:any) => void,
  history:any,
  form:any
}
interface IState{
  checked:boolean
}
 
@connect(
  state => ({ ...state.global }),
  dispatch => bindActionCreators({ ...global }, dispatch)
)
class Login extends React.Component <IProps,IState>{
  constructor(IProps:any) {
    super(IProps);
  }
  state:IState={
    checked:false,
  }
  componentDidMount() {
    
    const username = LocalDb.get('username');
    const password = LocalDb.get('password');
    const checked = LocalDb.get('checked');
    this.props.form.setFieldsValue({ username,password});
    this.setState({
      checked:Boolean(checked)
    })
  }
  componentWillReceiveProps(nextProps) {
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  }
  onChangeCheckBox = (e) => {
    const value  = e.target.checked;
    this.setState({
      checked:value
    })
  }
  remberLogin = (value) => {
    if(value){
      const { username,password }=this.props.form.getFieldsValue(['username','password']);
      LocalDb.set('username',username);
      LocalDb.set('password',password);
      LocalDb.set('checked',value);
    }else{
      LocalDb.set('username','');
      LocalDb.set('password','');
      LocalDb.set('checked',false);
    }   
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let flag:boolean=  (values.username||'').length && (values.password||'').length;
         this.props.history.push('/industry-index');   
          if(flag){
            // this.props.loginInSaveUserData(values,()=>{
            //   this.remberLogin(this.state.checked);
            //   message.config({ // 恢复可一次性多个弹框显示
            //     maxCount: 10
            //   });
            //   this.props.history.push('/industry-index');               
            // })
          }else{
            message.warning("账号密码输入有误，请重新输入")
          }
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const {checked} = this.state;
    return (
      <div className="login-bg">
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
            <div className="login-title">行业指标系统</div>          
        </FormItem>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入登陆账号!' }],
          })(
            <Input size='large'  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入登录账号" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入登陆密码!' }],
          })(
            <Input.Password size='large'  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入登录密码" />
          )}
        </FormItem>
        <FormItem>
          <Checkbox checked={ checked } onChange={this.onChangeCheckBox}>记住账号密码</Checkbox>
        </FormItem>
        <FormItem style={{marginTop:"10px"}}>
          <Button type="primary" size='large' htmlType="submit" className="login-form-button">登录</Button>
        </FormItem>
      </Form>
      </div>
    );
  }
}
export default  Form.create()(Login);
