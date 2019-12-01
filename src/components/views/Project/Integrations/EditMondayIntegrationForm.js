import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Form, Button, Input, Select, Modal } from 'antd'

class EditMondayIntegrationForm extends React.Component {
  state = {
    loading: false,
    integrationState: (this.props.project && this.props.project.integrations && this.props.project.integrations.monday) ? this.props.project.integrations.monday.state : 0
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
    axios.patch(
      config.serverUrl + '/app-api/projects/' + this.props.project.id + '/', {
        project: {
          'integrations.monday.state': data.state,
          'integrations.monday.apiToken': data.apiToken
        }
      })
      .then((res) => {
        if (res.data.project) {
          Modal.success({
            title: 'Изменения сохранены'
          })
        };
      })
      .catch((err) => {
        Modal.error({ title: 'Ошибка при отправке запроса', content: err.message })
      })
      .finally(() => this.hideLoading())
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, data) => {
      if (!err) this.send(data)
    })
  }

  handleIntegrationStateChange = (value) => {
    this.setState({ integrationState: value })
  }

  render () {
    const { form, project } = this.props
    return (
      <Form hideRequiredMark='false' onSubmit={this.handleSubmit} layout='vertical' className='app-form'>
        <div className='app-form-fields'>
          <Form.Item label='Состояние' className='app-form-field'>
            {form.getFieldDecorator('state', {
              initialValue: (project && project.integrations && project.integrations.monday) ? project.integrations.monday.state.toString() : '0',
              rules: [{ required: true, message: 'Поле обязательно для заполнения.' }]
            })(
              <Select onChange={this.handleIntegrationStateChange} defaultValue='1' style={{ width: 250 }}>
                <Select.Option value='0'>Не активно</Select.Option>
                <Select.Option value='1'>Активно</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label='API токен' className='app-form-field'>
            {form.getFieldDecorator('apiToken', {
              rules: [{ required: this.state.integrationState > 0, message: 'Поле обязательно для заполнения.' }]
            })(
              <Input disabled={this.state.integrationState == 0} placeholder='{api_token}' />
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
  if (!(project && project.integrations && project.integrations.monday)) return
  return {
    apiToken: Form.createFormField({
      value: project.integrations.monday.apiToken
    })
  }
}

export default Form.create({ name: 'editMondayIntegration', mapPropsToFields })(EditMondayIntegrationForm)
