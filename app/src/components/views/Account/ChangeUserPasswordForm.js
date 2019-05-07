import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Input, Modal, Tabs } from 'antd';

import * as userActions from '../../../store/actions/user';

class ChangePasswordForm extends React.Component {
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
          <Form.Item label="Ваш текущий пароль" className="app-form-field">
            {getFieldDecorator('password', {
              rules: [ { required: true, message: 'Заполните это поле.' } ],
            })(
              <Input name="password" size="large" />
            )}
          </Form.Item>
          <Form.Item label="Новый пароль" className="app-form-field">
            {getFieldDecorator('new_password', {
              rules: [ { required: true, message: 'Заполните это поле.' } ],
            })(
              <Input name="new_password" size="large" />
            )}
          </Form.Item>
          <Form.Item label="Новый пароль ещё раз" className="app-form-field">
            {getFieldDecorator('new_password_confirm', {
              rules: [ { required: true, message: 'Заполните это поле.' } ],
            })(
              <Input name="new_password_confirm" size="large" />
            )}
          </Form.Item>
        </div>
        <div className="app-form-btns">
          <Button className="app-form-btn" type="primary" htmlType="submit" size="large">Сменить пароль</Button>
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

export default connect(mapStateToProps, userActions)(Form.create({ name: 'change_password' })(ChangePasswordForm));
