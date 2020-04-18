import React from "react";
import { ValueType } from "react-select";

import CustomDropdown from './CustomDropdown'

import { WorldTimeApiResponseSchema } from "../models/time-types";

import styles from "./RegionSelect.module.scss";

type Props = {
    regions: string[] | WorldTimeApiResponseSchema;
    selectedRegion: string;
    handleRegionOnChange: (event: ValueType<{value: string, label: string}>) => void;
};

const RegionSelect = (props: Props) => {
    const { regions, selectedRegion } = props;

    if (Array.isArray(regions)) {
        const selectOptions = regions.map((region) => {
            return { value: region, label: region };
        });
        const selectedRegionValue = { label: selectedRegion, value: selectedRegion };

        return (
            <>
                <CustomDropdown
                    options={selectOptions}
                    handleOnChange={props.handleRegionOnChange}
                    value={selectedRegionValue}
                    name="Region:"
                    label="Region:"
                />
                {!selectedRegion && (
                    <>
                        <br />
                        <div className={styles.notAvailable}>
                            Please select a region
                        </div>
                    </>
                )}
            </>
        );
    }

    return <div className={styles.notAvailable}>No regions available for the selected area</div>;
};

export default RegionSelect;
