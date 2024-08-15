import logo from './logo.svg';
import './App.css';
import React, {useCallback, useState, useEffect} from "react";

import Chart from 'chart.js/auto';
import { FullScreen, useFullScreenHandle } from "react-full-screen";


import { Line } from "react-chartjs-2";
import DigitalClock from './DigitalClock.jsx';
import MechanicalClock from './MechanicalClock.jsx';
import TempGauge from './TempGauge.jsx';

function App() {
  const handle = useFullScreenHandle();

  const defaultTempInfo = {
    "cpu_used_rate": 0,
    "createDate": "--",
    "cup_temp": 0,
    "humidity": 0,
    "id": 0,
    "sys_runtime": "--",
    "sys_uptime": "--",
    "temperature": 0
  }

  const defaultTempTableData = {
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


  const defaultHumiTableData = {
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

  const createTempData = (response) => {
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

  const createHumiData = (response) => {
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

  const [fontsize, setFontsize] = useState('12rem');
  const [tempinfo, setTempinfo] = useState(defaultTempInfo);
  const [temphistory, setTemphistory] = useState(defaultTempTableData);
  const [humidityhistory, setHumidityhistory] = useState(defaultHumiTableData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const responseTemp = await fetch('http://127.0.0.1:5001/api/v1/temperature-humidity');
      // const responseTemp = await fetch('http://hutpi.local:5001/api/v1/temperature-humidity');
      if (!responseTemp.ok) {
        throw new Error('网络响应不正常');
      }
      const resultTemp = await responseTemp.json();
      setTempinfo(resultTemp);

      const responseHistory = await fetch('http://127.0.0.1:5001/api/v1/temperature-humidity/history');
      // const responseHistory = await fetch('http://hutpi.local:5001/api/v1/temperature-humidity/history');
      if (!responseHistory.ok) {
        throw new Error('网络响应不正常');
      }
      const resultHis = await responseHistory.json();
      const tempTableData = createTempData(resultHis);
      const humiTableData = createHumiData(resultHis);
      setTemphistory(tempTableData);
      setHumidityhistory(humiTableData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData()
    // 创建一个定时器
    const intervalId = setInterval(() => {
      fetchData()
    }, 10000); // 每6分钟）360000

    // 清理定时器
    return () => clearInterval(intervalId);
  }, []);

  const increaseFontSize = () => {
    setFontsize( preSize => {
      let preInt = parseInt(preSize)
      return `${preInt+1}rem`
    });
  };

  const reduceFontSize = () => {
    setFontsize( preSize => {
      let preInt = parseInt(preSize)
      return `${preInt-1}rem`
    });
  };

  return (
    <div className="App">

      {/* <header className="App-header">
      </header> */}

      <div>
        <button onClick={reduceFontSize}>字体-</button>
        <button onClick={increaseFontSize}>字体+</button>
        <button onClick={handle.enter}>全屏</button>
      </div>

      <div className='App-Content'>
        <FullScreen handle={handle}>
          {/* <DigitalClock fontSize={fontsize}></DigitalClock> */}

            {/* <div className='Mechanical-Clock'>
                <MechanicalClock> </MechanicalClock>
            </div> */}

            <div className='Gauge-Chart'>
                <TempGauge></TempGauge>
            </div>
          


          <div>
            <p className='Temp-Text'>温度: {tempinfo.temperature}˚C                 湿度: {tempinfo.humidity}%</p>
          </div>

          <div className='Chart'>
            <Line className='Chart-Line' 
            data={temphistory} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              }} 
            />
          </div>
 
          <div className='Chart'>
            <Line className='Chart-Line' 
            data={humidityhistory} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              }} 
            />
          </div>

          <div>
            <p>{tempinfo.cup_temp}˚C</p>
          </div>

        </FullScreen>

        {/* <DigitalClock></DigitalClock>
        <div className='Chart'>
          <Line data={data} />
        </div> */}
      </div>
    </div>
  );
}

export default App;