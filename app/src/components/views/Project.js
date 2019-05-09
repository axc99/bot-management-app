import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Leads from './Project/Leads';
import Dialogs from './Project/Dialogs';
import Answers from './Project/Answers';
import Settings from './Project/Settings';
import Bot from './Project/Bot';
import Integrations from './Project/Integrations';

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
          <Route path="/projects/:projectId/leads/" component={Leads} />
          <Route path="/projects/:projectId/dialogs/" component={Dialogs} />
          <Route path="/projects/:projectId/answers/" component={Answers} />
          <Route path="/projects/:projectId/bot/" component={Bot} />
          <Route path="/projects/:projectId/integrations/" component={Integrations} />
          <Route path="/projects/:projectId/settings/" component={Settings} />
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
