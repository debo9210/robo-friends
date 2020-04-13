//jshint esversion:9
import React, {
  Component
} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchField: '',
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((users) => this.setState({
        robots: users
      }));
  }

  onSearchChange = (e) => {
    this.setState({
      searchField: e.target.value
    });
  };

  render() {
    const {
      robots,
      searchField
    } = this.state;
    const filteredRobots = robots.filter((robot) => {
      return robot.name
        .toLowerCase()
        .includes(searchField.toLowerCase());
    });
    if (!robots.length) {
      return <h1 > Loading... < /h1>;
    } else {
      return ( <
        div className = "tc" >
        <
        h1 className = "f1" > RoboFriends < /h1> <
        SearchBox searchChange = {
          this.onSearchChange
        }
        /> <Scroll> <
        ErrorBoundry >
        <
        CardList robots = {
          filteredRobots
        }
        />  <
        /ErrorBoundry> <
        /Scroll> < /
        div >
      );
    }
  }
}

export default App;