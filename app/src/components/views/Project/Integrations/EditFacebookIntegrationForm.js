import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, Button, Input, Select, Modal } from 'antd';

class EditFacebookIntegrationForm extends React.Component {
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
                <Select.Option value="1">Активен</Select.Option>
                <Select.Option value="2">Активен (без сбора лидов)</Select.Option>
                <Select.Option value="0">Не активен</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Маркер доступа для страницы" className="app-form-field">
            {getFieldDecorator('appAccessKey', {
              rules: [ { required: true, message: 'Поле обязательно для заполнения.' } ],
            })(
              <Input placeholder="page_access_token" />
            )}
          </Form.Item>
        </div>
        <div className="app-form-btns">
          <Button className="app-form-btn" type="primary" htmlType="submit">Сохранить</Button>
        </div>
      </Form>
    )
  }
}

function mapStateToProps(state) {
  return {
    id: state.user.id,
    username: state.user.username
  }
}

export default Form.create({ name: 'EditFacebookIntegration' })(EditFacebookIntegrationForm);
