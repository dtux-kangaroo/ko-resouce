import * as React from "react";
import { DragSource, DropTarget } from "react-dnd";

interface IProps {
  prototypeData: Array<any>,
  handleOpenModal: any,
  onSyncFunc:Function,
  sceneId:string,
  [propName: string]: any;
}

interface IState {
  loading: boolean;
  data: any;
  visible: boolean,
  activeIndex:number,
}

let dragingIndex: number = -1;


const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index,
    };
  }
};
const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    if (dragIndex === hoverIndex) {
      return;
    }
    props.moveRow(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  },
};
@DropTarget('row', rowTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),  
}))
@DragSource('row', rowSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
    dragingIndex:dragingIndex
}))
class BodyRow extends React.PureComponent<IProps, IState>  {
    render() {
      const { isOver, connectDragSource, connectDropTarget,dragingIndex, ...restProps } = this.props;
      const style = { ...restProps.style, cursor: 'move' };
  
      let className = restProps.className;
      if (isOver) {
        if (restProps.index > dragingIndex) {
          className += ' drop-over-downward';
        }
        if (restProps.index < dragingIndex) {
          className += ' drop-over-upward';
        }
      }
  
      return connectDragSource&&connectDropTarget&&connectDragSource(
        connectDropTarget(<tr {...restProps} className={className} style={style} />),
      );
    }
  }
  export default BodyRow;
