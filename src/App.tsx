import React from "react";

import Clock from "./components/Clock";

import styles from "./App.module.scss";

import Dropdown from "./components/Dropdown";

function App() {
    return (
        <div className={styles.app}>
            <div className="container">
                <Dropdown />
                <Clock />
            </div>
        </div>
    );
}

export default App;
