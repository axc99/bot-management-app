import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import { Avatar, Icon } from 'antd';

import ProjectsView from './views/Projects';
import ProjectView from './views/Project';
import AddProjectView from './views/AddProject';
import InformationView from './views/Information';
import BuildView from './views/Build';
import AccountView from './views/Account';
import Error404View from './views/Error404';

function Sidebar() {
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
            <NavLink to="/request/sign-out/" title="Выйти из приложения" className="app-main-sidebar-panel-menu-item">
              <Icon type="export" className="app-main-sidebar-panel-menu-item-icon" />
            </NavLink>
          </div>
        </div>
      </div>
      <div className="app-main-sidebar-nav">
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
              <Icon type="code" className="app-main-sidebar-nav-menu-item-icon" /><div className="app-main-sidebar-nav-menu-item-text">Сборка</div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

function View() {
  return (
    <div className="app-main-view">
      <Switch>
        <Route path="/projects/:project_id/" component={ProjectView} />
        <Route exact path="/projects/" component={ProjectsView} />
        <Route path="/add-project/" component={AddProjectView} />
        <Route path="/information/" component={InformationView} />
        <Route path="/build/" component={BuildView} />
        <Route path="/account/" component={AccountView} />
        <Route component={Error404View} />
      </Switch>
    </div>
  );
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
