
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

import { fetchTempInfo, fetchTempHistory } from '../api/smartClockApi';
import bg2 from '../assets/bg2.jpeg';

function Home() {
  const handle = useFullScreenHandle();
  const [fontsize, setFontsize] = useState('14rem');
  const [fontsizeTemp, setFontsizeTemp] = useState('4rem');
  const [tempinfo, setTempinfo] = useState(defaultTempInfo);
  const [temphistory, setTemphistory] = useState(defaultTempTableData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bgImg, setBgImg] = useState(); // 设置背景图片

  // 设置默认主题
  const [appearance, setAppearance] = useState({'theme': 'dark'});

  const fetchData = async () => {
    try {
      const resultTemp = await fetchTempInfo();
      setTempinfo(resultTemp);
      const resultHis = await fetchTempHistory();
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
    window.getSelection().removeAllRanges();
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
    window.getSelection().removeAllRanges();
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

  const handleFullScreen = (handle) => {
    window.getSelection().removeAllRanges(); // 退出全屏时清除选中
    if (handle.active) {
      handle.exit();
    } else {
      handle.enter();
    }
  }

  const updateAppearance = (newValue) => {
    if (newValue.theme === 'dark') {
      document.documentElement.style.setProperty('--main-bg-color', '#282c34');
      document.documentElement.style.setProperty('--main-text-color', '#ffffff');
      setBgImg(); // 清除背景图片
    } else if (newValue.theme === 'light') {
      document.documentElement.style.setProperty('--main-bg-color', '#fafafa');
      document.documentElement.style.setProperty('--main-text-color', '#1a1a1a');
      setBgImg(); // 清除背景图片
    } else if (newValue.theme === 'wallpaper') {
      document.documentElement.style.setProperty('--main-bg-color', 'transparent');
      document.documentElement.style.setProperty('--main-text-color', '#ffffff');
      setBgImg(bg2); // 设置背景图片
    }
    setAppearance(prev => ({ ...prev, ...newValue }));
  }

  return (
    <div className="Home">

      <div className='Home-Content'>

        <FullScreen className='FullScreen-Content' handle={handle}>

          <div className='navbar'>
            <AiOutlinePlus onClick={increaseFontSize} />
            <AiOutlineMinus onClick={reduceFontSize} />
            {handle.active
              ? <AiOutlineFullscreenExit onClick={() => handleFullScreen(handle)} />
              : <AiOutlineFullscreen onClick={() => handleFullScreen(handle)} />
            }
            <AiOutlineSetting onClick={handleSideBar} />
            <SideBar isShow={showSideBar} onIsShowChange={sideBarIsChanged} updateAppearance={updateAppearance}/>
          </div>

          <div className='FullScreen-Container' 
          style={{
            backgroundImage: `url(${bgImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundClip: 'border-box'
          }}>
            <DigitalClock fontSize={fontsize}></DigitalClock>

            <TempHumiBoard tempInfo = { tempinfo } fontSize={fontsizeTemp} />

            <div className='Chart-Container'>
              <div className='Chart-Item'> 
                <Line className='Chart-Canvas' 
                data={temphistory} 
                options={tempEchartLineOptions} 
                />
               </div>
            </div>
          </div>
        </FullScreen>

      </div>
    </div>
  );
}

export default Home;