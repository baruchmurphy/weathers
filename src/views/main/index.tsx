import react, {useEffect, useState} from 'react';
import { Card, CardContent, makeStyles, Typography, Box } from '@material-ui/core';
import Axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import TempData from '../../components/TempData';
import ForecastData from '../forecast';
import Skeleton from 'react-loading-skeleton'
import ForecastChart from '../../views/forecast/ForecastChart'

const useStyles = makeStyles ({
    card: {
        paddingBottom: "3rem"
    },
    forecast: {
        display: 'inline-flex',
    },
    tempLoader: {
        paddingBottom: '3rem'
    },
    graphLoader: {
        paddingBottom: '5rem'
    }
})

const WidgetMain = () => {
    const classes = useStyles();
    const [errorMessage, setErrorMessage] = useState('')
    const [tempData, settempData] = useState<any>()
    const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 })
    const [loading, setLoading] = useState(true);
    // set location gets called if using google geolocation 
    const [location, setLocation] = useState('Cupertino, CA')
    
    // const getLocation = async (lat : number, lng : number) => {
    //     using google api works this way (dont want to enable billing)
    //     try {
    //         await Axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    //             params: {
    //                 latlng: `${lat},${lng}`,
    //                 key: 'AIzaSyCPxBHr4ofrNKZLXkLzmNm22VFWpIjabkU'
    //             }
                
    //         }).then((response: any) => {
    //             const data = `${response.results[4].long_name}, ${response.results[6].short_name}`
    //             setLocation(data)
    //         })

    //     } catch (error) {
            
    //     }
    // }

    const getCoordinates = async() => {
       if (!coordinates.lat && !coordinates.lon) {
        navigator.geolocation.getCurrentPosition((position) => {
            setCoordinates({ lat: position.coords.latitude, lon: position.coords.longitude })
        })
       }
    };

    useEffect(() => {
        const getWeatherFromAPI = async () =>{
            try {
                await Axios.get('https://api.openweathermap.org/data/2.5/onecall', {
                    params: {
                        lat: coordinates.lat,
                        lon: coordinates.lon,
                        units: 'imperial',
                        appid: '4fcd2c4a2dcf57832d8b5a6c3d3c35e8'
                    }
                }).then((response: any) => {
                    settempData(response)
                })
            } catch (error) {
                setErrorMessage('failed to access api')
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getCoordinates()
        if (!tempData && coordinates.lat) {
            getWeatherFromAPI()
        }
    }, [tempData, coordinates]);

    return (
        loading ? 
            <>
                <Typography variant="h1" className={classes.tempLoader}><Skeleton count={1}/></Typography> 
                <Typography variant='h1' className={classes.graphLoader}><Skeleton height="11rem" count={1}/></Typography>
                <Typography variant='h1'><Skeleton height="8rem" count={1}/></Typography>
            </>
            : <>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <Card className={classes.card}>
                <CardContent>
                    <Box paddingBottom='3rem'>
                        <TempData data={tempData.data} location={location}/>
                    </Box>
                    <Box paddingBottom="5rem">
                        <ForecastChart data={tempData.data.hourly} />
                    </Box>
                    <ForecastData className={classes.forecast} data={tempData.data.daily}/>
                </CardContent>
            </Card>
        </>
    )
};

export default WidgetMain;