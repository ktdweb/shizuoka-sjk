import React from 'react'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'

export default class VehiclesAdd extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (

      <article id="VehiclesAdd">
        <section>
          <DocumentTitle title="Admin Home" />
          <h1>中古車輌</h1>

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
              <dt>初年度登録/年式</dt>
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
              <dt>車体番号</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>車検</dt>
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
              <dt>車輌形状</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>原動機</dt>
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
              <dt>ミッション(速)</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>積載量</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>リミッター</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>エアコン</dt>
              <dd>
                <label>ある</label>
                <input type="radio"
                  value="1"
                  />
                <label>なし</label>
                <input type="radio"
                  value="2"
                  />
              </dd>
            </dl>

            <dl>
              <dt>パワステ</dt>
              <dd>
                <label>ある</label>
                <input type="radio"
                  value="1"
                  />
                <label>なし</label>
                <input type="radio"
                  value="2"
                  />
              </dd>
            </dl>

            <dl>
              <dt>ボディメーカー</dt>
              <dd>
                <input
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>ボデー内寸</dt>
              <dd>
                <input
                  className="w-l"
                  type="text"
                  />
              </dd>
            </dl>

            <dl>
              <dt>リサイクル料金</dt>
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

            <div id="dandd">
              ここに画像をドラッグアンドドロップしてください
            </div>

            <button type="submit" className="w-xs"
              value="Post"
              >追加</button>

            </form>

        </section>
      </article>
    );
  }
}
