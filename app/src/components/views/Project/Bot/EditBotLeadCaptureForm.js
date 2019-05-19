import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Form, Button, Input, Modal, Checkbox, Switch, List } from 'antd';

import config from '../../../../config';

class EditBotLeadCaptureForm extends React.Component {
  state = {
    sending: false,
    leadCaptureState: false
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
    const capturedFields = [
      ['phone', 'Телефон', '+7 (123) 1234-56-78'],
      ['email', 'Email', 'ivanov@gmail.com']
    ];
    return (
      <Form hideRequiredMark="false" onSubmit={this.handleSubmit} layout="vertical" className="app-form">
        <div className="app-form-fields">
          <Form.Item className="app-form-field">
            {form.getFieldDecorator('state')(
              <Checkbox>Осуществлять сбор лидов</Checkbox>
            )}
          </Form.Item>
          <Form.Item label="Название действия" className="app-form-field">
            {form.getFieldDecorator('actionName')(
              <Input placeholder="Отправить заявку" autosize={{ minRows: 3 }} />
            )}
          </Form.Item>
          <Form.Item label="Сообщение после отправки" className="app-form-field">
            {form.getFieldDecorator('message')(
              <Input.TextArea placeholder="Спасибо за заявку, ..." autosize={{ minRows: 3 }} />
            )}
          </Form.Item>
          <Form.Item label="Собираемые данные" className="app-form-field">
            {form.getFieldDecorator('capturedFields')(
              <List
                bordered
                size="small"
                dataSource={capturedFields}
                renderItem={item => (<List.Item> <Checkbox style={{ width: '100%' }}>{item[1]}</Checkbox> </List.Item>)} />
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
  const user = props.user;
  if (!user) return;
  return {
    // ...
  }
}

export default Form.create({ name: 'editBotLeadCapture', mapPropsToFields })(EditBotLeadCaptureForm);
