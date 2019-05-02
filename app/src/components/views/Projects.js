import React from 'react';
import { List, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

function ProjectItem(props) {
  return (
    <List.Item actions={[<a>База знаний</a>, <a>Бот</a>, <a>Настройки</a>]}>
      <List.Item.Meta
        title={<Link to={'/projects/'+props.project.id+'/'}><b>{props.project.name}</b></Link>}
        description={<a target="_blank" href={props.project.website_url}>{props.project.website_url_str}</a>} />
    </List.Item>
  )
}

class Projects extends React.Component {
  render() {
    let projects = [
      {
        id: 1,
        name: 'Project name',
        website_url: 'https://example.com/',
        website_url_str: 'example.com'
      },
      {
        id: 2,
        name: 'Project name',
        website_url: 'https://example.com/',
        website_url_str: 'example.com'
      },
      {
        id: 3,
        name: 'Project name',
        website_url: 'https://example.com/',
        website_url_str: 'example.com'
      }
    ];

    return (
      <div>
        <List
          bordered
          size="large"
          dataSource={projects}
          renderItem={item => <ProjectItem project={item} />} />
      </div>
    );
  }
}

export default Projects;
