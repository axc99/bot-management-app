import React from 'react';
import axios from 'axios';
import { List, Empty, Modal, Button, Avatar } from 'antd';
import { Link } from 'react-router-dom';

import AddAnswerForm from './Answers/AddAnswerForm';
import EditAnswerForm from './Answers/EditAnswerForm';

import { setTitle } from '../../../helpers';

class AnswerItem extends React.Component {
  confirmDelete = (answerId) => {
    Modal.confirm({
      title: 'Удалить ответ',
      content: 'Вы действительно хотите удалить данный ответ? Данные будет безвозвратно утерены.',
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        alert('delete answer #'+answerId);
      }
    });
  }
  render() {
    return (
      <List.Item actions={[
          <Button onClick={() => this.props.openEditAnswer(this.props.answer.id)} size="small">Открыть</Button>,
          <Button onClick={() => this.confirmDelete(this.props.answer.id)} type="dashed" icon="delete" shape="circle" size="small"></Button>
        ]}>
        <List.Item.Meta
            avatar={<Avatar size="medium" icon="user" />}
            title="Заголовок"
            description="Описание..." />
      </List.Item>
    )
  }
}

class Answers extends React.Component {
  state = {
    addAnswerVisible: false,
    editAnswerVisible: false,
    answerId: null,
    answers: null
  }
  componentDidMount() {
    setTitle('Лиды');
    axios.get('http://localhost./app-api/projects/123/answers/', {}, {
      headers: { 'Content-Type': 'application/json' }
    }).then(
      res => {
        const answers = res.data.answers;
        this.setState({ answers });
      },
      err => {
        Modal.error({
          title: (<b>Ошибка при загрузке</b>)
        });
      }
    );
  }
  // Открыть: добавление ответа
  openAddAnswer = () => {
    this.setState({ addAnswerVisible: true });
  }
  // Обработать закрытие: добавление ответа
  handleCancelAddAnswer = () => {
    this.setState({ addAnswerVisible: false });
  }
  // Открыть: изменение ответа
  openEditAnswer = (answerId) => {
    this.setState({ editAnswerVisible: true, answerId: answerId });
  }
  // Обработать закрытие: изменение ответа
  handleCancelEditAnswer = () => {
    this.setState({ editAnswerVisible: false });
  }
  // Добавить ответ
  addAnswer = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) return;
      // ...
    });
  }
  // Изменить ответ
  editAnswer = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) return;
      // ...
    });
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  render() {
    let content;

    if (this.state.answers !== null && this.state.answers.length == 0) {
      content = (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="В проекте пока нет ответов." />
      );
    } else {
      content = (
        <List
          bordered
          hideOnSinglePage={true}
          loading={!this.state.answers ? true : false}
          size="large"
          dataSource={this.state.answers ? this.state.answers : []}
          renderItem={item => <AnswerItem answer={item} openEditAnswer={this.openEditAnswer} />} />
      );
    };

    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">База знаний</div>
          <div className="app-main-view-header-btns">
            <Button onClick={this.openAddAnswer} className="app-main-view-header-btn" type="primary" icon="plus">Добавить ответ</Button>
          </div>
        </div>
        <div className="app-main-view-content">
          {content}
        </div>
        <AddAnswerForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.addAnswerVisible}
          onCancel={this.handleCancelAddAnswer}
          addAnswer={this.addAnswer} />
        <EditAnswerForm
          answerId={this.state.answerId}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.editAnswerVisible}
          onCancel={this.handleCancelEditAnswer}
          editAnswer={this.editAnswer} />
      </div>
    );
  }
}

export default Answers;
