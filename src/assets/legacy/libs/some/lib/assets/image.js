const {Image} = window;
const {document} = window;

export default {
  png(name, value) {
    const canvas = document.createElement('canvas');
    let img; let ctx; let
      origvalue;
    canvas.style.visibility = 'hidden';
    canvas.style.position = 'absolute';
    canvas.width = 200;
    canvas.height = 1;
    if (canvas && canvas.getContext) {
      // {{opts.pngPath}} handles the hard part of generating the image
      // based off of the http cookie and returning it cached
      img = new Image();
      img.style.visibility = 'hidden';
      img.style.position = 'absolute';
      if (value !== undefined) {
        // make sure we have *** session defined first
        document.cookie = `${opts.pngCookieName}=${value}; path=/; domain=${_ec_domain}`;
      } else {
        self._ec.pngData = undefined;
        ctx = canvas.getContext('2d');

        // interestingly enough, we want to erase our ***
        // http cookie so the php will force a cached response
        origvalue = this.getFromStr(opts.pngCookieName, document.cookie);
        document.cookie = `${opts.pngCookieName}=; expires=Mon, 20 Sep 2010 00:00:00 UTC; path=/; domain=${_ec_domain}`;

        img.onload = function () {
          // put our cookie back
          document.cookie = `${opts.pngCookieName}=${origvalue}; expires=Tue, 31 Dec 2030 00:00:00 UTC; path=/; domain=${_ec_domain}`;

          self._ec.pngData = '';
          ctx.drawImage(img, 0, 0);

          // get CanvasPixelArray from  given coordinates and dimensions
          const imgd = ctx.getImageData(0, 0, 200, 1);
          const pix = imgd.data; let i; let
            n;

          // loop over each pixel to get the "RGB" values (ignore alpha)
          for (i = 0, n = pix.length; i < n; i += 4) {
            if (pix[i] === 0) {
              break;
            }
            self._ec.pngData += String.fromCharCode(pix[i]);
            if (pix[i + 1] === 0) {
              break;
            }
            self._ec.pngData += String.fromCharCode(pix[i + 1]);
            if (pix[i + 2] === 0) {
              break;
            }
            self._ec.pngData += String.fromCharCode(pix[i + 2]);
          }
        };
      }
      img.src = `${_ec_baseurl + _ec_phpuri + opts.pngPath}?name=${name}&cookie=${opts.pngCookieName}`;
      img.crossOrigin = 'Anonymous';
    }
  },
};
