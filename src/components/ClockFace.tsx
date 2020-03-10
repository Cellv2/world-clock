import React from "react";

import { WorldTimeApiResponseSchema } from "../models/time-types";

type Props = {
    time: WorldTimeApiResponseSchema;
};

/**
 * Entirely relies on a unixtime property existing on the time object
 */
const ClockFace = (props: Props) => {
    if (props.time) {
        const { unixtime } = props.time;

        const date = new Date(unixtime * 1000);
        const hours = date.getHours();
        const mins = "0" + date.getMinutes();
        const secs = "0" + date.getSeconds();
        const formattedTime =
            hours + ":" + mins.substr(-2) + ":" + secs.substr(-2);

        return <div>{formattedTime}</div>;
    }

    return <div>Fetching time...</div>;
};

export default ClockFace;
