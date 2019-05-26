import React from 'react';
import axios from 'axios';
import { Form, Input, Select, Modal } from 'antd';

import config from '../../../../config';

class DeleteProjectModal extends React.Component {
  state = {
    sending: false
  }
  showSending() {
    this.setState({ sending: true });
  }
  hideSending() {
    setTimeout(() => {
      this.setState({ sending: false });
    }, 500);
  }
  async send(data) {
    const { project } = this.props;
    this.showSending();
    axios.delete(
      config.serverUrl + '/app-api/projects/' + project._id + '/')
      .then((res) => {
        this.props.close();
        this.props.history.push('/projects/');
        Modal.success({
          title: 'Проект уделен',
          content: 'Вы успешно удалили проект и все его данные.'
        });
      })
      .catch((err) => {
        Modal.error({ title: 'Ошибка при отправке запроса', content: err.message });
      })
      .finally(() => this.hideSending());
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (!err) this.send(data);
    });
  }
  render() {
    const form = this.props.form;
    return (
      <Modal
        width={400}
        visible={this.props.visible}
        title="Удалить проект"
        okText="Удалить"
        cancelText="Отмена"
        onOk={this.handleSubmit}
        confirmLoading={this.state.sending}
        onCancel={this.props.close} >
        <Form hideRequiredMark="false" className="app-form" layout="vertical">
          <div className="app-form-fields">
            <Form.Item label="Ваш пароль" className="app-form-field">
              {form.getFieldDecorator('userPassword')(
                <Input className="app-form-field-input" type="password" />
              )}
            </Form.Item>
          </div>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: 'deleteProject' })(DeleteProjectModal);
