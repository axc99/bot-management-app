import React, { Component } from 'react';
import { Form, Button, Input, Modal, Tabs } from 'antd';

import EditForm from './Account/EditForm';
import ChangePasswordForm from './Account/ChangePasswordForm';

class Account extends React.Component {
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
              <EditForm />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Сменить пароль" key="2">
            <div className="app-main-view-tab-content">
              <ChangePasswordForm />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Безопасность" key="3">
            <div className="app-main-view-tab-content">
              [SECURE]
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Account;
