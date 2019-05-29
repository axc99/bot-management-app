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
    let items2 = [];
    for (var dependency in packageJson.dependencies) {
      let version = packageJson.dependencies[dependency];
      items2.push([dependency, version, 'https://www.npmjs.com/package/' + dependency, 'https://yarnpkg.com/ru/package/' + dependency]);
    };
    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">Приложение</div>
        </div>
        <div className="app-main-view-content">
          <div className="app-build">
            <List
              bordered
              className="app-list app-build-list"
              dataSource={items1}
              renderItem={item => (<List.Item>{item[0]}: <b>{item[1]}</b></List.Item>)} />
            <List
              bordered
              className="app-list app-build-list"
              dataSource={items2}
              renderItem={item => (
                <List.Item actions={[<a target="_blank" href={item[2]}>npmjs.com</a>, <a target="_blank" href={item[3]}>yarnpkg.com</a>]}>
                  <b>{item[0]}</b> ({item[1]})
                </List.Item>
              )} />
          </div>
        </div>
      </div>
    );
  }
}

export default Build;
