import React, { Component } from 'react';
export default class BlockLayout extends Component {
  render() {
    return (
      <div style={{ minHeight: '100vh' }} className="ice-blank-layout">
        {this.props.children}
      </div>
    );
  }
}