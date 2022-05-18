import React, {useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import logo from './images/logo.png';

import wordsToNumbers from 'words-to-numbers';
import Homepage from './components/Homepage/Homepage';


const alankey = process.env.AI_KEY;

const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);

    useEffect(() => {
        alanBtn({
            key: alankey,
            onCommand: ({ command, articles, number }) => {
                if(command === "newHeadlines") {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if(command === 'highlight') {
                  setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
                }else if (command === 'open') {
                  const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                  const article = articles[parsedNumber - 1];
        
                  if (parsedNumber > articles.length) {
                    alanBtn().playText('Please try that again...');
                  } else if (article) {
                    window.open(article.url, '_blank');
                    alanBtn().playText('Opening...');
                  } else {
                    alanBtn().playText('Please try that again...');
                  }
                }
            }
        })
    }, [])
  return (
    <div>
      <div className='logo-app'>
        <img src={logo} className="alanLogo" alt="logo" />
        <h1 className="jarvis"><b>J.A.R.V.I.S</b></h1>
      </div>
        <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  )
}

export default App