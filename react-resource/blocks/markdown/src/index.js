import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

export default class MarkDown extends Component {
    static displayName = 'MarkDown';
  
    constructor(props) {
      super(props);
      this.state = {
        input: `<h1>标题</h1>`,
      };
    }
  
    componentDidMount() {
      this.enquireScreenRegister();
    }
    render(){
        return (
            <ReactMarkdown source={this.state.input} />
        )
    }
}