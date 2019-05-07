import React, { Component } from 'react';
import { Tabs } from 'antd';

import EditVkIntegrationForm from './Integrations/EditVkIntegrationForm';
import EditFacebookIntegrationForm from './Integrations/EditVkIntegrationForm';
import EditTelegramIntegrationForm from './Integrations/EditVkIntegrationForm';

class Integrations extends React.Component {
  render() {
    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">Интеграции</div>
        </div>
        <Tabs
          className="app-main-view-tabs"
          defaultActiveKey="1" >
          <Tabs.TabPane tab="Вконтакте" key="1">
            <div className="app-main-view-tab-content">
              <EditVkIntegrationForm />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Facebook" key="2">
            <div className="app-main-view-tab-content">
              <EditFacebookIntegrationForm />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Telegram" key="3">
            <div className="app-main-view-tab-content">
              <EditTelegramIntegrationForm />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Integrations;
