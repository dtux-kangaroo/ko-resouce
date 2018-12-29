import React, { Component } from 'react';
import MainLayout from './mainLayout'
import Iframe from 'react-iframe'
export default class templateLayout extends Component {
  render() {
    return (
      <MainLayout {...this.props}>
           {this.props.children}
      </MainLayout>
    );
  }
}