import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Button, Input, Icon, Checkbox, Modal } from 'antd'
import ReCAPTCHA from 'react-google-recaptcha'

import { setTitle } from '../../helpers'

class RecoveryUserForm extends Component {
  state = {
    loading: false,
    recaptchaResponse: null,
    recaptchaRef: React.createRef()
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
    if (!this.state.recaptchaResponse) {
      this.state.recaptchaRef.current.reset()
      return
    };

    this.showLoading()

    // fake request
    if (data.email != 'ivanov@gmail.com') {
      Modal.error({
        title: 'Ошибка при восстановлении',
        content: 'Пользователь с такой почтой не существует в системе'
      })
    } else {
      Modal.success({
        title: 'Письмо отправлено',
        content: 'Письмо с ссылкой для смены пароля было отправлено на ваш email. Если письма нет - проверьте папку «спам».'
      })
    }
    this.hideLoading()

    // axios.post(
    //   config.serverUrl + '/app-api/rpc/', {
    //     jsonrpc: '2.0',
    //     method: 'recoveryAccess',
    //     params: {
    //       email: data.email,
    //       recaptchaResponse: this.state.recaptchaResponse
    //     },
    //     id: 1
    //   })
    //   .then((res) => {
    //     if (res.data.error) {
    //       Modal.error({
    //         title: 'Ошибка при восстановлении',
    //         content: res.data.error.message
    //       });
    //     } else if (res.data.result) {
    //       Modal.success({
    //         title: 'Письмо отправлено',
    //         content: 'Письмо с ссылкой для смены пароля было отправлено на ваш email. Если письма нет - проверьте папку «спам».'
    //       });
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

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Пароль и его подтверждение должны совпадать.')
    } else {
      callback()
    };
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Form hideRequiredMark='false' onSubmit={this.handleSubmit} layout='vertical' className='app-form'>
        <div className='app-form-fields'>
          <Form.Item label='E-mail' className='app-form-field'>
            {getFieldDecorator('email', {
              rules: [
                { type: 'email', message: 'Укажите email адрес.' },
                { max: 250, message: 'Email не может быть больше 250 символов.' },
                { required: true, message: 'Email обязателен для заполнения.' }
              ]
            })(
              <Input autoFocus size='large' />
            )}
          </Form.Item>
        </div>
        <ReCAPTCHA
          ref={this.state.recaptchaRef}
          className='app-form-captcha'
          sitekey='6Lf_haUUAAAAAKw8PRki4YERVIbFsF8Dy6_gKI_G'
          onChange={(e) => { this.setState({ recaptchaResponse: e }) }}
        />
        <div className='app-form-btns'>
          <Button loading={this.state.loading} className='app-form-btn' type='primary' htmlType='submit' size='large'>Восстановить</Button>
        </div>
      </Form>
    )
  }
}

RecoveryUserForm = Form.create({ name: 'recovery' })(RecoveryUserForm)

export default class Recovery extends React.Component {
  componentDidMount () {
    setTitle('Восстановить доступ')
  }

  render () {
    return (
      <div>
        <div className='app-auth-box-title'>
          Восстановление доступа
          <Link to='/auth/sign-in/' className='app-auth-box-title-link'>Вход</Link>
        </div>
        <RecoveryUserForm />
      </div>
    )
  }
}
