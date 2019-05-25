import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Modal, Tabs, Spin, Button } from 'antd';

import EditLeadCaptureForm from './LeadCapture/EditLeadCaptureForm';
import EditLeadCaptureDesignForm from './LeadCapture/EditLeadCaptureDesignForm';
import { setTitle } from '../../../helpers';
import config from '../../../config';

class LeadCapture extends React.Component {
  state = {
    project: null
  }
  // Открыть веб-версию
  openInWeb = () => {
    window.open(config.serverUrl + '/lc/' + this.props.project.id + '/');
  }
  componentDidMount() {
    setTitle('Сбор заявок');
    axios.get(config.serverUrl + '/app-api/projects/' + this.props.project.id + '/')
      .then((res) => {
        this.setState({ project: res.data.project });
      })
      .catch((err) => {
        Modal.error({ title: 'Ошибка при отправке запроса', content: err.message });
      });
  }
  render() {
    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">Сбор заявок</div>
          <div className="app-main-view-header-controls">
            <div className="app-main-view-header-control link">
              <Button onClick={this.openInWeb} type="dashed" icon="link">Веб-форма</Button>
            </div>
          </div>
        </div>
        <div className="app-project-settings">
          <Spin spinning={!this.state.project}>
            <Tabs
              className="app-main-view-tabs"
              defaultActiveKey="1" >
              <Tabs.TabPane tab="Основное" key="1">
                <div className="app-main-view-tab-content">
                  <EditLeadCaptureForm project={this.state.project} />
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Оформление" key="2">
                <div className="app-main-view-tab-content">
                  <EditLeadCaptureDesignForm project={this.state.project} />
                </div>
              </Tabs.TabPane>
            </Tabs>
          </Spin>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    project: state.project
  }
}

export default connect(mapStateToProps)(LeadCapture);
