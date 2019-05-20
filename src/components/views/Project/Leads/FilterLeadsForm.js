import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, DatePicker, Select, Modal, Tabs, Badge } from 'antd';

import config from '../../../../config';

class FilterLeadsForm extends React.Component {
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
            {form.getFieldDecorator('status', {
              initialValue: ''
            })(
              <Select style={{ width: 300 }}>
                <Select.Option value="">Любой статус</Select.Option>
                <Select.Option value="0">Без статуса</Select.Option>
                <Select.Option value="1"><Badge status="default" dot={true} /> Не обработан</Select.Option>
                <Select.Option value="2"><Badge status="processing" dot={true} /> В обработке</Select.Option>
                <Select.Option value="3"><Badge status="success" dot={true} /> Обработан</Select.Option>
                <Select.Option value="4"><Badge status="error" dot={true} /> Закрыт</Select.Option>
              </Select>
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
                <Select.Option value="2,2">Бот в Facebook</Select.Option>
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

export default Form.create({ name: 'filterLeads' })(FilterLeadsForm);
