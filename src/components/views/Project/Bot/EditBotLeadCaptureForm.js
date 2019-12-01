import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Form, Button, Input, Modal, Checkbox, Switch, List } from 'antd'

class EditBotLeadCaptureForm extends React.Component {
  state = {
    loading: false,
    leadCaptureState: (this.props.project && this.props.project.bot && this.props.project.bot.leadCapture) ? this.props.project.bot.leadCapture.state : 1
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
    //       'bot.leadCapture.state': data.state,
    //       'bot.leadCapture.actionName': data.actionName,
    //       'bot.leadCapture.question': data.question,
    //       'bot.leadCapture.successMessage': data.successMessage,
    //       'bot.leadCapture.capturedFields': data.capturedFields
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

  handleLeadCaptureStateChange = (e) => {
    this.setState({ leadCaptureState: e.target.checked })
  }

  render () {
    const form = this.props.form
    return (
      <Form hideRequiredMark='false' onSubmit={this.handleSubmit} layout='vertical' className='app-form'>
        <div className='app-form-fields'>
          <Form.Item className='app-form-field'>
            {form.getFieldDecorator('state')(
              <Checkbox defaultChecked={this.state.leadCaptureState} onChange={this.handleLeadCaptureStateChange}>Осуществлять сбор лидов</Checkbox>
            )}
          </Form.Item>
          <Form.Item label='Название действия' className='app-form-field'>
            {form.getFieldDecorator('actionName')(
              <Input disabled={!this.state.leadCaptureState} placeholder='Отправить заявку' autosize={{ minRows: 3 }} />
            )}
          </Form.Item>
          <Form.Item label='Формулировка вопроса' className='app-form-field'>
            {form.getFieldDecorator('question')(
              <Input disabled={!this.state.leadCaptureState} placeholder='' autosize={{ minRows: 3 }} />
            )}
          </Form.Item>
          <Form.Item label='Сообщение после отправки' className='app-form-field'>
            {form.getFieldDecorator('successMessage')(
              <Input.TextArea disabled={!this.state.leadCaptureState} placeholder='Спасибо за заявку, ...' autosize={{ minRows: 3 }} />
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
  if (project && project.bot && project.bot.leadCapture) {
    return {
      state: Form.createFormField({
        value: project.bot.leadCapture.state
      }),
      actionName: Form.createFormField({
        value: project.bot.leadCapture.actionName
      }),
      question: Form.createFormField({
        value: project.bot.leadCapture.question
      }),
      successMessage: Form.createFormField({
        value: project.bot.leadCapture.successMessage
      })
    }
  }
}

export default Form.create({ name: 'editBotLeadCapture', mapPropsToFields })(EditBotLeadCaptureForm)
