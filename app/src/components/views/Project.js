import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Settings from './Project/Settings';

function Projects() {
  return (
    <div>
      <Switch>
        <Route path="/projects/:project_id/settings/" component={Settings} />
      </Switch>
    </div>
  );
}

/*
<Route path="/projects/:project_id/knowledge-base/" component={KnowledgeBase} />
<Route path="/projects/:project_id/knowledge-base/:category_id/" component={KnowledgeBaseCategory} />
<Route path="/projects/:project_id/knowledge-base/add-answer/" component={KnowledgeBaseAddAnswer} />
<Route path="/projects/:project_id/knowledge-base/edit-answer/" component={KnowledgeBaseEditAnswer} />
<Route path="/projects/:project_id/knowledge-base/add-category/" component={KnowledgeBaseAddCategory} />
<Route path="/projects/:project_id/knowledge-base/edit-category/" component={KnowledgeBaseEditCategory} />
*/

export default Projects;
