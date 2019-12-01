import React from 'react'
import axios from 'axios'
import { Modal, Form, Button, Input, Select, List, Checkbox } from 'antd'

class EditLeadCaptureForm extends React.Component {
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
    //       'leadCapture.title': data.title,
    //       'leadCapture.fields': data.fields,
    //       'leadCapture.btnText': data.btnText,
    //       'leadCapture.finalText': data.finalText
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
          <Form.Item label='Название действия' className='app-form-field'>
            {form.getFieldDecorator('title', {
              rules: [{ required: true, message: 'Поле обязательно для заполнения.' }]
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label='Собираемые данные' className='app-form-field'>
            {form.getFieldDecorator('fields')(
              <Checkbox.Group
                style={{ width: '100%' }}
              >
                <List
                  bordered
                  size='small'
                >
                  <List.Item><Checkbox value={101}>Фамилия</Checkbox></List.Item>
                  <List.Item><Checkbox value={100}>Имя</Checkbox></List.Item>
                  <List.Item><Checkbox value={102}>Отчество</Checkbox></List.Item>
                  <List.Item><Checkbox value={110}>Дата рождения</Checkbox></List.Item>
                  <List.Item><Checkbox value={120}>Место проживания</Checkbox></List.Item>
                  <List.Item><Checkbox value={200}>Телефон</Checkbox></List.Item>
                  <List.Item><Checkbox value={250}>Email</Checkbox></List.Item>
                </List>
              </Checkbox.Group>
            )}
          </Form.Item>
          <Form.Item label='Текст кнопки' className='app-form-field'>
            {form.getFieldDecorator('btnText', {
              rules: [{ required: true, message: 'Поле обязательно для заполнения.' }]
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label='Текст финальной страницы' className='app-form-field'>
            {form.getFieldDecorator('finalText', {
              rules: [{ required: true, message: 'Поле обязательно для заполнения.' }]
            })(
              <Input.TextArea autosize={{ minRows: 3 }} />
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
  return (project && project.leadCapture) ? {
    title: Form.createFormField({
      value: project.leadCapture.title
    }),
    fields: Form.createFormField({
      value: project.leadCapture.fields
    }),
    btnText: Form.createFormField({
      value: project.leadCapture.btnText
    }),
    finalText: Form.createFormField({
      value: project.leadCapture.finalText
    })
  } : {}
}

export default Form.create({ name: 'editLeadCapture', mapPropsToFields })(EditLeadCaptureForm)
