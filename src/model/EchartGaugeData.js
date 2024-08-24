
import { getTempColorValue } from './ColorData.js'

export const option_default = {
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

export const getNewTempOption = (newTemp) => {
    const [colorValue, colorValue2] = getTempColorValue(newTemp)
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