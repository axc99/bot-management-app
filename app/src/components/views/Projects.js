import React from 'react';
import axios from 'axios';
import { List, Row, Col, Empty } from 'antd';
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

  state = {
    projects: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    if (this.state.projects.length == 0) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="У вас пока нет проектов." />
      );
    } else {
      return (
        <List
          bordered
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 15,
          }}
          size="large"
          dataSource={this.state.projects}
          renderItem={item => <ProjectItem project={item} />} />
      );
    }
  }
}

export default Projects;
