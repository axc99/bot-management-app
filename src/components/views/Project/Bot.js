import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Spin, Tabs, Modal } from 'antd';

import EditBotBasicForm from './Bot/EditBotBasicForm';
import EditBotLeadCaptureForm from './Bot/EditBotLeadCaptureForm';
import EditBotKnowledgeBaseForm from './Bot/EditBotKnowledgeBaseForm';
import { setTitle } from '../../../helpers';
import config from '../../../config';

const source = axios.CancelToken.source();

class Settings extends React.Component {
  state = {
    project: null
  }
  componentDidMount() {
    setTitle('Поведение бота');

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
          <div className="app-main-view-header-title">Поведение бота</div>
        </div>
        <Spin spinning={!this.state.project}>
          <Tabs
            className="app-main-view-tabs"
            defaultActiveKey="1" >
            <Tabs.TabPane tab="Основное" key="1">
              <div className="app-main-view-tab-content">
                <EditBotBasicForm project={this.state.project} />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Сбор лидов" key="2">
              <div className="app-main-view-tab-content">
                <EditBotLeadCaptureForm project={this.state.project} />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Ответы на вопросы" key="3">
              <div className="app-main-view-tab-content">
                <EditBotKnowledgeBaseForm project={this.state.project} />
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

export default connect(mapStateToProps)(Settings);
