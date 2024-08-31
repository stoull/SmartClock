
import './Home.css';
import React, {useCallback, useState, useEffect} from "react";

import Chart from 'chart.js/auto';
import { FullScreen, useFullScreenHandle } from "react-full-screen";


import { Line } from "react-chartjs-2";
import DigitalClock from '../component/DigitalClock.jsx';
import SideBar from './SideBar.js';
import { defaultTempInfo, defaultTempTableData, defaultHumiTableData, createTempData, createHumiData, tempEchartLineOptions } from '../model/Data.js';
import TempHumiBoard from '../component/TempHumiBoard.jsx'

function Home() {
  const handle = useFullScreenHandle();
  const [fontsize, setFontsize] = useState('12rem');
  const [fontsizeTemp, setFontsizeTemp] = useState('4rem');
  const [tempinfo, setTempinfo] = useState(defaultTempInfo);
  const [temphistory, setTemphistory] = useState(defaultTempTableData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      // const responseTemp = await fetch('http://127.0.0.1:5001/api/v1/temperature-humidity');
      const responseTemp = await fetch('http://hutpi.local:5001/api/v1/temperature-humidity');
      if (!responseTemp.ok) {
        throw new Error('网络响应不正常');
      }
      const resultTemp = await responseTemp.json();
      setTempinfo(resultTemp);

      // const responseHistory = await fetch('http://127.0.0.1:5001/api/v1/temperature-humidity/history');
      const responseHistory = await fetch('http://hutpi.local:5001/api/v1/temperature-humidity/history');
      if (!responseHistory.ok) {
        throw new Error('网络响应不正常');
      }
      const resultHis = await responseHistory.json();
      const tempTableData = createTempData(resultHis);
      const humiTableData = createHumiData(resultHis);
      setTemphistory(tempTableData);
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
      preInt = preInt > 1 ? preInt : 1;
      return `${preInt+1}rem`
    });

    setFontsizeTemp( preSize => {
      let preInt = parseInt(preSize)
      preInt = preInt > 1 ? preInt : 1;
      return `${preInt+1}rem`
    })
  };

  const reduceFontSize = () => {
    setFontsize( preSize => {
      let preInt = parseInt(preSize)
      preInt = preInt > 2 ? preInt : 2;
      return `${preInt-1}rem`
    });

    setFontsizeTemp( preSize => {
      let preInt = parseInt(preSize)
      preInt = preInt > 2 ? preInt : 2;
      return `${preInt-1}rem`
    })
  };

  return (
    <div className="Home">
      <div>
        <button onClick={reduceFontSize}>字体-</button>
        <button onClick={increaseFontSize}>字体+</button>
        <button onClick={handle.enter}>全屏</button>
      </div>

      <div className='Home-Content'>
        <SideBar />

        <FullScreen handle={handle}>

          <DigitalClock fontSize={fontsize}></DigitalClock>

          <TempHumiBoard tempInfo = { tempinfo } fontSize={fontsizeTemp} />

          <div className='Chart'>
            <Line className='Chart-Line' 
            data={temphistory} 
            options={tempEchartLineOptions} 
            />
          </div>

        </FullScreen>

      </div>
    </div>
  );
}

export default Home;