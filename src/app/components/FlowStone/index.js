import React, {Component, PropTypes} from 'react';
import './index.scss';

export default class FlowStone extends Component {

    render() {
        return (
            <div style={{top:this.props.stone.y*55, left:this.props.stone.x*55}}
                 onMouseDown={event => this.props.onSelect(event, this.props.stone)}
                 className={"stone stone-"+this.props.stone.value}>
            </div>
        );
    }

}

FlowStone.propTypes  = {
    stone: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired
}
