import React, {Component, PropTypes} from 'react';

import FlowStone from '../FlowStone'
import './index.scss';

export default class FlowColumns extends Component {
    
    render() {
        
        const renderStones = (stoneType, key) => {
        return (
            <FlowStone key={key} type={stoneType} onclick={(event, value) => this.props.onClickElement(event, key, value)}>
            </FlowStone>
            )
        }
        
        return (
            <div className="flow-column">
            {this.props.elements.map(renderStones)}
            </div>
        );
    }
    
}

FlowColumns.propTypes  = {
    elements: PropTypes.array.isRequired,
    onClickElement : PropTypes.func.isRequired
}