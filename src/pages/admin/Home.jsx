import React from 'react'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'

export default class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (

      <article id="Home">
        <section>
          <DocumentTitle title="Admin Home" />
          <h1>ダッシュボード</h1>

          <p>左側メニューより選んで下さい</p>
        </section>
      </article>
    );
  }
}
