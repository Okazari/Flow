import React, {Component, PropTypes} from 'react';

import './index.scss';

export default class FlowStone extends Component {
    
    render() {
        return (
            <div className="stone-wrapper">
                <div onClick={event => this.props.onclick(event, this.props.type)} className={"stone stone-"+this.props.type}>
                </div>
            </div>
        );
    }
    
}

FlowStone.propTypes  = {
    type: PropTypes.number.isRequired,
    onclick: PropTypes.func.isRequired
}