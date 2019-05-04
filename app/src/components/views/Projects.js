import React from 'react';
import axios from 'axios';
import { List, Row, Col, Empty, Modal } from 'antd';
import { Link } from 'react-router-dom';

function ProjectItem(props) {
  return (
    <List.Item actions={[
        <Link to={'/projects/'+props.project._id+'/knowledge-base/'}>База знаний</Link>,
        <Link to={'/projects/'+props.project._id+'/bot/'}>Бот</Link>,
        <Link to={'/projects/'+props.project._id+'/settings/'}>Настройки</Link>
      ]}>
      <List.Item.Meta
        title={<Link to={'/projects/'+props.project._id+'/'}><b>{props.project.name}</b></Link>}
        description={<a target="_blank" href={props.project.website_url}>{props.project.website_url_str}</a>} />
    </List.Item>
  )
}

class Projects extends React.Component {

  state = {
    projects: null
  }

  componentDidMount() {
    axios.get('http://localhost./app-api/projects/', {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(
      res => {
        const projects = res.data.projects;
        this.setState({ projects });
      },
      err => {
        Modal.error({
          title: (<b>Ошибка при загрузке</b>)
        });
      }
    )
  }

  render() {
    if (this.state.projects !== null && this.state.projects.length == 0) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="У вас пока нет проектов." />
      );
    } else {
      return (
        <List
          bordered
          hideOnSinglePage={true}
          loading={!this.state.projects ? true : false}
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
            total: 50
          }}
          size="large"
          dataSource={this.state.projects ? this.state.projects : []}
          renderItem={item => <ProjectItem project={item} />} />
      );
    }
  }
}

export default Projects;
