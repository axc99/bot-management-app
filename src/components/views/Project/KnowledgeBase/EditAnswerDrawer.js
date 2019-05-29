import React from 'react';
import axios from 'axios';
import { Divider, Drawer, Form, Input, Modal, Button, Spin, Select } from 'antd';

import config from '../../../../config';

class EditAnswerDrawer extends React.Component {
  state = {
    answer: null,
    sending: false
  }
  showSending() {
    this.setState({ sending: true });
  }
  hideSending() {
    setTimeout(() => {
      this.setState({ sending: false });
    }, 500);
  }
  async send(data) {
    this.showSending();
    axios.patch(
      config.serverUrl + '/app-api/projects/' + this.props.projectId + '/answers/' + this.state.answer.id + '/', {
        answer: data
      })
      .then((res) => {
        const answer = res.data.answer;
        if (answer) {
          this.props.list.updateOne(answer.id, answer);
          this.props.close();
          setTimeout(() => {
            this.props.form.resetFields();
          }, 1000);
        };
      })
      .catch((err) => {
        console.log('Error', err);
        Modal.error({ title: 'Ошибка при отправке запроса', content: err.message });
      })
      .finally(() => this.hideSending());
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (!err) this.send(data);
    });
  }
  componentDidMount() {
    const { form, answerId } = this.props;
    if (answerId) {
      axios.get(config.serverUrl + '/app-api/projects/' + this.props.projectId + '/answers/' + answerId + '/')
        .then((res) => {
          if (res.data.error) {
            Modal.error({
              title: 'Ошибка',
              content: res.data.error.message
            });
          } else if (res.data.answer) {
            this.setState({ answer: res.data.answer });
            form.setFields({
              title: { value: res.data.answer.title },
              content: { value: res.data.answer.content },
              tags: { value: res.data.answer.tags }
            });
          };
        })
        .catch((err) => {
          Modal.error({ title: 'Ошибка при отправке запроса', content: err.message });
        });
    };
  }
  render() {
    const form = this.props.form;
    const answer = this.state.answer;
    return (
      <Drawer
          width="400"
          placement="right"
          onClose={this.props.close}
          visible={this.props.visible}
          title={(<b>Ответ {answer ? '#' + answer.id : ''}</b>)} >
          <Spin spinning={!answer}>
            <Form hideRequiredMark="false" onSubmit={this.handleSubmit} className="app-form" layout="vertical">
              <div className="app-form-fields">
                <Form.Item label="Заголовок" className="app-form-field">
                  {form.getFieldDecorator('title', {
                    rules: [ { required: true, message: 'Поле обязательно для заполнения.' } ],
                  })(
                    <Input />
                  )}
                </Form.Item>
                <Form.Item label="Сообщение" className="app-form-field">
                  {form.getFieldDecorator('content', {
                    rules: [ { required: true, message: 'Поле обязательно для заполнения.' } ],
                  })(
                    <Input.TextArea autosize={{ minRows: 5 }} />
                  )}
                </Form.Item>
                <Form.Item label="Теги" className="app-form-field">
                  {form.getFieldDecorator('tags')(
                    <Select dropdownStyle={{ display: 'none' }} mode="tags" style={{ width: '100%' }}></Select>,
                  )}
                </Form.Item>
              </div>
              <div className="app-form-btns">
                <Button loading={this.state.sending} className="app-form-btn" type="primary" htmlType="submit">Сохранить</Button>
              </div>
            </Form>
          </Spin>
      </Drawer>
    );
  }
}

export default Form.create({ name: 'editAnswer' })(EditAnswerDrawer);
