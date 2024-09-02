import { scales } from "chart.js";
import { callback } from "chart.js/helpers";

export const defaultTempInfo = {
    "cpu_used_rate": 0,
    "createDate": "--",
    "cup_temp": 0,
    "humidity": 0,
    "id": 0,
    "sys_runtime": "--",
    "sys_uptime": "--",
    "temperature": 0
  }

  export const tempEchartLineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y1: {
        beginAtZero: false,
        type: 'linear',
        position: 'left',
        id: 'y1'
      },
      y2: {
          beginAtZero: false,
          type: 'linear',
          position: 'right',
          id: 'y2',
          grid: {
              drawOnChartArea: false // 不绘制右侧 Y 轴的网格线
          },
          ticks: {
            callback: function(value, index, vitals) {
              return `${value} %`
            }
          }
      }
    }
  }

  export const historyEchartLineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y1: {
        beginAtZero: false,
        type: 'linear',
        position: 'left',
        id: 'y1'
      },
      y2: {
          beginAtZero: false,
          type: 'linear',
          position: 'right',
          id: 'y2',
          grid: {
              drawOnChartArea: false // 不绘制右侧 Y 轴的网格线
          },
          ticks: {
            callback: function(value, index, vitals) {
              return `${value} ˚C`
            }
          }
      }
    }
  }

  export const defaultTempTableData = {
    labels: ['--:--', '--:--'],
    datasets: [
      {
        label: "温度(˚C)",
        data: [25, 25],
        fill: false,
        borderColor: "#FF8585",
        borderCapStyle: 'round',
        yAxisID: 'y1' // 指定使用左侧 Y 轴
      },
      {
        label: "湿度(%)",
        data: [40, 40],
        fill: false,
        borderColor: "#74E4EE",
        borderCapStyle: 'round',
        yAxisID: 'y2' // 指定使用右侧 Y 轴
      }
    ]
  };


  export const defaultHumiTableData = {
    labels: ['--:--', '--:--'],
    datasets: [
      {
        label: "湿度(%)",
        data: [0, 0],
        fill: false,
        borderColor: "#74E4EE",
        borderCapStyle: 'round',
      }
    ]
  };

  export const createTempData = (response) => {
    const data_history = {
      labels: response.labels,
      datasets: [
        {
          label: "温度(˚C)",
          data: response.temp,
          fill: false,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "#FF8585",
          borderCapStyle: 'round',
          pointStyle: false,
          yAxisID: 'y1'
        },
        {
          label: "湿度(%)",
          data: response.humi,
          fill: false,
          borderColor: "#99DCDC",
          borderCapStyle: 'round',
          pointStyle: false,
          yAxisID: 'y2'
        }
      ]
    };
    return data_history;
  }

  export const createTempHistoryData = (response) => {

    let normalVale = 0
    const outTemp = response.temp.map( (temp, index) => {
      const outTemp = response.outdoors_temp[index];
      let dTemp = outTemp;
      dTemp = dTemp.toFixed(2);
      dTemp = Math.abs(dTemp)
      // Here is handle the unusual data
      if (outTemp == 0) {
        dTemp = normalVale
      } else {
        normalVale = dTemp
      }
      return dTemp;
    })

    normalVale = 0
    const diffTemp = response.temp.map( (temp, index) => {
      const outTemp = response.outdoors_temp[index];
      let dTemp = outTemp-temp;
      dTemp = dTemp.toFixed(2);
      // Here is handle the unusual data
      if (Math.abs(dTemp) > 10.0 && outTemp == 0) {
        dTemp = normalVale
      } else {
        normalVale = dTemp
      }
      return dTemp;
    })

    const data_history = {
      labels: response.labels,
      datasets: [
        {
          label: "温度(˚C)",
          data: response.temp,
          fill: false,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "#FB6B6B",
          borderCapStyle: 'round',
          pointStyle: false,
          yAxisID: 'y1'
        },
        {
          label: "室外(˚C)",
          data: outTemp,
          fill: false,
          borderColor: "#1AB8FD",
          borderCapStyle: 'round',
          pointStyle: false,
          yAxisID: 'y1'
        },
        {
          label: "温差(˚C)",
          data: diffTemp,
          fill: false,
          borderColor: "#676767",
          borderCapStyle: 'round',
          pointStyle: false,
          yAxisID: 'y2'
        }
      ]
    };
    return data_history;
  }

  export const createHumiData = (response) => {
    const data_history = {
      labels: response.labels,
      datasets: [
        {
          label: "湿度(%)",
          data: response.humi,
          fill: false,
          borderColor: "#99DCDC",
          borderCapStyle: 'round',
          pointStyle: false
        }
      ]
    };
    return data_history;
  }