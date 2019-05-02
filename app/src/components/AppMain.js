import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Avatar, Icon, Button } from 'antd';

import ProjectsView from './views/Projects';
import AddProjectView from './views/AddProject';
import AccountView from './views/Account';
import InformationView from './views/Information';
import BuildView from './views/Build';
import Error404View from './views/Error404';

function Sidebar() {
  return (
    <div className="app-main-sidebar">
      <div className="app-main-sidebar-panel">
        <div className="app-main-sidebar-panel-header">
          <Avatar className="app-main-sidebar-panel-header-avatar" size="medium" icon="user" />
        </div>
        <div className="app-main-sidebar-panel-menu">
          <div class="app-main-sidebar-panel-menu-items">
            <div class="app-main-sidebar-panel-menu-item">
              <Link to="/account/" title="Открыть аккаунт" class="app-main-sidebar-panel-menu-item-link">
                <Icon type="setting" className="app-main-sidebar-panel-menu-item-link-icon" />
              </Link>
            </div>
            <div class="app-main-sidebar-panel-menu-item">
              <Link to="/request/sign-out/" title="Выйти из приложения" class="app-main-sidebar-panel-menu-item-link">
                <Icon type="export" className="app-main-sidebar-panel-menu-item-link-icon" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="app-main-sidebar-nav">
        <div className="app-main-sidebar-nav-header">
          <div class="app-main-sidebar-nav-header-title">Инф. система</div>
        </div>
        <div className="app-main-sidebar-nav-menu">
          <div class="app-main-sidebar-nav-menu-items">
            <div class="app-main-sidebar-nav-menu-item active">
              <Link to="/projects/" class="app-main-sidebar-nav-menu-item-link">
                <Icon type="bars" className="app-main-sidebar-nav-menu-item-link-icon" /><div className="app-main-sidebar-nav-menu-item-link-text">Мои проекты</div>
              </Link>
            </div>
            <div class="app-main-sidebar-nav-menu-item">
              <Link to="/information/" class="app-main-sidebar-nav-menu-item-link">
                <Icon type="info-circle" className="app-main-sidebar-nav-menu-item-link-icon" /><div className="app-main-sidebar-nav-menu-item-link-text">Информация</div>
              </Link>
            </div>
            <div class="app-main-sidebar-nav-menu-item">
              <Link to="/build/" class="app-main-sidebar-nav-menu-item-link">
                <Icon type="code" className="app-main-sidebar-nav-menu-item-link-icon" /><div className="app-main-sidebar-nav-menu-item-link-text">Сборка</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function View() {
  return (
    <div className="app-main-view">
      <div className="app-main-view-header">
        <div className="app-main-view-header-title">Проекты</div>
        <div className="app-main-view-header-btns">
          <Link to="/add-project/"><Button className="app-main-view-header-btn" type="primary" icon="plus">Добавить проект</Button></Link>
        </div>
      </div>
      <div className="app-main-view-content">
        <Switch>
          <Route path="/projects/" component={ProjectsView} />
          <Route path="/add-service/" component={AddProjectView} />
          <Route path="/information/" component={InformationView} />
          <Route path="/build/" component={BuildView} />
          <Route component={Error404View} />
        </Switch>
      </div>
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
