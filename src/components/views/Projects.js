import React from 'react';
import axios from 'axios';
import { List, Empty, Button, Modal, Input, Icon } from 'antd';
import { Link } from 'react-router-dom';

import AddProjectModal from './Projects/AddProjectModal.js';
import { setTitle } from '../../helpers';
import config from '../../config';

const source = axios.CancelToken.source();

function ProjectItem(props) {
  const { project } = props;
  return (
    <List.Item
      className="app-list-item"
      actions={[
        <Link to={'/projects/' + project.id + '/leads/'}>Заявки</Link>,
        <Link to={'/projects/' + project.id + '/answers/'}>База знаний</Link>,
        <Link to={'/projects/' + project.id + '/settings/'}>Настройки</Link>
      ]} >
      <List.Item.Meta
        className="app-list-item-meta"
        title={<Link to={'/projects/'+project.id+'/leads/'}><b>{project.name}</b></Link>}
        description={project.websiteUrl ? <a target="_blank" href={project.websiteUrl}>{project.websiteUrlStr}</a> : <span>#{project._id}</span>} />
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
  // открыть: добавление
  openAddModal = () => {
    this.setState({ addModalVisible: true });
  }
  // закрыть: добавление
  closeAddModal = () => {
    this.setState({ addModalVisible: false });
  }
  load = () => {
    if (source.token) source.token = null;
    else source.cancel();

    axios
      .get(config.serverUrl + '/app-api/projects/?search=' + this.state.search, {
        cancelToken: source.token
      })
      .then((res) => {
        const projects = res.data.projects;
        const projectTotalCount = res.data.projectTotalCount;
        this.setState({ projects, projectTotalCount });
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        Modal.error({ title: 'Ошибка при отправке запроса', content: err.message });
      });
  }
  // установить поиск
  setSearch = (event) => {
    this.setState({ search: event.target.value.trim(), projects: null }, () => this.load());
  }
  componentDidMount() {
    setTitle('Проекты');
    this.load();
  }
  componentWillUnmount() {
    source.cancel();
  }
  render() {
    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">
            Проекты {this.state.projectTotalCount > 0 ? <div className="app-main-view-header-title-counter">({this.state.projectTotalCount})</div> : null}
          </div>
          <div className="app-main-view-header-controls">
            <div className="app-main-view-header-control search">
              <Input onChange={this.setSearch} allowClear placeholder="Поиск..." style={{ width: 200 }} prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} />
            </div>
            <div className="app-main-view-header-control btn">
              <Button onClick={this.openAddModal} type="primary" icon="plus">Создать проект</Button>
            </div>
          </div>
        </div>
        <div className="app-main-view-content">
          <div className="app-projects">
            <List
              bordered
              size="large"
              className="app-list"
              locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="У вас пока нет проектов." /> }}
              loading={!this.state.projects ? true : false}
              dataSource={this.state.projects ? this.state.projects : []}
              renderItem={item => <ProjectItem project={item} />} />
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
