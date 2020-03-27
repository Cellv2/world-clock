import React from "react";
import logo from "./logo.svg";

import Clock from "./components/Clock";

import styles from "./App.module.scss";

function App() {
    return (
        <div className={styles.app}>
            <Clock />
        </div>
    );
}

export default App;
