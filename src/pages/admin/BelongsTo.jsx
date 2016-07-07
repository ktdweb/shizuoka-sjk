import React from 'react'

export default class BelongsTo extends React.Component {
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
      <option value={this.state.id}>{this.state.data}</option>
    );
  }

  updateState(props) {
    if (props.data != null) {
      this.setState(props);
    }
  }
}
