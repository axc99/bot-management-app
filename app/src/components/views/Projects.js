import React from 'react';
import { List, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

function ProjectItem(props) {
  return (
    <List.Item actions={[
        <Link to={'/projects/'+props.project.id+'/knowledge-base/'}>База знаний</Link>,
        <Link to={'/projects/'+props.project.id+'/bot/'}>Бот</Link>,
        <Link to={'/projects/'+props.project.id+'/settings/'}>Настройки</Link>
      ]}>
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
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 15,
          }}
          size="large"
          dataSource={projects}
          renderItem={item => <ProjectItem project={item} />} />
      </div>
    );
  }
}

export default Projects;
