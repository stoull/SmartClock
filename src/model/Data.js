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
      y: {
        beginAtZero: true,
        type: 'linear',
        position: 'left',
        id: 'y-axis-1'
      },
      y2: {
          beginAtZero: true,
          type: 'linear',
          position: 'right',
          id: 'y-axis-2',
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

  export const defaultTempTableData = {
    labels: ['--:--', '--:--'],
    datasets: [
      {
        label: "温度(˚C)",
        data: [25, 25],
        fill: false,
        borderColor: "#FF8585",
        borderCapStyle: 'round',
        yAxisID: 'y-axis-1' // 指定使用左侧 Y 轴
      },
      {
        label: "湿度(%)",
        data: [40, 40],
        fill: false,
        borderColor: "#74E4EE",
        borderCapStyle: 'round',
        yAxisID: 'y-axis-2' // 指定使用右侧 Y 轴
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
          yAxisID: 'y-axis-1'
        },
        {
          label: "湿度(%)",
          data: response.humi,
          fill: false,
          borderColor: "#99DCDC",
          borderCapStyle: 'round',
          pointStyle: false,
          yAxisID: 'y-axis-2'
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