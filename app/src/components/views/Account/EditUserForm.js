import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Input, Modal, Tabs } from 'antd';

import * as userActions from '../../../store/actions/user';

class EditForm extends React.Component {
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
          <Form.Item label="Логин" className="app-form-field">
            {getFieldDecorator('username')(
              <Input disabled="true" name="username" size="large" />
            )}
          </Form.Item>
          <Form.Item label="E-mail" className="app-form-field">
            {getFieldDecorator('email')(
              <Input disabled="true" name="email" size="large" />
            )}
          </Form.Item>
          <Form.Item label="Фамилия" className="app-form-field">
            {getFieldDecorator('last_name', {
              rules: [ { message: 'Заполните это поле.' } ],
            })(
              <Input name="last_name" size="large" />
            )}
          </Form.Item>
          <Form.Item label="Имя" className="app-form-field">
            {getFieldDecorator('first_name', {
              rules: [ { message: 'Заполните это поле.' } ],
            })(
              <Input name="first_name" size="large" />
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

function mapStateToProps(state) {
  return {
    user: {
      id: state.user.id
    }
  }
}

export default connect(mapStateToProps, userActions)(Form.create({ name: 'edit_user' })(EditForm));
