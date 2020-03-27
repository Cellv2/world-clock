import React from "react";

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
