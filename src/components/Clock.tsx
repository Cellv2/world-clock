import React, { Component } from "react";

import ClockFace from "./ClockFace";
import TimeZoneSelect from "./TimeZoneSelect";
import AreaSelect from "./AreaSelect"

import { WorldTimeApiResponseSchema } from "../models/time-types";
import RegionSelect from "./RegionSelect";


type Props = {};
type State = {
    time: WorldTimeApiResponseSchema;
    areas: string[];
    selectedArea: string;
    regions: string[] | WorldTimeApiResponseSchema;
    selectedRegion: string;
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
                // response will always be area/region per the API schema, so we want arr[0]
                const areas: string[] = json.map(area => {
                    return area.split("/")[0];
                });
                const uniqueAreas = [...Array.from(new Set(areas))];

                this.setState({
                    timeZones: json,
                    selectedTimeZone: initialTZ,
                    areas: uniqueAreas
                });
            });

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

        fetch(`http://worldtimeapi.org/api/timezone/${event.target.value}`)
            .then(res => res.json())
            .then((json: string[] | WorldTimeApiResponseSchema) => {
                console.log(json);

                //if it's an array then it's got regions as well, else we update the time
                if (Array.isArray(json)) {
                    // response will always be area/region per the API schema, so we want arr[1]
                    const regions: string[] = json.map(region => {
                        return region.split("/")[1];
                    });
                    const uniqueRegions = [...Array.from(new Set(regions))];

                    this.setState(prevState => ({
                        ...prevState,
                        regions: uniqueRegions
                    }));
                } else {
                    this.setState(
                        prevState => ({
                            ...prevState,
                            regions: json
                        }),
                        () => this.fetchTime(event.target.value)
                    );
                }
            });

        this.setState(prevState => ({
            ...prevState,
            selectedArea: event.target.value
        }));
    }

    handleRegionSelectOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        event.persist();

        console.log(event.target.value);

        this.setState(
            prevState => ({
                ...prevState,
                selectedRegion: event.target.value
            }),
            () =>
                this.fetchTime(
                    `${this.state.selectedArea}/${this.state.selectedRegion}`
                )
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
        if (this.state === null || this.state.time === null || this.state.timeZones === null || this.state.areas === null) {
            return <div>Reaching out to the APIs...</div>;
        } else {
            return (
                <>
                    <AreaSelect
                        handleAreaSelectOnChange={this.handleAreaSelectOnChange}
                        areas={this.state.areas}
                        selectedArea={this.state.selectedArea}
                    />
                    <br />
                    <>
                        {this.state.regions ? (
                            <RegionSelect
                                regions={this.state.regions}
                                handleRegionSelectOnChange={
                                    this.handleRegionSelectOnChange
                                }
                                selectedRegion={this.state.selectedRegion}
                            />
                        ) : (
                            <div>Please select an area</div>
                        )}
                    </>
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
