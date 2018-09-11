import React, { Component } from 'react';
import MapContainer from './components/MapContainer';
import Header from './components/Header';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <MapContainer/>
            </div>
        );
    }
}

export default App;
