import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {

  // Passing Proptypes
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number
  }

  constructor(props) {
    super(props);
    console.log("Constructor");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalize(this.props.category)} | NewsMonster`
  }


  async updateNews(){
    this.props.setProgress(10)
    const url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true
    });
    let data = await fetch(url);
    this.props.setProgress(40)
    let parsedData = await data.json();
    this.props.setProgress(100)
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  async componentDidMount() {
    this.updateNews()
  }


  // States values dynamically change so you do not pass them in the main component

  // First we declared and defined a article variable to which we passed number of articles in json format.
  // Then we created a constructor that sets the initial values for articles.
  // Inside the constructor we declared a state variable that takes articles and loading as its objects.
  // this.articles refers to the articles variable we declared in the first place
  // Then inside the render function we call the this.articles object from the constructor and show or maipulate its values.
  
  capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  handlePrevClick = async () => {
    // console.log("PreviouClick");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d4304abf871645519deba7d115f43b31&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({
    //   loading: true
    // });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   articles: parsedData.articles,
    //   page: this.state.page - 1,
    //   loading: false
    // });

    this.setState({
      page: this.state.page - 1
    })
    this.updateNews()
  };

  
  handleNextClick = async () => {
    // if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)){
      
    // } 
    // else{
    //   console.log("NextClick");
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d4304abf871645519deba7d115f43b31&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({
    //     loading: true
    //   });
    //   // props are passed so their values can be manipulated in the main component
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);
    //   this.setState({
    //     articles: parsedData.articles,
    //     page: this.state.page + 1,
    //     loading: false
    //   });
    // }

    
    this.setState({
      page: this.state.page + 1
    })
    this.updateNews()

  };

  fetchMoreData = async () =>{
    this.setState({
      page: this.state.page + 1
    })
    const url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

      try {
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log("Fetched data:", parsedData);

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
    console.log(this.state.articles.length)
    console.log(this.state.totalResults)
  } catch (error) {
    console.error("Error fetching data:", error);
  }
    }

  render() {
    // let {handleNextClick, handlePrevClick} = this.props;
    
    return (
      <div className="container" style={{marginTop: '5.5rem'}}>
        <h1 className="text-center my-4">News Monster - Top {this.capitalize(this.props.category)} headlines</h1>
        {/* //Spinner is displayed only if this.state.loading is true */}
        {this.state.loading && <Spinner/>} 
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<h4><Spinner/></h4>}
          >
          <div className="container">
            <div className="row">
              {/*The rest of the content will diappear when the loading is true*/}
              {this.state.articles.map((element, url) => { 
                return (
                  <div className="col-md-4 my-3" key={url}>
                    {/* key={element.url} is used to give each NewsItem component a unique identifier based on the URL of the news article. */}
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description ? element.description.slice(0, 88) : ""
                      }
                      newsUrl={element.url}
                      imageUrl={element.urlToImage}
                      author={element.author}
                      date={element.publishedAt}
                      name={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>

        </InfiniteScroll>
        {/* <div class="d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.handlePrevClick}
            class="btn btn-secondary"
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} 
            type="button"
            onClick={this.handleNextClick}
            class="btn btn-secondary"
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}
