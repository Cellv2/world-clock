import React, { Component } from "react";

import ClockFace from "./ClockFace";
import TimeZoneSelect from "./TimeZoneSelect";
import AreaSelect from "./AreaSelect"

import { WorldTimeApiResponseSchema } from "../models/time-types";


type Props = {};
type State = {
    time: WorldTimeApiResponseSchema;
    areas: string[];
    selectedArea: string;
    timeZones: string[];
    selectedTimeZone: string;
};

class Clock extends Component<Props, State> {
    timer!: NodeJS.Timeout;

    componentDidMount() {
        const initialTZ = "Etc/UTC";

        fetch("http://worldtimeapi.org/api/timezone")
            .then(res => res.json())
            .then((json: string[]) => {
                const areas: string[] = json.map(area => {
                    return area.split("/")[0]
                });
                const uniqueAreas = [...Array.from(new Set(areas))]

                this.setState(
                    { timeZones: json, selectedTimeZone: initialTZ, areas: uniqueAreas },
                    () => console.log(json)
                )}
            );

        this.fetchTime(initialTZ);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    fetchTime = (tZ: string) => {
        fetch(`http://worldtimeapi.org/api/timezone/${tZ}`)
            .then(res => res.json())
            .then((json: WorldTimeApiResponseSchema) =>
                this.setState({ time: json }, () => {

                    console.log(json);

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

    handleAreaSelectOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        event.persist();

        this.setState(prevState => ({
            ...prevState,
            selectedArea: event.target.value
        }));
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
        if (this.state === null || this.state.time === null || this.state.timeZones === null || this.state.areas === null) {
            return <div>Reaching out to the APIs...</div>;
        } else {
            return (
                <>
                    <AreaSelect handleAreaSelectOnChange={this.handleAreaSelectOnChange} areas={this.state.areas} />
                    <br />
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
