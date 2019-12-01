import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import LeadsView from './Project/Leads'
import DialogsView from './Project/Dialogs'
import LeadCaptureView from './Project/LeadCapture'
import KnowledgeBaseView from './Project/KnowledgeBase'
import SettingsView from './Project/Settings'
import BotView from './Project/Bot'
import IntegrationsView from './Project/Integrations'

import * as projectActions from '../../store/actions/project'

class Project extends React.Component {
  componentWillMount () {
    this.props.setProject({
      id: this.props.match.params.projectId
    })
  }

  componentWillUnmount () {
    this.props.unsetProject()
  }

  render () {
    return (
      <Switch>
        <Route path='/projects/:projectId/leads/' component={LeadsView} />
        <Route path='/projects/:projectId/dialogs/' component={DialogsView} />
        <Route path='/projects/:projectId/lead-capture/' component={LeadCaptureView} />
        <Route path='/projects/:projectId/knowledge-base/' component={KnowledgeBaseView} />
        <Route path='/projects/:projectId/bot/' component={BotView} />
        <Route path='/projects/:projectId/integrations/' component={IntegrationsView} />
        <Route path='/projects/:projectId/settings/' component={SettingsView} />
      </Switch>
    )
  }
}

function mapStateToProps (state) {
  return {
    project: state.project
  }
}

export default connect(mapStateToProps, projectActions)(Project)
