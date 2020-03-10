import React from "react";

import { WorldTimeApiResponseSchema } from "../models/time-types";

type Props = {
    time: WorldTimeApiResponseSchema;
};

const ClockFace = (props: Props) => {
    if (props.time) {
        return <div>{props.time.unixtime}</div>;
    }

    return <div>Fetching time...</div>;
};

export default ClockFace;
