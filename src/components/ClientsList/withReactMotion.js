import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadClients } from '../../ducks/clients';
import { getClientsList } from '../../ducks/clients/selector.js';
import styles from './component.module.scss';
import './stye.scss';

// special for react-motion
import { StaggeredMotion, spring } from 'react-motion';
import range from 'lodash.range';

class ClientsList extends React.Component {
  constructor(props) {
    super(props);
    this.getStyles = this.getStyles.bind(this);
  }

  getStyles = prevStyles => {
    // `prevStyles` is the interpolated value of the last tick
    const endValue = prevStyles.map((_, i) => {
      return {
        marginLeft: spring(0, { stiffness: 90 + i * 15, damping: 26 }),
      };
    });
    return endValue.reverse();
  };

  componentDidMount() {
    const { clientsLoading, clientsLoaded, loadClients } = this.props;
    if (!clientsLoading && !clientsLoaded) {
      loadClients();
    }
  }

  render() {
    const { clientsUrl, clientsList, clientsLoaded } = this.props;

    if (!clientsLoaded) return 'Loading...';

    return (
      <div>
        Clients list:
        {clientsList.size}
        <StaggeredMotion
          defaultStyles={range(clientsList.size).map(() => ({
            marginLeft: -300,
          }))}
          styles={this.getStyles}
        >
          {clientsStyles => (
            <ul className={styles['clints-list']}>
              {clientsStyles.map(function(item, index, arr) {
                const { id, name } = clientsList.get(index);
                return (
                  <li
                    key={index}
                    style={{
                      marginLeft: `${item.marginLeft}px`,
                    }}
                  >
                    <Link
                      className={styles['clints-list__item']}
                      to={`${clientsUrl}/${id}`}
                    >
                      {name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </StaggeredMotion>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { clientsLoading, clientsLoaded } = state.clients;
  return {
    clientsLoading,
    clientsLoaded,
    clientsList: getClientsList(state.clients),
  };
};

export default connect(
  mapStateToProps,
  { loadClients },
)(ClientsList);
