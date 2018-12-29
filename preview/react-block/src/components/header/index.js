import React from "react"
import classnames from 'classnames';
import logo from 'assets/imgs/logo_256.png'

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headerData:[
                {
                    name:"文档",
                    path:'/',
                    id:1
                },
                {
                    name:"组件",
                    path:'/com',
                    id:2
                },
                {
                    name:"区块",
                    path:'/block',
                    id:3
                },
                {
                    name:'脚手架',
                    path:'/scaffold',
                    id:4
                },
                {
                    name:'模版',
                    path:'/template',
                    id:4
                }
            ]
        };
    }
    setCurItem=(data)=>{
         let {headerData}=this.state;
         headerData.forEach(item=>{
             if(item.id==data.id){
                 item.active=true;
             }else{
                item.active=false;
             }
         })
        this.setState({headerData});
    }
    
    render(){
        const {location}=this.props;
        const {headerData}=this.state;
        return (
            <header className="header">
            <div className="container">
              <h1>
                <img src={logo} />
              </h1>
              <ul className="nav">
               {
                    headerData.map((item,idx)=>(
                    <li className="nav-item" key={idx}>
                        <a href={item.path} className={location.pathname==item.path?"active":""} onClick={this.setCurItem.bind(this,item)}>{item.name}</a>
                      </li>
                    ))
                }
              </ul>
              <ul className="nav-right">
                <li className="nav-item"> <a href="https://github.com/dtux-kangaroo" target="_blank">github</a></li>
                <li className="nav-item"> <a href="https://zhuanlan.zhihu.com/c_109929958" target="_blank">社区</a></li>
                <li className="nav-item"> <a href='/download' className={location.pathname=='/download'?"checked":""}>下载</a></li>
              </ul>
              
            </div>
          </header>
        )
    }
}