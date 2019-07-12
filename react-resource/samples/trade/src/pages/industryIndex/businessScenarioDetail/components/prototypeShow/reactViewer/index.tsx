import * as React from "react";
import { Icon, Modal, Carousel } from "antd";
import './style.scss';

interface IProps {
  visible: boolean;
  onCancel: Function;
  data: Array<any>;
  activeIndex:number
}
interface IState {
  showData: Array<any>
}

class ReactViewer extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }

  state: IState = {
    showData: []
  };
  carouselRef: any;
  componentDidMount() {}
  componentWillReceiveProps(nextProps: any) {
      const {activeIndex} = nextProps;
      if(activeIndex!==this.props.activeIndex){
        if (this.carouselRef) {
          this.setState({
            showData: nextProps.data
          });
          this.carouselRef.goTo(activeIndex,true);
        } else { // 第一次加载预览框
          this.setState({
            showData: [...nextProps.data.slice(activeIndex), ...nextProps.data.slice(0,activeIndex)]
          }) 
        }
      }
  }
  handlePreClick = () => {
    this.carouselRef.prev();
  };

  handleNextClick = () => {
    this.carouselRef.next();
  };
  onCancel = () => {
    this.props.onCancel();
  };
  render() {
    const { visible } = this.props;
    const { showData } = this.state;
    return (
      <Modal
        visible={visible}
        onCancel={this.onCancel}
        width={800}
        footer={null}
        closable={false}
        bodyStyle={{ padding: "0px" }}
      >
        <div className="img-show-modal">
          <div onClick={this.handlePreClick} className="left-btn">
            <Icon style={{ fontSize: 28, color: "#fff" }} type="left" />
          </div>
          <Carousel style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0)' }} dots={false} ref={(ref: any) => (this.carouselRef = ref)}>
            {showData.map((item) => (
              <img key={item.prcId} src={item.prcImage} alt={item.prcName}/>
            ))}
          </Carousel>
          <div onClick={this.handleNextClick} className="right-btn">
            <Icon style={{ fontSize: 28, color: "#fff" }} type="right" />
          </div>
        </div>
      </Modal>
    );
  }
}

export default ReactViewer;
