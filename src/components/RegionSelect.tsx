import React from "react";

import { WorldTimeApiResponseSchema } from "../models/time-types";

type Props = {
    regions: string[] | WorldTimeApiResponseSchema;
    handleRegionSelectOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    selectedRegion: string;
};

const RegionSelect = (props: Props) => {
    const { regions, selectedRegion } = props;

    if (Array.isArray(regions)) {
        return (
            <label>
                Region:&nbsp;
                <select onChange={props.handleRegionSelectOnChange} value={selectedRegion}>
                    {regions.map(region => {
                        return <option key={region}>{region}</option>;
                    })}
                </select>
            </label>
        );
    }

    return <div>No regions available for the selected area</div>;
};

export default RegionSelect;
