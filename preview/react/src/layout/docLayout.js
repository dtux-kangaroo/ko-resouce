import React, { Component } from 'react';
import MainLayout from './mainLayout'
import SideNav from '../components/sideNav'
import ScrollToTop from 'react-scroll-up';
export default class BlockLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
        sideData:[
            {
                name:"",
                path:'',
                children:[
                  {
                    name:'关于kangaroo',
                    path:'/'
                  },
                  {
                    name:'补充中...',
                    path:''
                  }
                ]
            },
            {
                name:"入门指引",
                path:'',
                children:[
                  {
                    name:'补充中...',
                    path:''
                  }
                ]
            }
        ]
    };
}
  render() {
    const {sideData}=this.state;
    return (
      <MainLayout {...this.props}>
          <div className="main container">
              <SideNav data={sideData} {...this.props}></SideNav>
              <div className="content">
               <div className="block-content">
                 {this.props.children}
               </div>
               <ScrollToTop showUnder={360}>
              <div className="page-component-up">
                <i className="el-icon-caret-top"></i>
              </div>
            </ScrollToTop>
            </div>
          </div>
      </MainLayout>
    );
  }
}