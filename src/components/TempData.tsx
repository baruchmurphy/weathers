import react, { useState } from 'react';
import { Typography, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles ({
    container: {
        display: 'flex'
    },
    currentTemp: {
        paddingTop: "1.5rem",
        justifyContent: "space-Between",
        paddingRight: '1.5rem'
    },
    extras: {
        textAlign: 'justify'
    }
});

const TempData = ({ data, location }: any) => {
    const classes = useStyles();

    const formatTime = (timedata: number) => {
        const utc = new Date(timedata*1000)
        const time = utc.toString().split(' ')[4].toString().split('')
        time.splice(5, 3, '')
        return time.join('')
    }


    return (
        <Box display="flex" justifyContent="space-between">
            <Box className={classes.container}>
                <Box>
                    <img src={`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}/>
                </Box>
                <Box className={classes.currentTemp}>
                    <Typography variant="h4">{Math.floor(data.current.temp)}°F</Typography>
                </Box>
                <Box className={classes.extras}>
                    <Typography variant="h6">Feels like: {Math.floor(data.current.feels_like)}°F</Typography>
                    <Typography variant="h6">Humidity: {data.current.humidity}%</Typography>
                    <Typography variant="h6">Wind: {Math.floor(data.current.wind_speed)}MPH</Typography>
                </Box>
            </Box>
            <Box className={classes.extras}>
                <Typography variant="h4">{location}</Typography>
                <Typography variant="h6">Current Time: {formatTime(data.current.dt)}</Typography>
                <Typography variant="h6">{data.current.weather[0].description}</Typography>
            </Box>
        </Box>
    )
};

export default TempData