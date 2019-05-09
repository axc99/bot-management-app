import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { List, Form, Button, Input, Modal, Tabs, Timeline } from 'antd';

import EditUserForm from './Account/EditUserForm';
import ChangeUserPasswordForm from './Account/ChangeUserPasswordForm';

import { setTitle } from '../../helpers';
import config from '../../config';

class Account extends React.Component {
  state = {
    user: null
  }
  componentDidMount() {
    setTitle('Мой аккаунт');
    axios.get(config.serverUrl + 'app-api/users/' + this.props.user.id + '/')
      .then((res) => {
        console.log('res.data', res.data);
        this.setState({ user: res.data.user });
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }
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
              <EditUserForm user={this.state.user} />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Сменить пароль" key="2">
            <div className="app-main-view-tab-content">
              <ChangeUserPasswordForm user={this.state.user} />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Account);
