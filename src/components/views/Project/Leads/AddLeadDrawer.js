import React from 'react';
import axios from 'axios';
import { Divider, Drawer, Form, Input, Select, Modal, Button, Badge } from 'antd';

import config from '../../../../config';
import PersonFields from './PersonFields';
import ContactFields from './ContactFields';

class AddLeadDrawer extends React.Component {
  state = {
    sending: false
  }
  showSending() {
    this.setState({ sending: true });
  }
  hideSending() {
    setTimeout(() => {
      this.setState({ sending: false });
    }, 500);
  }
  async send(data) {
    this.showSending();
    axios.post(
      config.serverUrl + '/app-api/projects/' + this.props.projectId + '/leads/', {
        lead: data
      })
      .then((res) => {
        if (res.data.error) {
          Modal.error({
            title: 'Ошибка',
            content: res.data.error.message
          });
        } else if (res.data.lead) {
          this.props.list.addOne(res.data.lead);
          this.props.close();
          this.props.form.resetFields();
        };
      })
      .catch((err) => {
        console.log('Error', err);
        Modal.error({ title: 'Ошибка при отправке запроса' });
      })
      .finally(() => this.hideSending());
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (!err) this.send(data);
    });
  }
  render() {
    const form = this.props.form;
    return (
      <Drawer
        width="600"
        placement="right"
        title={(<b>Добавить лид</b>)}
        onClose={this.props.close}
        visible={this.props.visible} >
        <Form hideRequiredMark="false" onSubmit={this.handleSubmit} className="app-form" layout="vertical">
          <div className="app-form-fields">
            <PersonFields getFieldDecorator={form.getFieldDecorator} />
            <Divider className="app-form-fields-divider" />
            <ContactFields getFieldDecorator={form.getFieldDecorator} />
          </div>
          <div className="app-form-btns">
            <Button loading={this.state.sending} className="app-form-btn" type="primary" htmlType="submit">Добавить</Button>
            {form.getFieldDecorator('status', {
                initialValue: '0'
            })(
              <Select className="app-form-btn" defaultValue="0" style={{ width: 160 }}>
                <Select.Option value="0">Без статуса</Select.Option>
                <Select.Option value="1"><Badge status="default" dot={true} /> Не обработан</Select.Option>
                <Select.Option value="2"><Badge status="processing" dot={true} /> В обработке</Select.Option>
                <Select.Option value="3"><Badge status="success" dot={true} /> Обработан</Select.Option>
                <Select.Option value="4"><Badge status="error" dot={true} /> Закрыт</Select.Option>
              </Select>
            )}
          </div>
        </Form>
      </Drawer>
    );
  }
}

export default Form.create({ name: 'addLead' })(AddLeadDrawer);
