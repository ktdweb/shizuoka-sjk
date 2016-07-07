import React from 'react'
import { Link } from 'react-router'

import VehiclesStore from '../../stores/VehiclesStore'
import VehiclesActions from '../../actions/VehiclesActions'

export default class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      page: '',
      ref_id: ''
    }
  }

  render() {
    let root = this.props.route.global.documentRoot;

    return (
      <header id="Header">
        <div id="addnew">
          <select
            name="page"
            value={this.state.page}
            onChange={this.onChange.bind(this)}
            >
            <option value="">選択してください</option>
            <option value="vehicles">中古車輛</option>
            <option value="parts">中古部品</option>
            <option value="containers">中古コンテナ</option>
            <option value="mountings">架装物</option>
          </select>

          <input
            type="text"
            name="ref_id"
            value={this.state.ref_id}
            onChange={this.onChange.bind(this)}
            />

          <button
            onClick={this.onSubmit.bind(this)}
            >
            新規追加
            </button>
        </div>
        <p>shizuoka-sjk.com</p>
      </header>
    );
  }

  onSubmit(e) {
    e.preventDefault();

    VehiclesActions.add(
      this.state.page,
      this.state.ref_id
    );

//window.location.reload();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  updateState() {
    refs = ReferencesStore.read(); 
    this.setState(VehiclesStore.read());
  }
}
