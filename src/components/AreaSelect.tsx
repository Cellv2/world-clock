import React from "react";
import { ValueType } from "react-select";

import CustomDropdown from "./CustomDropdown"

import styles from "./AreaSelect.module.scss"

type Props = {
    areas: string[];
    handleAreaSelectOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    selectedArea: string;
    handleAreaOnChange: (event: ValueType<{value: string, label: string}>) => void;
};

const AreaSelect = (props: Props) => {
    const { areas, selectedArea } = props;

    if (Array.isArray(areas)) {
        //this should always be an array, but let's be on the safe side
        const selectOptions = areas.map((area) => {
            return { label: area, value: area };
        });

        return (
            //TODO: Wtf is this 'value does not exist on type 'IntrinsicAttributes & Props'.ts(2322)'
            //@ts-ignore
            <CustomDropdown options={selectOptions} handleOnChange={props.handleAreaOnChange} value={selectedArea} label="Area:" />
        );
    }

    return <div className={styles.notAvailable}>No areas available</div>;
};

export default AreaSelect;
