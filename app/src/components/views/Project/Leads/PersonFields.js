import React from 'react';
import { Form, Row, Col, Input, DatePicker } from 'antd';

export default class PersonFields extends React.Component {
  render() {
    return (
      <Row gutter={20}>
        <Col span={8}>
          <Form.Item label="Фамилия" className="app-form-field">
            {this.props.getFieldDecorator('lastName')(
              <Input autofocus="true" />
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Имя" className="app-form-field">
            {this.props.getFieldDecorator('firstName')(
              <Input />
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Отчество" className="app-form-field">
            {this.props.getFieldDecorator('patronymic')(
              <Input />
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Дата рождения" className="app-form-field">
            {this.props.getFieldDecorator('birthTimestamp')(
              <DatePicker placeholder="Выберите дату" />
            )}
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item label="Адрес проживания" className="app-form-field">
            {this.props.getFieldDecorator('residence')(
              <Input />
            )}
          </Form.Item>
        </Col>
      </Row>
    )
  }
}
