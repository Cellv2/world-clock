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
}

/**
 * Entirely relies on a unixtime property existing on the time object
 */
class ClockFace extends Component<Props, State> {
    timer!: NodeJS.Timeout;

    componentDidMount() {
        this.setState({ time: this.props.time }, () => {
            this.clearAndSetTimer();
        });
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        // if the previous timezone matches the current timezone, then we don't update the component
        if (prevProps.time.timezone === this.props.time.timezone) {
            return false;
        } else {
            this.setState(
                {
                    time: this.props.time,
                },
                () => {
                    this.clearAndSetTimer();
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

        const { unixtime, raw_offset, dst_offset, dst } = this.state.time;

        const adjustedTime: number = unixtime + raw_offset;

        const date: Date = new Date(adjustedTime * 1000);
        const hours = "0" + date.getHours();
        const mins = "0" + date.getMinutes();
        const secs = "0" + date.getSeconds();
        const formattedTime: string = hours.substr(-2) + ":" + mins.substr(-2) + ":" + secs.substr(-2);

        const dstInHours: number = dst_offset ? (dst_offset / 60 / 60) : 0;

        // the local machine's day
        const localDay: number = new Date(Date.now()).getDay();
        // the timezone that is selected through the dropdown
        const timezoneDay: number = date.getDay();
        let dayComparisonWord: string = "Today";
        if (localDay !== timezoneDay) {
            dayComparisonWord = localDay > timezoneDay ? "Yesterday" : "Tomorrow";
        }

        return (
            <div className={styles.clockFace}>
                <p>Currently selected time zone is {replaceSlashAndUnderscore(this.state.time.timezone)}</p>
                {this.props.usingIp && <p className={styles.ipText}><em>This was based off of your public IP</em></p>}
                <p>The current time is: <time dateTime={`${date}`}>{formattedTime}</time><sup className={`${styles.smallText} ${styles.superscriptItalics}`}>{dayComparisonWord}</sup></p>
                {dst && <p className={styles.smallText}><em>{this.props.usingIp ? "You are" : "This time zone is"} currently in Daylight Saving Time (+{dstInHours}h)</em></p>}
            </div>
        );
    }
};

export default ClockFace;
