import React from 'react';
import axios from 'axios';
import { Form, Input, Select, Modal } from 'antd';

class AddProjectForm extends React.Component {
  render() {
    const {
      visible, onCancel, addProject, form
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        width={400}
        visible={visible}
        title={(<b>Создать проект</b>)}
        okText="Создать проект"
        cancelText="Отмена"
        onOk={addProject}
        onCancel={onCancel} >
        <Form hideRequiredMark="false" className="app-form" layout="vertical">
          <div className="app-form-fields">
            <Form.Item label="Название проекта" className="app-form-field">
              {getFieldDecorator('name', {
                rules: [ { required: true, message: 'Заполните это поле.' } ],
              })(
                <Input autofocus="true" size="large" />
              )}
            </Form.Item>
            <Form.Item label="Ссылка на сайт" className="app-form-field">
              {getFieldDecorator('websiteUrl', {
                rules: [ { required: true, message: 'Заполните это поле.' } ],
              })(
                <Input autofocus="true" size="large" placeholder="https://..." />
              )}
            </Form.Item>
            <Form.Item label="Тематика проекта" className="app-form-field">
              {getFieldDecorator('subject', {
                rules: [ { required: true, message: 'Заполните это поле.' } ],
              })(
                <Select size="large" placeholder="Выберите из списка">
                  <Select.Option value="0">...</Select.Option>
                  <Select.Option value="1">...</Select.Option>
                  <Select.Option value="2">...</Select.Option>
                </Select>
              )}
            </Form.Item>
          </div>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: 'add_project' })(AddProjectForm);
