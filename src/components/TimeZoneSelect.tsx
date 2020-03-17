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
        <label>
            TimeZone:&nbsp;
            <select
                onChange={props.handleTimeZoneOnChange}
                value={selectedTimeZone}
            >
                {timezones.map(timezone => {
                    return <option key={timezone}>{timezone}</option>;
                })}
            </select>
        </label>
    );
};

export default TimeZoneSelect;
