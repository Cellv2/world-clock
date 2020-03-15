import React from "react";

type Props = {
    areas: string[];
    handleAreaSelectOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const AreaSelect = (props: Props) => {
    const { areas } = props;
    return (
        <select onChange={props.handleAreaSelectOnChange}>
            {areas.map(area => {
                return <option key={area}>{area}</option>;
            })}
        </select>
    );
};

export default AreaSelect;
