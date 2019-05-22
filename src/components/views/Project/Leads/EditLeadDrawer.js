import React from 'react';
import axios from 'axios';
import { Divider, Drawer, Form, Input, Select, Modal, Button, Spin, Badge, List, Tabs } from 'antd';

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
      config.serverUrl + '/app-api/projects/' + this.props.projectId + '/leads/' + this.state.lead.id + '/', {
        lead: data
      })
      .then((res) => {
        if (res.data.error) {
          Modal.error({
            title: 'Ошибка',
            content: res.data.error.message
          });
        } else if (res.data.lead) {
          this.props.list.updateOne(res.data.lead.id, res.data.lead);
          this.props.close();
          setTimeout(() => {
            this.props.form.resetFields();
          }, 1000);
        };
      })
      .catch((err) => {
        Modal.error({ title: 'Ошибка при отправке запроса', content: err.message });
      })
      .finally(() => this.hideSending());
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (!err) this.send(data);
    });
  }
  componentDidMount() {
    const { form, leadId } = this.props;
    if (leadId) {
      axios.get(config.serverUrl + '/app-api/projects/' + this.props.projectId + '/leads/' + leadId + '/')
        .then((res) => {
          if (res.data.error) {
            Modal.error({
              title: 'Ошибка',
              content: res.data.error.message
            });
          } else if (res.data.lead) {
            this.setState({ lead: res.data.lead });
            form.setFields({
              lastName: { value: res.data.lead.lastName },
              firstName: { value: res.data.lead.firstName },
              patronymic: { value: res.data.lead.patronymic },
              // birthTimestamp: { value: res.data.lead.birthTimestamp },
              residence: { value: res.data.lead.residence },
              phone: { value: res.data.lead.phone },
              email: { value: res.data.lead.email }
            });
          };
        })
        .catch((err) => {
          Modal.error({ title: 'Ошибка при отправке запроса', content: err.message });
        });
    };
  }
  render() {
    const form = this.props.form;
    const lead = this.state.lead;
    const infoItems = [
      ['Добавлено', lead ? lead.addTimeStr : '...'],
      ['Обновлено', lead ? lead.updateTimeStr : '...'],
      ['Источник', (lead && lead.source) ? lead.source.typeStr : '...']
    ];
    return (
      <Drawer
          width="600"
          placement="right"
          onClose={this.props.close}
          visible={this.props.visible}
          title={(<b>Лид {lead ? '#' + lead.id : ''}</b>)} >
          <Spin spinning={!lead}>
            <Tabs defaultActiveKey="1" className="app-editLead-tabs">
              <Tabs.TabPane tab="Личные данные" key="1" className="app-editLead-tab">
                <Form hideRequiredMark="false" onSubmit={this.handleSubmit} className="app-form" layout="vertical">
                  <div className="app-form-fields">
                    <PersonFields getFieldDecorator={form.getFieldDecorator} />
                    <Divider className="app-form-fields-divider" />
                    <ContactFields getFieldDecorator={form.getFieldDecorator} />
                  </div>
                  <div className="app-form-btns">
                    <Button loading={this.state.sending} className="app-form-btn" type="primary" htmlType="submit">Сохранить</Button>
                    {form.getFieldDecorator('status', {
                        initialValue: lead ? (lead.status ? lead.status.toString() : '0') : null
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
              </Tabs.TabPane>
              <Tabs.TabPane tab="Профили" key="2" className="app-editLead-tab">
                <Form hideRequiredMark="false" onSubmit={this.handleSubmit} className="app-form" layout="vertical">

                </Form>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Информация" key="3" className="app-editLead-tab">
                <List
                  size="small"
                  className="app-editLead-list"
                  dataSource={infoItems}
                  renderItem={item => <List.Item>{item[0]}: {item[1]}</List.Item>} />
              </Tabs.TabPane>
            </Tabs>
          </Spin>
      </Drawer>
    );
  }
}

export default Form.create({ name: 'editLead' })(EditLeadDrawer);
