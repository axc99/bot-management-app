import React from 'react';
import { Timeline } from 'antd';

import { setTitle } from '../../helpers';

class Logs extends React.Component {
  componentDidMount() {
    setTitle('Лог действий');
  }
  render() {
    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">Лог действий</div>
        </div>
        <div className="app-main-view-content">
          <div className="app-content-logs">
            <Timeline>
              <Timeline.Item>
                <b>Добавлен проект</b> <br />
                5 минут назад
              </Timeline.Item>
              <Timeline.Item>
                <b>Добавлен проект</b> <br />
                5 минут назад
              </Timeline.Item>
              <Timeline.Item>
                <b>Добавлен проект</b> <br />
                5 минут назад
              </Timeline.Item>
              <Timeline.Item>
                <b>Добавлен проект</b> <br />
                5 минут назад
              </Timeline.Item>
              <Timeline.Item>...</Timeline.Item>
            </Timeline>
          </div>
        </div>
      </div>
    );
  }
}

export default Logs;
