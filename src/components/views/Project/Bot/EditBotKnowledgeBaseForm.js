import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Form, Button, Input, Modal, Checkbox, Switch } from 'antd'

class EditBotKnowledgeBaseForm extends React.Component {
  state = {
    loading: false,
    knowledgeBaseState: (this.props.project && this.props.project.bot && this.props.project.bot.knowledgeBase) ? this.props.project.bot.knowledgeBase.state : 1
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

    // fakeRequest
    Modal.success({
      title: 'Изменения сохранены'
    })
    this.hideLoading()

    // axios.patch(
    //   config.serverUrl + '/app-api/projects/' + this.props.project.id + '/', {
    //     project: {
    //       'bot.knowledgeBase.state': data.state,
    //       'bot.knowledgeBase.errorMessage': data.errorMessage
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

  handleKnowledgeBaseStateChange = (e) => {
    this.setState({ knowledgeBaseState: e.target.checked })
  }

  render () {
    const form = this.props.form
    return (
      <Form hideRequiredMark='false' onSubmit={this.handleSubmit} layout='vertical' className='app-form'>
        <div className='app-form-fields'>
          <Form.Item className='app-form-field'>
            {form.getFieldDecorator('state')(
              <Checkbox defaultChecked={this.state.knowledgeBaseState} onChange={this.handleKnowledgeBaseStateChange}>Осуществлять поиск ответа в базе</Checkbox>
            )}
          </Form.Item>
          <Form.Item label='Сообщение при неуданоч поиске' className='app-form-field'>
            {form.getFieldDecorator('errorMessage')(
              <Input.TextArea disabled={!this.state.knowledgeBaseState} placeholder='' autosize={{ minRows: 3 }} />
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
  if (project && project.bot && project.bot.knowledgeBase) {
    return {
      state: Form.createFormField({
        value: project.bot.knowledgeBase.state
      }),
      errorMessage: Form.createFormField({
        value: project.bot.knowledgeBase.errorMessage
      })
    }
  }
}

export default Form.create({ name: 'editBotKnowledgeBase', mapPropsToFields })(EditBotKnowledgeBaseForm)
