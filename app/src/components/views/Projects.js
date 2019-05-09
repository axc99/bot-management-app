import React from 'react';
import axios from 'axios';
import { List, Empty, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';

import AddProjectForm from './Projects/AddProjectForm.js';

import { setTitle } from '../../helpers';
import config from '../../config';

function ProjectItem(props) {
  return (
    <List.Item actions={[
        <Link to={'/projects/'+props.project.id+'/leads/'}>Лиды</Link>,
        <Link to={'/projects/'+props.project.id+'/answers/'}>База знаний</Link>,
        <Link to={'/projects/'+props.project.id+'/bot/'}>Бот</Link>,
        <Link to={'/projects/'+props.project.id+'/settings/'}>Настройки</Link>
      ]}>
      <List.Item.Meta
        title={<Link to={'/projects/'+props.project.id+'/leads/'}><b>{props.project.name}</b></Link>}
        description={<a target="_blank" href={props.project.websiteUrl}>{props.project.websiteUrlStr}</a>} />
    </List.Item>
  )
}

class Projects extends React.Component {
  state = {
    addProjectVisible: false,
    projects: null
  }
  componentDidMount() {
    setTitle('Проекты');
    axios.get(config.serverUrl + 'app-api/projects/', {}).then(
      res => {
        const projects = res.data.projects;
        this.setState({ projects });
      },
      err => {
        Modal.error({ title: (<b>Ошибка при загрузке</b>) });
      }
    );
  }
  // Открыть: добавление проекта
  openAddProject = () => {
    this.setState({ addProjectVisible: true });
  }
  // Обработать закрытие: добавление проекта
  handleCancelAddProject = () => {
    this.setState({ addProjectVisible: false });
  }
  render() {
    let content;

    if (this.state.projects !== null && this.state.projects.length == 0) {
      content = (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="У вас пока нет проектов." />
      );
    } else {
      content = (
        <List
          bordered
          hideOnSinglePage={true}
          loading={!this.state.projects ? true : false}
          /*pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 100
          }}*/
          size="large"
          dataSource={this.state.projects ? this.state.projects : []}
          renderItem={item => <ProjectItem project={item} />} />
      );
    };
    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">Проекты</div>
          <div className="app-main-view-header-btns">
            <Button onClick={this.openAddProject} className="app-main-view-header-btn" type="primary" icon="plus">Создать проект</Button>
          </div>
        </div>
        <div className="app-main-view-content">
          {content}
        </div>
        <AddProjectForm
          visible={this.state.addProjectVisible}
          onCancel={this.handleCancelAddProject} />
      </div>
    );
  }
}

export default Projects;
