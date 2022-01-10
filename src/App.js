import logo from './images/secunet-monitor-logo.png';
import complianceIcon from './images/ComplianceIcon.svg';
import anomaliesIcon from './images/AnomaliesIcon.svg';
import atIcon from './images/AdvancedThreatsIcon.svg';
import './App.css';

import PanelContext from './PanelContext.js';
import Panel from './Panel.js'

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
            <PanelContext>
              <Panel parentName="clock" dataSizeX="1" dataSizeY="1" dataRow="1" dataCol="1"></Panel>
            </PanelContext>
            <PanelContext>
              <Panel parentName="anomalies" dataSizeX="1" dataSizeY="1" dataRow="1" dataCol="2"></Panel>
            </PanelContext>
            <PanelContext>
              <Panel parentName="indicator" dataSizeX="1" dataSizeY="1" dataRow="1" dataCol="3"></Panel>
            </PanelContext>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;