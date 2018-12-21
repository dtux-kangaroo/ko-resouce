import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
const test=require('./test.md')

export default class MarkDown extends Component {
    //static displayName = 'MarkDown';
  
    constructor(props) {
      super(props);
      this.state = {
        input: `<h1>标题-hello</h1>`,
      };
    }
  
    componentDidMount() {
      //this.enquireScreenRegister();
    }
    render(){
        return (
            <ReactMarkdown source={test} />
        )
    }
}