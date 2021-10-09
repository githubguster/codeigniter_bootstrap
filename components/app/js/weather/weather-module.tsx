import * as Common from '../../../bootstrap/v4/js/common'

export interface WeatherProps extends Common.CommonElementProps {
    location: string;
    lat: number;
    lon: number;
    lat_wgs84: number;
    lon_wgs84: number;
    time: string;
    elev: number;
    wdir: number;
    wdsd: number;
    temp: number;
    humd: number;
    pres: number;
    h24r: number;
}

export interface WeatherItemsProps extends Common.CommonElementProps {
    weather?: WeatherProps[],
}

export interface WeatherContentProps extends Common.CommonElementProps {
    url: string,
    offset_sec: number;
}

export type WeatherContentStatus = {
    weather?: WeatherProps[],
}