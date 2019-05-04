import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, Input, Modal, Tabs } from 'antd';

class EditUserForm extends Component {
  handleSubmit = (e) => {}

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form hideRequiredMark="false" onSubmit={this.handleSubmit} className="app-form">
        <div className="app-form-fields">
          <Form.Item label="Имя" className="app-form-field">
            {getFieldDecorator('name', {
              rules: [ { required: true, message: 'Заполните это поле.' } ],
            })(
              <Input autofocus="true" name="name" size="large" />
            )}
          </Form.Item>
          <Form.Item label="E-mail" className="app-form-field">
            {getFieldDecorator('email', {
              rules: [ { required: true, message: 'Заполните это поле.' } ],
            })(
              <Input autofocus="true" name="email" size="large" placeholder="ivanov@gmail.com" />
            )}
          </Form.Item>
        </div>
        <div className="app-form-btns">
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">Сохранить</Button>
          </Form.Item>
        </div>
      </Form>
    )
  }
}

class Account extends React.Component {
  render() {
    EditUserForm = Form.create({ name: 'edit_user' })(EditUserForm);
    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">Мой аккаунт</div>
        </div>
        <Tabs
          className="app-main-view-tabs"
          defaultActiveKey="1" >
          <Tabs.TabPane tab="Информация" key="1">
            <div className="app-main-view-tab-content">
              <EditUserForm />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Сменить пароль" key="2">
            222
          </Tabs.TabPane>
          <Tabs.TabPane tab="Безопасность" key="3">
            333
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Account;
