import { 
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    CartesianGrid,
    Tooltip
} from 'recharts'
import react from 'react';

const ForecastChart = ({ data }: any) => {

    //filters data to only show every three hours and extracts temperature from data

    const hourlyTemps = () => {
        const filteredData = data.filter((cur: any, idx: number) => {
            if (idx === 0 || idx% 3 === 0) {
                return cur
            }
        })
    
        return filteredData.map((cur: any) => {
            const utc = new Date(cur.dt *1000)
            const time = utc.toString().split(' ')[4].toString().split('');
            time.splice(5, 3, '')
            const hour = time.join('')
            return {
                hour: hour,
                temperature: Math.floor(cur.temp),
                label: Math.floor(cur.temp)
            }
        })
    }

    return (
        <>
        <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={hourlyTemps()}>
                <YAxis />
                <Area dataKey="temperature" />
                <XAxis dataKey="hour" />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
            </AreaChart>
        </ResponsiveContainer>
        </>
    )


};

export default ForecastChart;