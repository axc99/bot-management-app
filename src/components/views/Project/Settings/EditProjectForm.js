import React from 'react'
import axios from 'axios'
import { Modal, Form, Button, Input, Select } from 'antd'
import validator from 'validator'

class EditProjectForm extends React.Component {
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

    // fake request
    Modal.success({
      title: 'Изменения сохранены'
    })
    this.hideLoading()

    // axios.patch(
    //   config.serverUrl + '/app-api/projects/' + this.props.project.id + '/', {
    //     project: {
    //       name: data.name,
    //       websiteUrl: data.websiteUrl
    //     }
    //   })
    //   .then((res) => {
    //     if (res.data.project) {
    //       Modal.success({
    //         title: 'Изменения сохранены'
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

  checkURL = (rule, value, callback) => {
    if (value && !validator.isURL(value)) callback('Укажите ссылку.')
    else callback()
  }

  render () {
    const form = this.props.form
    return (
      <Form hideRequiredMark='false' onSubmit={this.handleSubmit} layout='vertical' className='app-form'>
        <div className='app-form-fields'>
          <Form.Item label='Название проекта' className='app-form-field'>
            {form.getFieldDecorator('name', {
              rules: [
                { required: true, message: 'Поле обязательно для заполнения.' },
                { max: 30, message: 'Поле не может быть длиннее 30 символов.' }
              ]
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label='Ссылка на сайт' className='app-form-field'>
            {form.getFieldDecorator('websiteUrl', {
              rules: [
                { max: 100, message: 'Поле не может быть длиннее 100 символов.' },
                { validator: this.checkURL }
              ]
            })(
              <Input placeholder='https://' />
            )}
          </Form.Item>
        </div>
        <div className='app-form-btns'>
          <Button loading={this.state.loading} className='app-form-btn' type='primary' htmlType='submit'>Сохранить</Button>
          <Button onClick={this.props.openDeleteModal} className='app-form-btn' type='danger' ghost>Удалить</Button>
        </div>
      </Form>
    )
  }
}

const mapPropsToFields = (props) => {
  return props.project ? {
    name: Form.createFormField({ value: props.project.name }),
    websiteUrl: Form.createFormField({ value: props.project.websiteUrl })
  } : {}
}

export default Form.create({ name: 'editProject', mapPropsToFields })(EditProjectForm)
