import logo from './logo.svg';
import './App.css';
import React, {useCallback, useState, useEffect} from "react";

import Chart from 'chart.js/auto';
import { FullScreen, useFullScreenHandle } from "react-full-screen";


import { Line } from "react-chartjs-2";
import DigitalClock from './DigitalClock.jsx';

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
  const [fontsize, setFontsize] = useState('12rem');
  const [tempinfo, setTempinfo] = useState(defaultTempInfo);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//   useEffect(() => {
//     // 创建一个定时器
//     const intervalId = setInterval(() => {
//       fetchData()
//     }, 360000); // 每6分钟）

//     // 清理定时器
//     return () => clearInterval(intervalId);
//     fetchData()
// }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.1.104:5001/api/v1/temperature-humidity'); // 替换为你的 API URL
      if (!response.ok) {
        throw new Error('网络响应不正常');
      }
      const result = await response.json();
      // console.log("xxxxxxx result", result);
      setTempinfo(result);
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


  useEffect(() => {
      const intervalId = setInterval(() => {
          // read file or call a api
      }, 5000);

      return () => {
          clearInterval(intervalId);
      }
  }, []);

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774"
      }
    ]
  };

  return (
    <div className="App">

      <header className="App-header">

      </header>

      <div className='App-Content'>

      <button onClick={reduceFontSize}>字体-</button>
      <button onClick={increaseFontSize}>字体+</button>

        <button onClick={handle.enter}>
          全屏
        </button>

        <FullScreen handle={handle}>
          <DigitalClock fontSize={fontsize}></DigitalClock>

          <div>
            <p>温度: {tempinfo.temperature}˚C          湿度: {tempinfo.humidity}%      cpu: {tempinfo.cup_temp}˚C</p>
          </div>

          <div className='Chart'>
            <Line data={data} />
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
