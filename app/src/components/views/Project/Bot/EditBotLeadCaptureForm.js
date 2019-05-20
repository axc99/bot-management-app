import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Form, Button, Input, Modal, Checkbox, Switch, List } from 'antd';

import config from '../../../../config';

class EditBotLeadCaptureForm extends React.Component {
  state = {
    sending: false,
    leadCaptureState: (this.props.project && this.props.project.bot && this.props.project.bot.leadCapture) ? this.props.project.bot.leadCapture.state : 1
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
      config.serverUrl + '/app-api/projects/' + this.props.project.id + '/', {
        project: {
          'bot.leadCapture.state': data.state,
          'bot.leadCapture.actionName': data.actionName,
          'bot.leadCapture.successMessage': data.successMessage,
          'bot.leadCapture.capturedFields': data.capturedFields
        }
      })
      .then((res) => {
        if (res.data.project) {
          Modal.success({
            title: (<b>Изменения сохранены</b>)
          });
        };
      })
      .catch((err) => {
        Modal.error({ title: (<b>Ошибка при отправке запроса</b>), content: err.message });
      })
      .finally(() => this.hideSending());
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (!err) this.send(data);
    });
  }
  handleLeadCaptureStateChange = (e) => {
    this.setState({ leadCaptureState: e.target.checked });
  }
  render() {
    const form = this.props.form;
    const capturedFields = [
      ['phone', 'Телефон'],
      ['email', 'Email']
    ];
    return (
      <Form hideRequiredMark="false" onSubmit={this.handleSubmit} layout="vertical" className="app-form">
        <div className="app-form-fields">
          <Form.Item className="app-form-field">
            {form.getFieldDecorator('state')(
              <Checkbox defaultChecked={this.state.leadCaptureState} onChange={this.handleLeadCaptureStateChange}>Осуществлять сбор лидов</Checkbox>
            )}
          </Form.Item>
          <Form.Item label="Название действия" className="app-form-field">
            {form.getFieldDecorator('actionName')(
              <Input disabled={!this.state.leadCaptureState} placeholder="Отправить заявку" autosize={{ minRows: 3 }} />
            )}
          </Form.Item>
          <Form.Item label="Сообщение после отправки" className="app-form-field">
            {form.getFieldDecorator('successMessage')(
              <Input.TextArea disabled={!this.state.leadCaptureState} placeholder="Спасибо за заявку, ..." autosize={{ minRows: 3 }} />
            )}
          </Form.Item>
          <Form.Item label="Собираемые данные" className="app-form-field">
            {form.getFieldDecorator('capturedFields')(
              <List
                bordered
                size="small"
                dataSource={capturedFields}
                renderItem={item => (<List.Item> <Checkbox disabled={!this.state.leadCaptureState} style={{ width: '100%' }}>{item[1]}</Checkbox> </List.Item>)} />
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
  if (project && project.bot && project.bot.leadCapture) {
    return {
      state: Form.createFormField({
        value: project.bot.leadCapture.state
      }),
      actionName: Form.createFormField({
        value: project.bot.leadCapture.actionName
      }),
      successMessage: Form.createFormField({
        value: project.bot.leadCapture.successMessage
      }),
      capturedFields: Form.createFormField({
        value: project.bot.leadCapture.capturedFields
      })
    }
  }
}

export default Form.create({ name: 'editBotLeadCapture', mapPropsToFields })(EditBotLeadCaptureForm);
