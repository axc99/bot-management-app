import React from 'react';
import { Link, NavLink, Switch, Route } from 'react-router-dom';
import { Tooltip, Avatar, Icon, Button, Popover, Menu } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Project from './views/Project';
import ProjectsView from './views/Projects';
import InformationView from './views/Information';
import BuildView from './views/Build';
import AccountView from './views/Account';
import Error404View from './views/Error404';

import * as userActions from '../store/actions/user';

class Sidebar extends React.Component {
  render() {
    return (
      <div className="app-main-sidebar">
        <div className="app-main-sidebar-panel">
          <div className="app-main-sidebar-panel-header">
            <div className="app-main-sidebar-panel-header-user">
              <Avatar className="app-main-sidebar-panel-header-user-avatar" size="medium" icon="user" />
            </div>
          </div>
          <div className="app-main-sidebar-panel-menu">
            <div className="app-main-sidebar-panel-menu-items">
              <Tooltip placement="right" title="Мой аккаунт">
                <NavLink to="/account/" title="Открыть аккаунт" className="app-main-sidebar-panel-menu-item">
                  <Icon type="setting" className="app-main-sidebar-panel-menu-item-icon" />
                </NavLink>
              </Tooltip>
              <Tooltip placement="right" title="Выйти из аккаунта">
                <div onClick={this.props.unsetUser} className="app-main-sidebar-panel-menu-item">
                  <Icon type="export" className="app-main-sidebar-panel-menu-item-icon" />
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="app-main-sidebar-nav">
          {
            this.props.project ? (
              <div>
                <div className="app-main-sidebar-nav-header">
                  <Link to={`/projects/${this.props.project.id}/leads/`}><div className="app-main-sidebar-nav-header-title">Проект</div></Link>
                </div>
                <div className="app-main-sidebar-nav-menu">
                  <div className="app-main-sidebar-nav-menu-items">
                    <NavLink exact to="/projects/" className="app-main-sidebar-nav-menu-item">
                      <Icon type="arrow-left" className="app-main-sidebar-nav-menu-item-icon" /><div className="app-main-sidebar-nav-menu-item-text">Все проекты</div>
                    </NavLink>
                    <NavLink to={`/projects/${this.props.project.id}/leads/`} className="app-main-sidebar-nav-menu-item">
                      <Icon type="idcard" className="app-main-sidebar-nav-menu-item-icon" /><div className="app-main-sidebar-nav-menu-item-text">Лиды</div>
                    </NavLink>
                    <NavLink to={`/projects/${this.props.project.id}/dialogs/`} className="app-main-sidebar-nav-menu-item">
                      <Icon type="message" className="app-main-sidebar-nav-menu-item-icon" /><div className="app-main-sidebar-nav-menu-item-text">Диалоги</div>
                    </NavLink>
                    <NavLink to={`/projects/${this.props.project.id}/answers/`} className="app-main-sidebar-nav-menu-item">
                      <Icon type="read" className="app-main-sidebar-nav-menu-item-icon" /><div className="app-main-sidebar-nav-menu-item-text">База знаний</div>
                    </NavLink>
                    <NavLink to={`/projects/${this.props.project.id}/bot/`} className="app-main-sidebar-nav-menu-item">
                      <Icon type="experiment" className="app-main-sidebar-nav-menu-item-icon" /><div className="app-main-sidebar-nav-menu-item-text">Поведение бота</div>
                    </NavLink>
                    <NavLink to={`/projects/${this.props.project.id}/integrations/`} className="app-main-sidebar-nav-menu-item">
                      <Icon type="swap" className="app-main-sidebar-nav-menu-item-icon" /><div className="app-main-sidebar-nav-menu-item-text">Интеграции</div>
                    </NavLink>
                    <NavLink to={`/projects/${this.props.project.id}/settings/`} className="app-main-sidebar-nav-menu-item">
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
        <Popover
          placement="bottomRight"
          trigger="click"
          content={
            <div>[MENU]</div>
          } >
          <Button shape="circle" size="large" icon="menu" className="app-main-sidebar-nav-mobile_btn"></Button>
        </Popover>
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
        <div className="app-main-view-area">
          <Switch>
            <Route path="/projects/:projectId/" component={Project} />
            <Route exact path="/projects/" component={ProjectsView} />
            <Route path="/information/" component={InformationView} />
            <Route path="/build/" component={BuildView} />
            <Route path="/account/" component={AccountView} />
            <Route component={Error404View} />
          </Switch>
        </div>
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
