import React from "react";
import { ValueType } from "react-select";

import CustomDropdown from './CustomDropdown'

import { WorldTimeApiResponseSchema } from "../models/time-types";

import styles from "./RegionSelect.module.scss";

type Props = {
    regions: string[] | WorldTimeApiResponseSchema;
    handleRegionSelectOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    selectedRegion: string;
    handleRegionOnChange: (event: ValueType<{value: string, label: string}>) => void;
};

const RegionSelect = (props: Props) => {
    const { regions, selectedRegion } = props;


    if (Array.isArray(regions)) {
        const selectOptions = regions.map((region) => {
            return { value: region, label: region };
        });

        return (
            //TODO: Wtf is this 'value does not exist on type 'IntrinsicAttributes & Props'.ts(2322)'
            //@ts-ignore
            <CustomDropdown options={selectOptions} handleOnChange={props.handleRegionOnChange} value={selectedRegion} label="Region:" />
        );
    }

    return <div className={styles.notAvailable}>No regions available for the selected area</div>;
};

export default RegionSelect;
