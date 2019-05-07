import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Switch, Route } from 'react-router-dom';

import Leads from './Project/Leads';
import Dialogs from './Project/Dialogs';
import Answers from './Project/Answers';
import Settings from './Project/Settings';
import Integrations from './Project/Integrations';

import * as projectActions from '../../store/actions/project';

class Project extends React.Component {
  componentWillMount() {
    this.props.set({
      _id: this.props.match.params.project_id
    });
  }
  componentWillUnmount() {
    this.props.set({
      _id: null
    });
  }
  render() {
    return (
      <div>
        <Switch>
          <Route path="/projects/:project_id/leads/" component={Leads} />
          <Route path="/projects/:project_id/dialogs/" component={Dialogs} />
          <Route path="/projects/:project_id/answers/" component={Answers} />
          <Route path="/projects/:project_id/integrations/" component={Integrations} />
          <Route path="/projects/:project_id/settings/" component={Settings} />
        </Switch>
      </div>
    )
  }
}

/*
<Route path="/projects/:project_id/knowledge-base/" component={KnowledgeBase} />
<Route path="/projects/:project_id/knowledge-base/:category_id/" component={KnowledgeBaseCategory} />
<Route path="/projects/:project_id/knowledge-base/add-answer/" component={KnowledgeBaseAddAnswer} />
<Route path="/projects/:project_id/knowledge-base/edit-answer/" component={KnowledgeBaseEditAnswer} />
<Route path="/projects/:project_id/knowledge-base/add-category/" component={KnowledgeBaseAddCategory} />
<Route path="/projects/:project_id/knowledge-base/edit-category/" component={KnowledgeBaseEditCategory} />
*/

function mapStateToProps(state) {
  return {
    _id: state.project._id,
    name: state.project.name
  }
}

export default compose(
  connect(mapStateToProps, projectActions)
)(Project);
