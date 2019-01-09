import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import './style.scss'
export default class Scaffold extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scaffoldList:[
                {
                    "name":"pc-react-redux-ant",
                    "url":"https://github.com/dtux-kangaroo/pc-react-ant.design.git",
                    "description":"基于react、redux和ant.design的pc项目"
                  },
                   {
                    "name":"pc-react-pwa",
                    "url":"https://github.com/dtux-kangaroo/pc-react-pwa.git",
                    "description":"基于react和pwa的pc项目"
                  },
                  {
                    "name":"pc-react-mobx-ant",
                    "url":":https://github.com/dtux-kangaroo/pc-react-mobx-ant.git",
                    "description":"基于react、mobx和ant.design的pc项目"
                  },
                  {
                    "name":"pc-vue-element",
                    "url":"https://github.com/dtux-kangaroo/pc-vue-element.git",
                    "description":"基于vue和element的pc项目"
                  },
                  {
                    "name":"mobile-react-ant.mobile",
                    "url":"https://github.com/dtux-kangaroo/pc-react-mobx-ant.git",
                    "description":"基于react和ant.mobile的移动端项目"
                  },
                  {
                    "name":"mobile-vue-vux",
                    "url":"https://github.com/dtux-kangaroo/mobile-vue-vux.git",
                    "description":"基于vue和vux的移动端项目"
                  },
                  {
                    "name":"applet-mpvue",
                    "url":"https://github.com/dtux-kangaroo/applet-mpvue.git",
                    "description":"基于mpvue的小程序项目"
                  },
                  {
                    "name":"ko-react-electron",
                    "url":"https://github.com/dtux-kangaroo/ko-react-electron.git",
                    "description":"基于eletron的桌面应用程序"
                  }
            ]
        };
      }
      render() {
        const { scaffoldList } = this.state;
        return <div className="scaffold">
            <Row gutter={20}>
                {scaffoldList.map((item, index) => (
                    <Col span={8} key={index} style={{ marginBottom: 20 }}>
                        <a href={item.url} target="_blank">
                        <Card
                            className="scaffoldList"
                            style={{ background: `#${Math.floor(Math.random() * (256)) + 100}` }}
						    bodyStyle={{ height: 209 }}
                            loading={false}
                            hoverable={true}
                        >
                            <div>
                                <div className="scaffoldName">
                                    {item.name}
                                </div>
                                <div className="description">
                                    {item.description}
                                </div>
                            </div>
                        </Card>
                      </a>
                    </Col>
                ))}
            </Row>
        </div>
    }
}