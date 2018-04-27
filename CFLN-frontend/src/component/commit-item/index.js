
import React from 'react';
// import './commit-item.scss';
import {connect} from 'react-redux';

class CommitItem extends React.Component {

  render() {
    return (
      <div className="flight-item"><a className="image-link">
        <img className="airport-image" src={image} />
        <h3 className="city-item-name">{airportLookup(city)}</h3>
        <h3 className="city-item-code">{city}</h3>
        <h3 className="city-depart"> Depart Date: {depDate[0]}</h3>
        <h3 className="city-return"> Return Date: {retDate[0]}</h3>
        <h3 className="city-price"> ${this.props.inspirationSearch.price}</h3>

      </a>
      </div>
    );
  }
}

export default CommitItem;
