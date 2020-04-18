import React from "react";

import { WorldTimeApiResponseSchema } from "../models/time-types";

import styles from './ClockFace.module.scss'

type Props = {
    time: WorldTimeApiResponseSchema;
    usingIp: boolean;
};

/**
 * Entirely relies on a unixtime property existing on the time object
 */
const ClockFace = (props: Props) => {
    if (!props.time) {
        return <div>Fetching time...</div>;
    }

    //TODO:
    // use just 'datetime' rather than unixtime, as I'm still not confident that the times are right.
    // will need to increment rather than the unixtime, though (or as well?)

    const { unixtime, raw_offset, dst_offset, dst } = props.time;

    // dst_offset should always contain a value if dst === true, but setting to 0 just in case
    const adjustedTime = unixtime - raw_offset - (dst ? 0 : (dst_offset || 0));

    // const date = new Date(props.time.datetime);
    const date = new Date(adjustedTime * 1000);
    const hours = "0" + date.getHours();
    const mins = "0" + date.getMinutes();
    const secs = "0" + date.getSeconds();
    const formattedTime = hours.substr(-2) + ":" + mins.substr(-2) + ":" + secs.substr(-2);

    const dstInHours = dst_offset ? (dst_offset / 60 / 60) : 0;

    // console.log(date.toISOString())
    // console.log(date.getTimezoneOffset())
    // console.log(props.time.datetime)
    // console.log(date.toISOString())

    return (
        <div className={styles.clockFace}>
            <p>Currently selected time zone is {(props.time.timezone).replace(/\//g, ", ")}</p>
            {props.usingIp && <p className={styles.ipText}><em>This was based off of your public IP</em></p>}
            <p>The current time is: <time dateTime={`${date}`}>{formattedTime}</time></p>
            {dst && <p className={styles.ipText}><em>{props.usingIp ? "You are" : "This time zone is"} currently in Daylight Saving Time (+{dstInHours}h)</em></p>}
        </div>
    );
};

export default ClockFace;
