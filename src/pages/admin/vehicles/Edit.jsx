import React from 'react'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'

import VehiclesStore from '../../../stores/VehiclesStore'
import VehiclesActions from '../../../actions/VehiclesActions'

import ReferencesStore from '../../../stores/ReferencesStore'
import ReferencesActions from '../../../actions/ReferencesActions'

import ImagesStore from '../../../stores/ImagesStore'
import ImagesActions from '../../../actions/ImagesActions'

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
      modified:        '',
      images:          ''
    };
  }

  componentWillMount() {
    VehiclesStore.subscribe(this.updateState.bind(this)); 

    ReferencesActions.create(); 
    VehiclesActions.create(this.props.params.id); 
  }

  componentWillUnmount() {
    VehiclesStore.destroy(this.updateState.bind(this)); 
  }

  render() {
    if (this.state.images == '') return false;

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
              <dt>リミッター</dt>
              <dd>
                <input
                  type="text"
                  name="limmiter"
                  value={this.state.limmitter}
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

            <div> 
              {images}
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

class ProductImage extends React.Component {
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
      <div className="thumb">
        <div id={'thumb' + this.state.num}>
        <img
          src={"/data/vehicle/" + this.state.data + '.jpg'}
          width="120"
          alt="t"
          />
        </div>

        <input
          type="file"
          name={this.state.num}
          onChange={this.handleImage.bind(this)}
          />
        <div className="desc" id={'desc' + this.state.num}></div>
      </div>
    );
  }

  onClick(e) {
    e.preventDefault();
  }

  updateState(props) {
    if (props.data != null) {
      this.setState(props);
    }
  }

  handleImage(e) {
    let id = e.target.name;
    let tgt = document.getElementById('thumb' + id);
    let el = tgt.getElementsByTagName('img')[0];
    let eld = document.getElementById('desc' + id);
    let fr = new FileReader();
    let file = e.target.files[0];

    let img = new Image(); 
    let src = window.URL.createObjectURL(file);
    img.src = src;

    let _this = this;
    fr.onload = (function(file) {
      img.onload = function() {
        if (_this.validateImage(file, img, eld)) {
          let base64 = _this.convertBase64(img);
          _this.setState({ image: base64 });

          initImage();

          ImagesActions.update(
            'vehicle',
            _this.state.ref_id,
            _this.state,
            (function () {
              img.width = 120;
              tgt.appendChild(img);
          }));
          img.width = 120;
          tgt.appendChild(img);
        }
      }
    })(file);

    function initImage() {
      tgt.innerHTML = '';
    }
  }

  convertBase64(img) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d'); 
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    let base64 = canvas.toDataURL('image/jpeg');
    
    return base64.replace(/^.*,/, '');
  }

  validateImage(file, img, eld) {
    var message;

    if (file.type != 'image/jpeg') {
      message = 'jpegファイルを選択してください';
    }

    if (img.width < 720) {
      message = '画像の横幅が足りません。720px以上を使用下さい';
    } else if (img.width > 1440) {
      message = '画像の横幅が大きすぎます。720px程度を使用下さい';
    }

    if (message) {
      eld.innerHTML = message;
    }
    return (message) ? false : true ;
  }
}
