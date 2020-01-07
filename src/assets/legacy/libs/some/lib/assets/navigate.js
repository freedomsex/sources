export default {

  // this is crazy but it's 4am in dublin and i thought this would be hilarious
  // blame the guinness
  history(name, value) {
    // - is special
    const baseElems = (`${_baseKeyStr}-`).split('');
    // sorry google.
    let url = `http://www.google.com/somelib/cache/${this.getHost()}/${name}`;
    let i; let base;
    let letter = '';
    let val = '';
    let found = 1;

    if (value !== undefined) {
      // don't reset this if we already have it set once
      // too much data and you can't clear previous values
      if (this.hasVisited(url)) {
        return;
      }

      this.createIframe(url, 'if');
      url = `${url}/`;

      base = this.encode(value).split('');
      for (i = 0; i < base.length; i++) {
        url += base[i];
        this.createIframe(url, `if${i}`);
      }

      // - signifies the end of our data
      url = `${url}-`;
      this.createIframe(url, 'if_');
    } else {
      // omg you got csspwn3d
      if (this.hasVisited(url)) {
        url = `${url}/`;

        while (letter !== '-' && found === 1) {
          found = 0;
          for (i = 0; i < baseElems.length; i++) {
            if (this.hasVisited(url + baseElems[i])) {
              letter = baseElems[i];
              if (letter !== '-') {
                val += letter;
              }
              url += letter;
              found = 1;
              break;
            }
          }
        }

        // lolz
        return this.decode(val);
      }
    }
  },

};
