import React from 'react'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'

export default class ContainersAdd extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (

      <article id="ContainersAdd">
        <section>
          <DocumentTitle title="Admin Home" />
          <h1>中古コンテナ</h1>

          <form
            action=""
            enctype="multipart/form-data"
            >

            <dl>
              <dt>品番</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>アイコン</dt>
              <dd>
                <label>新着</label>
                <input
                  type="checkbox"
                  />

                <label>商談中</label>
                <input
                  type="checkbox"
                  />

                <label>売約済</label>
                <input
                  type="checkbox"
                  />

                <label>おすすめ</label>
                <input
                  type="checkbox"
                  />
              </dd>
            </dl>

            <dl>
              <dt>アイコン注釈</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>管理番号</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>タイトル</dt>
              <dd>
                <input
                  className="w-l"
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>本体価格</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>サイズ</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>形状</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>床</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>ボディ内寸</dt>
              <dd>
                <input
                  className="w-l"
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>備考</dt>
              <dd>
                <textarea
                  className="w-l"
                  name="comment" ref="comment"
                  ></textarea>
              </dd>
            </dl>

            <button type="submit" className="w-xs"
              value="Post"
              >追加</button>

            </form>
        </section>
      </article>
    );
  }
}
