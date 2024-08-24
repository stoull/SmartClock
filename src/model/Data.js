
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

  export const defaultTempTableData = {
    labels: ['--:--', '--:--'],
    datasets: [
      {
        label: "温度(˚C)",
        data: [0, 0],
        fill: false,
        borderColor: "#FF8585",
        borderCapStyle: 'round'
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
          pointStyle: false
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