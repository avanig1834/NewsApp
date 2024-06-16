import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  


// order of running of different methods:
// 1 constructor
// 2 render
// component did mount

const capitaliseLetter = (string)=>{
  return string.charAt(0).toUpperCase() + string.slice(1);
}


  const UpdateNews = async() =>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(65);
    
    setArticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    props.setProgress(100);
    setLoading(false)
  }

  useEffect(() => {
    document.title = `${capitaliseLetter(props.category)} - NewsApp`;
    UpdateNews();
  }, [])
 

  
  // const handlePreviousClick = async()=>{
  //   setPage(page-1)
  //   UpdateNews();
  // }
  // const handleNextClick = async()=>{
  //   setPage(page+1)
  //   UpdateNews();
  // }


  const fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=7fc7077807734cc998c2276dffaa4286&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
    
  };


    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{margin: '30px 0px', marginTop: '90px'}}>NewsApp - Top Headlines: {capitaliseLetter(props.category)}</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
            {articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imgUrl={element.urlToImage} NewsUrl={element.url} author={element.author} date={element.publishedAt}/>
              </div>
            })}
          
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePreviousClick}> &larr; Previous</button>
        <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} type="button" class="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    )
  
}
News.defaultProps = {
  country: 'in',
  pageSize: 10,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News
