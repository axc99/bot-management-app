import React from 'react';
import { List } from 'antd';

import { setTitle } from '../../helpers';

class Build extends React.Component {
  componentDidMount() {
    setTitle('Приложение');
  }
  render() {
    const packageJson = require('./../../../package.json');
    let items1 = [
      ['Версия', packageJson.version]
    ];
    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">Приложение</div>
        </div>
        <div className="app-main-view-content">
          <div className="app-build">
            <List
              bordered
              className="app-build-list"
              dataSource={items1}
              renderItem={item => (<List.Item>{item[0]}: <b>{item[1]}</b></List.Item>)} />
          </div>
        </div>
      </div>
    );
  }
}

export default Build;
