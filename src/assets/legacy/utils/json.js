export default {
  parse(str) {
    let result = null;
    try {
      result = JSON.parse(str);
    } catch (e) {
      //
    }
    return result;
  },

  encode(str) {
    return JSON.stringify(str);
  },
};
