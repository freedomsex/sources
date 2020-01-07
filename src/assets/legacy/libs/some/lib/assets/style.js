const {document} = window;

export default {
  style() {
    /* create our anchor tag */
    const _link = this.createElem('a', '_ec_rgb_link');
    /* for monitoring */
    let created_style;
    /* create a custom style tag for the specific link. Set the CSS visited selector to a known value */
    const _cssText = '#_ec_rgb_link:visited{display:none;color:#FF0000}';
      	  let style;

    /* Methods for IE6, IE7, FF, Opera, and Safari */
    try {
      created_style = 1;
      style = document.createElement('style');
      if (style.styleSheet) {
        style.styleSheet.innerHTML = _cssText;
      } else if (style.innerHTML) {
        style.innerHTML = _cssText;
      } else {
        style.appendChild(document.createTextNode(_cssText));
      }
    } catch (e) {
      created_style = 0;
    }
  },
  /**
       * css history knocker (determine what sites your visitors have been to)
       *
       * originally by Jeremiah Grossman
       * http://jeremiahgrossman.blogspot.com/2006/08/i-know-where-youve-been.html
       *
       * ported to additional browsers by Samy Kamkar
       *
       * compatible with ie6, ie7, ie8, ff1.5, ff2, ff3, opera, safari, chrome, flock
       *
       * - code@samy.pl
       */
  hasVisited(url) {
    if (this.no_color === -1) {
      const no_style = this._getRGB('http://samy-was-here-this-should-never-be-visited.com', -1);
      if (no_style === -1) {
        this.no_color = this._getRGB(`http://samy-was-here-${Math.floor(Math.random() * 9999999)}rand.com`);
      }
    }

    // did we give full url?
    if (url.indexOf('https:') === 0 || url.indexOf('http:') === 0) {
      return this._testURL(url, this.no_color);
    }

    // if not, just test a few diff types  if (exact)
    return this._testURL(`http://${url}`, this.no_color)
          || this._testURL(`https://${url}`, this.no_color)
          || this._testURL(`http://www.${url}`, this.no_color)
          || this._testURL(`https://www.${url}`, this.no_color);
  },

  /* if test_color, return -1 if we can't set a style */
  getRGB(u, test_color) {
    if (test_color && created_style === 0) {
      return -1;
    }

    /* create the new anchor tag with the appropriate URL information */
    _link.href = u;
    _link.innerHTML = u;
    // not sure why, but the next two appendChilds always have to happen vs just once
    document.body.appendChild(style);
    document.body.appendChild(_link);

    /* add the link to the DOM and save the visible computed color */
    let color;
    if (document.defaultView) {
      if (document.defaultView.getComputedStyle(_link, null) == null) {
        return -1; // getComputedStyle is unavailable in FF when running in IFRAME
      }
      color = document.defaultView.getComputedStyle(_link, null).getPropertyValue('color');
    } else {
      color = _link.currentStyle.color;
    }
    return color;
  },

  testURL(url, no_color) {
    const color = this._getRGB(url);

    /* check to see if the link has been visited if the computed color is red */
    if (color === 'rgb(255, 0, 0)' || color === '#ff0000') {
      return 1;
    } if (no_color && color !== no_color) {
      /* if our style trick didn't work, just compare default style colors */
      return 1;
    }
    /* not found */
    return 0;
  },

};
