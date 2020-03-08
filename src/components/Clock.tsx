import React, { Component } from "react";

import ClockFace from "./ClockFace";

import { TimeModel } from "../models/time-model";

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
        const x = timeModel.getTime()
        console.log(x)
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
