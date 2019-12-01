import React from 'react'
import axios from 'axios'
import { Divider, Drawer, Form, Input, Select, Modal, Button, Spin, Badge, List, Tabs, Row, Col, DatePicker, Icon } from 'antd'
import validator from 'validator'

const EditLeadFieldsForm = Form.create({
  name: 'editLeadFields',
  mapPropsToFields: (props) => {
    const { lead } = props
    return (lead && lead.fields) ? {
      'fields.firstName': Form.createFormField({ value: lead.fields.firstName }),
      'fields.lastName': Form.createFormField({ value: lead.fields.lastName }),
      'fields.patronymic': Form.createFormField({ value: lead.fields.patronymic }),
      'fields.birthDate': Form.createFormField({ value: lead.fields.birthDate }),
      'fields.residence': Form.createFormField({ value: lead.fields.residence }),
      'fields.email': Form.createFormField({ value: lead.fields.email }),
      'fields.phone': Form.createFormField({ value: lead.fields.phone })
    } : {}
  }
})(
  class extends React.Component {
    state = {
      loading: false
    }

    showLoading () {
      this.setState({ loading: true })
    }

    hideLoading () {
      setTimeout(() => {
        this.setState({ loading: false })
      }, 500)
    }

    async send (data) {
      this.showLoading()

      // fake request
      const lead = {
        id: 1,
        fullName: 'Иванов Иван',
        contacts: [
          'ivanov@gmail.com',
          '+7 (123) 1234-56-78'
        ],
        tags: [
          'Тег #1',
          'Тег #2',
          'Тег #3'
        ],
        source: {
          typeStr: 'Форма'
        }
      }
      this.props.list.updateOne(lead.id, lead)
      this.props.close()
      this.props.form.resetFields()
      this.hideLoading()

      // axios.patch(
      //   config.serverUrl + '/app-api/projects/' + this.props.projectId + '/leads/' + this.props.lead.id + '/', {
      //     lead: data
      //   })
      //   .then((res) => {
      //     if (res.data.lead) {
      //       this.props.list.updateOne(res.data.lead.id, res.data.lead);
      //       this.props.close();
      //       setTimeout(() => {
      //         this.props.form.resetFields();
      //       }, 1000);
      //     };
      //   })
      //   .catch((err) => {
      //     Modal.error({ title: 'Ошибка при отправке запроса', content: err.message });
      //   })
      //   .finally(() => this.hideLoading());
    }

    handleSubmit = (e) => {
      e.preventDefault()
      this.props.form.validateFields((err, data) => {
        if (!err) this.send(data)
      })
    }

    render () {
      const { form, lead } = this.props
      return (
        <Form hideRequiredMark='false' onSubmit={this.handleSubmit} className='app-form' layout='vertical'>
          <div className='app-form-fields'>
            <Row gutter={20} className='app-form-row'>
              <Col span={8} className='app-form-col'>
                <Form.Item label='Фамилия' className='app-form-field'>
                  {form.getFieldDecorator('fields.lastName', {
                    rules: [
                      { max: 50, message: 'Больше 50 символов.' }
                    ]
                  })(
                    <Input autofocus='true' />
                  )}
                </Form.Item>
              </Col>
              <Col span={8} className='app-form--col'>
                <Form.Item label='Имя' className='app-form-field'>
                  {form.getFieldDecorator('fields.firstName', {
                    rules: [
                      { max: 50, message: 'Больше 50 символов.' }
                    ]
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
              <Col span={8} className='app-form-col'>
                <Form.Item label='Отчество' className='app-form-field'>
                  {form.getFieldDecorator('fields.patronymic', {
                    rules: [
                      { max: 50, message: 'Больше 50 символов.' }
                    ]
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20} className='app-form-row'>
              <Col span={8} className='app-form-col'>
                <Form.Item label='Дата рождения' className='app-form-field'>
                  {form.getFieldDecorator('fields.birthTimestamp')(
                    <DatePicker placeholder='Выберите дату' />
                  )}
                </Form.Item>
              </Col>
              <Col span={16} className='app-form-col'>
                <Form.Item label='Адрес проживания' className='app-form-field'>
                  {form.getFieldDecorator('fields.residence', {
                    rules: [
                      { max: 300, message: 'Больше 300 символов.' }
                    ]
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Divider className='app-form-fields-divider' />
            <Row gutter={20} className='app-form-row'>
              <Col span={12} className='app-form-col'>
                <Form.Item label='Телефон' className='app-form-field'>
                  {form.getFieldDecorator('fields.email', {
                    rules: [
                      { max: 30, message: 'Телефон не может быть больше 30 символов.' }
                    ]
                  })(
                    <Input prefix={<Icon type='phone' style={{ color: 'rgba(0,0,0,.25)' }} />} />
                  )}
                </Form.Item>
              </Col>
              <Col span={12} className='app-form-col'>
                <Form.Item label='Email' className='app-form-field'>
                  {form.getFieldDecorator('fields.phone', {
                    rules: [
                      { type: 'email', message: 'Укажите email.' },
                      { max: 250, message: 'Email не может быть больше 250 символов.' }
                    ]
                  })(
                    <Input prefix={<Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />} />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label='Комментарий' className='app-form-field full'>
              {form.getFieldDecorator('comment', {
                rules: [
                  { max: 500, message: 'Комментарий не может быть больше 500 символов.' }
                ]
              })(
                <Input.TextArea autosize={{ minRows: 2 }} />
              )}
            </Form.Item>
          </div>
          <div className='app-form-btns'>
            <Button loading={this.state.loading} className='app-form-btn' type='primary' htmlType='submit'>Сохранить</Button>
            {form.getFieldDecorator('status', {
              initialValue: lead ? (lead.status ? lead.status.toString() : '0') : null
            })(
              <Select className='app-form-btn' defaultValue='0' style={{ width: 160 }}>
                <Select.Option value='0'>Без статуса</Select.Option>
                <Select.Option value='1'><Badge status='default' dot /> Не обработан</Select.Option>
                <Select.Option value='2'><Badge status='processing' dot /> В обработке</Select.Option>
                <Select.Option value='3'><Badge status='success' dot /> Обработан</Select.Option>
                <Select.Option value='4'><Badge status='error' dot /> Закрыт</Select.Option>
              </Select>
            )}
          </div>
        </Form>
      )
    }
  }
)

const EditLeadProfilesForm = Form.create({
  name: 'editLeadProfiles',
  mapPropsToFields: (props) => {
    const { lead } = props
    return (lead && lead.profiles) ? {
      'profiles.vk.value': Form.createFormField({ value: lead.profiles.vk ? lead.profiles.vk.value : null }),
      'profiles.facebook.value': Form.createFormField({ value: lead.profiles.facebook ? lead.profiles.facebook.value : null }),
      'profiles.telegram.value': Form.createFormField({ value: lead.profiles.telegram ? lead.profiles.telegram.value : null }),
      'profiles.skype.value': Form.createFormField({ value: lead.profiles.skype ? lead.profiles.skype.value : null }),
      'profiles.viber.value': Form.createFormField({ value: lead.profiles.viber ? lead.profiles.viber.value : null }),
      'profiles.instagram.value': Form.createFormField({ value: lead.profiles.instagram ? lead.profiles.instagram.value : null })
    } : {}
  }
})(
  class extends React.Component {
    state = {
      loading: false
    }

    showLoading () {
      this.setState({ loading: true })
    }

    hideLoading () {
      setTimeout(() => {
        this.setState({ loading: false })
      }, 500)
    }

    async send (data) {
      this.showLoading()

      // fake request
      const lead = {
        id: 1,
        fullName: 'Иванов Иван',
        contacts: [
          'ivanov@gmail.com',
          '+7 (123) 1234-56-78'
        ],
        tags: [
          'Тег #1',
          'Тег #2',
          'Тег #3'
        ],
        source: {
          typeStr: 'Форма'
        }
      }
      this.props.list.updateOne(lead.id, lead)
      this.props.close()
      this.props.form.resetFields()
      this.hideLoading()

      // axios.patch(
      //   config.serverUrl + '/app-api/projects/' + this.props.projectId + '/leads/' + this.props.lead.id + '/', {
      //     lead: data
      //   })
      //   .then((res) => {
      //     if (res.data.lead) {
      //       this.props.list.updateOne(res.data.lead.id, res.data.lead);
      //       this.props.close();
      //       setTimeout(() => {
      //         this.props.form.resetFields();
      //       }, 1000);
      //     };
      //   })
      //   .catch((err) => {
      //     Modal.error({ title: 'Ошибка при отправке запроса', content: err.message });
      //   })
      //   .finally(() => this.hideLoading());
    }

    handleSubmit = (e) => {
      e.preventDefault()
      this.props.form.validateFields((err, data) => {
        if (!err) this.send(data)
      })
    }

    checkURL = (rule, value, callback) => {
      if (value && !validator.isURL(value)) callback('Укажите ссылку.')
      else callback()
    }

    render () {
      const { form, lead } = this.props
      return (
        <Form hideRequiredMark='false' onSubmit={this.handleSubmit} className='app-form' layout='vertical'>
          <div className='app-form-fields'>
            <Row gutter={20} className='app-form-row'>
              <Col span={12} className='app-form-col'>
                <Form.Item label='Вконтакте' className='app-form-field'>
                  {form.getFieldDecorator('profiles.vk.value', {
                    rules: [
                      { max: 100, message: 'Ссылка не может быть больше 100 символов.' },
                      { validator: this.checkURL }
                    ]
                  })(
                    <Input placeholder='https://vk.com/...' autofocus='true' />
                  )}
                </Form.Item>
              </Col>
              <Col span={12} className='app-form-col'>
                <Form.Item label='Facebook' className='app-form-field'>
                  {form.getFieldDecorator('profiles.facebook.value', {
                    rules: [
                      { max: 100, message: 'Ссылка не может быть больше 100 символов.' },
                      { validator: this.checkURL }
                    ]
                  })(
                    <Input placeholder='https://www.facebook.com/...' />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20} className='app-form-row'>
              <Col span={12} className='app-form-col'>
                <Form.Item label='Telegram' className='app-form-field'>
                  {form.getFieldDecorator('profiles.telegram.value', {
                    rules: [
                      { max: 100, message: 'Значение не может быть больше 100 символов.' }
                    ]
                  })(
                    <Input placeholder='@...' />
                  )}
                </Form.Item>
              </Col>
              <Col span={12} className='app-form-col'>
                <Form.Item label='Skype' className='app-form-field'>
                  {form.getFieldDecorator('profiles.skype.value', {
                    rules: [
                      { max: 100, message: 'Значение не может быть больше 100 символов.' }
                    ]
                  })(
                    <Input placeholder='live:...' />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20} className='app-form-row'>
              <Col span={12} className='app-form-col'>
                <Form.Item label='Viber' className='app-form-field'>
                  {form.getFieldDecorator('profiles.viber.value', {
                    rules: [
                      { max: 100, message: 'Значение не может быть больше 100 символов.' }
                    ]
                  })(
                    <Input placeholder='+7 ...' autofocus='true' />
                  )}
                </Form.Item>
              </Col>
              <Col span={12} className='app-form-col'>
                <Form.Item label='Instagram' className='app-form-field'>
                  {form.getFieldDecorator('profiles.instagram.value', {
                    rules: [
                      { max: 100, message: 'Значение не может быть больше 100 символов.' }
                    ]
                  })(
                    <Input placeholder='@...' />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div className='app-form-btns'>
            <Button loading={this.state.loading} className='app-form-btn' type='primary' htmlType='submit'>Сохранить</Button>
          </div>
        </Form>
      )
    }
  }
)

class EditLeadDrawer extends React.Component {
  state = {
    lead: null
  }

  componentDidMount () {
    const { form, leadId } = this.props
    if (leadId) {
      // mockup data
      const lead = {
        id: 1,
        fields: []
      }
      this.setState({ lead })

      // axios.get(config.serverUrl + '/app-api/projects/' + this.props.projectId + '/leads/' + leadId + '/')
      //   .then((res) => {
      //     if (res.data.error) {
      //       Modal.error({
      //         title: 'Ошибка',
      //         content: res.data.error.message
      //       });
      //     } else if (res.data.lead) {
      //       this.setState({ lead: res.data.lead });
      //     };
      //   })
      //   .catch((err) => {
      //     Modal.error({ title: 'Ошибка при отправке запроса', content: err.message });
      //   });
    };
  }

  render () {
    const form = this.props.form
    const lead = this.state.lead
    const infoItems = [
      ['Добавлено', lead ? lead.createdAtStr : '...'],
      ['Обновлено', lead ? lead.updatedAtStr : '...'],
      ['Источник', (lead && lead.source) ? lead.source.typeStr : '...']
    ]
    return (
      <div className='app-editLead'>
        <Drawer
          width='600'
          placement='right'
          onClose={this.props.close}
          visible={this.props.visible}
          title={(<b>Заявка {lead ? '#' + lead.id : ''}</b>)}
        >
          <Spin spinning={!lead}>
            <Tabs tabBarStyle={{ marginLeft: '0' }} defaultActiveKey='1' className='app-editLead-tabs'>
              <Tabs.TabPane tab='Основное' key='1' className='app-editLead-tab'>
                <EditLeadFieldsForm {...this.props} {...this.state} />
              </Tabs.TabPane>
              <Tabs.TabPane tab='Профили' key='2' className='app-editLead-tab'>
                <EditLeadProfilesForm {...this.props} {...this.state} />
              </Tabs.TabPane>
              <Tabs.TabPane tab='Информация' key='3' className='app-editLead-tab'>
                <List
                  size='small'
                  className='app-editLead-list'
                  dataSource={infoItems}
                  renderItem={item => <List.Item><b>{item[0]}:</b> {item[1]}</List.Item>}
                />
              </Tabs.TabPane>
            </Tabs>
          </Spin>
        </Drawer>
      </div>
    )
  }
}

export default EditLeadDrawer
