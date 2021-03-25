import react from 'react';
import { Typography, Divider } from '@material-ui/core';


const ForecastData = ({ data }: any) => {

    return (
        <>
            {data.daily.map((day: any) => {
                return <div>
                            {Math.floor(day.temp.max)}
                            {Math.floor(day.temp.min)}
                            <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}/>
                        </div>
            })}
        </>
    )
};

export default ForecastData