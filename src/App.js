import "./App.css";
import Navbar from "./components/Navbar";
import React, { Component } from "react";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API
  
  state = {
    progress: 0
  };
  
  setProgress = (progress) => {
    this.setState({
      progress: progress
    })
  };
  
  render() {
    return (
      <div>
        <Router>
          <Navbar toggleMode={"dark"} />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            height={3}
          />
          <Routes>
            <Route 
              exact path="/" element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key='general' pageSize={20} country="in" category="general" />}
            ></Route>
            <Route
              exact path="/general"
              element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key='general' pageSize={20} country="in" category="general" />}
            ></Route>
            <Route
              exact path="/business"
              element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key='business' pageSize={20} country="in" category="business" />}
            ></Route>
            <Route
              exact path="/entertainment"
              element={
                <News setProgress = {this.setProgress} apiKey={this.apiKey} key='entertainment' pageSize={20} country="in" category="entertainment"/>
              }
            ></Route>
            <Route
              exact path="/technology"
              element={
                <News setProgress = {this.setProgress} apiKey={this.apiKey} key='technology' pageSize={20} country="in" category="technology" />
              }
            ></Route>
            <Route
              exact path="/health"
              element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key='health' pageSize={20} country="in" category="health" />}
            ></Route>
            <Route
              exact path="/sports"
              element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key='sports' pageSize={20} country="in" category="sports" />}
            ></Route>
            <Route
              exact path="/science"
              element={<News setProgress = {this.setProgress} apiKey={this.apiKey} key='science' pageSize={20} country="in" category="science" />}
            ></Route>
          </Routes>
        </Router>
      </div>
    );
  }
}

// export default App;
