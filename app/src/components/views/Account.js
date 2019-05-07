import React, { Component } from 'react';
import { Form, Button, Input, Modal, Tabs, Timeline } from 'antd';

import EditUserForm from './Account/EditUserForm';
import ChangeUserPasswordForm from './Account/ChangeUserPasswordForm';

import { setTitle } from '../../helpers';

class Account extends React.Component {
  componentDidMount() {
    setTitle('Мой аккаунт');
  }
  render() {
    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">Мой аккаунт</div>
        </div>
        <Tabs
          className="app-main-view-tabs"
          defaultActiveKey="1" >
          <Tabs.TabPane tab="Информация" key="1">
            <div className="app-main-view-tab-content">
              <EditUserForm />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Сменить пароль" key="2">
            <div className="app-main-view-tab-content">
              <ChangeUserPasswordForm />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Безопасность" key="3">
            <div className="app-main-view-tab-content">
            <Timeline>
              <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
              <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
              <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
              <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
              <Timeline.Item>...</Timeline.Item>
            </Timeline>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Account;
