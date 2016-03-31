import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './index.scss';

export default class FlowStone extends Component {

    render() {
        return (
          <ReactCSSTransitionGroup transitionName="stone" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
            <div key={1} style={{top:this.props.stone.y*55, left:this.props.stone.x*55}}
                 onMouseDown={event => this.props.onSelect(event, this.props.stone)}
                 className={"stone stone-"+this.props.stone.value}>
            </div>
          </ReactCSSTransitionGroup>
        );
    }

}

FlowStone.propTypes  = {
    stone: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired
}
