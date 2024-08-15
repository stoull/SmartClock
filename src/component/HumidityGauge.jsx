import React, { useEffect, useState }  from 'react';
import ReactECharts from 'echarts-for-react';

function HumidityGauge( {humi = 45}) {

    const option_default = {
        series: [
            {
                type: 'gauge',
                center: ['50%', '60%'],
                startAngle: 200,
                endAngle: -20,
                min: 0,
                max: 100,
                splitNumber: 5,
                itemStyle: {
                    color: '#0E84BB'
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
                    formatter: '{value}%',
                    color: '#0E84BB'
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
                min: 0,
                max: 100,
                itemStyle: {
                    color: '#0E84BB'
                },
                progress: {
                    show: true,
                    width: 12
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
                    value: 45
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
    
    function getColorValue(humi) {
        const colorValue = "#0E84BB";
        const colorValue2 = "#0E84BB";
        return [colorValue, colorValue2];
    }

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