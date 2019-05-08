import React, { Component } from 'react';

// import EditProjectForm from './Settings/EditProjectForm';

import { setTitle } from '../../../helpers';

class Settings extends React.Component {
  componentDidMount() {
    setTitle('Поведение бота');
  }
  render() {
    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">Поведение бота</div>
        </div>
        <div className="app-main-view-content">
          [FORM]
        </div>
      </div>
    );
  }
}

export default Settings;
