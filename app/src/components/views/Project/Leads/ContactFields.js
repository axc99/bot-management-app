import React from 'react';
import { Form, Row, Col, Input } from 'antd';

export default class ContactFields extends React.Component {
  render() {
    return (
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item label="Телефон" className="app-form-field">
            {this.props.getFieldDecorator('phone')(
              <Input />
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Email" className="app-form-field">
            {this.props.getFieldDecorator('email')(
              <Input />
            )}
          </Form.Item>
        </Col>
      </Row>
    )
  }
}
