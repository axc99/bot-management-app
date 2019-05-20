import React from 'react';
import axios from 'axios';
import { Divider, Drawer, Form, Input, Select, Modal, Button } from 'antd';

import config from '../../../../config';

class AddAnswerDrawer extends React.Component {
  state = {
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
    axios.post(
      config.serverUrl + '/app-api/projects/' + this.props.projectId + '/answers/', {
        answer: data
      })
      .then((res) => {
        const answer = res.data.answer;
        if (answer) this.props.list.addOne(answer);
        this.props.close();
      })
      .catch((err) => {
        console.log('Error', err);
        Modal.error({ title: (<b>Ошибка при отправке запроса</b>) });
      })
      .finally(() => this.hideSending());
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (!err) this.send(data);
    });
  }
  render() {
    const form = this.props.form;
    return (
      <Drawer
          title={(<b>Добавить ответ</b>)}
          width="400"
          placement="right"
          onClose={this.props.close}
          visible={this.props.visible} >
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
              <Button loading={this.state.sending} className="app-form-btn" type="primary" htmlType="submit">Добавить</Button>
            </div>
          </Form>
      </Drawer>
    );
  }
}

export default Form.create({ name: 'addAnswer' })(AddAnswerDrawer);
