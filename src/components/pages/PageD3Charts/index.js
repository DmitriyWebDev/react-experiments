import React from 'react';
import styles from './d3-charts-page.module.scss';
import ProfitChartCustom from './components/ProfitChartCustom/index.tsx';

class PageD3Charts extends React.Component {
  render() {
    return (
      <div className={'page_animated'}>
        <div className={styles.page}>
          <ProfitChartCustom />
        </div>
      </div>
    );
  }
}

export default PageD3Charts;
