import React from 'react';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render(){
        return (<footer className="footer">
        <div className="container">
          <div className="footer-main">
            <p className="footer-main-title">kangaroo</p>
             <a className="footer-main-link" target="_blank" href="https://www.dtstack.com/">袋鼠云--提供技术支持--dtux</a>
          </div>
        </div>
        </footer>)
    }
}