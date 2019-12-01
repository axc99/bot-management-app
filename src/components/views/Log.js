import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Modal, Timeline } from 'antd'
import { Link } from 'react-router-dom'
import decode from 'unescape'

import { setTitle } from '../../helpers'

const source = axios.CancelToken.source()

class Log extends React.Component {
  state = {
    actionTotalCount: 0,
    actions: null
  }

  load = () => {
    if (source.token) source.token = null
    else source.cancel()

    // mockup data
    const actions = [
      {
        color: 'red',
        htmlStr: 'Удалил проект #123456789',
        createdAtStr: '01.12.2019 16:24'
      },
      {
        color: 'blue',
        htmlStr: 'Обновил проект #123456789',
        createdAtStr: '01.12.2019 15:00'
      },
      {
        color: 'green',
        htmlStr: 'Создал проект #123456789',
        createdAtStr: '01.12.2019 14:00'
      },
      {
        color: 'green',
        htmlStr: 'Создал аккаунт',
        createdAtStr: '01.12.2019 13:00'
      }
    ]
    const actionTotalCount = 2
    this.setState({ actions })

    // axios
    //   .get(config.serverUrl + '/app-api/users/' + this.props.user.id + '/actions/', {
    //     cancelToken: source.token
    //   })
    //   .then((res) => {
    //     const actions = res.data.actions;
    //     this.setState({ actions });
    //   })
    //   .catch((err) => {
    //     if (axios.isCancel(err)) return;
    //     Modal.error({ title: 'Ошибка при отправке запроса', content: err.message });
    //   });
  }

  componentDidMount () {
    setTitle('Лог действий')
    this.load()
  }

  componentWillUnmount () {
    source.cancel()
  }

  render () {
    let TimelineItems
    if (this.state.actions) {
      TimelineItems = this.state.actions.map((action) =>
        <Timeline.Item color={action.color}>{decode(action.htmlStr)} <br /><b>{action.createdAtStr}</b></Timeline.Item>
      )
    };
    return (
      <div>
        <div className='app-main-view-header'>
          <div className='app-main-view-header-title'>Лог действий</div>
        </div>
        <div className='app-main-view-content'>
          <div className='app-log'>
            <Timeline
              pending={!this.state.actions ? 'Загрузка...' : null}
            >
              {TimelineItems}
            </Timeline>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Log)
