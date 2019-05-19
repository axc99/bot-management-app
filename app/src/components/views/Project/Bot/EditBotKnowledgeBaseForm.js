import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Form, Button, Input, Modal, Checkbox, Switch } from 'antd';

import config from '../../../../config';

class EditBotKnowledgeBaseForm extends React.Component {
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
    const form = this.props.form;
    return (
      <Form hideRequiredMark="false" onSubmit={this.handleSubmit} layout="vertical" className="app-form">
        <div className="app-form-fields">
          <Form.Item className="app-form-field">
            {form.getFieldDecorator('state')(
              <Checkbox>Осуществлять поиск ответа в базе</Checkbox>
            )}
          </Form.Item>
          <Form.Item label="Сообщение при неуданоч поиске" className="app-form-field">
            {form.getFieldDecorator('message')(
              <Input.TextArea placeholder="" autosize={{ minRows: 3 }} />
            )}
          </Form.Item>
        </div>
        <div className="app-form-btns">
          <Button loading={this.state.sending} className="app-form-btn" type="primary" htmlType="submit">Сохранить</Button>
        </div>
      </Form>
    )
  }
}

function mapPropsToFields(props) {
  const project = props.project;
  return {
    state: Form.createFormField({
      value: project.bot.state
    }),
    initialMessage: Form.createFormField({
      value: project.bot.initialMessage
    })
  }
}

export default Form.create({ name: 'editBotKnowledgeBase', mapPropsToFields })(EditBotKnowledgeBaseForm);
