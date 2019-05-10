import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Drawer, List, Empty, Modal, Button, Avatar } from 'antd';
import { Link } from 'react-router-dom';

import AddLeadDrawer from './Leads/AddLeadDrawer';
import EditLeadDrawer from './Leads/EditLeadDrawer';

import { setTitle } from '../../../helpers';
import config from '../../../config';

class LeadItem extends React.Component {
  confirmDelete = (leadId) => {
    Modal.confirm({
      title: 'Удалить лид',
      content: 'Вы действительно хотите удалить данный лид? Данные будет безвозвратно утерены.',
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk: () => {
        axios.delete(config.serverUrl + 'app-api/projects/123/leads/' + leadId + '/');
        this.props.list.deleteOne(leadId);
      }
    });
  }
  render() {
    return (
      <List.Item actions={[
          <Button onClick={() => this.props.openEditModal(this.props.lead.id)}>Открыть</Button>,
          <Button onClick={() => this.confirmDelete(this.props.lead.id)} type="dashed" icon="delete" shape="circle" size="small"></Button>
        ]}>
        <List.Item.Meta
            avatar={<Avatar size="large" icon="user" />}
            title={<b>{this.props.lead.fullName ? this.props.lead.fullName : 'Без имени'}</b>}
            description={this.props.lead.contacts.length ? this.props.lead.contacts.join(' | ') : 'Пустой лид'} />
      </List.Item>
    )
  }
}

class Leads extends React.Component {
  state = {
    addModalVisible: false,
    editModalVisible: false,
    leadTotalCount: 0,
    leads: null,
    page: 0
  }
  list = {
    addOne: (lead) => {
      const leads = this.state.leads;
      const leadTotalCount = this.state.leadTotalCount;
      leads.unshift(lead);
      this.setState({ leads, leadTotalCount });
    },
    updateOne: (id, lead) => {
      const leads = this.state.leads;
      const leadIndex = leads.findIndex((c) => {
        return c.id == id;
      });
      if (leadIndex < 0) return;
      leads[leadIndex] = lead;
      this.setState({ leads });
    },
    deleteOne: (id) => {
      const leads = this.state.leads;
      const leadTotalCount = this.state.leadTotalCount-1;
      const leadIndex = leads.findIndex((c) => {
          return c.id == id;
      });
      if (leadIndex < 0) return;
      leads.splice(leadIndex, 1);
      this.setState({ leads, leadTotalCount });
    }
  }
  // Открыть: добавление
  openAddModal = () => {
    this.setState({ addModalVisible: true });
  }
  // Закрыть: добавление
  closeAddModal = () => {
    this.setState({ addModalVisible: false });
  }
  // Открыть: изменение
  openEditModal = (leadId) => {
    this.setState({ editModalVisible: true, leadId: leadId });
  }
  // Закрыть: изменение
  closeEditModal = () => {
    this.setState({ editModalVisible: false });
  }
  componentDidMount() {
    setTitle('Лиды');
    axios.get(config.serverUrl + 'app-api/projects/' + this.props.project.id + '/leads/')
      .then((res) => {
        const leads = res.data.leads;
        const leadTotalCount = res.data.leadTotalCount;
        this.setState({ leads, leadTotalCount });
      })
      .catch((err) => {
        console.log('Error', err);
        Modal.error({ title: (<b>Ошибка при загрузке</b>) });
      });
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
          loading={!this.state.leads ? true : false}
          pagination={this.state.leads && (this.state.leadTotalCount > this.state.leads.length) ? {
            size: 'large',
            pageSize: 50,
            total: this.state.leadTotalCount,
            onChange: (page, pageSize) => {
              axios.get(config.serverUrl + 'app-api/projects/' + this.props.project.id + '/leads/?offset=' + (Math.abs(page-1) * 3))
                .then((res) => {
                  const leads = res.data.leads;
                  const leadTotalCount = res.data.leadTotalCount;
                  this.setState({ leads, leadTotalCount });
                })
                .catch((err) => {
                  console.log('Error', err);
                  Modal.error({ title: (<b>Ошибка при загрузке</b>) });
                });
            }
          } : false}
          size="large"
          dataSource={this.state.leads ? this.state.leads : []}
          renderItem={item => <LeadItem projectId={this.props.project.id} lead={item} list={this.list} openEditModal={this.openEditModal} />} />
      );
    };
    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">Лиды</div>
          <div className="app-main-view-header-btns">
            <Button onClick={this.openAddModal} className="app-main-view-header-btn" type="primary" icon="plus">Добавить лид</Button>
          </div>
        </div>
        <div className="app-main-view-content">
          {content}
        </div>
        <AddLeadDrawer
          projectId={this.props.project.id}
          visible={this.state.addModalVisible}
          list={this.list}
          close={this.closeAddModal} />
        <EditLeadDrawer
          leadId={this.state.leadId}
          projectId={this.props.project.id}
          visible={this.state.editModalVisible}
          list={this.list}
          close={this.closeEditModal} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    project: state.project
  }
}

export default connect(mapStateToProps)(Leads);
