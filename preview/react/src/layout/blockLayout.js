/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-28 19:08:08
 * @LastEditors: Charles
 * @LastEditTime: 2018-12-29 14:35:05
 */

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
                name:"信息展示",
                path:'',
                children:[
                  {
                    name:'品牌展示',
                    path:'/block'
                  },
                  {
                    name:'关于公司',
                    path:'/block/about'
                  }
                ]
            },
            {
                name:"图表",
                path:'',
                children:[
                  {
                    name:'叠加面积图',
                    path:'/block/chart-pie'
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