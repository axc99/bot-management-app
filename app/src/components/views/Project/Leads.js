import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Drawer, List, Empty, Modal, Button, Avatar, Badge, Popover, Select, Input, Icon } from 'antd';
import { Link } from 'react-router-dom';

import AddLeadDrawer from './Leads/AddLeadDrawer';
import EditLeadDrawer from './Leads/EditLeadDrawer';
import FilterLeadsForm from './Leads/FilterLeadsForm';
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
        axios.delete(config.serverUrl + 'app-api/projects/' + this.props.projectId + '/leads/' + leadId + '/');
        this.props.list.deleteOne(leadId);
      }
    });
  }
  render() {
    let avatarColor = null;
    if (this.props.lead.source) {
      switch (this.props.lead.source.type) {
        case 1:
          avatarColor = '#91a5bb';
          break;
        case 2:
          avatarColor = '#8991a2';
          break;
      };
    };
    let btnContent = null;
    switch (this.props.lead.status) {
      case 1:
        btnContent = (<div><Badge status="default" dot={true} /> Не обработан</div>);
        break;
      case 2:
        btnContent = (<div><Badge status="processing" dot={true} /> В обработке</div>);
        break;
      case 3:
        btnContent = (<div><Badge status="success" dot={true} /> Обработан</div>);
        break;
      case 4:
        btnContent = (<div><Badge status="error" dot={true} /> Закрыт</div>);
        break;
    };
    let actions = [
      <Button onClick={() => this.props.openEditDrawer(this.props.lead.id)}>Открыть</Button>,
      <Button onClick={() => this.confirmDelete(this.props.lead.id)} type="dashed" icon="delete" shape="circle" size="small"></Button>
    ];
    if (btnContent) actions.unshift(<Button onClick={() => this.props.openEditDrawer(this.props.lead.id)}>{btnContent}</Button>)
    return (
      <List.Item actions={actions}>
        <List.Item.Meta
            avatar={<Avatar style={{ backgroundColor: avatarColor }} size="large" icon="user" />}
            title={<b>{this.props.lead.fullName ? this.props.lead.fullName : 'Без имени'}</b>}
            description={this.props.lead.contacts.length ? this.props.lead.contacts.join(' | ') : 'Пустой лид'} />
      </List.Item>
    )
  }
}

class Leads extends React.Component {
  state = {
    addDrawerVisible: false,
    editDrawerVisible: false,
    filterPopoverVisible: false,
    filterUse: false,
    leadTotalCount: 0,
    leads: null,
    search: '',
    filter: {
      period: null,
      status: null,
      source: null
    },
    page: 1
  }
  list = {
    addOne: (lead) => {
      const leads = this.state.leads;
      const leadTotalCount = this.state.leadTotalCount+1;
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
  openAddDrawer = () => {
    this.setState({ addDrawerVisible: true });
  }
  // Закрыть: добавление
  closeAddDrawer = () => {
    this.setState({ addDrawerVisible: false });
  }
  // Открыть: изменение
  openEditDrawer = (leadId) => {
    this.setState({ editDrawerVisible: true, leadId });
  }
  // Закрыть: изменение
  closeEditDrawer = () => {
    this.setState({ editDrawerVisible: false });
  }
  // Открыть: фильтр
  openFilterPopover = () => {
    this.setState({ filterPopoverVisible: true });
  }
  // Закрыть: фильтр
  closeFilterPopover = () => {
    this.setState({ filterPopoverVisible: false });
  }
  // Загрузка
  load = () => {
    const { search, page, filter } = this.state;
    const offset = Math.abs(page-1) * 50;
    axios.get(
      config.serverUrl + 'app-api/projects/' + this.props.project.id + '/leads/'
        + '?offset=' + offset
        + '&search=' + search
        + '&filterPeriod=' + ((filter.period && filter.period[0] && filter.period[1]) ? filter.period[0]._d.getTime() + ',' + filter.period[1]._d.getTime() : '')
        + '&filterStatus=' + (filter.status ? filter.status : '')
        + '&filterSource=' + (filter.source ? filter.source : '')
      )
      .then((res) => {
        const leads = res.data.leads;
        const leadTotalCount = res.data.leadTotalCount;
        this.setState({ leads, leadTotalCount });
      })
      .catch((err) => {
        Modal.error({ title: (<b>Ошибка при отправке запроса</b>), content: err.message });
      });
  }
  // Установить поиск
  setSearch = (event) => {
    this.setState({ search: event.target.value.trim() }, () => this.load());
  }
  // Установить страницу
  setPage = (page) => {
    this.setState({ page }, () => this.load());
  }
  // Установить фильтр
  setFilter = (data) => {
    const { period, status, source } = data;
    this.setState(((period && period.length) || status || source) ? { filterUse: true } : { filterUse: false });
    this.setState({
      filter: {
        period: period ? [period[0], period[1]] : null,
        status: status ? status : null,
        source: source ? source : null
      }
    }, () => this.load());
    this.closeFilterPopover();
  }
  componentDidMount() {
    setTitle('Лиды');
    this.load();
  }
  render() {
    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">
            Лиды {this.state.leadTotalCount > 0 ? <div className="app-main-view-header-title-counter">({this.state.leadTotalCount})</div> : null}
          </div>
          <div className="app-main-view-header-controls">
            <div className="app-main-view-header-control input">
              <Input allowClear onChange={this.setSearch} placeholder="Поиск..." style={{ width: 200 }} prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} />
            </div>
            <div className="app-main-view-header-control input">
              <Popover
                trigger="click"
                onVisibleChange={visible => { return visible ? this.openFilterPopover() : this.closeFilterPopover() }}
                visible={this.state.filterPopoverVisible}
                content={<FilterLeadsForm setFilter={this.setFilter} />}>
                <Badge dot={this.state.filterUse}>
                  <Button icon="filter">Фильтр</Button>
                </Badge>
              </Popover>
            </div>
            <div className="app-main-view-header-control btn">
              <Button onClick={this.openAddDrawer} type="primary" icon="plus">Добавить лид</Button>
            </div>
          </div>
        </div>
        <div className="app-main-view-content">
          <div className="app-project-leads">
          {
            (this.state.leads !== null && this.state.leads.length == 0) ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="В проекте пока нет лидов." />
            ) : (
              <List
                bordered
                size="large"
                loading={!this.state.leads ? true : false}
                pagination={this.state.leads && (this.state.leadTotalCount > this.state.leads.length) ? {
                  size: 'large',
                  pageSize: 50,
                  total: this.state.leadTotalCount,
                  onChange: (page, pageSize) => {
                    this.setPage(page);
                  }
                } : false}
                dataSource={this.state.leads ? this.state.leads : []}
                renderItem={item => <LeadItem projectId={this.props.project.id} lead={item} list={this.list} openEditDrawer={this.openEditDrawer} />} />
            )
          }
          </div>
        </div>
        <AddLeadDrawer
          list={this.list}
          projectId={this.props.project.id}
          visible={this.state.addDrawerVisible}
          close={this.closeAddDrawer} />
        <EditLeadDrawer
          list={this.list}
          leadId={this.state.leadId}
          projectId={this.props.project.id}
          visible={this.state.editDrawerVisible}
          close={this.closeEditDrawer} />
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
