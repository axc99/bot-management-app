import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Form, Button, Input, Modal, Select, List } from 'antd'

class EditBotBasicForm extends React.Component {
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
    //       'bot.name': data.name,
    //       'bot.initialMessage': data.initialMessage
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

  render () {
    const form = this.props.form
    return (
      <Form hideRequiredMark='false' onSubmit={this.handleSubmit} layout='vertical' className='app-form'>
        <div className='app-form-fields'>
          <Form.Item label='Имя бота' className='app-form-field'>
            {form.getFieldDecorator('name', {
              rules: [{ required: true, message: 'Поле обязательно для заполнения.' }]
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label='Приветственное сообщение' className='app-form-field'>
            {form.getFieldDecorator('initialMessage', {
              rules: [{ required: true, message: 'Поле обязательно для заполнения.' }]
            })(
              <Input.TextArea placeholder='Здравствуйте, ...' autosize={{ minRows: 3 }} />
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
  const project = props.project
  if (project) {
    return {
      name: Form.createFormField({
        value: project.bot.name
      }),
      initialMessage: Form.createFormField({
        value: project.bot.initialMessage
      })
    }
  }
}

export default Form.create({ name: 'editBotBasic', mapPropsToFields })(EditBotBasicForm)
