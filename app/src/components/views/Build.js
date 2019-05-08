import React from 'react';
import { List } from 'antd';

import { setTitle } from '../../helpers';

class Build extends React.Component {
  componentDidMount() {
    setTitle('Приложение');
  }
  render() {
    let packageJson = require('./../../../package.json');
    let data_1 = [
      ['Имя приложения', packageJson.name],
      ['Текущая версия', packageJson.version]
    ];
    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">Приложение</div>
        </div>
        <div className="app-main-view-content">
          <div className="app-content-build">
            <List
              bordered
              className="app-content-build-list"
              dataSource={data_1}
              renderItem={item => (<List.Item>{item[0]}: <b>{item[1]}</b></List.Item>)} />
          </div>
        </div>
      </div>
    );
  }
}

export default Build;
