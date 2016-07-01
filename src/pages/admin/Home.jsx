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

          <table className="sheet">
            <tbody>
              <tr>
                <th>管理番号</th>
                <th>名前</th>
                <th>更新日時</th>
                <th className="text-center">詳細</th>
              </tr>

              <tr>
                <td>271130H014</td>
                <td>エンジン</td>
                <td>2016/06/29 14:23:00</td>
                <td className="text-center"><a href="/admin/parts">詳細</a></td>
              </tr>

              <tr>
                <td>280330B</td>
                <td>平成4年式　中型　日野　セルフローダー　ハイジャッキ</td>
                <td>2016/06/28 12:23:00</td>
                <td className="text-center"><a href="/admin/vehicles">詳細</a></td>
              </tr>

            </tbody>
          </table>
        </section>
      </article>
    );
  }
}
