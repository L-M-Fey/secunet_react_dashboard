import React from 'react';
import ReactDOM from 'react-dom';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            timezone: 'Europe/Berlin'
        };
    }

    getDate() {
        this.setState(state => ({
            date: new Date()
        }));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.getDate(), 1000);
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getDayFromIndex(index) {
        var day = "";
        switch (index) {
            case 0: day = "Sonntag"; break;
            case 1: day = "Montag"; break;
            case 2: day = "Dienstag"; break;
            case 3: day = "Mittwoch"; break;
            case 4: day = "Donnerstag"; break;
            case 5: day = "Freitag"; break;
            case 6: day = "Samstag"; break;
        }
        return day;
    }

    reformatDate(dateString) {
        var splitString = dateString.split(".");
        var monthIndex = parseInt(splitString[1]);
        switch (monthIndex) {
            case 1: splitString[1] = "Jan."; break;
            case 2: splitString[1] = "Feb."; break;
            case 3: splitString[1] = "März"; break;
            case 4: splitString[1] = "Apr."; break;
            case 5: splitString[1] = "Mai"; break;
            case 6: splitString[1] = "Juni"; break;
            case 7: splitString[1] = "Juli"; break;
            case 8: splitString[1] = "Aug."; break;
            case 9: splitString[1] = "Sep."; break;
            case 10: splitString[1] = "Okt."; break;
            case 11: splitString[1] = "Nov."; break;
            case 12: splitString[1] = "Dez."; break;
        }
        dateString = splitString.join(" ");
        dateString = dateString.replace(",","");
        return dateString;
    }
    
    render() {
        return (
          <div>
            <p>{this.state.timezone}:</p>
            {this.getDayFromIndex(this.state.date.getDay())}, {this.reformatDate(this.state.date.toLocaleString("de-DE", {timeZone: this.state.timezone}))}
          </div>
        );
    }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);

export default Clock;