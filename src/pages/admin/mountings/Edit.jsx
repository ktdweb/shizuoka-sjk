import React from 'react'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'

import VehiclesStore from '../../../stores/VehiclesStore'
import VehiclesActions from '../../../actions/VehiclesActions'

import ReferencesStore from '../../../stores/ReferencesStore'
import ReferencesActions from '../../../actions/ReferencesActions'

import ProductImage from '../Images'
import BelongsTo from '../BelongsTo'

let page = 'mountings';

let refs = {
  vehicles_categories: {},
  makers: {},
  sizes: {}
};

export default class Edit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id             : '',
      product_id     : '',
      new_flag       : '',
      deal_flag      : '',
      soldout_flag   : '',
      recommend_flag : '',
      icon_date      : '',
      ref_id         : '',
      name           : '',
      price          : '',
      size_id        : '',
      shape          : '',
      floor          : '',
      dimension      : '',
      description    : '',
      created        : '',
      modified       : '',
      images         : ''
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

    let vehicles_categories = Object.keys(
      refs.vehicles_categories
    ).map((i) => {
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
              <dt>形状</dt>
              <dd>
                <input
                  type="text"
                  name="shape"
                  value={this.state.shape}
                  onChange={this.onChange.bind(this)}
                  />
              </dd>
            </dl>

            <dl>
              <dt>床</dt>
              <dd>
                <input
                  type="text"
                  name="floor"
                  value={this.state.floor}
                  onChange={this.onChange.bind(this)}
                  />
              </dd>
            </dl>

            <dl>
              <dt>ボディ内寸</dt>
              <dd>
                <input
                  type="text"
                  name="dimension"
                  value={this.state.dimension}
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
