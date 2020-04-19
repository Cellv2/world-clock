import React from "react";
import { ValueType } from "react-select";

import CustomDropdown from './CustomDropdown'

import { replaceUnderscoreWithWhitespace } from "../helpers/utils";

import styles from "./SubRegionSelect.module.scss";

type Props = {
    subRegions: string[];
    selectedSubRegion: string | null;
    handleSubRegionOnChange: (event: ValueType<{value: string, label: string}>) => void;
}

const SubRegionSelect = (props: Props) => {
    const { subRegions, selectedSubRegion } = props;

    if (Array.isArray(subRegions)) {
        const selectOptions = subRegions.map((subRegion) => {
            return {
                label: replaceUnderscoreWithWhitespace(subRegion.split("/")[1]),
                value: subRegion,
            };
        });
        const selectedSubRegionValue = selectedSubRegion !== null ? { label: selectedSubRegion, value: selectedSubRegion } : null;

        return (
            <>
                <CustomDropdown
                    options={selectOptions}
                    handleOnChange={props.handleSubRegionOnChange}
                    value={selectedSubRegionValue}
                    name="Sub Region:"
                    label="Sub Region:"
                />
                {!selectedSubRegion && (
                    <>
                        <div className={styles.notAvailable}>
                            Please select a sub region
                        </div>
                    </>
                )}
            </>
        );
    }

    return <div className={styles.notAvailable}>No regions available for the selected area</div>;
}

export default SubRegionSelect
