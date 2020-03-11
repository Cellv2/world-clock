import React from "react";

type Props = {
    timezones: string[];
    handleTimeZoneOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    selectedTimeZone? : any
};

const TimeZoneSelect = (props: Props) => {
    const { timezones, selectedTimeZone } = props;

    if (!timezones) {
        return <div>Fetching time zones...</div>;
    }

    return (
        <select onChange={props.handleTimeZoneOnChange} value={selectedTimeZone}>
            {timezones.map(timezone => {
                return <option key={timezone}>{timezone}</option>;
            })}
        </select>
    );
};

export default TimeZoneSelect;
