import React from 'react';

import {MContext} from './PanelContext.js';

import closeIcon from './images/PanelClose.svg';
import cancelIcon from './images/IconCancel.svg';
import confirmIcon from './images/IconConfirm.svg';

class PopupMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: {
                r: 255,
                g: 255,
                b: 255
            },
            timePeriod: 1,
            clock: {
                timezone: 'Europe/Berlin',
                timezones: [
                    {id: 'Europe/Berlin', name: 'Europe (Central European Time)'},
                    {id: 'Asia/Singapore', name: 'Singapore Time'},
                    {id: 'Australia/Melbourne', name: 'Melbourne (Australian Eastern Time)'},
                    {id: 'UTC', name: 'UTC'}
                ]
            },
            anomalies: {
                showGreen: false
            }
        }
    }

    sendSettingsData(parent, context) {
        switch (parent) {
            case "clock":
                context.changeTimeZone(this.state.clock.timezone);
                break;
            case "anomalies":
                context.changeTimePeriod(this.state.timePeriod);
                context.toggleGreen(this.state.anomalies.showGreen);
                break;
            case "indicator":
                context.changeTimePeriod(this.state.timePeriod);
                break;
        }
    }

    sendColorData(context) {
        context.changePanelColor(this.state.color);
    }

    getSettings(parent) {
        switch (parent) {
            case "clock":
                const { timezones } = this.state.clock;
                var timezonesList = timezones.map((item, i) => {
                    return(<option key={i} value={item.id}>{item.name}</option>)
                }, this)
                return( 
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="gwt-Label">TimeZone</div>
                                </td>
                                <td>
                                    <select onChange={(e) => {
                                        this.setState(state => ({
                                            clock: {
                                                timezone: e.target.value,
                                                timezones: state.clock.timezones
                                            }
                                        }));
                                    }}>
                                        {timezonesList}
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table> 
                );
            case "anomalies":
                return( 
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="gwt-Label">Zeitraum (Stunden)</div>
                                </td>
                                <td>
                                    <input type="number" pattern="[0-9]*" inputMode="numeric" min={1} max={24} value={this.state.timePeriod} onChange={(e) => {
                                        this.setState(state => ({
                                            timePeriod: e.target.value
                                        }));
                                    }}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="gwt-Label">"None"-Severity Alarme anzeigen</div>
                                </td>
                                <td>
                                    <input type="checkbox" checked={this.state.anomalies.showGreen} onChange={(e) => {
                                        this.setState(state => ({
                                            anomalies: {
                                                showGreen: !(state.anomalies.showGreen)
                                            }
                                        }));
                                    }}/>
                                </td>
                            </tr>
                        </tbody>
                    </table> 
                );
            case "indicator":
                return( 
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="gwt-Label">Zeitraum (Stunden)</div>
                                </td>
                                <td>
                                    <input type="number" pattern="[0-9]*" inputMode="numeric" min={1} max={24} value={this.state.timePeriod} onChange={(e) => {
                                        this.setState(state => ({
                                            timePeriod: e.target.value
                                        }));
                                    }}/>
                                </td>
                            </tr>
                        </tbody>
                    </table> 
                );
        }
    }

    getPopupContent(type, parent) {
        var popupType = type.toLowerCase();
        var parentName = parent.toLowerCase();
        switch (popupType) {
            case "color":
                return(
                    <table>
                        <tbody>
                            <tr>
                                <td>Red</td>
                                <td>Green</td>
                                <td>Blue</td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="number" pattern="[0-9]*" inputMode="numeric" min={0} max={255} value={this.state.color.r} onChange={(e) => {
                                        this.setState(state => ({
                                            color: {
                                                r: e.target.value,
                                                g: state.color.g,
                                                b: state.color.b
                                            }
                                        }));
                                    }}/>
                                </td>
                                <td>
                                    <input type="number" pattern="[0-9]*" inputMode="numeric" min={0} max={255} value={this.state.color.g} onChange={(e) => {
                                        this.setState(state => ({
                                            color: {
                                                r: state.color.r,
                                                g: e.target.value,
                                                b: state.color.b
                                            }
                                        }));
                                    }}/>
                                </td>
                                <td>
                                    <input type="number" pattern="[0-9]*" inputMode="numeric" min={0} max={255} value={this.state.color.b} onChange={(e) => {
                                        this.setState(state => ({
                                            color: {
                                                r: state.color.r,
                                                g: state.color.g,
                                                b: e.target.value
                                            }
                                        }));
                                    }}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                );
            case "settings":
                return this.getSettings(parentName);
        }
    }

    closePopupMenu(type, parent, context) {
        var popupType = type.toLowerCase();
        var parentName = parent.toLowerCase();
        switch (popupType) {
            case "color":
                this.sendColorData(context);
                break;
            case "settings": 
                this.sendSettingsData(parentName, context);
                break;
        }
        this.props.handleCloseCallback();
    }

    render() {
        var parent = `${this.props.parentName}`;
        var popupTitle = `${this.props.popupTitle}`;
        var popupType = `${this.props.popupType}`;
        var popupWidth = `${this.props.pWidth}`;
        return (
            <div className="popupOuter">
                <div className="gwt-PopupPanel iasdialogpanel" style={{
                    "width": popupWidth, 
                    "margin": "auto",
                    "left": "50%" }}>
                    <div className="iasdialog">
                        <div className="dialogHeader">
                            <div className="dialogTitle">{popupTitle}</div>
                            <div className="controls">
                                {popupType==="color" ? (
                                    <button type="button" className="factoryButton imageButton" onClick={this.props.handleCloseCallback}>
                                        <div className="iconText">
                                            <img className="buttonIcon" src={closeIcon} alt="Close"/>
                                        </div>
                                    </button>
                                ) : (
                                    <MContext.Consumer>
                                        {(context) => (
                                            <button type="button" className="factoryButton imageButton" onClick={() => this.closePopupMenu(popupType, parent, context)}>
                                                <div className="iconText">
                                                    <img className="buttonIcon" src={closeIcon} alt="Close"/>
                                                </div>
                                            </button>
                                        )}
                                    </MContext.Consumer>
                                )}
                            </div>
                        </div>
                        <div className="dialogContent">
                            <MContext.Consumer>
                                    {(context) => (
                                        <div>
                                            {this.getPopupContent(popupType, parent)}
                                            {popupType==="color" ? (
                                                <div className="popupButtons">
                                                    <button type="button" className="factoryButton imageButton" onClick={this.props.handleCloseCallback}>
                                                        <div className="iconText">
                                                            <img className="buttonIcon" src={cancelIcon} alt="Cancel"/>
                                                            Zurücksetzen
                                                        </div>
                                                    </button>
                                                    <button type="button" className="factoryButton imageButton" onClick={() => this.closePopupMenu(popupType, parent, context)}>
                                                        <div className="iconText">
                                                            <img className="buttonIcon" src={confirmIcon} alt="Confirm"/>
                                                            OK
                                                        </div>
                                                    </button>
                                                </div>
                                            ) : (null)}                                            
                                        </div>
                                    )}
                            </MContext.Consumer>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PopupMenu;