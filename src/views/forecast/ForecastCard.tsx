import react from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles ({
    forecast: {
        display: 'inline-flex',
        flexDirection: 'column',
        width: '8rem'
    },
    lowtemps: {
        color: 'grey'
    }
});

const ForecastCard = ({ data }: any) => {
    const classes = useStyles();
    const utc = new Date(data.dt *1000)
    const date = utc.toString().split(' ')[0]

    return (
        <>
            <Box className={classes.forecast}>
                <Box>
                    {date}
                </Box>
                <Box>
                    <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="this isimage"/>
                </Box>
                <Box display="inline-flex" justifyContent="center">
                    <Box mr="8px">
                        {Math.floor(data.temp.max)}°F
                    </Box>
                    <Box className={classes.lowtemps}>
                        {Math.floor(data.temp.min)}°F
                    </Box>
                </Box>
            </Box>
        </>
    )
};

export default ForecastCard;