import react, {useEffect, useState} from 'react';
import { Card, CardContent, makeStyles } from '@material-ui/core';
import Axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import TempData from '../../components/TempData';
import axios from 'axios';

const useStyles = makeStyles ({
    card: {
        backgroundColor: "#AFEDED",
        width: "13rem"
    }
})

const WidgetMain = () => {
    const classes = useStyles();
    const [errorMessage, setErrorMessage] = useState('')
    const [tempData, settempData] = useState<any>()

    useEffect(() => {
        const getWeatherFromAPI = async () =>{
            try {
                await Axios.get('https://api.openweathermap.org/data/2.5/onecall', {
                    params: {
                        lat: 37.322998,
                        lon: -122.032181,
                        units: 'imperial',
                        appid: '4fcd2c4a2dcf57832d8b5a6c3d3c35e8'
                    }
                }).then((response: any) => {
                    settempData(response)
                })
            } catch (error) {
                setErrorMessage('failed to access api')
                console.log(error)
            }
        }
        if (!tempData) {
            getWeatherFromAPI()
        }
    }, [tempData]);

    console.log(tempData)

    // console.log(errorMessage)

    if (!tempData) {
        return null
    }

    return (
        <>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <Card className={classes.card}>
                <CardContent>
                    <TempData data={tempData.data}/>
                </CardContent>
            </Card>
        </>
    )
};

export default WidgetMain