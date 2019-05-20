import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { List, Empty, Modal, Button, Avatar, Input, Icon, Tag } from 'antd';
import { Link } from 'react-router-dom';

import AddAnswerDrawer from './Answers/AddAnswerDrawer';
import EditAnswerDrawer from './Answers/EditAnswerDrawer';
import { setTitle } from '../../../helpers';
import config from '../../../config';

class AnswerItem extends React.Component {
  confirmDelete = (answerId) => {
    Modal.confirm({
      title: 'Удалить ответ',
      content: 'Вы действительно хотите удалить данный ответ? Данные будет безвозвратно утерены.',
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk: () => {
        axios.delete(config.serverUrl + '/app-api/projects/' + this.props.projectId + '/answers/' + answerId + '/');
        this.props.list.deleteOne(answerId);
      }
    });
  }
  render() {
    return (
      <List.Item actions={[
          <Button onClick={() => this.props.openEditModal(this.props.answer.id)}>Открыть</Button>,
          <Button onClick={() => this.confirmDelete(this.props.answer.id)} type="dashed" icon="delete" shape="circle" size="small"></Button>
        ]}>
        <List.Item.Meta
          title={<b>{this.props.answer.title}</b>}
          description={
            <div>
              {this.props.answer.content}
              {
                this.props.answer.tags ? (
                  <div className="app-list-item-tags">
                    {
                      this.props.answer.tags.map((tag) => <Tag>{tag}</Tag>)
                    }
                  </div>
                ) : null
              }
            </div>
          } />
      </List.Item>
    )
  }
}

class Answers extends React.Component {
  state = {
    addModalVisible: false,
    editModalVisible: false,
    answerTotalCount: 0,
    answers: null,
    search: '',
    page: 1
  }
  list = {
    addOne: (answer) => {
      const answers = this.state.answers;
      const answerTotalCount = this.state.answerTotalCount+1;
      answers.unshift(answer);
      this.setState({ answers, answerTotalCount });
    },
    updateOne: (id, answer) => {
      const answers = this.state.answers;
      const answerIndex = answers.findIndex((c) => {
        return c.id == id;
      });
      if (answerIndex < 0) return;
      answers[answerIndex] = answer;
      this.setState({ answers });
    },
    deleteOne: (id) => {
      const answers = this.state.answers;
      const answerTotalCount = this.state.answerTotalCount-1;
      const answerIndex = answers.findIndex((c) => {
          return c.id == id;
      });
      if (answerIndex < 0) return;
      answers.splice(answerIndex, 1);
      this.setState({ answers, answerTotalCount });
    }
  }
  // Открыть: добавление
  openAddModal = () => {
    this.setState({ addModalVisible: true });
  }
  // Закрыть: добавление
  closeAddModal = () => {
    this.setState({ addModalVisible: false });
  }
  // Открыть: изменение
  openEditModal = (answerId) => {
    this.setState({ editModalVisible: true, answerId: answerId });
  }
  // Закрыть: изменение
  closeEditModal = () => {
    this.setState({ editModalVisible: false });
  }
  // Загрузка
  load = () => {
    const { search, page } = this.state;
    const offset = Math.abs(page-1) * 50;
    axios.get(
      config.serverUrl + '/app-api/projects/' + this.props.project.id + '/answers/'
        + '?offset=' + offset
        + '&search=' + search
      )
      .then((res) => {
        const answers = res.data.answers;
        const answerTotalCount = res.data.answerTotalCount;
        this.setState({ answers, answerTotalCount });
      })
      .catch((err) => {
        Modal.error({ title: 'Ошибка при отправке запроса', content: err.message });
      });
  }
  // Установить поиск
  setSearch = (event) => {
    this.setState({ search: event.target.value.trim() }, () => this.load());
  }
  // Установить страницу
  setPage = (page) => {
    this.setState({ page }, () => this.load());
  }
  componentDidMount() {
    setTitle('База знаний');
    this.load();
  }
  render() {
    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">
            База знаний {this.state.answerTotalCount > 0 ? <div className="app-main-view-header-title-counter">({this.state.answerTotalCount})</div> : null}
          </div>
          <div className="app-main-view-header-controls">
            <div className="app-main-view-header-control input">
              <Input allowClear onChange={this.setSearch} placeholder="Поиск..." style={{ width: 200 }} prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} />
            </div>
            <div className="app-main-view-header-control button">
              <Button onClick={this.openAddModal} type="primary" icon="plus">Добавить ответ</Button>
            </div>
          </div>
        </div>
        <div className="app-main-view-content">
          <List
            bordered
            size="large"
            locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="База знаний проекта пока пуста." /> }}
            loading={!this.state.answers ? true : false}
            pagination={this.state.answers && (this.state.answerTotalCount > this.state.answers.length) ? {
              size: 'large',
              pageSize: 50,
              total: this.state.answerTotalCount,
              onChange: (page, pageSize) => {
                this.setPage(page);
              }
            } : false}
            dataSource={this.state.answers ? this.state.answers : []}
            renderItem={item => <AnswerItem projectId={this.props.project.id} answer={item} list={this.list} openEditModal={this.openEditModal} />} />
        </div>
        <AddAnswerDrawer
          projectId={this.props.project.id}
          visible={this.state.addModalVisible}
          list={this.list}
          close={this.closeAddModal} />
        <EditAnswerDrawer
          list={this.list}
          answerId={this.state.answerId}
          projectId={this.props.project.id}
          visible={this.state.editModalVisible}
          close={this.closeEditModal} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    project: state.project
  }
}

export default connect(mapStateToProps)(Answers);
