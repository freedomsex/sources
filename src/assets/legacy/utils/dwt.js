function disabled_with_timeout(elem, time) {
  elem.prop('disabled', true);
  setTimeout(() => {
    elem.prop('disabled', false);
  }, time * 1000);
}
