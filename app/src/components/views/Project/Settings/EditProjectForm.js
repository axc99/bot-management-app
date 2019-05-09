import React from 'react';
import axios from 'axios';
import { Modal, Spin, Form, Button, Input, Select } from 'antd';

import config from '../../../../config';

class EditProjectForm extends React.Component {
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
      config.serverUrl + 'app-api/projects/' + this.props.project.id + '/', {
        project: data
      })
      .then((res) => {
        if (res.data.project) {
          Modal.success({
            title: (<b>Изменения сохранены</b>)
          });
        };
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
    const { getFieldDecorator } = this.props.form;
    return (
      <Form hideRequiredMark="false" onSubmit={this.handleSubmit} layout="vertical" className="app-form">
        <Spin spinning={!this.props.project} size="large">
          <div className="app-form-fields">
            <Form.Item label="Название проекта" className="app-form-field">
              {getFieldDecorator('name', {
                rules: [ { required: true, message: 'Поле обязательно для заполнения.' } ],
              })(
                <Input size="large" />
              )}
            </Form.Item>
            <Form.Item label="Ссылка на сайт" className="app-form-field">
              {getFieldDecorator('websiteUrl', {
                rules: [ { required: true, message: 'Поле обязательно для заполнения.' } ],
              })(
                <Input size="large" placeholder="https://" />
              )}
            </Form.Item>
          </div>
          <div className="app-form-btns">
            <Button loading={this.state.sending} className="app-form-btn" type="primary" htmlType="submit" size="large">Сохранить</Button>
          </div>
        </Spin>
      </Form>
    )
  }
}

function mapPropsToFields(props) {
  return props.project ? {
    name: Form.createFormField({
      value: props.project.name
    }),
    websiteUrl: Form.createFormField({
      value: props.project.websiteUrl
    }),
  } : {};
}

export default Form.create({ name: 'editProject', mapPropsToFields })(EditProjectForm);
