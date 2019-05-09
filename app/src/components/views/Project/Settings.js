import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

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
        console.log('res.data', res.data);
        this.setState({ project: res.data.project });
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }
  render() {
    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">Настройка проекта</div>
        </div>
        <div className="app-main-view-content">
          <EditProjectForm project={this.state.project} />
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
