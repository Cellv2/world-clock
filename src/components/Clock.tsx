import React, { Component } from "react";

import ClockFace from "./ClockFace";

import { TimeModel } from "../models/time-model";

import { WorldTimeApiResponseSchema } from "../models/time-types";

const timeModel = new TimeModel();

type Props = {};
type State = {
    time: string;
};

class Clock extends Component<Props, State> {
    state = {
        time: "19:00"
    };

    componentDidMount() {
        this.setState({ time: timeModel.Time });

        fetch("http://worldtimeapi.org/api/timezone/Europe/London")
            .then(res => res.json())
            .then((json: WorldTimeApiResponseSchema) => this.setState({ time: json.datetime }));

    }

    render() {
        return (
            <>
                <ClockFace time={this.state.time} />
                {/* <p>{timeModel.getTime()}</p> */}
            </>
        );
    }
}

export default Clock;
