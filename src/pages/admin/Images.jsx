import React from 'react'
import { Link } from 'react-router'

import ImagesStore from '../../stores/ImagesStore'
import ImagesActions from '../../actions/ImagesActions'

var page;
var savepath = '/test/data/';

export default class ProductImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    if (this.props.page) {
      let txt = this.props.page;
      page = txt.substr(0, txt.length-1);
    }
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
          src={savepath + page + "/" + this.state.data + '.jpg'}
          width="120"
          alt="t"
          />
        </div>

        <input
          type="file"
          name={this.state.num}
          onChange={this.handleImage.bind(this)}
          />
        <button
          onClick={this.del.bind(this)}
          >削除</button>
        <div className="desc" id={'desc' + this.state.num}></div>
      </div>
    );
  }

  del(e) {
    e.preventDefault();

    ImagesActions.del(
      this.state.ref_id,
      this.state,
      window.location.reload()
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
    let reload = document.getElementById('reload');
    let file = e.target.files[0];

    let img = new Image(); 
    let src = window.URL.createObjectURL(file);
    img.src = src;

    let _this = this;
    let fr = new FileReader();
    fr.onload = (function(file) {
      img.onload = function() {
        if (_this.validateImage(file, img, eld)) {
          let base64 = _this.convertBase64(img);
          _this.setState({ image: base64 });

          ImagesActions.update(
            page,
            _this.state.ref_id,
            _this.state,
            function() {
              img.width = 120;
              tgt.innerHTML = '';
              tgt.appendChild(img);
              reload.classList.remove('disable');
              eld.innerHTML = '';
            }
          );
        }
      }
    })(file);
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

    if (img.width < 620) {
      message = '画像の横幅が足りません。640px以上を使用下さい';
    } else if (img.width > 1440) {
      message = '画像の横幅が大きすぎます。640px程度を使用下さい';
    }

    if (message) {
      eld.innerHTML = message;
    }
    return (message) ? false : true ;
  }
}
