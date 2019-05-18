import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import LeadsView from './Project/Leads';
import DialogsView from './Project/Dialogs';
import AnswersView from './Project/Answers';
import SettingsView from './Project/Settings';
import BotView from './Project/Bot';
import IntegrationsView from './Project/Integrations';

import * as projectActions from '../../store/actions/project';

class Project extends React.Component {
  componentWillMount() {
    this.props.setProject({
      id: this.props.match.params.projectId
    });
  }
  componentWillUnmount() {
    this.props.unsetProject();
  }
  render() {
    return (
      <div>
        <Switch>
          <Route path="/projects/:projectId/leads/" component={LeadsView} />
          <Route path="/projects/:projectId/dialogs/" component={DialogsView} />
          <Route path="/projects/:projectId/answers/" component={AnswersView} />
          <Route path="/projects/:projectId/bot/" component={BotView} />
          <Route path="/projects/:projectId/integrations/" component={IntegrationsView} />
          <Route path="/projects/:projectId/settings/" component={SettingsView} />
        </Switch>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    project: state.project
  }
}

export default connect(mapStateToProps, projectActions)(Project);
