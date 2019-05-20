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
        };
      })
      .catch((err) => {
        console.log('Error', err);
        Modal.error({ title: 'Ошибка при отправке запроса' });
      })
      .finally(() => this.hideSending());
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (!err) this.send(data);
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const form = this.props.form;
    const answerId = this.props.answerId;
    if (prevProps.answerId !== answerId) {
      if (answerId) {
        axios.get(config.serverUrl + '/app-api/projects/' + this.props.projectId + '/answers/' + answerId + '/')
          .then((res) => {
            const answer = res.data.answer;
            this.setState({ answer });
            form.setFields({
              title: { value: answer.title },
              content: { value: answer.content },
              tags: { value: answer.tags }
            });
          })
          .catch((err) => {
            Modal.error({ title: 'Ошибка при отправке запроса', content: err.message });
          });
      };
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
          <Spin spinning={!answer} size="large">
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
