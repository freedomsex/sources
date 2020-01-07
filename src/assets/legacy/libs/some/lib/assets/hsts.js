
if (_ec_hsts) {
  if (opts.hsts_domains.length <= 8) {
    // TODO: warn on some more prominent place ?
    console.log(`HSTS cookie with ${opts.hsts_domains.length} can only save values up to ${Math.pow(2, opts.hsts_domains.length)}` - 1);
  }
  this.hsts_cookie = HSTS_Cookie(opts.hsts_domains);
}


// hsts-cookie "lib"
function HSTS_Cookie(domains) {
  let fields = [];
  let remaining = 0;
  let working = false;

  function create_request(i, src, callback) {
    const img = window.document.createElement('img');
    img.src = `${src}#${parseInt(Math.random() * 32000)}`; // prevent caching
    img.onload = function () {
      fields[i] = true;
      remaining -= 1;
      if (remaining <= 0) {
        working = false;
        callback(fields);
      }
    };
    img.onerror = function () {
      fields[i] = false;
      remaining -= 1;
      if (remaining <= 0) {
        working = false;
        callback(fields);
      }
    };
    return img;
  }
  function pad(value, length) {
    return (value.toString().length < length) ? pad(`0${value}`, length) : value;
  }
  function bools_to_int(bools) {
    let n = 0; const
      l = bools.length;
    for (let i = 0; i < l; ++i) {
      n = (n << 1) + (bools[i] ? 1 : 0);
    }
    return n;
  }
  function int_to_bools(value, bit_count) {
    const bools = [];
    let bits = parseInt(value, 10).toString(2);
    bits = pad(bits, 32);
    for (let i = 32 - bit_count; i < 32; ++i) {
      bools.push(bits[i] == '1');
    }
    return bools;
  }
  return {
    bools_to_int,
    is_working() { return working; },
    get_hsts_value(callback) {
      if (working) return false;
      working = true;
      fields = [];
      remaining = domains.length;
      for (let i = 0; i < domains.length; ++i) {
        fields.push(undefined);
        const img = create_request(i, domains[i], callback);
      }
      return true;
    },
    set_hsts_value(values, callback) {
      if (working) return false;
      working = true;
      fields = [];
      remaining = domains.length;
      for (let i = 0; i < domains.length; ++i) {
        fields.push(undefined);
        if (values[i]) create_request(i, `${domains[i]}?SET=1`, callback);
        else create_request(i, `${domains[i]}?DEL=1`, callback);
      }
      return true;
    },
    set_hsts_as_int(value, callback) {
      var value = int_to_bools(value, domains.length);
      return this.set_hsts_value(value, callback);
    },
    get_hsts_as_int(callback) {
      return this.get_hsts_value((fields) => {
        callback(bools_to_int(fields));
      });
    },
  };
}
