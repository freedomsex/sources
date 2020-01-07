const {document} = window;

export default {
  keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

  // public method for encoding
  encode(input) {
    let output = '';
    let chr1;
    let chr2;
    let chr3;
    let enc1;
    let enc2;
    let enc3;
    let enc4;
    let i = 0;

    input = this._utf8_encode(input);

    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output = output
            + _baseKeyStr.charAt(enc1) + _baseKeyStr.charAt(enc2)
            + _baseKeyStr.charAt(enc3) + _baseKeyStr.charAt(enc4);
    }

    return output;
  },

  // public method for decoding
  decode(input) {
    let output = '';
    let chr1;
    let chr2;
    let chr3;
    let enc1;
    let enc2;
    let enc3;
    let enc4;
    let i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

    while (i < input.length) {
      enc1 = _baseKeyStr.indexOf(input.charAt(i++));
      enc2 = _baseKeyStr.indexOf(input.charAt(i++));
      enc3 = _baseKeyStr.indexOf(input.charAt(i++));
      enc4 = _baseKeyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output += String.fromCharCode(chr1);

      if (enc3 !== 64) {
        output += String.fromCharCode(chr2);
      }
      if (enc4 !== 64) {
        output += String.fromCharCode(chr3);
      }
    }
    output = this._utf8_decode(output);
    return output;
  },

  // private method for UTF-8 encoding
  _utf8_encode(str) {
    str = str.replace(/\r\n/g, '\n');
    let utftext = '';
    let i = 0;
    const n = str.length;
    let c;
    for (; i < n; i++) {
      c = str.charCodeAt(i);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  },

  // private method for UTF-8 decoding
  _utf8_decode(utftext) {
    let str = '';
    let i = 0;
    const n = utftext.length;
    let c = 0;
    const c1 = 0;
    let c2 = 0;
    let c3 = 0;
    while (i < n) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        str += String.fromCharCode(c);
        i += 1;
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        str += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        str += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return str;
  },


  createElem(type, name, append) {
    let el;
    if (name !== undefined && document.getElementById(name)) {
      el = document.getElementById(name);
    } else {
      el = document.createElement(type);
    }
    el.style.visibility = 'hidden';
    el.style.position = 'absolute';

    if (name) {
      el.setAttribute('id', name);
    }

    if (append) {
      document.body.appendChild(el);
    }
    return el;
  },

  createIframe(url, name) {
    const el = this.createElem('iframe', name, 1);
    el.setAttribute('src', url);
    return el;
  },


  // get value from param-like string (eg, "x=y&name=VALUE")
  getFromStr(name, text) {
    if (typeof text !== 'string') {
      return;
    }
    const nameEQ = `${name}=`;
    const ca = text.split(/[;&]/);
    let i;
    let c;
    for (i = 0; i < ca.length; i++) {
      c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
  },

  getHost() {
    return window.location.host.replace(/:\d+/, '');
  },

  toHex(str) {
    let r = '';
    const e = str.length;
    let c = 0;
    let h;
    while (c < e) {
      h = str.charCodeAt(c++).toString(16);
      while (h.length < 2) {
        h = `0${h}`;
      }
      r += h;
    }
    return r;
  },

  fromHex(str) {
    let r = '';
    let e = str.length;
    let s;
    while (e >= 0) {
      s = e - 2;
      r = String.fromCharCode(`0x${str.substring(s, e)}`) + r;
      e = s;
    }
    return r;
  },


};
