import React from "react";

import styles from "./AreaSelect.module.scss"

type Props = {
    areas: string[];
    handleAreaSelectOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    selectedArea: string;
};

const AreaSelect = (props: Props) => {
    const { areas, selectedArea } = props;

    if (Array.isArray(areas)) {
        return (
            <label>
                Area:&nbsp;
                <select onChange={props.handleAreaSelectOnChange} value={selectedArea}>
                    {areas.map(area => {
                        return <option key={area}>{area}</option>;
                    })}
                </select>
            </label>
        );
    }

    return <div className={styles.notAvailable}>No areas available</div>;
};

export default AreaSelect;
