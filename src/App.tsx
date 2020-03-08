import React from "react";
import logo from "./logo.svg";

import Clock from "./components/Clock";

import "./App.css";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <Clock />
            </header>
        </div>
    );
}

export default App;
