import React from 'react'
import { Link } from 'react-router'

export default class Front extends React.Component {

  constructor(props) {
    super(props);

    document.body.setAttribute('id', 'ready-Front');
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div id="Front">
        <h1>Front</h1>
        {this.props.header}
        {this.props.main}
      </div>
    );
  }
}
