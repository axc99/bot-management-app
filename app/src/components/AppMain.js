import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import { Avatar, Icon } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Project from './views/Project';
import ProjectsView from './views/Projects';
import InformationView from './views/Information';
import LogsView from './views/Logs';
import BuildView from './views/Build';
import AccountView from './views/Account';
import Error404View from './views/Error404';

import * as projectActions from '../store/actions/project';
import * as userActions from '../store/actions/user';

class Sidebar extends React.Component {
  render() {
    return (
      <div className="app-main-sidebar">
        <div className="app-main-sidebar-panel">
          <div className="app-main-sidebar-panel-header">
            <Avatar className="app-main-sidebar-panel-header-avatar" size="medium" icon="user" />
          </div>
          <div className="app-main-sidebar-panel-menu">
            <div className="app-main-sidebar-panel-menu-items">
              <NavLink to="/account/" title="Открыть аккаунт" className="app-main-sidebar-panel-menu-item">
                <Icon type="setting" className="app-main-sidebar-panel-menu-item-icon" />
              </NavLink>
              <div onClick={this.props.unsetUser} title="Выйти из приложения" className="app-main-sidebar-panel-menu-item">
                <Icon type="export" className="app-main-sidebar-panel-menu-item-icon" />
              </div>
            </div>
          </div>
        </div>
        <div className="app-main-sidebar-nav">
          {
            this.props.id ? (
              <div>
                <div className="app-main-sidebar-nav-header">
                  <div className="app-main-sidebar-nav-header-title">Проект</div>
                </div>
                <div className="app-main-sidebar-nav-menu">
                  <div className="app-main-sidebar-nav-menu-items">
                    <NavLink exact to="/projects/" className="app-main-sidebar-nav-menu-item">
                      <Icon type="arrow-left" className="app-main-sidebar-nav-menu-item-icon" /><div className="app-main-sidebar-nav-menu-item-text">Все проекты</div>
                    </NavLink>
                    <NavLink to={`/projects/${this.props.id}/leads/`} className="app-main-sidebar-nav-menu-item">
                      <Icon type="idcard" className="app-main-sidebar-nav-menu-item-icon" /><div className="app-main-sidebar-nav-menu-item-text">Лиды</div>
                    </NavLink>
                    <NavLink to={`/projects/${this.props.id}/dialogs/`} className="app-main-sidebar-nav-menu-item">
                      <Icon type="message" className="app-main-sidebar-nav-menu-item-icon" /><div className="app-main-sidebar-nav-menu-item-text">Диалоги</div>
                    </NavLink>
                    <NavLink to={`/projects/${this.props.id}/answers/`} className="app-main-sidebar-nav-menu-item">
                      <Icon type="read" className="app-main-sidebar-nav-menu-item-icon" /><div className="app-main-sidebar-nav-menu-item-text">База знаний</div>
                    </NavLink>
                    <NavLink to={`/projects/${this.props.id}/bot/`} className="app-main-sidebar-nav-menu-item">
                      <Icon type="experiment" className="app-main-sidebar-nav-menu-item-icon" /><div className="app-main-sidebar-nav-menu-item-text">Поведение бота</div>
                    </NavLink>
                    <NavLink to={`/projects/${this.props.id}/integrations/`} className="app-main-sidebar-nav-menu-item">
                      <Icon type="swap" className="app-main-sidebar-nav-menu-item-icon" /><div className="app-main-sidebar-nav-menu-item-text">Интеграции</div>
                    </NavLink>
                    <NavLink to={`/projects/${this.props.id}/settings/`} className="app-main-sidebar-nav-menu-item">
                      <Icon type="setting" className="app-main-sidebar-nav-menu-item-icon" /><div className="app-main-sidebar-nav-menu-item-text">Настройки</div>
                    </NavLink>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="app-main-sidebar-nav-header">
                  <div className="app-main-sidebar-nav-header-title">Инф. система</div>
                </div>
                <div className="app-main-sidebar-nav-menu">
                  <div className="app-main-sidebar-nav-menu-items">
                    <NavLink exact to="/projects/" className="app-main-sidebar-nav-menu-item">
                      <Icon type="bars" className="app-main-sidebar-nav-menu-item-icon" /><div className="app-main-sidebar-nav-menu-item-text">Мои проекты</div>
                    </NavLink>
                    <NavLink to="/information/" className="app-main-sidebar-nav-menu-item">
                      <Icon type="info-circle" className="app-main-sidebar-nav-menu-item-icon" /><div className="app-main-sidebar-nav-menu-item-text">Информация</div>
                    </NavLink>
                    <NavLink to="/logs/" className="app-main-sidebar-nav-menu-item">
                      <Icon type="flag" className="app-main-sidebar-nav-menu-item-icon" /><div className="app-main-sidebar-nav-menu-item-text">Лог действий</div>
                    </NavLink>
                    <NavLink to="/build/" className="app-main-sidebar-nav-menu-item">
                      <Icon type="code" className="app-main-sidebar-nav-menu-item-icon" /><div className="app-main-sidebar-nav-menu-item-text">Приложение</div>
                    </NavLink>
                    <a target="_blank" href="https://github.com/kovert99/bot-management-app" className="app-main-sidebar-nav-menu-item">
                      <Icon type="github" className="app-main-sidebar-nav-menu-item-icon" /><div className="app-main-sidebar-nav-menu-item-text">GitHub</div>
                    </a>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    );

  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    project: state.project
  };
}
Sidebar = compose(
  connect(mapStateToProps, userActions)
)(Sidebar);

class View extends React.Component {
  render() {
    return (
      <div className="app-main-view">
        <Switch>
          <Route path="/projects/:projectId/" component={Project} />
          <Route exact path="/projects/" component={ProjectsView} />
          <Route path="/information/" component={InformationView} />
          <Route path="/logs/" component={LogsView} />
          <Route path="/build/" component={BuildView} />
          <Route path="/account/" component={AccountView} />
          <Route component={Error404View} />
        </Switch>
      </div>
    )
  }
}

function AppMain() {
  return (
    <div>
      <Sidebar />
      <View />
    </div>
  );
}

export default AppMain;
