import React from 'react';
import axios from 'axios';
import { List, Empty, Modal, Button, Avatar } from 'antd';
import { Link } from 'react-router-dom';

import AddLeadForm from './Leads/AddLeadForm';
import EditLeadForm from './Leads/EditLeadForm';

import { setTitle } from '../../../helpers';

class LeadItem extends React.Component {
  confirmDelete = (leadId) => {
    Modal.confirm({
      title: 'Удалить лид',
      content: 'Вы действительно хотите удалить данный лид? Данные будет безвозвратно утерены.',
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        alert('delete lead #'+leadId);
      }
    });
  }
  render() {
    return (
      <List.Item actions={[
          <Button onClick={() => this.props.openEditLead(this.props.lead.id)} size="small">Открыть</Button>,
          <Button onClick={() => this.confirmDelete(this.props.lead.id)} type="dashed" icon="delete" shape="circle" size="small"></Button>
        ]}>
        <List.Item.Meta
            avatar={<Avatar size="medium" icon="user" />}
            title={<b>{this.props.lead.fullName ? this.props.lead.fullName : 'Без имени'}</b>}
            description={this.props.lead.contacts ? this.props.lead.contacts : 'Пустой лид'} />
      </List.Item>
    )
  }
}

class Leads extends React.Component {
  state = {
    addLeadVisible: false,
    editLeadVisible: false,
    leadId: null,
    leads: null
  }
  componentDidMount() {
    setTitle('Лиды');
    axios.get('http://localhost./app-api/projects/123/leads/', {}, {
      headers: { 'Content-Type': 'application/json' }
    }).then(
      res => {
        const leads = res.data.leads;
        this.setState({ leads });
      },
      err => {
        Modal.error({
          title: (<b>Ошибка при загрузке</b>)
        });
      }
    );
  }
  // Открыть: добавление лида
  openAddLead = () => {
    this.setState({ addLeadVisible: true });
  }
  // Обработать закрытие: добавление лида
  handleCancelAddLead = () => {
    this.setState({ addLeadVisible: false });
  }
  // Открыть: изменение лида
  openEditLead = (leadId) => {
    this.setState({ editLeadVisible: true, leadId: leadId });
  }
  // Обработать закрытие: изменение лида
  handleCancelEditLead = () => {
    this.setState({ editLeadVisible: false });
  }
  // Добавить лид
  addLead = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) return;
      // ...
    });
  }
  // Изменить лид
  editLead = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) return;
      // ...
    });
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  render() {
    let content;

    if (this.state.leads !== null && this.state.leads.length == 0) {
      content = (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="В проекте пока нет лидов." />
      );
    } else {
      content = (
        <List
          bordered
          hideOnSinglePage={true}
          loading={!this.state.leads ? true : false}
          size="large"
          dataSource={this.state.leads ? this.state.leads : []}
          renderItem={item => <LeadItem lead={item} openEditLead={this.openEditLead} />} />
      );
    };

    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">Лиды</div>
          <div className="app-main-view-header-btns">
            <Button onClick={this.openAddLead} className="app-main-view-header-btn" type="primary" icon="plus">Добавить лид</Button>
          </div>
        </div>
        <div className="app-main-view-content">
          {content}
        </div>
        <AddLeadForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.addLeadVisible}
          onCancel={this.handleCancelAddLead}
          addLead={this.addLead} />
        <EditLeadForm
          leadId={this.state.leadId}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.editLeadVisible}
          onCancel={this.handleCancelEditLead}
          editLead={this.editLead} />
      </div>
    );
  }
}

export default Leads;
