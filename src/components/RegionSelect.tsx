import React from "react";
import Dropdown, { ValueType } from "react-select";

import { WorldTimeApiResponseSchema } from "../models/time-types";

import styles from "./RegionSelect.module.scss";

type Props = {
    regions: string[] | WorldTimeApiResponseSchema;
    handleRegionSelectOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    selectedRegion: string;
    yChange?: (event: ValueType<{value: string, label: string}>) => void;
};

const RegionSelect = (props: Props) => {
    const { regions, selectedRegion } = props;


    if (Array.isArray(regions)) {
        const selectOptions = regions.map((region) => {
            return { value: region, label: region };
        });

        return (
            <>
                <label>
                    Region:&nbsp;
                    <select
                        onChange={props.handleRegionSelectOnChange}
                        value={selectedRegion}
                    >
                        {regions.map((region) => {
                            return <option key={region}>{region}</option>;
                        })}
                    </select>
                </label>
                <Dropdown
                    options={selectOptions}
                    onChange={props.yChange}
                    isSearchable={true}
                />
            </>
        );
    }

    return <div className={styles.notAvailable}>No regions available for the selected area</div>;
};

export default RegionSelect;
