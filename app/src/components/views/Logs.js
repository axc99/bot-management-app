import React from 'react';
import { Timeline } from 'antd';

import { setTitle } from '../../helpers';

class Logs extends React.Component {
  state = {
    loading: true
  }
  componentDidMount() {
    setTitle('Лог действий');
    // ...
  }
  render() {
    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">Лог действий</div>
        </div>
        <div className="app-main-view-content">
          <div className="app-content-logs">
            <Timeline pending={this.state.loading ? 'Загрузка...' : false}></Timeline>
          </div>
        </div>
      </div>
    );
  }
}

export default Logs;
