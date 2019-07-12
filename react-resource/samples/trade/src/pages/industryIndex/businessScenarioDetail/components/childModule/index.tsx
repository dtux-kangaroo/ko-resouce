import * as React from "react";
import "./style.scss";

interface IProps {
  data: Array<any>;
  history: any;
  entId: string;
  entName: string;
}

interface IState {
  cmValue: Array<any>;
}

export default class ChildModule extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }

  state: IState = {
    cmValue: []
  };
  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (data !== this.props.data) {
      this.setState({
        cmValue: data
      });
    }
  }
  onLookModule = (id,name) => {
    const {entName,entId} = this.props;
    this.props.history.replace(`/industry-index/business-scenario-detail?`, {
      entName,
      entId,
      id,
      title:name
    });
  };
  render() {
    const { cmValue } = this.state;
    return (
      <div className="child-module">
        <div className="top-box">子模块</div>
        <div className="cm-content">
          {cmValue.map((item: any, index: number) => (
            <a
              key={item.id}
              style={{ marginRight: 20 }}
              onClick={() => this.onLookModule(item.id,item.sceneName)}
            >
              {item.sceneName}
            </a>
          ))}
        </div>
      </div>
    );
  }
}
