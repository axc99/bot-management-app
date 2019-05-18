import React, { Component } from 'react';
import { Spin, Tabs, Modal } from 'antd';

import EditBotBasicForm from './Bot/EditBotBasicForm';
import EditBotLeadCaptureForm from './Bot/EditBotLeadCaptureForm';
import EditBotKnowledgeBaseForm from './Bot/EditBotKnowledgeBaseForm';
import { setTitle } from '../../../helpers';

class Settings extends React.Component {
  state = {
    bot: null
  }
  componentDidMount() {
    setTitle('Поведение бота');
  }
  render() {
    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">Поведение бота</div>
        </div>
        <Tabs
          className="app-main-view-tabs"
          defaultActiveKey="1" >
          <Tabs.TabPane tab="Основное" key="1">
            <div className="app-main-view-tab-content">
              <EditBotBasicForm bot={this.state.bot} />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Сбор лидов" key="2">
            <div className="app-main-view-tab-content">
              <EditBotLeadCaptureForm bot={this.state.bot} />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Ответы на вопросы" key="3">
            <div className="app-main-view-tab-content">
              <EditBotKnowledgeBaseForm bot={this.state.bot} />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Settings;
