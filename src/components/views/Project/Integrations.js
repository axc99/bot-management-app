import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Modal, Tabs, Spin, Collapse } from 'antd';

import EditVkIntegrationForm from './Integrations/EditVkIntegrationForm';
import EditTelegramIntegrationForm from './Integrations/EditTelegramIntegrationForm';
import EditSkypeIntegrationForm from './Integrations/EditSkypeIntegrationForm';
import EditBitrix24IntegrationForm from './Integrations/EditBitrix24IntegrationForm';
import { setTitle } from '../../../helpers';
import config from '../../../config';

class Integrations extends React.Component {
  state = {
    project: null
  }
  componentDidMount() {
    setTitle('Интеграции');
    axios.get(config.serverUrl + '/app-api/projects/' + this.props.project.id + '/')
      .then((res) => {
        this.setState({ project: res.data.project });
      })
      .catch((err) => {
        Modal.error({ title: (<b>Ошибка при отправке запроса</b>), content: err.message });
      });
  }
  render() {
    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">Интеграции</div>
        </div>
        <Spin spinning={!this.state.project} size="large">
          <Tabs
            className="app-main-view-tabs"
            defaultActiveKey="1" >
            <Tabs.TabPane tab="Боты" key="1">
              <div className="app-main-view-tab-content">
                <Collapse
                  accordion
                  expandIconPosition="right"
                  className="app-main-view-collapse" >
                  <Collapse.Panel header={<b>Вконтакте</b>} key="1">
                    <div className="app-main-view-collapse-panel-content">
                      <EditVkIntegrationForm project={this.state.project} />
                    </div>
                  </Collapse.Panel>
                  <Collapse.Panel header={<b>Telegram</b>} key="2">
                    <div className="app-main-view-collapse-panel-content">
                      <EditTelegramIntegrationForm project={this.state.project} />
                    </div>
                  </Collapse.Panel>
                  <Collapse.Panel header={<b>Skype</b>} key="3">
                    <div className="app-main-view-collapse-panel-content">
                      <EditSkypeIntegrationForm project={this.state.project} />
                    </div>
                  </Collapse.Panel>
                </Collapse>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="CRM системы" key="2">
              <div className="app-main-view-tab-content">
                <Collapse
                  accordion
                  expandIconPosition="right"
                  className="app-main-view-collapse" >
                  <Collapse.Panel header={<b>Битрикс 24</b>} key="1">
                    <div className="app-main-view-collapse-panel-content">
                      <EditBitrix24IntegrationForm project={this.state.project} />
                    </div>
                  </Collapse.Panel>
                  <Collapse.Panel header={<b>amoCRM (недоступно)</b>} key="2" disabled></Collapse.Panel>
                </Collapse>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </Spin>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    project: state.project
  }
}

export default connect(mapStateToProps)(Integrations);
