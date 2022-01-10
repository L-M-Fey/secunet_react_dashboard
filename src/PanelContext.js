import React from 'react';

export const MContext = React.createContext();  //exporting context object
class PanelContext extends React.Component {
    state = {
        color: {
            r: 255,
            g: 255,
            b: 255
        },
        timePeriod: 1,
        clock: {
            timezone: 'Europe/Berlin'
        },
        anomalies: {
            showGreen: false
        }
    }
    
    render() {
        return (
            <MContext.Provider value={
                {   
                    state: this.state,
                    changePanelColor: (newColor) => this.setState({
                        color: newColor }),
                    changeTimePeriod: (newPeriod) => this.setState({
                        timePeriod: newPeriod }),
                    changeTimeZone: (newTimezone) => this.setState({
                        clock: {
                            timezone: newTimezone
                        }}),
                    toggleGreen: (toggle) => this.setState({
                        anomalies: {
                            showGreen: toggle
                        }})
                }}>
                {this.props.children}
            </MContext.Provider>
        );
    }
}

export default PanelContext;