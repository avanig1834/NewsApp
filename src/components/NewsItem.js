import React from 'react'

const NewsItem = (props) => {

    let {title, description, imgUrl, NewsUrl, author, date} = props;
    return (
      <div className="my-3">
        <div className="card">
          <img src={imgUrl?imgUrl:"https://www.livemint.com/lm-img/img/2024/05/19/1600x900/IPO_1716090729800_1716090729997.jpg"} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
              <a href={NewsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
}

export default NewsItem
