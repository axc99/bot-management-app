import React from 'react';
import { Form, Row, Col, Input, Icon } from 'antd';

export default class ContactFields extends React.Component {
  render() {
    return (
      <Row gutter={20} className="app-form-row">
        <Col span={12} className="app-form-col">
          <Form.Item label="Телефон" className="app-form-field">
            {this.props.getFieldDecorator('email')(
              <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} />
            )}
          </Form.Item>
        </Col>
        <Col span={12} className="app-form-col">
          <Form.Item label="Email" className="app-form-field">
            {this.props.getFieldDecorator('phone')(
              <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} />
            )}
          </Form.Item>
        </Col>
      </Row>
    )
  }
}
