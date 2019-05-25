import React from 'react';
import axios from 'axios';
import { Modal, Form, Button, Input, Select, List, Checkbox } from 'antd';

import config from '../../../../config';

class EditLeadCaptureDesignForm extends React.Component {
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
    axios.patch(
      config.serverUrl + '/app-api/projects/' + this.props.project.id + '/', {
        project: data
      })
      .then((res) => {
        if (res.data.project) {
          Modal.success({
            title: 'Изменения сохранены'
          });
        };
      })
      .catch((err) => {
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
  render() {
    const { form, project } = this.props;
    return (
      <Form hideRequiredMark="false" onSubmit={this.handleSubmit} layout="vertical" className="app-form">
        <div className="app-form-fields">
          <Form.Item label="Выреанивание по горизонтали" className="app-form-field">
            {form.getFieldDecorator('leadCapture.design.align', {
              initialValue: (project && project.leadCapture && project.leadCapture.design) ? project.leadCapture.design.align.toString() : '0',
              rules: [ { required: true, message: 'Поле обязательно для заполнения.' } ]
            })(
              <Select onChange={this.handleIntegrationStateChange} style={{ width: 250 }}>
                <Select.Option value="0">Слево</Select.Option>
                <Select.Option value="1">По центру</Select.Option>
              </Select>
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
  return {};
}

export default Form.create({ name: 'editLeadCaptureDesign', mapPropsToFields })(EditLeadCaptureDesignForm);
