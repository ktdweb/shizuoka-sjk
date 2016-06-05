import React from 'react'
import { Link } from 'react-router'

export default class NoMatch extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id="NoMatch">
        <p>No Match</p>

        {this.props.children}
      </section>
    );
  }
}
