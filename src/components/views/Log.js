import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Modal, Timeline } from 'antd';
import { Link } from 'react-router-dom';
import decode from 'unescape';

import { setTitle } from '../../helpers';
import config from '../../config';

class Log extends React.Component {
  state = {
    actionTotalCount: 0,
    actions: null
  }
  // Загрузка
  load = () => {
    axios.get(config.serverUrl + '/app-api/users/' + this.props.user.id + '/actions/')
      .then((res) => {
        const actions = res.data.actions;
        this.setState({ actions });
      })
      .catch((err) => {
        Modal.error({ title: 'Ошибка при отправке запроса', content: err.message });
      });
  }
  componentDidMount() {
    setTitle('Лог действий');
    this.load();
  }
  render() {
    let TimelineItems;
    if (this.state.actions) {
      TimelineItems = this.state.actions.map((action) =>
        <Timeline.Item color={action.color}>{decode(action.htmlStr)} <br /><b>{action.addTimeStr}</b></Timeline.Item>
      );
    };
    return (
      <div>
        <div className="app-main-view-header">
          <div className="app-main-view-header-title">Лог действий</div>
        </div>
        <div className="app-main-view-content">
          <Timeline
            pending={!this.state.actions ? 'Загрузка...' : null}>
            {TimelineItems}
          </Timeline>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Log);
