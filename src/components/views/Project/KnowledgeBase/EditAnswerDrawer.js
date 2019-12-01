import React from 'react'
import axios from 'axios'
import { Divider, Drawer, Form, Input, Modal, Button, Spin, Select } from 'antd'

class EditAnswerDrawer extends React.Component {
  state = {
    answer: null,
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
    const answer = {
      id: 1,
      title: 'Заголовок вопроса #1',
      content: 'Сам ответ на вопрос...',
      tags: [
        'Тег #1', 'Тег #2', 'Тег #3'
      ]
    }
    this.props.list.updateOne(answer.id, answer)
    this.props.close()
    this.props.form.resetFields()
    this.hideLoading()
    
    // axios.patch(
    //   config.serverUrl + '/app-api/projects/' + this.props.projectId + '/answers/' + this.state.answer.id + '/', {
    //     answer: data
    //   })
    //   .then((res) => {
    //     const answer = res.data.answer
    //     if (answer) {
    //       this.props.list.updateOne(answer.id, answer)
    //       this.props.close()
    //       setTimeout(() => {
    //         this.props.form.resetFields()
    //       }, 1000)
    //     };
    //   })
    //   .catch((err) => {
    //     console.log('Error', err)
    //     Modal.error({ title: 'Ошибка при отправке запроса', content: err.message })
    //   })
    //   .finally(() => this.hideLoading())
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, data) => {
      if (!err) this.send(data)
    })
  }

  componentDidMount () {
    const { form, answerId } = this.props
    if (answerId) {
      // mockup data
      const answer = {
        title: 'Заголовок вопроса #1',
        content: 'Сам ответ на вопрос...',
        tags: ['Тег #1', 'Тег #2', 'Тег #3']
      };
      this.setState({ answer: answer })
      form.setFields({
        title: { value: answer.title },
        content: { value: answer.content },
        tags: { value: answer.tags }
      })

      // axios.get(config.serverUrl + '/app-api/projects/' + this.props.projectId + '/answers/' + answerId + '/')
      //   .then((res) => {
      //     if (res.data.error) {
      //       Modal.error({
      //         title: 'Ошибка',
      //         content: res.data.error.message
      //       })
      //     } else if (res.data.answer) {
      //       this.setState({ answer: res.data.answer })
      //       form.setFields({
      //         title: { value: res.data.answer.title },
      //         content: { value: res.data.answer.content },
      //         tags: { value: res.data.answer.tags }
      //       })
      //     };
      //   })
      //   .catch((err) => {
      //     Modal.error({ title: 'Ошибка при отправке запроса', content: err.message })
      //   })
    };
  }

  render () {
    const form = this.props.form
    const answer = this.state.answer
    return (
      <Drawer
        width='400'
        placement='right'
        onClose={this.props.close}
        visible={this.props.visible}
        title={(<b>Ответ {answer ? '#' + answer.id : ''}</b>)}
      >
        <Spin spinning={!answer}>
          <Form hideRequiredMark='false' onSubmit={this.handleSubmit} className='app-form' layout='vertical'>
            <div className='app-form-fields'>
              <Form.Item label='Заголовок' className='app-form-field'>
                {form.getFieldDecorator('title', {
                  rules: [{ required: true, message: 'Поле обязательно для заполнения.' }]
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label='Сообщение' className='app-form-field'>
                {form.getFieldDecorator('content', {
                  rules: [{ required: true, message: 'Поле обязательно для заполнения.' }]
                })(
                  <Input.TextArea autosize={{ minRows: 5 }} />
                )}
              </Form.Item>
              <Form.Item label='Теги' className='app-form-field'>
                {form.getFieldDecorator('tags')(
                  <Select dropdownStyle={{ display: 'none' }} mode='tags' style={{ width: '100%' }} />
                )}
              </Form.Item>
            </div>
            <div className='app-form-btns'>
              <Button loading={this.state.loading} className='app-form-btn' type='primary' htmlType='submit'>Сохранить</Button>
            </div>
          </Form>
        </Spin>
      </Drawer>
    )
  }
}

export default Form.create({ name: 'editAnswer' })(EditAnswerDrawer)
