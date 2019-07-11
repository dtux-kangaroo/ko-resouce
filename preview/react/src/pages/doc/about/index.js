import React, { Component } from 'react';
import marked from 'marked';
import prism from 'prismjs';
import document from './about.md';
export default class Doc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            html:''
        };
        this.renderer = new marked.Renderer();
        this.renderer.table = (header, body) => {
          return `<table class="grid"><thead>${header}</thead><tbody>${body}</tbody></table>`;
        };
      }
    componentDidMount(){
        this.renderMd()
    }
    renderMd=()=>{
        const html = marked(document, { renderer: this.renderer });
        this.setState({html});
        prism.highlightAll();
    }
    render(){
        const {html}=this.state
        return (
        <div dangerouslySetInnerHTML={{
          __html: html
        }} />
      )
    }
}