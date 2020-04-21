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
        // console.log(x.toString())
        // console.log(Date.parse(x.toString()))
        const tempIntervalUnixTime = Date.parse(x.toString());
        console.log("original time", this.props.time)

        this.setState({ time: this.props.time, intervalUnixTime: tempIntervalUnixTime }, () => {
            // console.log(json);

            // clearInterval(this.timer);

            // // this.timer = setInterval(() => {})

            // this.timer = setInterval(() => {
            //     // tempTime.unixtime = Date.parse(x.toString())
            //     const tempTime = this.state.time;
            //     tempTime.unixtime++;
            //     // tempTime++;
            //     // console.log(tempTime)

            //     this.setState((prevState) => ({
            //         ...prevState,
            //         // time: tempTime,
            //         time: tempTime
            //     }));
            // }, 1000);

            this.clearAndSetTimer();
        });
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (prevProps.time.timezone === this.props.time.timezone) {
            return false;
        } else {

            // console.log(json);
            const x = new Date(this.props.time.datetime);
            // console.log(x.toString());
            // console.log(Date.parse(x.toString()));
            const tempIntervalUnixTime = Date.parse(x.toString());

            this.setState(
                {
                    time: this.props.time,
                    intervalUnixTime: tempIntervalUnixTime,
                },
                () => {
                // () => {
                //     clearInterval(this.timer);


                //     // console.log(this.props.time)
                //     // const d = Date.parse(`${this.props.time.datetime}`)
                //     // console.log("date.parse", d)
                //     // // const e = new Date(d);
                //     // const e = new Date(this.props.time.unixtime * 1000);
                //     // console.log("new Date", e)
                //     // console.log(this.props.time)
                //     // console.log(this.props.time)

                //     // const t = Math.round((new Date(this.props.time.datetime)).getTime()/1000);
                //     // console.log(t)
                //     // // console.log(Date.parse(t))
                //     // console.log(new Date(t*1000))

                //     // console.log("this was called!")

                //     console.log(this.state.time)
                //     console.log("getTime", new Date(this.state.time.datetime).getTime()/1000);
                //     console.log("unixtime", this.state.time.unixtime)

                //     // const raw_offset = this.state.time.raw_offset;
                //     // const dst_offset = this.state.time.dst_offset;

                //     const { dst_offset, raw_offset, unixtime } = this.state.time;


                //     const adjustedUnixTime = unixtime + raw_offset// + (dst_offset !== null ? dst_offset : 0);

                //     console.log(adjustedUnixTime)
                //     const time = new Date(adjustedUnixTime * 1000)
                //     console.log("time", time)

                //     const adjustedUnixTimex = unixtime + raw_offset + (dst_offset !== null ? dst_offset : 0);
                //     let timex = new Date(adjustedUnixTimex * 1000);
                //     timex.setTime(timex.getTime() + timex.getTimezoneOffset() * 60 * 1000)
                //     console.log("timex", timex)

                //     // this.timer = setInterval(() => {})

                //     this.timer = setInterval(() => {
                //         // tempTime.unixtime = Date.parse(x.toString())
                //         const tempTime = this.state.time;
                //         tempTime.unixtime++;
                //         // tempTime++;
                //         // console.log(tempTime);

                //         this.setState((prevState) => ({
                //             ...prevState,
                //             // time: tempTime,
                //             time: tempTime,
                //         }));
                //     }, 1000);

                this.clearAndSetTimer()
                }
            );

            return true;
        }

    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    clearAndSetTimer = (): void => {
        clearInterval(this.timer);

        this.timer = setInterval(() => {
            const tempTime = this.state.time;
            tempTime.unixtime++;

            this.setState((prevState) => ({
                ...prevState,
                time: tempTime,
            }));
        }, 1000);

        return;
    }

    render() {
        if (!this.state || !this.state.time) {
            return <div>Fetching time...</div>;
        }

        //TODO:
        // use just 'datetime' rather than unixtime, as I'm still not confident that the times are right.
        // will need to increment rather than the unixtime, though (or as well?)

        const { unixtime, raw_offset, dst_offset, dst } = this.state.time;

        // dst_offset should always contain a value if dst === true, but setting to 0 just in case
        const adjustedTime = unixtime + raw_offset// - (dst ? 0 : (dst_offset || 0));
        // const adjustedTime = unixtime;
        // console.log(this.props.time.datetime)

        // const date = new Date(props.time.datetime);
        // const date = new Date(adjustedTime * 1000);
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
                <p>Currently selected time zone is {replaceSlashAndUnderscore(this.state.time.timezone)}</p>
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
