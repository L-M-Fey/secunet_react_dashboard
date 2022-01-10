import React from 'react';
import {
    LineChart,
    Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';
import {MContext} from './PanelContext.js';

import greenCheckmark from './images/CheckmarkGreen.svg';
import redWarning from './images/WarningTriangleRed.svg';
import aData from './data/anomalies.json';

/*
const CustomTooltip = ({ active, payload }) => {
    if (!active || !this.state.tooltip) {
        return null;
    }
    for (const line of payload) {
        if (line.dataKey === tooltip) {}
    }
    return null;
}
*/

class Anomalies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            tooltip: null,
            showDotR: 'hidden',
            showDotY: 'hidden',
            showDotG: 'hidden',
            highAnomalies: 0
        }
        this.updateAnomaliesValue();
    }

    getIconFromValue(value) {
        if (value > 0) {
            //red warning triangle
            return (
                <img src={redWarning} alt="critical" width="15px"/>
            );
        } else {
            //green checkmark
            return (
                <img src={greenCheckmark} alt="ok" width="15px"/>
            );
        }
    }

    customDot(isVisible, radius) {
        return ({
            visibility: isVisible,
            stroke: "gray",
            strokeWidth: 1, 
            fill: "none",
            r: radius
        });
    }

    displayGreenLine(context) {
        try {
            if (context.state.anomalies.showGreen) {
                return (
                    <Line type="monotone" dataKey="low" stroke="green" strokeWidth={2} 
                    dot={this.customDot(this.state.showDotG, 5)} activeDot={this.customDot(this.state.showDotG, 6)}
                    onMouseMove={() => this.setState(state => ({showDotG: 'visible'}))}
                    onMouseLeave={() => this.setState(state => ({showDotG: 'hidden'}))}/>
                );
            } else {
                return null;
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    updateAnomaliesValue() {
        console.log("called updateAnomaliesValue()");
        this.state.data = aData;
        var highSum = 0;
        //var highCount = 0;
        this.state.data.map((data) => {
            //highCount++;
            highSum += data.high;
        });
        this.state.highAnomalies = highSum; 
    }

    componentDidMount() {
        this.updateValuesInterval = setInterval(() => this.updateAnomaliesValue(), 30000);
    }

    componentWillUnmount() {
        clearInterval(this.updateValuesInterval);
    }

    render() {
        return (
            <MContext.Consumer>
                {(context) => (
                    <div className="anomalyPanel">
                        <div className="details">Status: {this.getIconFromValue(this.state.highAnomalies)}</div>
                        <LineChart width={380} height={200} style={{cursor: 'inherit'}} data={this.state.data}
                        margin={{ top: 20, right: 0, left: -30, bottom: 0 }}>
                            <CartesianGrid vertical={false} strokeDasharray="1 0"/>
                            <XAxis dataKey="time" hide={true}/>
                            <YAxis/>
                            <Tooltip/>
                            <Line type="monotone" dataKey="high" stroke="red" strokeWidth={2} 
                            dot={this.customDot(this.state.showDotR, 5)} activeDot={this.customDot(this.state.showDotR, 6)} 
                            onMouseMove={() => this.setState(state => ({showDotR: 'visible'}))}
                            onMouseLeave={() => this.setState(state => ({showDotR: 'hidden'}))}/>
                            <Line type="monotone" dataKey="medium" stroke="#d6c842" strokeWidth={2} 
                            dot={this.customDot(this.state.showDotY, 5)} activeDot={this.customDot(this.state.showDotY, 6)} 
                            onMouseMove={() => this.setState(state => ({showDotY: 'visible'}))}
                            onMouseLeave={() => this.setState(state => ({showDotY: 'hidden'}))}/>
                            {this.displayGreenLine(context)}
                        </LineChart>
                    </div>
                )}
            </MContext.Consumer>
        );
    }
}

export default Anomalies;