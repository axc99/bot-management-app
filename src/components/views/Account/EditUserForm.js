import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Form, Button, Input, Modal, Tabs } from 'antd'

const source = axios.CancelToken.source()

class EditForm extends React.Component {
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
      title: 'Изменения сохранены'
    })
    this.hideLoading()

    // axios
    //   .patch(config.serverUrl + '/app-api/users/' + this.props.user.id + '/', {
    //     user: data,
    //     cancelToken: source.token
    //   })
    //   .then((res) => {
    //     if (res.data.error) {
    //       Modal.error({
    //         title: 'Ошибка',
    //         content: res.data.error.message
    //       });
    //     } else if (res.data.user) {
    //       Modal.success({
    //         title: 'Изменения сохранены'
    //       });
    //     };
    //   })
    //   .catch((err) => {
    //     if (axios.isCancel(err)) return;
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

  componentWillUnmount () {
    source.cancel()
  }

  render () {
    const form = this.props.form
    return (
      <Form hideRequiredMark='false' onSubmit={this.handleSubmit} layout='vertical' className='app-form'>
        <div className='app-form-fields'>
          <Form.Item label='Логин' className='app-form-field'>
            {form.getFieldDecorator('username')(
              <Input disabled='true' />
            )}
          </Form.Item>
          <Form.Item label='E-mail' className='app-form-field'>
            {form.getFieldDecorator('email')(
              <Input disabled='true' />
            )}
          </Form.Item>
          <Form.Item label='Фамилия' className='app-form-field'>
            {form.getFieldDecorator('lastName', {
              rules: [
                { max: 50, message: 'Поле не может быть длиннее 50 символов.' }
              ]
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label='Имя' className='app-form-field'>
            {form.getFieldDecorator('firstName', {
              rules: [
                { max: 50, message: 'Поле не может быть длиннее 50 символов.' }
              ]
            })(
              <Input />
            )}
          </Form.Item>
        </div>
        <div className='app-form-btns'>
          <Button loading={this.state.loading} className='app-form-btn' type='primary' htmlType='submit'>Сохранить</Button>
        </div>
      </Form>
    )
  }
}

function mapPropsToFields (props) {
  const user = props.user
  if (user) {
    return {
      username: Form.createFormField({
        value: user.username
      }),
      email: Form.createFormField({
        value: user.email
      }),
      firstName: Form.createFormField({
        value: user.firstName
      }),
      lastName: Form.createFormField({
        value: user.lastName
      })
    }
  };
}

export default Form.create({ name: 'editUser', mapPropsToFields })(EditForm)
