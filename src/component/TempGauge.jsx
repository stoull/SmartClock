import React, { useEffect, useState }  from 'react';
import ReactECharts from 'echarts-for-react';
import { color } from 'chart.js/helpers';

function TempGauge( {temp = 0}) {

    const option_default = {
        series: [
            {
                type: 'gauge',
                center: ['50%', '60%'],
                startAngle: 200,
                endAngle: -20,
                min: 21,
                max: 33,
                splitNumber: 6,
                itemStyle: {
                    color: '#FFAB91'
                },
                progress: {
                    show: true,
                    width: 12
                },
                pointer: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                    width: 12
                    }
                },
                axisTick: {
                    distance: -20,
                    splitNumber: 5,
                    lineStyle: {
                    width: 2,
                    color: '#999'
                    }
                },
                splitLine: {
                    distance: -30,
                    length: 8,
                    lineStyle: {
                    width: 3,
                    color: '#999'
                    }
                },
                axisLabel: {
                    distance: -14,
                    color: '#999',
                    fontSize: 14
                },
                anchor: {
                    show: false
                },
                title: {
                    show: false
                },
                detail: {
                    valueAnimation: true,
                    width: '60%',
                    lineHeight: 40,
                    borderRadius: 8,
                    offsetCenter: [0, '-15%'],
                    fontSize: 34,
                    fontWeight: 'bolder',
                    formatter: '{value}°C',
                    color: 'inherit'
                },
                data: [
                    {
                        value: 25
                    }
                ]
            },
            {
                type: 'gauge',
                center: ['50%', '60%'],
                startAngle: 200,
                endAngle: -20,
                min: 21,
                max: 33,
                itemStyle: {
                    color: '#FD7347'
                },
                progress: {
                    show: true,
                    width: 8
                },
                pointer: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                detail: {
                    show: false
                },
                data: [
                    {
                    value: 25
                    }
                ]
            }
        ]
    };

    const getNewTempOption = (newTemp) => {
        const [colorValue, colorValue2] = getColorValue(newTemp)
        return {
            series: [
            {
                data: [
                {
                    itemStyle: {
                        color: colorValue2
                    },
                    detail: {
                        color: colorValue
                    },
                    value: newTemp
                }
                ]
            },
            {
                itemStyle: {
                    color: colorValue
                },
                data: [
                {
                    value: newTemp
                }
                ]
            }
            ]
        }
    }
    
    function getColorValue(temp) {
        let colorValue;
        let colorValue2;
        if (temp < 20) {
            colorValue = '#370097';
            colorValue2 = '#370097';
        } else if (temp >= 20 && temp < 22) {
            colorValue = '#0034F5';
            colorValue2 = '#0034F5';
        } else if (temp >= 22 && temp < 24) {
            colorValue = '#0084C1';
            colorValue2 = '#0084C1';
        } else if (temp >= 24 && temp < 27) {
            colorValue = '#56A63B';
            colorValue2 = '#56A63B';
        } else if (temp >= 27 && temp < 28) {
            colorValue = '#CAE644';
            colorValue2 = '#CAE644';
        } else if (temp >= 28 && temp < 29) {
            colorValue = '#FFFF4D';
            colorValue2 = '#FFFF4D';
        } else if (temp >= 29 && temp < 30) {
            colorValue = '#FFB430';
            colorValue2 = '#FFB430';
        } else if (temp >= 30 && temp < 31) {
            colorValue = '#FF912A';
            colorValue2 = '#FF912A';
        } else if (temp >= 31 && temp < 32) {
            colorValue = '#FF4122';
            colorValue2 = '#FF4122';
        } else if (temp >= 32 && temp < 33) {
            colorValue = '#FF2B22';
            colorValue2 = '#FF2B22';
        } else if (temp >= 33) {
            colorValue = '#FF2B22';
            colorValue2 = '#FF2B22';
        } else {
            colorValue = '#999';
            colorValue2 = '#999';
        }
        return [colorValue, colorValue2];
    }

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