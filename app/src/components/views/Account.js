import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Spin, Tabs, Modal } from 'antd';

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
        this.setState({ user: res.data.user });
      })
      .catch((err) => {
        Modal.error({ title: (<b>Ошибка при отправке запроса</b>), content: err.message });
      });
  }
  render() {
    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">Мой аккаунт</div>
        </div>
        <div className="app-account">
          <Tabs
            className="app-main-view-tabs"
            defaultActiveKey="1" >
            <Tabs.TabPane tab="Информация" key="1">
              <div className="app-main-view-tab-content">
                <Spin spinning={!this.state.user} size="large">
                  <EditUserForm user={this.state.user} />
                </Spin>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Сменить пароль" key="2">
              <div className="app-main-view-tab-content">
                <ChangeUserPasswordForm user={this.state.user} />
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
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
