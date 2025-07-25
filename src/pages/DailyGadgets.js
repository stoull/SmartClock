import './DailyGadgets.css';
import { useEffect, useState } from 'react';

import Quotes from '../assets/Quotes-Favorites.json';

import './Home.css';
import { Line } from "react-chartjs-2";

// 动态导入所有图片
const importImages = () => {
  const images = {};
  const imageFiles = [
    '2010-11-01.jpg', '2010-11-02.jpg', '2010-11-03.jpg', '2010-11-04.jpg', '2010-11-05.jpg',
    '2010-11-06.jpg', '2010-11-07.jpg', '2010-11-08.jpg', '2010-11-09.jpg', '2010-11-10.jpg',
    '2010-11-11.jpg', '2010-11-12.jpg', '2010-11-13.jpg', '2010-11-14.jpg', '2010-11-15.jpg',
    '2010-11-16.jpg', '2010-11-17.jpg', '2010-11-18.jpg', '2010-11-19.jpg', '2010-11-20.jpg',
    '2010-11-21.jpg', '2010-11-22.png', '2010-11-23.jpg', '2010-11-24.jpg', '2010-11-25.jpg',
    '2010-11-26.jpg', '2010-11-27.jpg', '2010-11-28.jpg', '2010-11-29.jpg', '2010-11-30.jpg'
  ];
  
  imageFiles.forEach(fileName => {
    try {
      images[fileName] = require(`../assets/LearnSomethingEveryDay/${fileName}`);
    } catch (err) {
      console.warn(`Could not load image: ${fileName}`);
    }
  });
  
  return images;
};

const availableImages = importImages();

function getRandomQuote() {
    const idx = Math.floor(Math.random() * Quotes.length);
    return Quotes[idx];
}

function getRandomImage() {
    const imageKeys = Object.keys(availableImages);
    if (imageKeys.length === 0) {
        console.warn('No images available');
        return null;
    }
    const randomKey = imageKeys[Math.floor(Math.random() * imageKeys.length)];
    return availableImages[randomKey];
}

function DailyGadgets(props) {
    // 直接解构props中的属性
    const { imageSrc, quote, quoteAuthor, message,  temphistory, tempEchartLineOptions} = props;

    // 随机选取quote和图片
    const randomQuote = getRandomQuote();
    const randomImage = getRandomImage();

    // 使用useState存储和管理props数据
    const [displayQuote, setDisplayQuote] = useState(quote || randomQuote.text || 'If you smile when no one else is around, you really mean it.');
    const [displayQuoteAuthor, setDisplayQuoteAuthor] = useState(quoteAuthor || randomQuote.authors || 'Andy Rooney');
    const [currentImage, setCurrentImage] = useState(imageSrc || randomImage);
    // const [currentMessage, setCurrentMessage] = useState(message || 'Welcome home, there is cold brew tea in the fridge and your favorite cake 🍰');
    const [currentMessage, setCurrentMessage] = useState(message || `Effervescence    Bioluminescence    Defenestration    Ethereal 
            Symphony    Epiphany    Halcyon    Mercurial
            Aurora    Incandescent    Clandestine    Kaleidoscope
            Silhouettes    Decadent    Crestfallen    Distraught
            Stardust.   Sapphire.   Ephemeral.   Euphoria.
            Daydream.   Celestial.    Wanderlus
            Effervescence is the escape of gas from an aqueous solution and the foaming or fizzing that results from that release.`);

    // 当props变化时更新state
    useEffect(() => {
        if (quote) setDisplayQuote(quote);
        if (quoteAuthor) setDisplayQuoteAuthor(quoteAuthor);
        if (imageSrc) setCurrentImage(imageSrc);
        if (message) setCurrentMessage(message);
    }, [quote, quoteAuthor, imageSrc, message]);

    // 刷新随机内容的函数
    const refreshRandomContent = () => {
        const newQuote = getRandomQuote();
        const newImage = getRandomImage();
        
        setDisplayQuote(newQuote.text);
        setDisplayQuoteAuthor(newQuote.authors);
        setCurrentImage(newImage);
    };

    return (
        <div>
            <div className="quote-row">
                <h2>{displayQuote}</h2>
                <span>—{displayQuoteAuthor}</span>
            </div>
            <div className='DailyGadgets'>
                <div className="image-container">
                    <img 
                        src={currentImage} 
                        className="everyday-image" 
                        alt="everyday image"
                        onClick={refreshRandomContent}
                        style={{ cursor: 'pointer' }}
                        title="Click to refresh random content"
                    />
                </div>

                <div className='quote'>
                    <div className='Chart-Container'>
                        <div className='Chart-Item'> 
                        <Line className='Chart-Canvas' 
                        data={temphistory} 
                        options={tempEchartLineOptions}
                        />
                        </div>
                    </div>
                    {currentMessage && <p>{currentMessage}</p>}
                </div>
            </div>
        </div>
        
    )
}

export default DailyGadgets;