import React, { Component } from 'react'

export default class NewsItem extends Component {

  render() {
    let {title, description, imageUrl, newsUrl, author, date, name} = this.props;
    return (
      <div>
        <div className="card">
            <img className="card-img-top" alt='' src={!imageUrl?"https://image.cnbcfm.com/api/v1/image/107290634-1692795447895-chandrayaan-3_pre_landing.png?v=1692795625&w=1920&h=1080":imageUrl}/>
            <div className="card-body">
                <h5 className="card-title">{title}...<span class="badge badge-success">{name}</span></h5>
                <p className="card-text">{description}...</p>
                <p class="card-text"><small class="text-muted">Published by {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} target={true} className="btn btn-primary">See More</a>
                {/* target='_blank' opens article to a new tab */}
            </div>
        </div>
      </div>
    )
  }
}
