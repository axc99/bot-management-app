import React from 'react';
import { List, Typography } from 'antd';

class Build extends React.Component {
  render() {
    var packageJson = require('./../../../package.json');
    var data = [
      ['Имя приложения', packageJson.name],
      ['Текущая версия', packageJson.version]
    ];
    return (
      <div>
        <List
          bordered
          dataSource={data}
          renderItem={item => (<List.Item>{item[0]}: <b>{item[1]}</b></List.Item>)} />
      </div>
    );
  }
}

export default Build;
