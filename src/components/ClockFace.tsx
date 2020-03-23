import React from "react";

import { WorldTimeApiResponseSchema } from "../models/time-types";

type Props = {
    time: WorldTimeApiResponseSchema;
};

/**
 * Entirely relies on a unixtime property existing on the time object
 */
const ClockFace = (props: Props) => {
    if (!props.time) {
        return <div>Fetching time...</div>;
    }

    const { unixtime, raw_offset, dst_offset } = props.time;

    const adjustedTime = unixtime - raw_offset - (dst_offset || 0);

    const date = new Date(adjustedTime * 1000);
    const hours = "0" + date.getHours();
    const mins = "0" + date.getMinutes();
    const secs = "0" + date.getSeconds();
    const formattedTime = hours.substr(-2) + ":" + mins.substr(-2) + ":" + secs.substr(-2);

    return (
        <div>
            <p>Currently selected time zone is {(props.time.timezone).replace("/", ", ")}</p>
            <p>The current time is: {formattedTime}</p>
        </div>
    );
};

export default ClockFace;
