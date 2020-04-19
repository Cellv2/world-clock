import React from "react";

import Clock from "./components/Clock";

import styles from "./App.module.scss";

function App() {
    return (
        <div className={styles.app}>
            <div className={styles.container}>
                <Clock />
            </div>
        </div>
    );
}

export default App;
