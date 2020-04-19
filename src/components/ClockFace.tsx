import React, { Component } from "react";

import { WorldTimeApiResponseSchema } from "../models/time-types";
import { replaceSlashAndUnderscore } from "../helpers/utils";

import styles from './ClockFace.module.scss'

type Props = {
    time: WorldTimeApiResponseSchema;
    usingIp: boolean;
};

type State = {
    time: WorldTimeApiResponseSchema;
    intervalUnixTime: number;
}

/**
 * Entirely relies on a unixtime property existing on the time object
 */

class ClockFace extends Component<Props, State> {
    timer!: NodeJS.Timeout;


    componentDidMount() {
        // const _tempUsingIp: boolean = tZ === "ip";
        const x = new Date(this.props.time.datetime);
        console.log(x.toString())
        console.log(Date.parse(x.toString()))
        const tempIntervalUnixTime = Date.parse(x.toString());

        this.setState({ time: this.props.time, intervalUnixTime: tempIntervalUnixTime }, () => {
            // console.log(json);

            clearInterval(this.timer);

            // this.timer = setInterval(() => {})

            this.timer = setInterval(() => {
                // tempTime.unixtime = Date.parse(x.toString())
                const tempTime = this.state.time;
                tempTime.unixtime++;
                // tempTime++;
                // console.log(tempTime)

                this.setState((prevState) => ({
                    ...prevState,
                    // time: tempTime,
                    time: tempTime
                }));
            }, 1000);
        });
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (prevProps.time.timezone === this.state.time.timezone) {
            return false;
        } else {
            const x = new Date(this.props.time.datetime);
            console.log(x.toString());
            console.log(Date.parse(x.toString()));
            const tempIntervalUnixTime = Date.parse(x.toString());

            this.setState(
                {
                    time: this.props.time,
                    intervalUnixTime: tempIntervalUnixTime,
                },
                () => {
                    // console.log(json);

                    clearInterval(this.timer);

                    // this.timer = setInterval(() => {})

                    this.timer = setInterval(() => {
                        // tempTime.unixtime = Date.parse(x.toString())
                        const tempTime = this.state.time;
                        tempTime.unixtime++;
                        // tempTime++;
                        // console.log(tempTime);

                        this.setState((prevState) => ({
                            ...prevState,
                            // time: tempTime,
                            time: tempTime,
                        }));
                    }, 1000);
                }
            );

            return true;
        }

    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        if (!this.props.time) {
            return <div>Fetching time...</div>;
        }

        //TODO:
        // use just 'datetime' rather than unixtime, as I'm still not confident that the times are right.
        // will need to increment rather than the unixtime, though (or as well?)

        const { unixtime, raw_offset, dst_offset, dst } = this.props.time;

        // dst_offset should always contain a value if dst === true, but setting to 0 just in case
        const adjustedTime = unixtime - raw_offset - (dst ? 0 : (dst_offset || 0));
        // const adjustedTime = unixtime;
        // console.log(this.props.time.datetime)

        // const date = new Date(props.time.datetime);
        // const date = new Date(adjustedTime * 1000);
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

        // "21:18:17"
        // date.toLocaleTimeString()

        return (
            <div className={styles.clockFace}>
                <p>Currently selected time zone is {replaceSlashAndUnderscore(this.props.time.timezone)}</p>
                {this.props.usingIp && <p className={styles.ipText}><em>This was based off of your public IP</em></p>}
                <p>The current time is: <time dateTime={`${date}`}>{formattedTime}</time></p>
                {dst && <p className={styles.ipText}><em>{this.props.usingIp ? "You are" : "This time zone is"} currently in Daylight Saving Time (+{dstInHours}h)</em></p>}
            </div>
        );
    }
};

// const ClockFace = (props: Props) => {
//     if (!props.time) {
//         return <div>Fetching time...</div>;
//     }

//     //TODO:
//     // use just 'datetime' rather than unixtime, as I'm still not confident that the times are right.
//     // will need to increment rather than the unixtime, though (or as well?)

//     const { unixtime, raw_offset, dst_offset, dst } = props.time;

//     // dst_offset should always contain a value if dst === true, but setting to 0 just in case
//     const adjustedTime = unixtime - raw_offset - (dst ? 0 : (dst_offset || 0));
//     // const adjustedTime = unixtime;
//     console.log(props.time.datetime)

//     // const date = new Date(props.time.datetime);
//     const date = new Date(adjustedTime * 1000);
//     const hours = "0" + date.getHours();
//     const mins = "0" + date.getMinutes();
//     const secs = "0" + date.getSeconds();
//     const formattedTime = hours.substr(-2) + ":" + mins.substr(-2) + ":" + secs.substr(-2);

//     const dstInHours = dst_offset ? (dst_offset / 60 / 60) : 0;

//     // console.log(date.toISOString())
//     // console.log(date.getTimezoneOffset())
//     // console.log(props.time.datetime)
//     // console.log(date.toISOString())

//     // "21:18:17"
//     // date.toLocaleTimeString()

//     return (
//         <div className={styles.clockFace}>
//             <p>Currently selected time zone is {replaceSlashAndUnderscore(props.time.timezone)}</p>
//             {props.usingIp && <p className={styles.ipText}><em>This was based off of your public IP</em></p>}
//             <p>The current time is: <time dateTime={`${date}`}>{formattedTime}</time></p>
//             {dst && <p className={styles.ipText}><em>{props.usingIp ? "You are" : "This time zone is"} currently in Daylight Saving Time (+{dstInHours}h)</em></p>}
//         </div>
//     );
// };

export default ClockFace;
