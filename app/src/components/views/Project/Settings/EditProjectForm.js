import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, Button, Input, Select } from 'antd';

class EditProjectForm extends React.Component {
  async send(data) {
    // ...
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
          <Form.Item label="Тематика проекта" className="app-form-field">
            {getFieldDecorator('subject', {
              rules: [ { required: true, message: 'Заполните это поле.' } ],
            })(
              <Select size="large" placeholder="Выберите из списка">
                <Select.Option value="0">...</Select.Option>
                <Select.Option value="1">...</Select.Option>
                <Select.Option value="2">...</Select.Option>
              </Select>
            )}
          </Form.Item>
        </div>
        <div className="app-form-btns">
          <Button className="app-form-btn" type="primary" htmlType="submit" size="large">Сохранить</Button>
        </div>
      </Form>
    )
  }
}

export default Form.create({ name: 'editProject' })(EditProjectForm);
