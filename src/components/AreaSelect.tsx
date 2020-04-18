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

    //this should always be an array, but let's be on the safe side
    if (Array.isArray(areas)) {
        const selectOptions = areas.map((area) => {
            return { label: area, value: area };
        });
        const selectedAreaValue = { label: selectedArea, value: selectedArea };

        return (
            <>
                <CustomDropdown
                    options={selectOptions}
                    handleOnChange={props.handleAreaOnChange}
                    value={selectedAreaValue}
                    name="Area:"
                    label="Area:"
                />
                {!selectedArea && (
                    <>
                        <br />
                        <div className={styles.notAvailable}>
                            Please select an area
                        </div>
                    </>
                )}
            </>
        );
    }

    return <div className={styles.notAvailable}>No areas available</div>;
};

export default AreaSelect;
