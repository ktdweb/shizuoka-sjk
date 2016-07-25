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
      'parts',
      this.updateState.bind(this)
    ); 

    ListStore.subscribe(
      this.updateState.bind(this)
    ); 
  }

  componentWillUnmount() {
    ListStore.destroy(
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
          <h1>中古部品</h1>

          <table className="sheet">
            <tbody>
              <tr>
                <th className="w-xs">管理番号</th>
                <th>名前</th>
                <th className="w-s">更新日時</th>
                <th className="w-xs">-</th>
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
    this.state = {};
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
        <td>
          <a href={'parts/edit/' + this.state.ref_id}>
            {this.state.ref_id}
          </a>
        </td>
        <td>
            {this.state.name}
        </td>
        <td>{this.state.modified}</td>
        <td>
          <button
            name={this.state.ref_id}
            onClick={this.del.bind(this)}
            >
            削除
          </button>
        </td>
      </tr>
    );
  }

  del(e) {
    e.preventDefault();

    ListActions.del('parts', e.target.name);
  }

  updateState(props) {
    if (props.data != null) {
      this.setState(props.data);
    }
  }
}
