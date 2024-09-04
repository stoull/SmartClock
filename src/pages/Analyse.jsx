import React, {useCallback, useState, useEffect} from "react";
import './Home.css';
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";

import { defaultTempTableData, historyEchartLineOptions, createTempHistoryData, createHumiData } from '../model/Data.js';
import {formatDate, subtractHours } from '../tools/tools.js';

export function Analyse() {
    const [histories, setHistories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let isLoaded = false;
    useEffect(() => {
        console.log("useEffect")
        if (isLoaded == false) {
            fetchData()
            isLoaded = true;
        }
      }, []);

    const fetchData = async () => {
        let startDate = new Date();
        let endDate = new Date();
        startDate.setHours(9, 0, 0, 0);
        endDate.setHours(9, 1, 0, 0);

        startDate = subtractHours(startDate, 24);
        endDate = subtractHours(endDate, 24);

        endDate.setDate(endDate.getDate()+1);
        setHistories(() => []);

        const totalCount = 8;
        let urls = []
        for (let i=0; i<totalCount; i++) {
            const sDate = subtractHours(startDate, 24*i);
            const eDate = subtractHours(endDate, 24*i);
            const formattedStartDate = formatDate(sDate);
            const formattedEndDate = formatDate(eDate);
            const url = `http://hutpi.local:5001/api/smart-clock/surroundings/history?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
            urls.push(url);
        }

        for (const url of urls) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const historyData = await response.json();
                const tempTableData = createTempHistoryData(historyData);
                setHistories(preItems => [...preItems, tempTableData])
            } catch (error) {
                setError(error);
            }

            if (histories.length == totalCount) {
                setLoading(false);
            }
        }
    };

    return(
        <div className="Home">
            <div className='Home-Content'>
                {
                    ( () => {
                        let charts = []
                        histories.forEach((element, index) => {
                            charts.push(
                                <div key={index} className='Chart'>
                                    <Line className='Chart Chart-Line' 
                                        data={element} 
                                        options={historyEchartLineOptions} 
                                    />
                                </div>
                            )
                        });
                        return charts;
                    })()
                }
            </div>
          </div>
    )
}

export default Analyse;