import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Spin, Tabs, Modal } from 'antd'

import EditUserForm from './Account/EditUserForm'
import ChangeUserPasswordForm from './Account/ChangeUserPasswordForm'

import { setTitle } from '../../helpers'

const source = axios.CancelToken.source()

class Account extends React.Component {
  state = {
    user: null
  }

  componentDidMount () {
    setTitle('Мой аккаунт')

    if (source.token) source.token = null
    else source.cancel()

    // fake request
    const user = {
      username: 'ivan',
      email: 'ivanov@gmail.com',
      firstName: 'Иван',
      lastName: 'Иванов'
    }
    this.setState({ user })

    // axios
    //   .get(config.serverUrl + '/app-api/users/' + this.props.user.id + '/', {
    //     cancelToken: source.token
    //   })
    //   .then((res) => {
    //     this.setState({ user: res.data.user });
    //   })
    //   .catch((err) => {
    //     if (axios.isCancel(err)) return;
    //     Modal.error({ title: 'Ошибка при отправке запроса', content: err.message });
    //   });
  }

  componentWillUnmount () {
    source.cancel()
  }

  render () {
    return (
      <div>
        <div className='app-main-view-header'>
          <div className='app-main-view-header-title'>Мой аккаунт</div>
        </div>
        <div className='app-account'>
          <Spin spinning={!this.state.user}>
            <Tabs
              className='app-main-view-tabs'
              defaultActiveKey='1'
            >
              <Tabs.TabPane tab='Информация' key='1'>
                <div className='app-main-view-tab-content'>
                  <EditUserForm user={this.state.user} />
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab='Сменить пароль' key='2'>
                <div className='app-main-view-tab-content'>
                  <ChangeUserPasswordForm user={this.state.user} />
                </div>
              </Tabs.TabPane>
            </Tabs>
          </Spin>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Account)
