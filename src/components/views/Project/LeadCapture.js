import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Modal, Spin, Button } from 'antd';

import EditLeadCaptureForm from './LeadCapture/EditLeadCaptureForm';
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
    setTitle('Сбор лидов');
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
          <div className="app-main-view-header-title">Сбор лидов</div>
          <div className="app-main-view-header-controls">
            <div className="app-main-view-header-control link">
              <Button onClick={this.openInWeb} type="dashed" icon="link">Веб-версия</Button>
            </div>
          </div>
        </div>
        <div className="app-main-view-content">
          <div className="app-project-settings">
            <Spin spinning={!this.state.project}>
              <EditLeadCaptureForm project={this.state.project} />
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

export default connect(mapStateToProps)(LeadCapture);
