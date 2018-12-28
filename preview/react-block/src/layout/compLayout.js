import React, { Component } from 'react';
import MainLayout from './mainLayout'
import Iframe from 'react-iframe'
export default class CompLayout extends Component {
  render() {
    return (
      <MainLayout {...this.props}>
           <div>
             <Iframe url="https://dtux-kangaroo.github.io/ko-react/#/zh-CN/quick-start?type=source"
            width="100%"
            height="900"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
            allowFullScreen/>
           </div>
          <div> {this.props.children}</div>
      </MainLayout>
    );
  }
}