

// const API_Weather_URL = 'http://127.0.0.1:5001/api/v1/temperature-humidity';
const API_Weather_URL = 'http://hutpi.local:5001/api/v1/temperature-humidity';

export const fetchData = async () => {
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
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };