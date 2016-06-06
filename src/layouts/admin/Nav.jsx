import React from 'react'
import { Link } from 'react-router'

export default class Nav extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let root = this.props.route.global.documentRoot;

    return (
      <nav>
        <ul>
          <li><Link to={root + '/vehicles'}
            >中古車輌</Link></li>
          <li><Link to={root + '/parts'}
            >中古部品</Link></li>
          <li><Link to={root + '/containers'}
            >中古コンテナ</Link></li>
          <li><Link to={root + '/mountings'}
            >架装物</Link></li>
        </ul>
      </nav>
    );
  }
}
