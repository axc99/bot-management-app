import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Form, Button, Input, Modal, Checkbox, Switch } from 'antd';

import config from '../../../../config';

class EditBotBasicForm extends React.Component {
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
    alert('SEND!');
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (!err) this.send(data);
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form hideRequiredMark="false" onSubmit={this.handleSubmit} layout="vertical" className="app-form">
        <div className="app-form-fields">
          <Form.Item label="Приветственное сообщение" className="app-form-field">
            {getFieldDecorator('username')(
              <Input.TextArea placeholder="Здравствуйте, ..." autosize={{ minRows: 3 }} />
            )}
          </Form.Item>
          <Form.Item className="app-form-field">
            {getFieldDecorator('username')(
              <Checkbox>Предлагать пользователю отправить заявку</Checkbox>
            )}
          </Form.Item>
        </div>
        <div className="app-form-btns">
          <Button loading={this.state.sending} className="app-form-btn" type="primary" htmlType="submit" size="large">Сохранить</Button>
        </div>
      </Form>
    )
  }
}

function mapPropsToFields(props) {
  const user = props.user;
  if (!user) return;
  return {
    // ...
  }
}

export default Form.create({ name: 'editBotBasic', mapPropsToFields })(EditBotBasicForm);
