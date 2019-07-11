import React from "react"
import classnames from 'classnames';
export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headerData:[
                {
                    name:"文档",
                    link:'',
                    active:true,
                    id:1
                },
                {
                    name:"组件",
                    link:'',
                    active:false,
                    id:2
                },
                {
                    name:"区块",
                    link:'',
                    active:false,
                    id:3
                },
                {
                    name:'脚手架',
                    active:false,
                    id:4
                },
                {
                    name:'github',
                    active:false,
                    id:5
                }
            ]
        };
    }
    render(){
        const {data,location}=this.props;
        return (
            <nav className="side-nav">
              <ul>
                <li className="nav-item">
                  {/* <a>区块指南</a> */}
                  {
                    data.map((item ,idx)=> {
                      return (
                        <div className="nav-group" key={idx+1}>
                          <div className="nav-group__title">{item.name}</div>
                          <ul className="pure-menu-list">
                            {
                              item.children.map((child,idk )=> {
                                return (
                                  <li key={idk+idx+2} className="nav-item">
                                    <a href={`#${child.path}`} className={child.path ==location.pathname ? 'active' : ''}>{child.name}</a>
                                  </li>
                                )
                              })
                            }
                          </ul>
                        </div>
                      )
                    })
                  }
                </li>
              </ul>
            </nav>
        )
    }
}
