import React, {Component, PropTypes} from 'react';

import FlowStone from '../FlowStone'
import './index.scss';

export default class FlowColumns extends Component {
    
    renderStones(stoneType, key){
        return (
            <FlowStone key={key} type={stoneType}>
            </FlowStone>
            )
    }
    
    render() {
        return (
            <div className="flow-column">
            {this.props.elements.map(this.renderStones)}
            </div>
        );
    }
    
}

FlowColumns.propTypes  = {
    elements: PropTypes.array.isRequired
}