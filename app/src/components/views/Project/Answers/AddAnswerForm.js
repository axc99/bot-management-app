import React from 'react';
import axios from 'axios';
import { Form, Input, Modal } from 'antd';

class AddAnswerForm extends React.Component {
  render() {
    const {
      visible, onCancel, addAnswer, form
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        width={600}
        visible={visible}
        title={(<b>Добавить ответ</b>)}
        okText="Добавить"
        cancelText="Отмена"
        onOk={addAnswer}
        onCancel={onCancel} >
        <Form hideRequiredMark="false" className="app-form" layout="vertical">
          <div className="app-form-fields">
            [FIELDS]
          </div>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: 'addAnswer' })(AddAnswerForm);
