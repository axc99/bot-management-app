import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, Button, Input, Select, Modal } from 'antd';

class EditVkIntegrationForm extends React.Component {
  async send(data) {
    alert('send!');
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
          <Form.Item label="Статус" className="app-form-field">
            {getFieldDecorator('status', {
              rules: [ { required: true, message: 'Поле обязательно для заполнения.' } ],
            })(
              <Select defaultValue="1" style={{ width: 250 }}>
                <Select.Option value="1" selected={true}>Активно</Select.Option>
                <Select.Option value="2">Активно (без сбора лидов)</Select.Option>
                <Select.Option value="0">Не активно</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Ключ доступа" className="app-form-field">
            {getFieldDecorator('accessKey', {
              rules: [ { required: true, message: 'Поле обязательно для заполнения.' } ],
            })(
              <Input placeholder="access_token" />
            )}
          </Form.Item>
        </div>
        <div className="app-form-btns">
          <Button className="app-form-btn" type="primary" htmlType="submit">Сохранить</Button>
        </div>
        <div className="app-form-links">
          <a target="_blank" href="https://vk.com/dev/bots_docs?f=1.1.%2B%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%2B%D0%BA%D0%BB%D1%8E%D1%87%D0%B0%2B%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%B0" className="app-form-link">API для чат-ботов | Как получить ключ доступа?</a>
        </div>
      </Form>
    )
  }
}

function mapPropsToFields(props) {
  return {}
}

export default Form.create({ name: 'editVkIntegration', mapPropsToFields })(EditVkIntegrationForm);
