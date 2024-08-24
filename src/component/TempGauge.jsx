import React, { useEffect, useState }  from 'react';
import ReactECharts from 'echarts-for-react';
// import { color } from 'chart.js/helpers';

import { getNewTempOption, option_default } from '../model/EchartGaugeData.js';

function TempGauge( {temp = 0}) {
    const [option, setOption] = useState(option_default)

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    useEffect(() => {
        // const runTimer = setInterval(function () {
        //     const random = getRandomNumber(20, 34);
        //     setOption(getNewTempOption(random))
        // }, 2000);
        // return () => clearInterval(runTimer);

        const newOption = getNewTempOption(temp);
        setOption(newOption)
    }, [temp])

    return(
        <ReactECharts option={option} style={{ width: "280px", height: "180px" }} />
    )
}

export default TempGauge;