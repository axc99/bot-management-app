import React from 'react';
import axios from 'axios';
import { Divider, Drawer, Form, Input, Modal, Button, Spin } from 'antd';

import PersonFields from './PersonFields';
import ContactFields from './ContactFields';

import config from '../../../../config';

class EditLeadForm extends React.Component {
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
    console.log('this.props', this.props);
    this.showSending();
    axios.patch(
      config.serverUrl + 'app-api/projects/' + this.props.projectId + '/leads/' + this.props.lead.id + '/', {
        lead: data
      })
      .then((res) => {
        const lead = res.data.lead;
        if (lead) {
          this.props.list.updateOne(lead.id, lead);
          this.props.close();
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
  render() {
    const form = this.props.form;
    return (
      <Form hideRequiredMark="false" onSubmit={this.handleSubmit} className="app-form" layout="vertical">
        <div className="app-form-fields">
          <PersonFields getFieldDecorator={form.getFieldDecorator} />
          <ContactFields getFieldDecorator={form.getFieldDecorator} />
        </div>
        <div className="app-form-btns">
          <Button loading={this.state.sending} className="app-form-btn" type="primary" htmlType="submit" size="large">Сохранить</Button>
        </div>
      </Form>
    )
  }
}

function mapPropsToFields(props) {
  return props.lead ? {
    firstName: Form.createFormField({ value: props.lead.firstName }),
    lastName: Form.createFormField({ value: props.lead.lastName })
  } : {};
}

EditLeadForm = Form.create({ name: 'editLead', mapPropsToFields })(EditLeadForm);

class EditLeadDrawer extends React.Component {
  state = {
    lead: null
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.leadId !== this.props.leadId) {
      const leadId = this.props.leadId;
      if (leadId) {
        axios.get(config.serverUrl + 'app-api/projects/' + this.props.projectId + '/leads/' + leadId + '/')
          .then((res) => {
            this.setState({ lead: res.data.lead });
          })
          .catch((err) => {
            console.log('Error', err);
          });
      };
    };
  }
  render() {
    return (
      <Drawer
          title={(<b>Лид #{this.props.leadId}</b>)}
          width="600"
          placement="right"
          onClose={this.props.close}
          visible={this.props.visible} >
          <Spin spinning={!this.state.lead} size="large">
            <EditLeadForm {...this.props} lead={this.state.lead} />
          </Spin>
      </Drawer>
    );
  }
}

export default EditLeadDrawer;
