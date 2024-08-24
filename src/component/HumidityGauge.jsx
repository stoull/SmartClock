import React, { useEffect, useState }  from 'react';
import ReactECharts from 'echarts-for-react';

import { option_default, getNewTempOption } from '../model/ChartjsGaugeData.js';

function HumidityGauge( {humi = 45}) {

    const [option, setOption] = useState(option_default)

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    useEffect(() => {
        // const runTimer = setInterval(function () {
        //     const random = getRandomNumber(0, 100);
        //     setOption(getNewTempOption(random))
        // }, 2000);
        // return () => clearInterval(runTimer);
        const newOption = getNewTempOption(humi);
        setOption(newOption)
    }, [humi])

    return(
        <ReactECharts option={option} style={{ width: "280px", height: "180px" }} />
    )
}

export default HumidityGauge;