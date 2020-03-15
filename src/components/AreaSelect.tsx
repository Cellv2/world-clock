import React from "react";

type Props = {
    areas: string[];
    handleAreaSelectOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    selectedArea: string;
};

const AreaSelect = (props: Props) => {
    const { areas, selectedArea } = props;
    return (
        <select onChange={props.handleAreaSelectOnChange} value={selectedArea}>
            {areas.map(area => {
                return <option key={area}>{area}</option>;
            })}
        </select>
    );
};

export default AreaSelect;
