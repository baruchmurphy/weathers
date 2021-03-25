import react from 'react';
import Alert from '@material-ui/lab/Alert';
import { Typography, Divider } from '@material-ui/core';


const TempData = ({ data }: any) => {

    return (
        <>
            <Typography variant="h4">{Math.floor(data.current.temp)}°F</Typography>
            <Divider />
            <Typography>Feels like {Math.floor(data.current.feels_like)}°F</Typography>
            <Typography>{data.current.humidity}% Humidity</Typography>
            <Typography>Wind speed at {Math.floor(data.current.wind_speed)}MPH</Typography>
            <img src={`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}/>
        </>
    )
};

export default TempData