import React from 'react'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'

import ListStore from '../../../stores/ListStore'
import ListActions from '../../../actions/ListActions'

export default class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    ListActions.create(
      'containers',
      this.updateState.bind(this)
    ); 
  }

  render() {
    let events = Object.keys(this.state).map((i) => {
      return <Item key={i} data={this.state[i]} />
    });

    return (
      <article id="Index">
        <section>
          <DocumentTitle title="Admin Home" />
          <h1>中古コンテナ</h1>

          <table className="sheet">
            <tbody>
              <tr>
                <th className="w-xs">管理番号</th>
                <th>名前</th>
                <th className="w-s">更新日時</th>
              </tr>

              {events}
            </tbody>
          </table>
        </section>
      </article>
    );
  }

  updateState() {
    let res = ListStore.read();
    this.setState(res);
  }
}

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.updateState(this.props);
  }

  componentWillReceiveProps(props) {
    this.updateState(props);
  }

  render() {
    return(
      <tr>
        <td>{this.state.ref_id}</td>
        <td>
          <a href={'containers/edit/' + this.state.ref_id}>
            {this.state.name}
          </a>
        </td>
        <td>{this.state.modified}</td>
      </tr>
    );
  }

  updateState(props) {
    if (props.data != null) {
      this.setState(props.data);
    }
  }
}
