import React from "react";
import Dropdown, { ValueType } from "react-select";

import styles from "./AreaSelect.module.scss"

type Props = {
    areas: string[];
    handleAreaSelectOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    selectedArea: string;
    xChange: (event: ValueType<{value: string, label: string}>) => void;
};

const AreaSelect = (props: Props) => {
    const { areas, selectedArea } = props;


    if (Array.isArray(areas)) {
        //this should always be an array, but let's be on the safe side
        const selectOptions = areas.map((area) => {
            return { label: area, value: area };
        });

        return (
            <>
                <label>
                    Area:&nbsp;
                    <select
                        onChange={props.handleAreaSelectOnChange}
                        value={selectedArea}
                    >
                        {areas.map((area) => {
                            return <option key={area}>{area}</option>;
                        })}
                    </select>
                </label>
                <Dropdown options={selectOptions} onChange={props.xChange} />
            </>
        );
    }

    return <div className={styles.notAvailable}>No areas available</div>;
};

export default AreaSelect;
