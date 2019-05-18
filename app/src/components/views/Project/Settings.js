import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Modal, Spin } from 'antd';

import EditProjectForm from './Settings/EditProjectForm';
import { setTitle } from '../../../helpers';
import config from '../../../config';

class Settings extends React.Component {
  state = {
    project: null
  }
  componentDidMount() {
    setTitle('Настройка проекта');
    axios.get(config.serverUrl + 'app-api/projects/' + this.props.project.id + '/')
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
          <div className="app-main-view-header-title">Настройка проекта</div>
        </div>
        <div className="app-main-view-content">
          <div className="app-project-settings">
            <Spin spinning={!this.state.project} size="large">
              <EditProjectForm project={this.state.project} />
            </Spin>
          </div>
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

export default connect(mapStateToProps)(Settings);
