import react from 'react';
import ForecastCard from './ForecastCard';


const ForecastData = ({ data }: any) => {
    return (
        <>
            {data.map((day: any) => {
                return <ForecastCard data={day}/>
            })}
        </>
    )
};

export default ForecastData