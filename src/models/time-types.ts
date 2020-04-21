// http://worldtimeapi.org/api
// http://worldtimeapi.org/pages/schema
export type WorldTimeApiResponseSchema = {
    abbreviation: string;
    client_ip: string;
    datetime: number;
    day_of_week: number;
    day_of_year: number;
    dst: boolean;
    dst_from: string | null;
    dst_offset: number | null;
    dst_until: string | null;
    raw_offset: number;
    timezone: string;
    unixtime: number;
    utc_datetime: string | null;
    utc_offset: string | null;
    week_number: number;
};
