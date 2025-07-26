
import './Home.css';
import {useCallback, useState, useEffect} from "react";

import Chart from 'chart.js/auto';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import { Line } from "react-chartjs-2";
import DigitalClock from '../component/DigitalClock.jsx';
import SideBar from './SideBar.js';
import DailyGadgets from './DailyGadgets.js';
import { defaultTempInfo, defaultTempTableData, defaultHumiTableData, createTempData, createHumiData, tempEchartLineOptions } from '../model/Data.js';
import TempHumiBoard from '../component/TempHumiBoard.jsx'

import { AiOutlineSetting, AiOutlineMinus, AiOutlinePlus, AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";

import { fetchTempInfo, fetchTempHistory } from '../api/smartClockApi';
import bg2 from '../assets/bg/bg2.jpeg';

function Home() {
  const handle = useFullScreenHandle();
  const [fontsize, setFontsize] = useState('14rem');
  const [fontsizeTemp, setFontsizeTemp] = useState('4rem');
  const [tempinfo, setTempinfo] = useState(defaultTempInfo);
  const [temphistory, setTemphistory] = useState(defaultTempTableData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bgImg, setBgImg] = useState(); // 设置背景图片
  const [showBottomPanel, setShowBottomPanel] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // 用于触发DailyGadgets刷新

  // 设置默认主题
  const [appearance, setAppearance] = useState({'theme': 'dark'});

  let hourlyTimeoutId = null;
  let hourlyIntervalId = null;
  let dataFetchIntervalId = null;


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

  const autoChangeToDarkTheme = () => {
    // 确保这个方法每个小时执行一次
    const date = new Date();
    let hours = date.getHours();
    if (hours === 7) {
      updateAppearance({'theme': appearance.theme, 'isAutoChange': true});
      setFontsize('10rem'); 
      setFontsizeTemp('3rem');
    } else if (hours === 20) {
      updateAppearance({'theme': 'dark', 'isAutoChange': true});
      setFontsize('14rem');
      setFontsizeTemp('4rem');
    }

    if (hours >= 6 && hours < 22) {
      setShowBottomPanel(true);
    } else {
      setShowBottomPanel(false);
    }

    // 每小时触发DailyGadgets刷新随机内容
    setRefreshTrigger(prev => prev + 1);
  }

  useEffect(() => {
    fetchData()
    // 创建一个定时器
    dataFetchIntervalId = setInterval(() => {
      fetchData()
    }, 180000); // 每6分钟）360000
    runHourly();
    // 清理定时器
    return () => cleanupTimers();
  }, []);

  function runHourly() {
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    // 计算距离下一个整点还有多少毫秒
    const delayUntilNextHour = (60 - minutes) * 60 * 1000 - seconds * 1000 - milliseconds;;
    
    // 先等待到下一个整点
    hourlyTimeoutId = setTimeout(() => {
      // 执行第一次任务
      autoChangeToDarkTheme();
      
      // 然后每小时执行一次
      hourlyIntervalId = setInterval(autoChangeToDarkTheme, 60 * 60 * 1000);
    }, delayUntilNextHour);
  }

  function cleanupTimers() {
    if (hourlyTimeoutId) {
      clearTimeout(hourlyTimeoutId);
      hourlyTimeoutId = null;
    }
    if (hourlyIntervalId) {
      clearInterval(hourlyIntervalId);
      hourlyIntervalId = null;
    }
    if (dataFetchIntervalId) {
      clearInterval(dataFetchIntervalId);
      dataFetchIntervalId = null;
    }
  }

  const increaseFontSize = () => {
    window.getSelection().removeAllRanges();
    setFontsize( preSize => {
      let preInt = parseFloat(preSize)
      return `${preInt+1}rem`
    });

    setFontsizeTemp( preSize => {
      let preInt = parseFloat(preSize)
      return `${preInt+0.25}rem`
    })
  };

  const reduceFontSize = () => {
    window.getSelection().removeAllRanges();
    setFontsize( preSize => {
      let preInt = parseFloat(preSize)
      preInt = preInt > 2.0 ? preInt : 2.0;
      return `${preInt-1}rem`
    });

    setFontsizeTemp( preSize => {
      let preInt = parseFloat(preSize)
      preInt = preInt > 1.0 ? preInt : 1.0;
      return `${preInt-0.25}rem`
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
    if (newValue.isAutoChange == false) {
      setAppearance(prev => ({ ...prev, ...newValue }));
    }
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

            <DailyGadgets 
              temphistory={temphistory}  
              tempEchartLineOptions={tempEchartLineOptions}
              refreshTrigger={refreshTrigger}
            />
          </div>
        </FullScreen>

      </div>
    </div>
  );
}

export default Home;