import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
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
    this.props.set({
      id: this.props.match.params.projectId
    });
  }
  componentWillUnmount() {
    this.props.set({
      id: null
    });
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
    id: state.project.id,
    name: state.project.name
  }
}

export default compose(
  connect(mapStateToProps, projectActions)
)(Project);
