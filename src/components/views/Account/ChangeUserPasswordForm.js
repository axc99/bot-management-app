import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Form, Button, Input, Modal, Tabs } from 'antd'

import * as userActions from '../../../store/actions/user'

const source = axios.CancelToken.source()

class ChangePasswordForm extends React.Component {
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

    if (source.token) source.token = null
    else source.cancel()

    // fake request
    Modal.success({
      title: 'Пароль изменен',
      content: 'Вы успешно сменили пароль.'
    })
    this.hideLoading()

    // axios
    //   .post(config.serverUrl + '/app-api/rpc/', {
    //     jsonrpc: '2.0',
    //     method: 'changePassword',
    //     params: {
    //       userId: this.props.user.id,
    //       password: data.password,
    //       newPassword: data.newPassword
    //     },
    //     id: 1
    //   }, {
    //     cancelToken: source.token
    //   })
    //   .then((res) => {
    //     if (res.data.error) {
    //       Modal.error({
    //         title: 'Ошибка',
    //         content: res.data.error.message
    //       });
    //     } else if (res.data.result) {
    //       Modal.success({
    //         title: 'Пароль изменен',
    //         content: 'Вы успешно сменили пароль.'
    //       });
    //       this.props.form.resetFields();
    //     };
    //   })
    //   .catch((err) => {
    //     if (axios.isCancel(err)) return;
    //     Modal.error({ title: 'Ошибка при отправке запроса', content: err.message });
    //   })
    //   .finally(() => this.hideLoading());
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Пароль и его подтверждение должны совпадать.')
    } else {
      callback()
    };
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, data) => {
      if (!err) this.send(data)
    })
  }

  componentWillUnmount () {
    source.cancel()
  }

  render () {
    const form = this.props.form
    return (
      <Form hideRequiredMark='false' onSubmit={this.handleSubmit} layout='vertical' className='app-form'>
        <div className='app-form-fields'>
          <Form.Item label='Текущий пароль' className='app-form-field'>
            {form.getFieldDecorator('password', {
              rules: [{ required: true, message: 'Поле обязательно для заполнения.' }]
            })(
              <Input className='app-form-field-input' type='password' />
            )}
          </Form.Item>
          <Form.Item label='Новый пароль' className='app-form-field'>
            {form.getFieldDecorator('newPassword', {
              rules: [
                { required: true, message: 'Поле обязательно для заполнения.' },
                { min: 5, message: 'Пароль не может быть меньше 5 символов.' },
                { max: 150, message: 'Пароль не может быть больше 150 символов.' }
              ]
            })(
              <Input className='app-form-field-input' type='password' />
            )}
          </Form.Item>
          <Form.Item label='Новый пароль ещё раз' className='app-form-field'>
            {form.getFieldDecorator('confirmNewPassword', {
              rules: [
                { required: true, message: 'Поле обязательно для заполнения.' },
                { validator: this.compareToFirstPassword }
              ]
            })(
              <Input className='app-form-field-input' type='password' />
            )}
          </Form.Item>
        </div>
        <div className='app-form-btns'>
          <Button loading={this.state.loading} className='app-form-btn' type='primary' htmlType='submit'>Сменить пароль</Button>
        </div>
      </Form>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: {
      id: state.user.id
    }
  }
}

export default connect(mapStateToProps, userActions)(Form.create({ name: 'change_password' })(ChangePasswordForm))
