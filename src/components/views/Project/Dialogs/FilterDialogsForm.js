import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, DatePicker, Select, Modal, Tabs } from 'antd';

import config from '../../../../config';

class FilterDialogsForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (!err) this.props.setFilter(data);
    });
  }
  render() {
    const form = this.props.form;
    return (
      <Form hideRequiredMark="false" onSubmit={this.handleSubmit} layout="vertical" className="app-form filter">
        <div className="app-form-fields">
          <Form.Item className="app-form-field">
            {form.getFieldDecorator('period')(
              <DatePicker.RangePicker style={{ width: 300 }} />
            )}
          </Form.Item>
          <Form.Item className="app-form-field">
            {form.getFieldDecorator('source', {
              initialValue: ''
            })(
              <Select style={{ width: 300 }}>
                <Select.Option value="">Любой источник</Select.Option>
                <Select.Option value="1">Пользователь</Select.Option>
                <Select.Option value="2,1">Бот во Вконтакте</Select.Option>
                <Select.Option value="2,2">Бот в Telegram</Select.Option>
                <Select.Option value="2,3">Бот в Skype</Select.Option>
              </Select>
            )}
          </Form.Item>
        </div>
        <div className="app-form-btns">
          <Button className="app-form-btn" type="primary" htmlType="submit">Применить</Button>
        </div>
      </Form>
    )
  }
}

export default Form.create({ name: 'filterDialogs' })(FilterDialogsForm);
