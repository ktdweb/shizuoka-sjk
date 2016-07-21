import React from 'react'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'
import m from 'moment'

import VehiclesStore from '../../../stores/VehiclesStore'
import VehiclesActions from '../../../actions/VehiclesActions'

import ReferencesStore from '../../../stores/ReferencesStore'
import ReferencesActions from '../../../actions/ReferencesActions'

import ImagesStore from '../../../stores/ImagesStore'
import ImagesActions from '../../../actions/ImagesActions'

import ProductImage from '../Images'
import BelongsTo from '../BelongsTo'

let page = 'vehicles';

let refs = {
  vehicles_categories: {},
  makers: {},
  sizes: {}
};

let now = m().format('YYYY-MM-DD hh:mm:ss');

export default class Edit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id:              '',
      product_id:      0,
      new_flag:        0,
      deal_flag:       0,
      soldout_flag:    0,
      recommend_flag:  0,
      icon_date:       '',
      ref_id:          '',
      category_id:     1,
      name:            '',
      price:           0,
      maker_id:        1,
      product_name:    '',
      size_id:         1,
      mfg_date:        '',
      model:           '',
      mfg_no:          '',
      mot_date:        '',
      mileage:         0,
      form:            '',
      engine:          '',
      ps:              0,
      mission:         '',
      capacity:        0,
      break:           '',
      cc:              0,
      limitter:        '',
      ac_flag:         1,
      ps_flag:         1,
      body:            '',
      dimension:       '',
      recycle:         0,
      pdf:             '',
      description:     '',
      created:         now,
      modified:        now,
      images:          []
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

    let pdf = (this.state.pdf != '') ? '車検証あり' : '車検証なし';

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
              <dt>車検</dt>
              <dd>
                <input
                  type="text"
                  name="mot_date"
                  value={this.state.mot_date}
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
              <dt>車輌形状</dt>
              <dd>
                <input
                  type="text"
                  name="form"
                  value={this.state.form}
                  onChange={this.onChange.bind(this)}
                  />
              </dd>
            </dl>

            <dl>
              <dt>原動機</dt>
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
              <dt>ミッション(速)</dt>
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
              <dt>積載量</dt>
              <dd>
                <input
                  type="text"
                  name="capacity"
                  value={this.state.capacity}
                  onChange={this.onChange.bind(this)}
                  />
              </dd>
            </dl>

            <dl>
              <dt>ブレーキ</dt>
              <dd>
                <input
                  type="text"
                  name="break"
                  value={this.state.break}
                  onChange={this.onChange.bind(this)}
                  />
              </dd>
            </dl>

            <dl>
              <dt>排気量</dt>
              <dd>
                <input
                  type="text"
                  name="cc"
                  value={this.state.cc}
                  onChange={this.onChange.bind(this)}
                  />
              </dd>
            </dl>

            <dl>
              <dt>リミッター</dt>
              <dd>
                <input
                  type="text"
                  name="limitter"
                  value={this.state.limitter}
                  onChange={this.onChange.bind(this)}
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
                  name="body"
                  value={this.state.body}
                  onChange={this.onChange.bind(this)}
                  />
              </dd>
            </dl>

            <dl>
              <dt>ボデー内寸</dt>
              <dd>
                <input
                  className="w-l"
                  type="text"
                  name="dimension"
                  value={this.state.dimension}
                  onChange={this.onChange.bind(this)}
                  />
              </dd>
            </dl>

            <dl>
              <dt>リサイクル料金</dt>
              <dd>
                <input
                  type="text"
                  name="recycle"
                  value={this.state.recycle}
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

            <dl>
              <dt>PDF</dt>
              <dd>
                <p>{pdf}</p>
                <input
                  type="file"
                  name={this.state.description}
                  onChange={this.handlePdf.bind(this)}
                  />

                <button
                  onClick={this.delPdf.bind(this)}
                  >削除</button>
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

  delPdf(e) {
    e.preventDefault();

    ImagesActions.delPdf(
      this.state.ref_id,
      function() {
        this.setState({ pdf: '' });
      }
    );
  }

  handlePdf(e) {
    let file = e.target.files[0];
    let _this = this;
    let fr = new FileReader();


    fr.onload = function() {
      ImagesActions.updatePdf(
        _this.state.ref_id,
        { data: fr.result.replace(/^[^,]*,/, '') },
        function() {
          _this.setState({ pdf: 'update' });
        }
      );
    };

    fr.readAsDataURL(file);
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
