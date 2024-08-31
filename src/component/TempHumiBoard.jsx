import React, {useEffect, useState} from 'react';
import { defaultTempInfo } from '../model/Data.js';
import '../App.css'
import { getHumiColorValue, getTempColorValue } from '../model/ColorData.js'

import TempGauge from './TempGauge.jsx';
import HumidityGauge from './HumidityGauge.jsx';

function TempHumiBoard( {tempInfo = defaultTempInfo, fontSize}) {
    const default_showValues = {
        temp: 0,
        humi: 50,
        weather: '--',
        weather_temp:0,
        cpu_temp:45,
        temp_color: '#56A63B',
        humi_color: '#8FE759'
    }

    // const [fontTempSize, setFontTempSize] = useState(fontSize)
    const [fontWeatherSize, setFontWeatherSize] = useState(fontSize)
    const [showValues, setShowValues] = useState(default_showValues)

    useEffect(() => {
        setFontWeatherSize( preValue => {
            let preInt = parseInt(preValue)
            const fRate = preInt/4
            let wFontS = preInt-fRate
            wFontS = wFontS > 1 ? wFontS : 1;
            return `${wFontS}rem`
        })
    }, [fontSize])

    useEffect( () => {
        const [tempColor, tempColor2] = getTempColorValue(tempInfo.temperature)
        const humiColor = getHumiColorValue(tempInfo.humidity)
        setShowValues(preValue => ({
            ...preValue,
            temp: tempInfo.temperature,
            humi: tempInfo.humidity,
            weather: tempInfo.weather,
            weather_temp: tempInfo.outdoors_temp,
            cpu_temp: tempInfo.cup_temp,
            temp_color: tempColor,
            humi_color: humiColor
        }))
    }, [tempInfo])

    return(
        // <div className='Gauge-Container'>
        //     <div className='Gauge-Chart'>
        //       <TempGauge temp={showValues.temp}></TempGauge>
        //     </div>

        //     <div className='Gauge-Chart'>
        //         <HumidityGauge humi={showValues.humi}></HumidityGauge>
        //     </div>

        //     <p className='Temp-text'>室外温度: {showValues.weather_temp}˚C           天气: {showValues.weather}</p>
        //     <p style={{ fontSize: '10px', margin: '0 0 0 200px' }}>cpu: {showValues.cpu_temp}˚C</p>
        // </div>

        <div className='Temp-humi-board'>
            <div className='Temp-humi-board-temp'>
                <p className='Temp-humi-text' style={{ fontSize: fontSize, color: showValues.temp_color}}>{showValues.temp}˚C</p>
                <p className='Temp-humi-text' style={{ fontSize: fontSize, color: showValues.humi_color}}>{showValues.humi}%</p>
            </div>
            <div className='Temp-humi-board-out'>
                <p className='Temp-text' style={{ fontSize: fontWeatherSize, color: showValues.temp_color }} >out: {showValues.weather_temp}</p>
                <p className='Temp-text' style={{ fontSize: fontWeatherSize, color: '#FDF53D'}} >{showValues.weather}</p>
            </div>
            <p className='Temp-text-small'>cpu: {showValues.cpu_temp}˚C</p>
        </div>
    )
}

export default TempHumiBoard;