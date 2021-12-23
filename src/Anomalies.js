import React from 'react';
import ReactDOM from 'react-dom';
import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

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
            intervalTimer: 60000,
            tooltip: null,
            showDotR: 'hidden',
            showDotY: 'hidden',
            showDotG: 'hidden',
            showGreen: false,
            highAnomalies: 0
        }
    }

    getIntervalTimer() {}

    updateAnomaliesValue() {
        var highSum = 0;
        var highCount = 0;
        aData.map((data) => {
            highCount++;
            highSum += data.high;
        });
        this.setState(state => ({
            highAnomalies: highSum
        })); 
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

    displayGreenLine(showGreen) {
        if (showGreen) {
            return (
                <Line type="monotone" dataKey="high" stroke="green" strokeWidth={2} dot={{visibility: this.state.showDotG}}
                onMouseMove={() => this.setState(state => ({showDotG: 'visible'}))}
                onMouseLeave={() => this.setState(state => ({showDotG: 'hidden'}))}/>
            );
        } else {
            return null;
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

    componentDidMount() {
        this.updateValuesInterval = setInterval(() => this.updateAnomaliesValue(), this.intervalTimer);
    }

    componentWillUnmount() {
        clearInterval(this.updateValuesInterval);
    }

    render() {
        return (
            <div className="anomalyPanel">
                <div className="details">Status: {this.getIconFromValue(this.state.highAnomalies)}</div>
                <LineChart width={380} height={200} style={{cursor: 'inherit'}} data={aData}
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
                    {this.displayGreenLine(this.state.showGreen)}
                </LineChart>
            </div>
        );
    }
}

ReactDOM.render(
    <Anomalies />,
    document.getElementById('root')
);

export default Anomalies;