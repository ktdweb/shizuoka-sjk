import React from 'react'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'

import VehiclesStore from '../../../stores/VehiclesStore'
import VehiclesActions from '../../../actions/VehiclesActions'

import ReferencesStore from '../../../stores/ReferencesStore'
import ReferencesActions from '../../../actions/ReferencesActions'

import ProductImage from '../Images'
import BelongsTo from '../BelongsTo'

let page = 'parts';

let refs = {
  vehicles_categories: {},
  makers: {},
  sizes: {}
};

export default class Edit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id              : '',
      product_id      : '',
      new_flag        : '',
      deal_flag       : '',
      soldout_flag    : '',
      recommend_flag  : '',
      icon_date       : '',
      ref_id          : '',
      category_id     : '',
      sub_category_id : '',
      name            : '',
      price           : '',
      maker_id        : '',
      product_name    : '',
      size_id         : '',
      mfg_date        : '',
      model           : '',
      mfg_no          : '',
      engine          : '',
      engine_no       : '',
      mission         : '',
      mission_no      : '',
      ps              : '',
      mileage         : '',
      turbo           : '',
      diff            : '',
      gear            : '',
      cabin           : '',
      cabin_roof      : '',
      description     : '',
      created         : '',
      modified        : '',
      images          : ''
    };
  }

  componentWillMount() {
    VehiclesActions.create(page, this.props.params.id); 
    VehiclesStore.subscribe(this.updateState.bind(this)); 

    ReferencesActions.create(); 
  }

  componentWillUnmount() {
    VehiclesActions.destroy(this.updateState.bind(this)); 
  }

  render() {
    if (this.state.ref_id == '') return false;

    let parts_categories = Object.keys(
      refs.parts_categories
    ).map((i) => {
      return <BelongsTo
        key={i}
        id={i}
        data={refs.parts_categories[i]}
        />
    });

    let parts_sub_categories = Object.keys(
      refs.parts_sub_categories
    ).map((i) => {
      return <BelongsTo
        key={i}
        id={i}
        data={refs.parts_sub_categories[i]}
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

    let images = Object.keys(this.state.images).map((i) => {
      return <ProductImage
        key={i}
        num={i}
        page={page}
        ref_id={this.state.ref_id}
        data={this.state.images[i]}
        />
    });
    
    return (
      <article id="Edit">
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
                  name="product_id"
                  value={this.state.product_id}
                  onChange={this.onChange.bind(this)}
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
                  name="icon_date"
                  value={this.state.icon_date}
                  onChange={this.onChange.bind(this)}
                  />
              </dd>
            </dl>

            <dl>
              <dt>管理番号</dt>
              <dd>
                <input
                  type="text"
                  name="ref_id"
                  value={this.state.ref_id}
                  onChange={this.onChange.bind(this)}
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
                  {parts_categories}
                </select>
              </dd>
            </dl>

            <dl>
              <dt>カテゴリー</dt>
              <dd>
                <select
                  name="sub_category_id"
                  value={this.state.sub_category_id}
                  onChange={this.onChangeSelect.bind(this)}
                  >
                  <option value="">選択してください</option>
                  {parts_sub_categories}
                </select>
              </dd>
            </dl>

            <dl>
              <dt>タイトル</dt>
              <dd>
                <input
                  className="w-xl"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange.bind(this)}
                  />
              </dd>
            </dl>

            <dl>
              <dt>本体価格</dt>
              <dd>
                <input
                  type="text"
                  name="price"
                  value={this.state.price}
                  onChange={this.onChange.bind(this)}
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
              <dt>部品名</dt>
              <dd>
                <input
                  type="text"
                  name="product_name"
                  value={this.state.product_name}
                  onChange={this.onChange.bind(this)}
                  />
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
                  name="mfg_date"
                  value={this.state.mfg_date}
                  onChange={this.onChange.bind(this)}
                  />
              </dd>
            </dl>

            <dl>
              <dt>型式</dt>
              <dd>
                <input
                  type="text"
                  name="model"
                  value={this.state.model}
                  onChange={this.onChange.bind(this)}
                  />
              </dd>
            </dl>

            <dl>
              <dt>車体番号</dt>
              <dd>
                <input
                  type="text"
                  name="mfg_no"
                  value={this.state.mfg_no}
                  onChange={this.onChange.bind(this)}
                  />
              </dd>
            </dl>

            <dl>
              <dt>エンジン形式</dt>
              <dd>
                <input
                  type="text"
                  name="engine"
                  value={this.state.engine}
                  onChange={this.onChange.bind(this)}
                  />
              </dd>
            </dl>

            <dl>
              <dt>エンジン番号</dt>
              <dd>
                <input
                  type="text"
                  name="engine_no"
                  value={this.state.engine_no}
                  onChange={this.onChange.bind(this)}
                  />
              </dd>
            </dl>

            <dl>
              <dt>ミッション形式</dt>
              <dd>
                <input
                  type="text"
                  name="mission"
                  value={this.state.mission}
                  onChange={this.onChange.bind(this)}
                  />
              </dd>
            </dl>

            <dl>
              <dt>ミッション番号</dt>
              <dd>
                <input
                  type="text"
                  name="mission_no"
                  value={this.state.mission_no}
                  onChange={this.onChange.bind(this)}
                  />
              </dd>
            </dl>

            <dl>
              <dt>馬力(PS)</dt>
              <dd>
                <input
                  type="text"
                  name="ps"
                  value={this.state.ps}
                  onChange={this.onChange.bind(this)}
                  />
              </dd>
            </dl>

            <dl>
              <dt>走行距離</dt>
              <dd>
                <input
                  type="text"
                  name="mileage"
                  value={this.state.mileage}
                  onChange={this.onChange.bind(this)}
                  />
              </dd>
            </dl>

            <dl>
              <dt>ターボ</dt>
              <dd>
                <input
                  type="text"
                  name="turbo"
                  value={this.state.turbo}
                  onChange={this.onChange.bind(this)}
                  />
              </dd>
            </dl>

            <dl>
              <dt>デフ枚数</dt>
              <dd>
                <input
                  type="text"
                  name="diff"
                  value={this.state.diff}
                  onChange={this.onChange.bind(this)}
                  />
              </dd>
            </dl>

            <dl>
              <dt>ミッションギヤ比</dt>
              <dd>
                <input
                  type="text"
                  name="gear"
                  value={this.state.gear}
                  onChange={this.onChange.bind(this)}
                  />
              </dd>
            </dl>

            <dl>
              <dt>キャビン</dt>
              <dd>
                <input
                  type="text"
                  name="cabin"
                  value={this.state.cabin}
                  onChange={this.onChange.bind(this)}
                  />
              </dd>
            </dl>

            <dl>
              <dt>キャビンルーフ</dt>
              <dd>
                <input
                  type="text"
                  name="cabin_roof"
                  value={this.state.cabin_roof}
                  onChange={this.onChange.bind(this)}
                  />
              </dd>
            </dl>

            <dl>
              <dt>備考</dt>
              <dd>
                <textarea
                  className="w-xl"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange.bind(this)}
                  ></textarea>
              </dd>
            </dl>

            <div id="imageArea"> 
              {images}

              <ProductImage
                key="new"
                num="new"
                page={page}
                ref_id={this.state.ref_id}
                data="noimage"
                />

              <button
                id="reload"
                className="disable"
                onClick={this.reload.bind(this)}
                >さらに写真を追加</button>
            </div>

            <footer className="submit">
            <button type="submit" className="w-xs"
              onClick={this.onSubmit.bind(this)}
              value="Post"
              >更新</button>
            </footer>

          </form>

        </section>
      </article>
    );
  }

  onSubmit(e) {
    e.preventDefault();

    VehiclesActions.update(
      page,
      this.state.id,
      this.state,
      console.log('callback')
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeCheckBox(e) {
    this.setState({ [e.target.name]: e.target.checked });
  }

  onChangeSelect(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  updateState() {
    refs = ReferencesStore.read(); 
    this.setState(VehiclesStore.read());
  }

  reload() {
    e.target.preventDefault;
    window.location.reload();
  }
}
