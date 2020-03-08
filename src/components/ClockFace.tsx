import React from "react";

type Props = {
    time: string;
};

const ClockFace = (props: Props) => {
    return <div>{props.time}</div>;
};

export default ClockFace;
