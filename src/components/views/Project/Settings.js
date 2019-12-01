import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Modal, Spin } from 'antd'

import EditProjectForm from './Settings/EditProjectForm'
import DeleteProjectModal from './Settings/DeleteProjectModal'
import { setTitle } from '../../../helpers'

const source = axios.CancelToken.source()

class Settings extends React.Component {
  state = {
    project: null,
    deleteModalVisible: false
  }

  // Открыть: удаление
  openDeleteModal = () => {
    this.setState({ deleteModalVisible: true })
  }

  // Закрыть: удаление
  closeDeleteModal = () => {
    this.setState({ deleteModalVisible: false })
  }

  componentDidMount () {
    setTitle('Настройка проекта')

    if (source.token) source.token = null
    else source.cancel()

    // mockup data
    const project = {
      name: 'Проект №1',
      websiteUrl: 'https://example.com/'
    }
    this.setState({ project })

    // axios
    //   .get(config.serverUrl + '/app-api/projects/' + this.props.project.id + '/', {
    //     cancelToken: source.token
    //   })
    //   .then((res) => {
    //     this.setState({ project: res.data.project });
    //   })
    //   .catch((err) => {
    //     Modal.error({ title: 'Ошибка при отправке запроса', content: err.message });
    //   });
  }

  componentWillUnmount () {
    source.cancel()
  }

  render () {
    return (
      <div>
        <div className='app-main-view-header'>
          <div className='app-main-view-header-title'>Настройка проекта</div>
        </div>
        <div className='app-main-view-content'>
          <div className='app-project-settings'>
            <Spin spinning={!this.state.project}>
              <EditProjectForm
                openDeleteModal={this.openDeleteModal}
                project={this.state.project}
              />
            </Spin>
          </div>
        </div>
        <DeleteProjectModal
          history={this.props.history}
          visible={this.state.deleteModalVisible}
          close={this.closeDeleteModal}
          project={this.state.project}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    project: state.project
  }
}

export default connect(mapStateToProps)(Settings)
