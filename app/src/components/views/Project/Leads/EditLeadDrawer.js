import React from 'react';
import axios from 'axios';
import { Divider, Drawer, Form, Input, Select, Modal, Button, Spin } from 'antd';

import PersonFields from './PersonFields';
import ContactFields from './ContactFields';
import config from '../../../../config';

class EditLeadDrawer extends React.Component {
  state = {
    lead: null,
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
    axios.patch(
      config.serverUrl + 'app-api/projects/' + this.props.projectId + '/leads/' + this.state.lead.id + '/', {
        lead: data
      })
      .then((res) => {
        const lead = res.data.lead;
        if (lead) {
          this.props.list.updateOne(lead.id, lead);
          this.props.close();
          this.props.form.resetFields();
        };
      })
      .catch((err) => {
        console.log('Error', err);
        Modal.error({ title: (<b>Ошибка при отправке запроса</b>) });
      })
      .finally(() => this.hideSending());
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (!err) this.send(data);
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const form = this.props.form;
    const leadId = this.props.leadId;
    if (prevProps.leadId !== leadId) {
      if (leadId) {
        axios.get(config.serverUrl + 'app-api/projects/' + this.props.projectId + '/leads/' + leadId + '/')
          .then((res) => {
            const lead = res.data.lead;
            this.setState({ lead });
            form.setFields({
              lastName: { value: lead.lastName },
              firstName: { value: lead.firstName },
              patronymic: { value: lead.patronymic },
              birthTimestamp: { value: lead.birthTimestamp },
              residence: { value: lead.residence }
            });
          })
          .catch((err) => {
            Modal.error({ title: (<b>Ошибка при отправке запроса</b>), content: err.message });
          });
      };
    };
  }
  render() {
    const form = this.props.form;
    const lead = this.state.lead;
    return (
      <Drawer
          width="600"
          placement="right"
          onClose={this.props.close}
          visible={this.props.visible}
          title={(<b>Лид {lead ? '#' + lead.id : ''}</b>)} >
          <Spin spinning={!lead} size="large">
            <Form hideRequiredMark="false" onSubmit={this.handleSubmit} className="app-form" layout="vertical">
              <div className="app-form-fields">
                <PersonFields getFieldDecorator={form.getFieldDecorator} />
                <Divider className="app-form-fields-divider" />
                <ContactFields getFieldDecorator={form.getFieldDecorator} />
              </div>
              <div className="app-form-btns">
                <Button loading={this.state.sending} className="app-form-btn" type="primary" htmlType="submit">Сохранить</Button>
                {form.getFieldDecorator('status', {
                    initialValue: '0'
                })(
                  <Select className="app-form-btn" defaultValue="0" style={{ width: 160 }}>
                    <Select.Option value="0">Без статуса</Select.Option>
                    <Select.Option value="1">Не обработан</Select.Option>
                    <Select.Option value="2">В обработке</Select.Option>
                    <Select.Option value="3">Обработан</Select.Option>
                    <Select.Option value="4">Закрыт</Select.Option>
                  </Select>
                )}
              </div>
            </Form>
          </Spin>
      </Drawer>
    );
  }
}

export default Form.create({ name: 'editLead' })(EditLeadDrawer);
