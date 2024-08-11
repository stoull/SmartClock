import logo from './logo.svg';
import './App.css';
import React, {useCallback, useState, useEffect} from "react";

import Chart from 'chart.js/auto';
import { FullScreen, useFullScreenHandle } from "react-full-screen";


import { Line } from "react-chartjs-2";
import DigitalClock from './DigitalClock.jsx';

function App() {
  const handle = useFullScreenHandle();

  const [fontsize, setFontsize] = useState('12rem');
  const [temp, setTemp] = useState('--');
  const [humidity, setHumidity] = useState('--');

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
            <p>温度: {temp}˚C          温度: {humidity}%</p>
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
