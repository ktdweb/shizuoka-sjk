import React from 'react'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'

import VehiclesStore from '../../../stores/VehiclesStore'
import VehiclesActions from '../../../actions/VehiclesActions'

import ReferencesStore from '../../../stores/ReferencesStore'
import ReferencesActions from '../../../actions/ReferencesActions'

let refs = {
  vehicles_categories: {},
  makers: {},
  sizes: {}
};

export default class Edit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id:              '',
      product_id:      '',
      new_flag:        '',
      deal_flag:       '',
      soldout_flag:    '',
      recommend_flag:  '',
      icon_date:       '',
      ref_id:          '',
      category_id:     '',
      name:            '',
      price:           '',
      maker_id:        '',
      product_name:    '',
      size_id:         '',
      mfg_date:        '',
      model:           '',
      mfg_no:          '',
      mot_date:        '',
      mileage:         '',
      form:            '',
      engine:          '',
      ps:              '',
      mission:         '',
      capacity:        '',
      break:           '',
      cc:              '',
      limitter:        '',
      ac_flag:         '',
      ps_flag:         '',
      body:            '',
      dimension:       '',
      recycle:         '',
      pdf:             '',
      description:     '',
      created:         '',
      modified:        ''
    };
  }

  componentWillMount() {
    VehiclesActions.create(
      this.props.params.id,
      this.updateState.bind(this)
    ); 

    ReferencesActions.create(); 
  }

  render() {
    let vehicles_categories = Object.keys(refs.vehicles_categories).map((i) => {
      return <BelongsTo
        key={i}
        id={i}
        data={refs.vehicles_categories[i]}
        />
    });

    let makers = Object.keys(refs.makers).map((i) => {
      return <BelongsTo
        key={i}
        id={i}
        data={refs.makers[i]}
        />
    });

    let sizes = Object.keys(refs.sizes).map((i) => {
      return <BelongsTo
        key={i}
        id={i}
        data={refs.sizes[i]}
        />
    });

    return (
      <article id="Edit">
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
                  value={this.state.product_id}
                  />
              </dd>
            </dl>

            <dl>
              <dt>アイコン</dt>
              <dd>
                <label>新着</label>
                <input
                  type="checkbox"
                  name="new_flag"
                  onChange={this.onChangeCheckBox.bind(this)}
                  checked={this.state.new_flag}
                  />

                <label>商談中</label>
                <input
                  type="checkbox"
                  name="deal_flag"
                  onChange={this.onChangeCheckBox.bind(this)}
                  checked={this.state.deal_flag}
                  />

                <label>売約済</label>
                <input
                  type="checkbox"
                  name="soldout_flag"
                  onChange={this.onChangeCheckBox.bind(this)}
                  checked={this.state.soldout_flag}
                  />

                <label>おすすめ</label>
                <input
                  type="checkbox"
                  name="recommend_flag"
                  onChange={this.onChangeCheckBox.bind(this)}
                  checked={this.state.recommend_flag}
                  />
              </dd>
            </dl>

            <dl>
              <dt>アイコン注釈</dt>
              <dd>
                <input
                  type="text"
                  value={this.state.icon_date}
                  />
              </dd>
            </dl>

            <dl>
              <dt>管理番号</dt>
              <dd>
                <input
                  type="text"
                  value={this.state.ref_id}
                  />
              </dd>
            </dl>

            <dl>
              <dt>カテゴリー</dt>
              <dd>
                <select
                  name="category_id"
                  value={this.state.category_id}
                  onChange={this.onChangeSelect.bind(this)}
                  >
                  <option value="">選択してください</option>
                  {vehicles_categories}
                </select>
              </dd>
            </dl>

            <dl>
              <dt>タイトル</dt>
              <dd>
                <input
                  className="w-xl"
                  type="text"
                  value={this.state.name}
                  />
              </dd>
            </dl>

            <dl>
              <dt>本体価格</dt>
              <dd>
                <input
                  type="text"
                  value={this.state.price}
                  />
              </dd>
            </dl>

            <dl>
              <dt>メーカー</dt>
              <dd>
                <select
                  name="maker_id"
                  value={this.state.maker_id}
                  onChange={this.onChangeSelect.bind(this)}
                  >
                  <option value="">選択してください</option>
                  {makers}
                </select>
              </dd>
            </dl>
            
            <dl>
              <dt>大きさ</dt>
              <dd>
                <select
                  name="size_id"
                  value={this.state.size_id}
                  onChange={this.onChangeSelect.bind(this)}
                  >
                  <option value="">選択してください</option>
                  {sizes}
                </select>
              </dd>
            </dl>

            <dl>
              <dt>初年度登録/年式</dt>
              <dd>
                <input
                  type="text"
                  value={this.state.mfg_date}
                  />
              </dd>
            </dl>

            <dl>
              <dt>型式</dt>
              <dd>
                <input
                  type="text"
                  value={this.state.model}
                  />
              </dd>
            </dl>

            <dl>
              <dt>車体番号</dt>
              <dd>
                <input
                  type="text"
                  value={this.state.mfg_no}
                  />
              </dd>
            </dl>

            <dl>
              <dt>車検</dt>
              <dd>
                <input
                  type="text"
                  value={this.state.mot_date}
                  />
              </dd>
            </dl>

            <dl>
              <dt>走行距離</dt>
              <dd>
                <input
                  type="text"
                  value={this.state.mileage}
                  />
              </dd>
            </dl>

            <dl>
              <dt>車輌形状</dt>
              <dd>
                <input
                  type="text"
                  value={this.state.form}
                  />
              </dd>
            </dl>

            <dl>
              <dt>原動機</dt>
              <dd>
                <input
                  type="text"
                  value={this.state.engine}
                  />
              </dd>
            </dl>

            <dl>
              <dt>馬力(PS)</dt>
              <dd>
                <input
                  type="text"
                  value={this.state.ps}
                  />
              </dd>
            </dl>

            <dl>
              <dt>ミッション(速)</dt>
              <dd>
                <input
                  type="text"
                  value={this.state.mission}
                  />
              </dd>
            </dl>

            <dl>
              <dt>積載量</dt>
              <dd>
                <input
                  type="text"
                  value={this.state.capacity}
                  />
              </dd>
            </dl>

            <dl>
              <dt>リミッター</dt>
              <dd>
                <input
                  type="text"
                  value={this.state.limmitter}
                  />
              </dd>
            </dl>

            <dl>
              <dt>エアコン</dt>
              <dd>
                <input
                  type="checkbox"
                  name="ac_flag"
                  onChange={this.onChangeCheckBox.bind(this)}
                  checked={this.state.ac_flag}
                  />
              </dd>
            </dl>

            <dl>
              <dt>パワステ</dt>
              <dd>
                <input
                  type="checkbox"
                  name="ps_flag"
                  onChange={this.onChangeCheckBox.bind(this)}
                  checked={this.state.ps_flag}
                  />
              </dd>
            </dl>

            <dl>
              <dt>ボディメーカー</dt>
              <dd>
                <input
                  type="text"
                  value={this.state.body}
                  />
              </dd>
            </dl>

            <dl>
              <dt>ボデー内寸</dt>
              <dd>
                <input
                  className="w-l"
                  type="text"
                  value={this.state.dimension}
                  />
              </dd>
            </dl>

            <dl>
              <dt>リサイクル料金</dt>
              <dd>
                <input
                  type="text"
                  value={this.state.recycle}
                  />
              </dd>
            </dl>

            <dl>
              <dt>備考</dt>
              <dd>
                <textarea
                  className="w-xl"
                  name="comment" ref="comment"
                  value={this.state.description}
                  ></textarea>
              </dd>
            </dl>

            <div id="dandd">
              ここに画像をドラッグアンドドロップしてください
            </div>

            <button type="submit" className="w-xs"
              onClick={this.onSubmit.bind(this)}
              value="Post"
              >追加</button>

            </form>

        </section>
      </article>
    );
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(this.state.size_id);
  }

  onChangeCheckBox(e) {
    this.setState({ [e.target.name]: e.target.checked });
  }

  onChangeSelect(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  updateState() {
    let res = VehiclesStore.read();
    refs = ReferencesStore.read(); 
    this.setState(res);
  }
}

class BelongsTo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.updateState(this.props);
  }

  componentWillReceiveProps(props) {
    this.updateState(props);
  }

  render() {
    return(
      <option value={this.state.id}>{this.state.data}</option>
    );
  }

  updateState(props) {
    if (props.data != null) {
      this.setState(props);
    }
  }
}
