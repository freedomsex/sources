import Vue from 'vue';
// import App from './App.vue';
import TimeStatus from './components/profile-user/time-status.vue';
import ProfileStatusWidget from './components/profile-user/profile-status-widget.vue';

import './legacy/comm-list';
import './legacy/idea-list';
import './legacy/revs-list';
import './legacy/help-list';
import './legacy/quick-word';
import './legacy/extra';

new Vue({ // eslint-disable-line no-new
  el: '#page_cont',
  // render: h => h(App),
  mounted() {

  },
  components: {
    TimeStatus,
    ProfileStatusWidget,
  },
});
