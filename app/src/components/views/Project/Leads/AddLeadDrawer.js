import React from 'react';
import axios from 'axios';
import { Divider, Drawer, Form, Input, Modal, Button } from 'antd';

import config from '../../../../config';
import PersonFields from './PersonFields';
import ContactFields from './ContactFields';

class AddLeadForm extends React.Component {
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
      config.serverUrl + 'app-api/projects/' + this.props.projectId + '/leads/', {
        lead: data
      })
      .then((res) => {
        const lead = res.data.lead;
        if (lead) this.props.list.addOne(lead);
        this.props.close();
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
    const { getFieldDecorator } = this.props.form;
    return (
      <Form hideRequiredMark="false" onSubmit={this.handleSubmit} className="app-form" layout="vertical">
        <div className="app-form-fields">
          <PersonFields getFieldDecorator={getFieldDecorator} />
          <ContactFields getFieldDecorator={getFieldDecorator} />
        </div>
        <div className="app-form-btns">
          <Button loading={this.state.sending} className="app-form-btn" type="primary" htmlType="submit" size="large">Добавить</Button>
        </div>
      </Form>
    )
  }
}

AddLeadForm = Form.create({ name: 'addLead' })(AddLeadForm);

class AddLeadDrawer extends React.Component {
  render() {
    return (
      <Drawer
          title={(<b>Добавить лид</b>)}
          width="600"
          placement="right"
          onClose={this.props.close}
          visible={this.props.visible} >
          <AddLeadForm {...this.props} />
      </Drawer>
    );
  }
}

export default AddLeadDrawer;
