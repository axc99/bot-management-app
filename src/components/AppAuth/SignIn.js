import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Button, Input, Modal } from 'antd'

import * as userActions from '../../store/actions/user'

import { setTitle } from '../../helpers'

class SignInForm extends Component {
  constructor (props) {
    super(props)
  }

  state = {
    loading: false
  }

  showLoading () {
    this.setState({ loading: true })
  }

  hideLoading () {
    setTimeout(() => {
      this.setState({ loading: false })
    }, 500)
  }

  async send (data) {
    this.showLoading()

    console.log('DATA!!!', data)

    // fake request
    if (!(['ivanov@gmail.com', 'ivanov'].includes(data.emailOrUsername) && data.password == 'password123')) {
      Modal.error({
        title: 'Ошибка при входе',
        content: 'Пользователя с такой почтой/логином и паролем не найдено!'
      })
    } else {
      this.props.setUser({
        id: 1,
        session: {
          accessToken: '<token>'
        }
      })

      this.props.history.push('/projects/')
    }
    this.hideLoading()

    // axios.post(
    //   config.serverUrl + '/app-api/rpc/', {
    //     jsonrpc: '2.0',
    //     method: 'signIn',
    //     params: {
    //       emailOrUsername: data.emailOrUsername,
    //       password: data.password
    //     },
    //     id: 1
    //   })
    //   .then((res) => {
    //     if (res.data.error) {
    //       Modal.error({
    //         title: 'Ошибка при входе',
    //         content: res.data.error.message
    //       });
    //     } else if (res.data.result) {
    //       this.props.setUser({
    //         id: res.data.result.user.id,
    //         session: {
    //           accessToken: res.data.result.user.session.accessToken
    //         }
    //       });
    //       this.props.history.push('/projects/');
    //     };
    //   })
    //   .catch((err) => {
    //     Modal.error({ title: 'Ошибка при отправке запроса', content: err.message });
    //   })
    //   .finally(() => this.hideLoading());
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, data) => {
      if (!err) this.send(data)
    })
  }

  render () {
    const form = this.props.form
    return (
      <div>
        <Form hideRequiredMark='false' onSubmit={this.handleSubmit} layout='vertical' className='app-form'>
          <div className='app-form-fields'>
            <Form.Item label='E-mail или логин' className='app-form-field'>
              {form.getFieldDecorator('emailOrUsername', {
                rules: [{ required: true, message: 'Поле обязательно для заполнения.' }]
              })(
                <Input autoFocus size='large' />
              )}
            </Form.Item>
            <Form.Item label='Пароль' className='app-form-field'>
              {form.getFieldDecorator('password', {
                rules: [{ required: true, message: 'Пароль обязателен для заполнения.' }]
              })(
                <Input className='app-form-field-input' type='password' size='large' />
              )}
            </Form.Item>
          </div>
          <div className='app-form-btns'>
            <Button loading={this.state.loading} className='app-form-btn' type='primary' htmlType='submit' size='large'>Войти в аккаунт</Button>
          </div>
          <div className='app-form-links'>
            <Link to='/auth/recovery/' className='app-form-link'>Забыли пароль?</Link>
          </div>
        </Form>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

function mapPropsToFields (props) {
  return {
    emailOrUsername: Form.createFormField({
      value: new URLSearchParams(window.location.search).get('email')
    })
  }
}

SignInForm = connect(mapStateToProps, userActions
)(Form.create({ name: 'signIn', mapPropsToFields })(SignInForm))

export default class SignIn extends React.Component {
  componentDidMount () {
    setTitle('Войти в аккаунт')
  }

  render () {
    return (
      <div>
        <div className='app-auth-box-title'>
          Войти в <b>ИС</b>
          <Link to='/auth/sign-up/' className='app-auth-box-title-link'>Регистрация</Link>
        </div>
        <SignInForm history={this.props.history} />
      </div>
    )
  }
}
