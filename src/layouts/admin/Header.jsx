import React from 'react'
import { Link } from 'react-router'

export default class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let root = this.props.route.global.documentRoot;

    return (
      <header id="Header">
        <p>shizuoka-sjk.com</p>
      </header>
    );
  }
}
