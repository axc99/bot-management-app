import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, Button, Input, Modal, Tabs } from 'antd';

class EditVkIntegrationForm extends React.Component {
  async send(data) {

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
          <Form.Item label="Ключ доступа" className="app-form-field">
            {getFieldDecorator('access_key', {
              rules: [ { required: true, message: 'Укажите ключ доступа' } ],
            })(
              <Input name="access_key" size="large" />
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
    _id: state.user._id,
    username: state.user.username
  }
}

export default Form.create({ name: 'edit_vk_integration' })(EditVkIntegrationForm);
