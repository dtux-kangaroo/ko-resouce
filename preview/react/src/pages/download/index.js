import React, { Component } from 'react';
import './style.scss'
export default class Download extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render(){
        return (
            <div className="download-bg">
               <div className="download-content">
                <p className="slogon">
                    让前端开发快捷而高效
                </p>
                <p>
                 <a href="https://dtstack-static.oss-cn-hangzhou.aliyuncs.com/kangaroo/kangaroo_v1.0.0.dmg">
                  <i class="iconfont icon-download"></i>
                 </a>
                </p> 
               </div>
            </div>
        )
    }
}