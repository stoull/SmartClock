
import './Home.css';
import React, {useCallback, useState, useEffect} from "react";

import Chart from 'chart.js/auto';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import { Line } from "react-chartjs-2";
import DigitalClock from '../component/DigitalClock.jsx';
import SideBar from './SideBar.js';
import { defaultTempInfo, defaultTempTableData, defaultHumiTableData, createTempData, createHumiData, tempEchartLineOptions } from '../model/Data.js';
import TempHumiBoard from '../component/TempHumiBoard.jsx'

import { AiOutlineSetting, AiOutlineMinus, AiOutlinePlus, AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";

function Home() {
  const handle = useFullScreenHandle();
  const [fontsize, setFontsize] = useState('14rem');
  const [fontsizeTemp, setFontsizeTemp] = useState('4rem');
  const [tempinfo, setTempinfo] = useState(defaultTempInfo);
  const [temphistory, setTemphistory] = useState(defaultTempTableData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [appearance, setAppearance] = useState({});

  const fetchData = async () => {
    try {
      // const responseTemp = await fetch('http://127.0.0.1:5001/api/v1/temperature-humidity');
      const responseTemp = await fetch('http://hutpi.local:5001/api/smart-clock/temperature-humidity');
      if (!responseTemp.ok) {
        throw new Error('网络响应不正常');
      }
      const resultTemp = await responseTemp.json();
      setTempinfo(resultTemp);

      // const responseHistory = await fetch('http://127.0.0.1:5001/api/v1/temperature-humidity/history');
      const responseHistory = await fetch('http://hutpi.local:5001/api/smart-clock/temperature-humidity/history');
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
    }, 180000); // 每6分钟）360000

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

  const [showSideBar, setShowSideBar] = useState(false);
  const handleSideBar = () => {
    setShowSideBar( preStaus => {
      return !preStaus
    })
  }

  const sideBarIsChanged = (newValue) => {
    setShowSideBar(newValue)
  }

  const updateAppearance = (newValue) => {
    console.log("xxxx update appearance newValue: ", newValue)
  }

  return (
    <div className="Home">
      <div className='navbar'>
        <AiOutlinePlus onClick={increaseFontSize} />
        <AiOutlineMinus onClick={reduceFontSize} />
        <AiOutlineFullscreen onClick={handle.enter} />

        <AiOutlineSetting onClick={handleSideBar} />
        <SideBar isShow={showSideBar} onIsShowChange={sideBarIsChanged} updateAppearance={updateAppearance}/>
      </div>
      <div className='Home-Content'>

        <FullScreen className='FullScreen-Content' handle={handle}>

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