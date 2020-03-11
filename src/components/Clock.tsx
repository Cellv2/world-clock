import React, { Component } from "react";

import ClockFace from "./ClockFace";
import TimeZoneSelect from "./TimeZoneSelect";

import { WorldTimeApiResponseSchema } from "../models/time-types";


type Props = {};
type State = {
    time: WorldTimeApiResponseSchema;
    timeZones: string[];
    selectedTimeZone: string;
};

class Clock extends Component<Props, State> {
    timer!: NodeJS.Timeout;

    componentDidMount() {
        const tZ = "America/Nassau";

        fetch("http://worldtimeapi.org/api/timezone")
            .then(res => res.json())
            .then((json: string[]) =>
                this.setState({ timeZones: json }, () => console.log(json))
            );

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

    fetchTime = (tZ: string) => {
        fetch(`http://worldtimeapi.org/api/timezone/${tZ}`)
            .then(res => res.json())
            .then((json: WorldTimeApiResponseSchema) =>
                this.setState({ time: json }, () => {
                    clearInterval(this.timer);

                    this.timer = setInterval(() => {
                        const tempTime = this.state.time;
                        tempTime.unixtime++;
                        this.setState(prevState => ({
                            ...prevState,
                            time: tempTime
                        }));
                    }, 1000);
                })
            );
    }

    handleTimeZoneOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        event.persist();

        this.fetchTime(event.target.value);

        this.setState(prevState => ({
            ...prevState,
            selectedTimeZone: event.target.value
        }));
    };

    render() {
        if (this.state === null || this.state.time === null || this.state.timeZones === null) {
            return <div>Reaching out to the APIs...</div>;
        } else {
            return (
                <>
                    <TimeZoneSelect
                        timezones={this.state.timeZones}
                        handleTimeZoneOnChange={this.handleTimeZoneOnChange}
                        selectedTimeZone={this.state.selectedTimeZone}
                    />
                    <br />
                    <ClockFace time={this.state.time} />
                </>
            );
        }
    }
}

export default Clock;
