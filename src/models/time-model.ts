import { ITime } from "../interfaces/ITime";
import { WorldTimeApiResponseSchema } from "./time-types";

class TimeModel implements ITime {
    Time: string = "20:00";

    getTime = () => {
        const asyncFetchTime = async () => {
            const response = await fetch(
                "http://worldtimeapi.org/api/timezone/Europe/London"
            );
            return await response.json();
        };

        let asyncData;
        asyncFetchTime
            .call(this)
            .then((json: WorldTimeApiResponseSchema) => (asyncData = json));

        let data;
        fetch("http://worldtimeapi.org/api/timezone/Europe/London")
            .then(res => res.json())
            .then((json: WorldTimeApiResponseSchema) => (data = json));

        return "yeah I need to work on this in typescript kek";
        // return "21:00"
    };

    //getRegions
}

export { TimeModel };
