import React from 'react';
import { List } from 'antd';

class Build extends React.Component {
  render() {
    let packageJson = require('./../../../package.json');
    let data_1 = [
      ['Имя приложения', packageJson.name],
      ['Текущая версия', packageJson.version]
    ];
    return (
      <div className="app-content-build">
        <List
          bordered
          header={<b>Приложение</b>}
          className="app-content-build-list"
          dataSource={data_1}
          renderItem={item => (<List.Item>{item[0]}: <b>{item[1]}</b></List.Item>)} />
      </div>
    );
  }
}

export default Build;
