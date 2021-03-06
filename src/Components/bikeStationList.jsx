import React, { Component, Fragment } from 'react';
import BikeStation from './bikeStation';

class BikeStationList extends Component {
  state = {
    loading: true,
    locationTag: null,
    bikeStations: [],
  };

  async componentDidMount() {
    try {
      const res = await fetch(`https://api.citybik.es/v2/networks/${this.props.match.params.Id}`);
      console.log(res);
      const cityBikes = await res.json();
      setTimeout(() => {
        console.log(cityBikes.network.name);
        this.setState({
          bikeStations: cityBikes.network.stations,
          locationTag: cityBikes.network.name,
          loading: false,
        });
      }, 6000);
    } catch (error) { }
  }

  render() {
    const { bikeStations, loading } = this.state;
    console.log(bikeStations);

    return (
      <Fragment>
        {loading ? (
          <div className="spinner">
            <h1>
              <i className="fa fa-bicycle fa-pulse fa-3x fa-fw" />
            </h1>
            <p className="">Loading Please wait...</p>
          </div>
        ) : (
            <div>
              <h1>
                {this.state.locationTag}
                <i className="fas fa-bicycle" />
              </h1>
              <div className="listStation">
                {bikeStations.map((station, idx) => <BikeStation key={idx} station={station} />)}
              </div>
            </div>
          )}
      </Fragment>
    );
  }
}
export default BikeStationList;
