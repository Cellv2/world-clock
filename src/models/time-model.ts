import { ITime } from "../interfaces/ITime";

class TimeModel implements ITime {
    Time: string = "20:00";

    getTime = async () => {

        const asyncFetchTime = async () => {
            const response = await fetch("http://worldtimeapi.org/api/timezone/Europe/London");
            return await response.json()
        }

        return asyncFetchTime
        // return "21:00"
    }

    //getRegions
}

export { TimeModel };
