import React from 'react';

import {MContext} from './PanelContext.js';
import PopupMenu from './PopupMenu.js'

import refreshTab from './images/RefreshTab.svg';
import configTab from './images/ConfigTab.svg';
import panelSettingsIcon from './images/PanelSettings.svg';
import panelColorIcon from './images/PanelColor.svg';

class PanelHeader extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
            showDropdown: false,
            showColorMenu: false,
            showConfigMenu: false
        }

        this.openDropdown = this.openDropdown.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
        this.openColorMenu = this.openColorMenu.bind(this);
        this.closeColorMenu = this.closeColorMenu.bind(this);
        this.openConfigMenu = this.openConfigMenu.bind(this);
        this.closeConfigMenu = this.closeConfigMenu.bind(this);
        this.buttonRef = React.createRef();
    }

    checkRefresh(event) {
        var cNames = event.currentTarget.className.split(" ");
        var parent = cNames[cNames.length-1].replace("_R","");
        console.log(parent);
    }

    openDropdown(event) {
        event.preventDefault();
        this.setState(state => ({
            showDropdown: true
        }), () => {
            setTimeout(() => document.addEventListener('click', this.closeDropdown), 100);
        });
    }

    closeDropdown() {
        this.setState(state => ({
            showDropdown: false
        }), () => {
            document.removeEventListener('click', this.closeDropdown);
        });
    }

    placeDropdown() {
        var position = this.buttonRef.current.getBoundingClientRect();
        return({
            'position': 'fixed',
            'overflow': 'visible',
            'left': `${position['left']-117}px`,
            'top': `${position['bottom']}px`
        });
    }

    openColorMenu() {
        this.setState(state => ({
            showColorMenu: true
        }));
    }

    closeColorMenu() {
        this.setState(state => ({
            showColorMenu: false
        }));
    }

    openConfigMenu() {
        this.setState(state => ({
            showConfigMenu: true
        }));
    }

    closeConfigMenu() {
        this.setState(state => ({
            showConfigMenu: false
        }));
    }

    getTimePeriod(context) {
        try {
            return (context.state.timePeriod);
        } catch (e) {
            console.log(e);
        }
    }

    getHeaderTitle(parent) {
        var title = "";
        var parentName = parent.toLowerCase();
        switch (parentName) {
            case "clock":
                title = "Uhr";
                break;
            case "anomalies":
                title = "Anomalien";
                break;
            case "indicator":
                title = "Kennzeichen";
                break;
        }
        return(
            <input type="text" defaultValue={title} placeholder={title} className="headerName borderlessInput"/>
        );
    }

    render() {
        var parent = `${this.props.parentName}`;
        var canRefresh = `${this.props.canRefresh}`;
        return(
            <MContext.Consumer>
                {(context) => (
                    <div className="panelHeader">
                        {this.getHeaderTitle(parent)}
                        {(parent.toLowerCase()==="anomalies" || parent.toLowerCase()==="indicator") ? (
                            <div className="timePeriod">({this.getTimePeriod(context)}h)</div>
                        ) : (null)}
                        <div className="headerButtons">
                            {canRefresh==="true" ? (
                                <button type="button" className={`factoryButton imageButton ${parent}_R`} 
                                onClick={(event) => {this.props.refreshFn(); this.checkRefresh(event);}}>
                                    <img className="buttonIcon" src={refreshTab} alt="Refresh"/>
                                </button>
                            ) : (null)}
                            <button type="button" className="factoryButton imageButton"
                            ref={this.buttonRef} onClick={this.openDropdown}>
                                <img className="buttonIcon" src={configTab} alt="Config"/>
                            </button>
                        </div>
                        {this.state.showDropdown ? (
                            <div className="dropdownMenu" style={this.placeDropdown()}>
                                <div>
                                    <button type="button" className={`factoryButton imageButton ${parent}S`} onClick={this.openConfigMenu}>
                                        <div className="iconText">
                                            <img className="buttonIcon" src={panelSettingsIcon} alt="Settings"/>
                                            Einstellungen
                                        </div>
                                    </button>
                                </div>
                                <div>
                                    <button type="button" className={`factoryButton imageButton ${parent}C`} onClick={this.openColorMenu}>
                                        <div className="iconText">
                                            <img className="buttonIcon" src={panelColorIcon} alt="Color"/>
                                            Farbe editieren
                                        </div>
                                    </button>
                                </div>
                            </div>
                        ) : (null)}
                        {this.state.showColorMenu ? (
                            <PopupMenu popupTitle="Farbe editieren" popupType="color" pWidth="473px"
                            handleCloseCallback={this.closeColorMenu}></PopupMenu>
                        ) : (null)}
                        {this.state.showConfigMenu ? (
                            <PopupMenu popupTitle="Einstellungen" popupType="settings" parentName={parent} pWidth="480px" 
                            handleCloseCallback={this.closeConfigMenu}></PopupMenu>
                        ) : (null)}
                    </div>
                )}
            </MContext.Consumer>
        );
    }
}

export default PanelHeader;