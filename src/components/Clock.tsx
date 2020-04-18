import React, { Component } from "react";
import { ValueType } from "react-select";

import ClockFace from "./ClockFace";
import AreaSelect from "./AreaSelect"
import RegionSelect from "./RegionSelect";

import { WorldTimeApiResponseSchema } from "../models/time-types";
import { handleFetchErrors } from "../helpers/error-helpers";

import styles from "./Clock.module.scss";


type Props = {};
type State = {
    errorObj: {
        activeError: boolean;
        error: any;
    }
    time: WorldTimeApiResponseSchema;
    areas: string[];
    selectedArea: string;
    regions: string[] | WorldTimeApiResponseSchema;
    selectedRegion: string;
    timeZones: string[];
    selectedTimeZone: string;
    usingIP: boolean;
};

class Clock extends Component<Props, State> {
    timer!: NodeJS.Timeout;

    componentDidMount() {
        const initialTZ = "ip";

        fetch("http://worldtimeapi.org/api/timezone")
            .then(handleFetchErrors)
            .then((json: string[]) => {
                // response will always be area/region per the API schema, so we want arr[0]
                const areas: string[] = json.map(area => {
                    return area.split("/")[0];
                });
                const uniqueAreas = [...Array.from(new Set(areas))];

                this.setState({
                    timeZones: json,
                    areas: uniqueAreas,
                    errorObj: {
                        activeError: false,
                        error: null
                    }
                },
                    () => this.fetchTime(initialTZ)
                );
            })
            .catch((err: any) => {
                console.error("Something went wrong with the request - Is the API down for maintenance? The error is: ");
                console.error(err);

                this.setState(prevState => ({
                    ...prevState,
                    errorObj: {
                        activeError: true,
                        error: err
                    }
                }));
            });

            //  this.fetchTime(initialTZ);

    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    fetchTime = (tZ: string) => {
        const baseApiUrl = "http://worldtimeapi.org/api"

        // a call to IP does not include /timezone, so we need to do a check to see
        const apiToCall = tZ !== "ip" ? `${baseApiUrl}/timezone/${tZ}` : `${baseApiUrl}/${tZ}`;

        fetch(apiToCall)
            .then(handleFetchErrors)
            .then((json: WorldTimeApiResponseSchema) =>{
                const _tempUsingIp: boolean = tZ === "ip";

                this.setState({ time: json, usingIP: _tempUsingIp }, () => {

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
                })}
            )
            .catch(err => console.error(err));
    }

    handleAreaSelectOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        event.persist();

        fetch(`http://worldtimeapi.org/api/timezone/${event.target.value}`)
            .then(handleFetchErrors)
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
            })
            .catch(err => console.error(err));

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

        console.log(event.target.value)
    };

    // TODO: Make these the normal ones
    handleAreaOnChange = (event: ValueType<{value: string, label: string}>) => {
        const value = (event as {
            value: string;
            label: string;
        }).value;

        fetch(`http://worldtimeapi.org/api/timezone/${value}`)
            .then(handleFetchErrors)
            .then((json: string[] | WorldTimeApiResponseSchema) => {
                console.log(json);

                //if it's an array then it's got regions as well, else we update the time
                if (Array.isArray(json)) {
                    // response will always be area/region per the API schema, so we want arr[1]
                    const regions: string[] = json.map((region) => {
                        return region.split("/")[1];
                    });
                    const uniqueRegions = [...Array.from(new Set(regions))];

                    this.setState((prevState) => ({
                        ...prevState,
                        regions: uniqueRegions,
                    }));
                } else {
                    this.setState(
                        (prevState) => ({
                            ...prevState,
                            regions: json,
                        }),
                        () => this.fetchTime(value)
                    );
                }
            })
            .catch((err) => console.error(err));

        this.setState((prevState) => ({
            ...prevState,
            selectedArea: value,
        }));
    }

    handleRegionOnChange = (event: ValueType<{value: string, label: string}>) => {
        const value = (event as { value: string; label: string }).value;
        this.setState(
            (prevState) => ({
                ...prevState,
                selectedRegion: value,
            }),
            () =>
                this.fetchTime(
                    `${this.state.selectedArea}/${this.state.selectedRegion}`
                )
        );
    }

    render() {
        if (this.state !== null && this.state.errorObj.activeError) {
            return <div>
                <p>Sorry, something went wrong when trying to hit the APIs</p>
                <p>Is <a href="http://worldtimeapi.org/"><em>worldtimeapi.org/</em></a> down?</p>
                <p>The error was: {this.state.errorObj.error.stack}</p>
            </div>
        } else if (this.state === null || this.state.time === null || this.state.timeZones === null || this.state.areas === null) {
            return <div>Reaching out to the APIs...</div>;
        } else {
            return (
                <>
                    <ClockFace time={this.state.time} usingIp={this.state.usingIP} />
                    <br />
                    <AreaSelect
                        handleAreaSelectOnChange={this.handleAreaSelectOnChange}
                        areas={this.state.areas}
                        selectedArea={this.state.selectedArea}
                        handleAreaOnChange={this.handleAreaOnChange}
                    />
                    {this.state.regions && (
                        <RegionSelect
                            regions={this.state.regions}
                            handleRegionSelectOnChange={
                                this.handleRegionSelectOnChange
                            }
                            selectedRegion={this.state.selectedRegion}
                            handleRegionOnChange={this.handleRegionOnChange}
                        />
                    )}
                </>
            );
        }
    }
}

export default Clock;
