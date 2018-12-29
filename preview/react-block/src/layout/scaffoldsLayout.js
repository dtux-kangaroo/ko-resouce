import React, { Component } from 'react';
import MainLayout from './mainLayout'
import Iframe from 'react-iframe'
export default class scaffoldsLayout extends Component {
  render() {
    return (
      <MainLayout {...this.props}>
           <div>
            {this.props.children}
           </div>
      </MainLayout>
    );
  }
}