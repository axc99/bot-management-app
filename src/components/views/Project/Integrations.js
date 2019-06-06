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

const source = axios.CancelToken.source();

class Integrations extends React.Component {
  state = {
    project: null
  }
  componentDidMount() {
    setTitle('Интеграции');

    if (source.token) source.token = null;
    else source.cancel();

    axios
      .get(config.serverUrl + '/app-api/projects/' + this.props.project.id + '/', {
        cancelToken: source.token
      })
      .then((res) => {
        this.setState({ project: res.data.project });
      })
      .catch((err) => {
        Modal.error({ title: 'Ошибка при отправке запроса', content: err.message });
      });
  }
  componentWillUnmount() {
    source.cancel();
  }
  render() {
    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">Интеграции</div>
        </div>
        <Spin spinning={!this.state.project}>
          <Tabs
            className="app-main-view-tabs"
            defaultActiveKey="1" >
            <Tabs.TabPane tab="Боты" key="vk">
              <div className="app-main-view-tab-content">
                <Collapse
                  accordion
                  expandIconPosition="right"
                  className="app-main-view-collapse" >
                  <Collapse.Panel header={<b>Вконтакте</b>} key="vk">
                    <div className="app-main-view-collapse-panel-content">
                      <EditVkIntegrationForm project={this.state.project} />
                    </div>
                  </Collapse.Panel>
                  <Collapse.Panel header={<b>Facebook</b>} key="facebook" disabled>
                    <div className="app-main-view-collapse-panel-content">
                      <EditTelegramIntegrationForm project={this.state.project} />
                    </div>
                  </Collapse.Panel>
                  <Collapse.Panel header={<b>Viber</b>} key="viber" disabled>
                    <div className="app-main-view-collapse-panel-content">
                      <EditTelegramIntegrationForm project={this.state.project} />
                    </div>
                  </Collapse.Panel>
                  <Collapse.Panel header={<b>Telegram</b>} key="telegram" disabled>
                    <div className="app-main-view-collapse-panel-content">
                      <EditTelegramIntegrationForm project={this.state.project} />
                    </div>
                  </Collapse.Panel>
                  <Collapse.Panel header={<b>Skype</b>} key="skype">
                    <div className="app-main-view-collapse-panel-content">
                      <EditSkypeIntegrationForm project={this.state.project} />
                    </div>
                  </Collapse.Panel>
                </Collapse>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="CRM системы" key="bitrix24">
              <div className="app-main-view-tab-content">
                <Collapse
                  accordion
                  expandIconPosition="right"
                  className="app-main-view-collapse" >
                  <Collapse.Panel header={<b>Битрикс 24</b>} key="bitrix24">
                    <div className="app-main-view-collapse-panel-content">
                      <EditBitrix24IntegrationForm project={this.state.project} />
                    </div>
                  </Collapse.Panel>
                  <Collapse.Panel header={<b>Мегаплан</b>} key="megaplan">
                    <div className="app-main-view-collapse-panel-content">
                      <EditBitrix24IntegrationForm project={this.state.project} />
                    </div>
                  </Collapse.Panel>
                  <Collapse.Panel header={<b>amoCRM (недоступно)</b>} key="amocrm" disabled></Collapse.Panel>
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
