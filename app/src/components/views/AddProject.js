import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, Input, Modal } from 'antd';

class AddProjectForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('http://localhost./app-api/projects/', {
          project: {
            name: values.name,
            website_url: values.website_url
          }
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          let project = res.data.project;
          if (project) {
            Modal.success({
              title: (<b>Проект создан</b>),
              content: 'Вы успешно создали проект!',
              okText: 'Начать работу'
            });
          };
        })
        .catch(err => {
          Modal.error({
            title: (<b>Ошибка при загрузке</b>)
          });
          return Promise.reject(err.response);
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form hideRequiredMark="false" onSubmit={this.handleSubmit} className="app-form">
        <div className="app-form-fields">
          <Form.Item label="Название проекта" className="app-form-field">
            {getFieldDecorator('name', {
              rules: [ { required: true, message: 'Заполните это поле.' } ],
            })(
              <Input autofocus="true" name="name" size="large" />
            )}
          </Form.Item>
          <Form.Item label="Ссылка на сайт" className="app-form-field">
            {getFieldDecorator('website_url', {
              rules: [ { required: true, message: 'Заполните это поле.' } ],
            })(
              <Input autofocus="true" name="website_url" size="large" placeholder="https://..." />
            )}
          </Form.Item>
        </div>
        <div className="app-form-btns">
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">Добавить проект</Button>
          </Form.Item>
        </div>
      </Form>
    )
  }
}

class AddProject extends React.Component {
  render() {
    AddProjectForm = Form.create({ name: 'add_project' })(AddProjectForm);
    return (
      <div>
        <AddProjectForm />
      </div>
    );
  }
}

export default AddProject;
