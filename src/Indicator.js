import React from 'react';
import ReactDOM from 'react-dom';
import {PieChart, Pie} from 'recharts';

import greenCheckmark from './images/CheckmarkGreen.svg';
import redWarning from './images/WarningTriangleRed.svg';
import data from './data/indicator.json';

class Indicator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            intervalTimer: 60000,
            atdPercentage: 0,
            anomalyPercentage: 0,
            compliancePercentage: 0,
            sensorPercentage: 0,
            averagePercentage: 0
        };
        this.updateIndividualValues();
    }

    getIntervalTimer() {}

    updateIndividualValues() {
        data.map((data) => {
            var key = data.key;
            switch (key) {
                case "atdPercentage": 
                    this.setState(state => ({
                        atdPercentage: data.value
                    }));
                    break;
                case "anomalyPercentage": 
                    this.setState(state => ({
                        anomalyPercentage: data.value
                    })); 
                    break;
                case "compliancePercentage": 
                    this.setState(state => ({
                        compliancePercentage: data.value
                    }));
                    break;
                case "sensorPercentage": 
                    this.setState(state => ({
                        sensorPercentage: data.value
                    })); 
                    break;
            }
        });

        this.getAverage(this.state.atdPercentage,this.state.anomalyPercentage,this.state.compliancePercentage,this.state.sensorPercentage);
    }

    getAverage(atd, anomaly, compliance, sensor) {
        this.setState(state => ({
            averagePercentage: Math.round((atd + anomaly + compliance + sensor) / 4)
        }));
    }

    getIconFromValue(value) {
        if (value >= 96) {
            //green checkmark
            return (
                <img src={greenCheckmark} alt="ok" width="15px"/>
            );
        } else if (value >= 55 && value <= 95) {
            return (
                <span style={{
                    'color': '#f6e842', 
                    'font-size': '16px'
                }}>•</span>
            );
        } else {
            //red warning triangle
            return (
                <img src={redWarning} alt="critical" width="15px"/>
            );
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.updateIndividualValues(), this.intervalTimer);
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <table className="indicatorGrid">
                    <tbody>
                        <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>
                                <PieChart width={120} height={120}>
                                    <Pie data={[
                                        {
                                            name: 'empty', value: 100-this.state.averagePercentage, fill: 'white'
                                        }, {
                                            name: 'average', value: this.state.averagePercentage, fill: 'limegreen'
                                        }
                                    ]} dataKey="value" outerRadius={60} innerRadius={55}/>
                                </PieChart>
                                <div className="pieLabel">
                                    {this.state.averagePercentage}%
                                </div>
                            </td>
                            <td>
                                <div className="genericTable keynumbercolumnprovider lightweight">
                                    <table className="indicatorData">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{this.getIconFromValue(this.state.atdPercentage)}</td>
                                                <td>{this.state.atdPercentage}%</td>
                                                <td>Unauffällige Verbindungen (ATD)</td>
                                            </tr>
                                            <tr>
                                                <td>{this.getIconFromValue(this.state.anomalyPercentage)}</td>
                                                <td>{this.state.anomalyPercentage}%</td>
                                                <td>
                                                    Netwerkverhalten (Anomalien)
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{this.getIconFromValue(this.state.compliancePercentage)}</td>
                                                <td>{this.state.compliancePercentage}%</td>
                                                <td>Compliance Einhaltung</td>
                                            </tr>
                                            <tr>
                                                <td>{this.getIconFromValue(this.state.sensorPercentage)}</td>
                                                <td>{this.state.sensorPercentage}%</td>
                                                <td>Sensor-Verfügbarkeit</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div></div>
            </div>
        );
    }
}

ReactDOM.render(
    <Indicator />,
    document.getElementById('root')
);

export default Indicator;