import React from "react";
import { connect } from "react-redux";
import { getParcelsList } from "../../ducks/parcels/selector";
import { PARSELS_ROUTE_BASE } from "constants-common";
import { Link } from "react-router-dom";

class ParcelsList extends React.Component {
  render() {
    const { parcelsList } = this.props;
    const parcels = parcelsList.map(function(item, index, list) {
      const { id, title } = item;
      return (
        <div key={id}>
          <Link to={`/${PARSELS_ROUTE_BASE}/${id}`}>{title}</Link>
        </div>
      );
    });
    return (
      <div>
        <h1>Parcels List</h1>
        {parcels}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    parcelsList: getParcelsList(state.parcels)
  };
};

export default connect(
  mapStateToProps,
  {}
)(ParcelsList);
