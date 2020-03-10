import React, { Component } from "react";

import ClockFace from "./ClockFace";

import { TimeModel } from "../models/time-model";

import { WorldTimeApiResponseSchema } from "../models/time-types";

const timeModel = new TimeModel();

type Props = {};
type State = {
    time: WorldTimeApiResponseSchema;
    interval: number;
};

class Clock extends Component<Props, State> {
    timer: any;

    componentDidMount() {
        // this.setState({ time: timeModel.Time });
        this.setState({ interval: 1000 });

        fetch("http://worldtimeapi.org/api/timezone/Europe/London")
            .then(res => res.json())
            .then((json: WorldTimeApiResponseSchema) =>
                this.setState({ time: json })
            );

        // setInterval(this.timerId, this.state.interval)
        this.timer = setInterval(() => {
            // console.log(timeModel.theTime())
        }, 1000);
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
