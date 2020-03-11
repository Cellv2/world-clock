import React, { Component } from "react";

import ClockFace from "./ClockFace";

import { TimeModel } from "../models/time-model";

import { WorldTimeApiResponseSchema } from "../models/time-types";
import { clearInterval } from "timers";

const timeModel = new TimeModel();

type Props = {};
type State = {
    time: WorldTimeApiResponseSchema;
};

class Clock extends Component<Props, State> {
    timer!: NodeJS.Timeout;

    componentDidMount() {
        // this.setState({ time: timeModel.Time });
        const tZ = "America/Nassau";
        fetch(`http://worldtimeapi.org/api/timezone/${tZ}`)
            .then(res => res.json())
            .then((json: WorldTimeApiResponseSchema) =>
                this.setState({ time: json }, () => console.log(json))
            );

        this.timer = setInterval(() => {
            const tempTime = this.state.time;
            tempTime.unixtime++;
            this.setState(prevState => ({
                ...prevState,
                time: tempTime
            }));
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        // console.log(timeModel.theTime())
        if (this.state === null || this.state.time === null) {
            return <div>Reaching out to the APIs...</div>;
        } else {
            return (
                <>
                    <ClockFace time={this.state.time} />
                    {/* <p>{timeModel.getTime()}</p> */}
                </>
            );
        }
    }
}

export default Clock;
