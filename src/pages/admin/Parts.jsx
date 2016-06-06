import React from 'react'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'

export default class PartsAdd extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (

      <article id="PartsAdd">
        <section>
          <DocumentTitle title="Admin Home" />
          <h1>中古部品</h1>

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
              <dt>カテゴリー</dt>
              <dd>
                <select
                  name="q3_id" ref="q3_id"
                  required
                  >
                  <option value="">選択してください</option>
                </select>
              </dd>
            </dl>

            <dl>
              <dt>サブカテゴリー</dt>
              <dd>
                <select
                  name="q3_id" ref="q3_id"
                  required
                  >
                  <option value="">選択してください</option>
                </select>
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
              <dt>部品名</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>部品価格</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>年式</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>メーカー</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>大きさ</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>型式</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>車台番号</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>エンジン型式</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>エンジン番号</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>ミッション型式</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>ミッション番号</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>馬力(PS)</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>走行距離</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>ターボ</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>デフ枚数</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>ミッションギヤ比</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>キャビン</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>キャビンルーフ</dt>
              <dd>
                <input
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
