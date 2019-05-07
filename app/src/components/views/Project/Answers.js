import React from 'react';
import axios from 'axios';
import { List, Row, Col, Empty, Modal, Button, Form, Input, Radio, Icon } from 'antd';
import { Link } from 'react-router-dom';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

function AnswerItem(props) {
  return (
    <List.Item
      actions={[
        <Link to={'/projects/'+props.project._id+'/leads/'}>Страница</Link>,
        <Link to={'/projects/'+props.project._id+'/answers/'}>Изменить</Link>,
        <Link to={'/projects/'+props.project._id+'/integrations/'}>Удалить</Link>
      ]} >
      <List.Item.Meta
          title={<b>Ivaadwdadnov</b>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team Ant Design, a design language for background applications, is refined by Ant UED Team Ant Design, a design language for background applications, is refined by Ant UED Team Ant Design, a design language for background applications, is refined by Ant UED Team." />
    </List.Item>
  )
}

const AddLeadForm = Form.create({ name: 'add_project' })(
  class extends React.Component {
    render() {
      const {
        visible, onCancel, onCreate, form,
      } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          width={400}
          visible={visible}
          title={(<b>Создать новый проект</b>)}
          okText="Создать проект"
          cancelText="Отмена"
          onOk={onCreate}
          onCancel={onCancel} >
          <Form hideRequiredMark="false" className="app-form" layout="vertical">
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
          </Form>
        </Modal>
      );
    }
  }
)

class Answers extends React.Component {

  state = {
    visible: false,
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
          renderItem={item => <AnswerItem project={item} />} />
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

export default Answers;
