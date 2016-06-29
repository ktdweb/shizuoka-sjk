import React from 'react'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'

export default class Vehicles extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (

      <article id="VehiclesAdd">
        <section>
          <DocumentTitle title="Admin Home" />
          <h1>中古車輌</h1>

          <table className="sheet">
            <tbody>
              <tr>
                <th>管理番号</th>
                <th>名前</th>
                <th>更新日時</th>
                <th className="text-center">詳細</th>
              </tr>

              <tr>
                <td>280330B</td>
                <td>平成4年式　中型　日野　セルフローダー　ハイジャッキ</td>
                <td>2016/06/28 12:23:00</td>
                <td className="text-center"><a href="/admin/vehicles_add">詳細</a></td>
              </tr>

            </tbody>
          </table>

        </section>
      </article>
    );
  }
}
