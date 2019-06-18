import React from 'react';
import { Link } from 'react-router-dom';

class PageClientDetail extends React.Component {
  render() {
    const { match } = this.props;
    const clientId = match.params.clientId;
    return (
      <div className={'page_animated'}>
        Client № {clientId}
        <br />
        <Link to={`${match.url}/parcels`}>Show client parcels</Link>
      </div>
    );
  }
}

export default PageClientDetail;
