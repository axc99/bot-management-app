import React from 'react';
import axios from 'axios';
import { List, Row, Col, Empty, Modal, Button, Form, Input, Radio, Avatar } from 'antd';
import { Link } from 'react-router-dom';

import AddLeadForm from './Leads/AddLeadForm.js';

import { setTitle } from '../../../helpers';

function LeadItem(props) {
  return (
    <List.Item actions={[
        <Link to={'/projects/'+props.project._id+'/leads/'}>Открыть</Link>,
        <Link to={'/projects/'+props.project._id+'/answers/'}>Удалить</Link>
      ]}>
      <List.Item.Meta
          avatar={<Avatar size="medium" icon="user" />}
          title={<b>Ivanov</b>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team" />
    </List.Item>
  )
}

class Leads extends React.Component {

  state = {
    visible: false,
    projects: null
  }

  componentDidMount() {
    setTitle('Лиды');
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

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    let content;

    if (this.state.projects !== null && this.state.projects.length == 0) {
      content = (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="У вас пока нет проектов." />
      );
    } else {
      content = (
        <List
          bordered
          hideOnSinglePage={true}
          loading={!this.state.projects ? true : false}
          size="large"
          dataSource={this.state.projects ? this.state.projects : []}
          renderItem={item => <LeadItem project={item} />} />
      );
    };

    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">Заявки</div>
          <div className="app-main-view-header-btns">
            <Button onClick={this.showModal} className="app-main-view-header-btn" type="primary" icon="plus">Добавить заявку</Button>
          </div>
        </div>
        <div className="app-main-view-content">
          {content}
        </div>
        <AddLeadForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate} />
      </div>
    );
  }
}

export default Leads;
