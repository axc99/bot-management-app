import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, DatePicker, Select, Modal, Tabs } from 'antd';

import config from '../../../../config';

class FilterLeadsForm extends React.Component {
  render() {
    const form = this.props.form;
    return (
      <Form hideRequiredMark="false" className="app-form filter" layout="vertical">
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
                <Select.Option value="1">Не обработан</Select.Option>
                <Select.Option value="2">В обработке</Select.Option>
                <Select.Option value="3">Обработан</Select.Option>
                <Select.Option value="4">Закрыт</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item className="app-form-field">
            {form.getFieldDecorator('source', {
              initialValue: ''
            })(
              <Select style={{ width: 300 }}>
                <Select.Option value="">Любой источник</Select.Option>
                <Select.Option value="1">#111</Select.Option>
                <Select.Option value="2">#222</Select.Option>
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

function mapPropsToFields(props) {
  const user = props.user;
  if (!user) return;
  return {

  }
}

export default Form.create({ name: 'filterLeads', mapPropsToFields })(FilterLeadsForm);
