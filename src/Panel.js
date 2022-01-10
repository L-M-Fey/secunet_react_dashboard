import React from 'react';

import {MContext} from './PanelContext.js';
import PanelHeader from './PanelHeader.js';
import Clock from './Clock.js';
import Anomalies from './Anomalies.js';
import Indicator from './Indicator.js';

class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    getPanelColor(context) {
        try {
            return ({
                'backgroundColor': `rgba(${context.state.color.r}, ${context.state.color.g}, ${context.state.color.b}, 0.05)`,
                'borderColor': `rgba(${context.state.color.r}, ${context.state.color.g}, ${context.state.color.b}, 0.6)`
            });
        } catch (e) {
            console.log(e);
        }
    }

    getCorrectPanel(parent, context) {
        var parentName = parent.toLowerCase();
        switch (parentName) {
            case "clock":
                return(
                    <div className="panel" style={this.getPanelColor(context)}>
                        <PanelHeader parentName={parent} canRefresh="false"/>
                        <Clock/>
                    </div>
                );
            case "anomalies":
                return(
                    <div className="panel" style={this.getPanelColor(context)}>
                        <PanelHeader parentName={parent} canRefresh="true" refreshFn={() => this.content.updateAnomaliesValue()}/>
                        <Anomalies ref={instance => { this.content = instance; }}/>
                    </div>
                );
            case "indicator":
                return(
                    <div className="panel" style={this.getPanelColor(context)}>
                        <PanelHeader parentName={parent} canRefresh="true" refreshFn={() => this.content.updateIndividualValues()}/>
                        <Indicator ref={instance => { this.content = instance; }}/>
                    </div>
                );
        }
    }

    render() {
        var parent = `${this.props.parentName}`;
        return(
            <div className="flowBox tile" data-sizex={`${this.props.dataSizeX}`} data-sizey={`${this.props.dataSizeY}`} 
            data-row={`${this.props.dataRow}`} data-col={`${this.props.dataCol}`}>
                <MContext.Consumer>
                    {(context) => (
                        this.getCorrectPanel(parent, context)
                    )}
                </MContext.Consumer>
            </div>
        );
    }
}

export default Panel;