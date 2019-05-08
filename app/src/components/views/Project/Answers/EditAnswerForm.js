import React from 'react';
import axios from 'axios';
import { Form, Input, Modal } from 'antd';

class EditAnswerForm extends React.Component {
  render() {
    const {
      visible, onCancel, editAnswer, form
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        width={600}
        visible={visible}
        title={(<b>Ответ #{this.props.answerId}</b>)}
        okText="Сохранить"
        cancelText="Отмена"
        onOk={editAnswer}
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

export default Form.create({ name: 'editAnswer' })(EditAnswerForm);
