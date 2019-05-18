import React from 'react';
import axios from 'axios';
import { List, Empty, Button, Modal, Input, Icon, Divider } from 'antd';
import { Link } from 'react-router-dom';

import AddProjectModal from './Projects/AddProjectModal.js';
import { setTitle } from '../../helpers';
import config from '../../config';

function ProjectItem(props) {
  return (
    <List.Item actions={[
        <Link to={'/projects/' + props.project.id + '/leads/'}>Лиды</Link>,
        <Link to={'/projects/' + props.project.id + '/answers/'}>База знаний</Link>,
        <Link to={'/projects/' + props.project.id + '/bot/'}>Бот</Link>,
        <Link to={'/projects/' + props.project.id + '/settings/'}>Настройки</Link>
      ]}>
      <List.Item.Meta
        title={<Link to={'/projects/'+props.project.id+'/leads/'}><b>{props.project.name}</b></Link>}
        description={<div><span>Интернет-магазин</span><Divider type="vertical" /><a target="_blank" href={props.project.websiteUrl}>{props.project.websiteUrlStr}</a></div>} />
    </List.Item>
  )
}

class Projects extends React.Component {
  state = {
    addModalVisible: false,
    projectTotalCount: 0,
    projects: null,
    search: ''
  }
  // Открыть: добавление
  openAddModal = () => {
    this.setState({ addModalVisible: true });
  }
  // Закрыть: добавление
  closeAddModal = () => {
    this.setState({ addModalVisible: false });
  }
  // Загрузка
  load = () => {
    axios.get(config.serverUrl + 'app-api/projects/?search=' + this.state.search)
      .then((res) => {
        const projects = res.data.projects;
        const projectTotalCount = res.data.projectTotalCount;
        this.setState({ projects, projectTotalCount });
      })
      .catch((err) => {
        Modal.error({ title: (<b>Ошибка при отправке запроса</b>), content: err.message });
      });
  }
  // Установить поиск
  setSearch = (event) => {
    this.setState({ search: event.target.value.trim() }, () => this.load());
  }
  componentDidMount() {
    setTitle('Проекты');
    this.load();
  }
  render() {
    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">Проекты</div>
          <div className="app-main-view-header-controls">
            <div className="app-main-view-header-control input">
              <Input onChange={this.setSearch} allowClear placeholder="Поиск..." style={{ width: 200 }} prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} />
            </div>
            <div className="app-main-view-header-control btn">
              <Button onClick={this.openAddModal} type="primary" icon="plus">Создать проект</Button>
            </div>
          </div>
        </div>
        <div className="app-main-view-content">
          <div className="app-projects">
            {
              (this.state.projects !== null && this.state.projects.length == 0) ? (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="У вас пока нет проектов." />
              ) : (
                <List
                  bordered
                  size="large"
                  loading={!this.state.projects ? true : false}
                  dataSource={this.state.projects ? this.state.projects : []}
                  renderItem={item => <ProjectItem project={item} />} />
              )
            }
          </div>
        </div>
        <AddProjectModal
          history={this.props.history}
          visible={this.state.addModalVisible}
          close={this.closeAddModal} />
      </div>
    );
  }
}

export default Projects;
