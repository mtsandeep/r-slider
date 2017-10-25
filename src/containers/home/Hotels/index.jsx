import React, { Component } from 'react';
import Api from 'core/api';
import Slider from 'components/Slider';

class Hotels extends Component {
  constructor(props) {
    super(props);
    this.api = new Api();
    this.state = {
      hotels: [],
    };
  }

  componentDidMount() {
    this.fetchHotels();
  }

  fetchHotels = () => {
    this.api.fetchHotels().then(({ data }) => {
      this.setState({
        hotels: data.hotels,
      });
    });
  }

  render() {
    return (
      <section className="hotels-list">
        <h1><a href="hotels/bali" title="View all hotels in Bali">Hotels in Bali</a></h1>
        <Slider
          count={this.state.hotels.length}
          items={this.state.hotels}
        />
      </section>
    );
  }
}

export default Hotels;
