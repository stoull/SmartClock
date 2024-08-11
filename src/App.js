import logo from './logo.svg';
import './App.css';
import React, {useCallback, useState, useEffect} from "react";

import Chart from 'chart.js/auto';
import { FullScreen, useFullScreenHandle } from "react-full-screen";


import { Line } from "react-chartjs-2";
import DigitalClock from './DigitalClock.jsx';

function App() {
  const handle = useFullScreenHandle();

  const [temp, setTemp] = useState('--');
  const [humidity, setHumidity] = useState('--');

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

        <button onClick={handle.enter}>
          全屏
        </button>

        <FullScreen handle={handle}>
          <DigitalClock></DigitalClock>
          <div className='Chart'>
            <Line data={data} />
          </div>

          <div>
            <p>温度: {temp}˚C          温度: {humidity}%</p>
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
