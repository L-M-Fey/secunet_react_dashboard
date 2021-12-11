import logo from './images/secunet-monitor-logo.png';
import complianceIcon from './images/ComplianceIcon.svg';
import anomaliesIcon from './images/AnomaliesIcon.svg';
import atIcon from './images/AdvancedThreatsIcon.svg';
import configTab from './images/ConfigTab.svg';
import './App.css';

import Clock from './Clock.js';

function App() {
  return (
    <div className="App">
      <div className="header">
        <div className="title">
          <a 
            className="gwt-Anchor" 
            href="https://demo.finally-safe.com/app/?locale=de" 
            target="_"
          >
            <img src={logo} alt="Secunet Monitor" width="185px"/>
          </a>
        </div>
      </div>
      <div className="content">
        <div className="left">
          <div className="menuPlate divider">Module</div>
          <div className="appBar">
            <div className="app">
              <div className="menuPlate">
                <h2 className="appName">Compliance</h2>
                <img className="appIcon" src={complianceIcon} alt="Compliance"/>
              </div>
            </div>
            <div className="app">
              <div className="menuPlate">
                <h2 className="appName">Anomalies</h2>
                <img className="appIcon" src={anomaliesIcon} alt="Anomalies"/>
              </div>
            </div>
            <div className="app">
              <div className="menuPlate">
                <h2 className="appName">Advanced Threats</h2>
                <img className="appIcon" src={atIcon} alt="Advanced Threats"/>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="panelGrid">
            <div className="flowBox tile" data-sizex="1" data-sizey="1" data-row="1" data-col="1">
              <div className="panel">
                <div className="panelHeader">
                  <input type="text" value="Uhr" placeholder="Uhr" className="headerName borderlessInput"/>
                  <div className="headerButtons">
                    <button type="button" className="factoryButton imageButton">
                      <img className="buttonIcon" src={configTab} alt="Config"/>
                    </button>
                  </div>
                </div>
                <div className="clockPanel">
                  <Clock></Clock>
                </div>
              </div>
            </div>
            <div className="flowBox tile" data-sizex="1" data-sizey="1" data-row="1" data-col="2">
              <div className="panel">
                <div className="panelHeader">
                  <input type="text" value="Anomalien" placeholder="Anomalien" className="headerName borderlessInput"/>
                  <div className="headerButtons">
                    <button type="button" className="factoryButton imageButton">
                      <img className="buttonIcon" src={configTab} alt="Config"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flowBox tile" data-sizex="1" data-sizey="1" data-row="1" data-col="3">
              <div className="panel">
                <div className="panelHeader">
                  <input type="text" value="Kennzeichen" placeholder="Kennzeichen" className="headerName borderlessInput"/>
                  <div className="headerButtons">
                    <button type="button" className="factoryButton imageButton">
                      <img className="buttonIcon" src={configTab} alt="Config"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;