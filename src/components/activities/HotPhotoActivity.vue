<script>
import axios from 'axios';
import CONFIG from '~config/';
import ConfirmDialog from '~dialogs/ConfirmDialog';
import ActivityActions from '~activities/ActivityActions';

export default {
  data: () => ({
    nofile: false,
    confirm: false,
    accept: false,
    page: 0,
    limits: [100, 300],
    list: [],
  }),
  components: {
    ActivityActions,
    ConfirmDialog,
  },
  mounted() {
    this.fill([]);
    this.load();
    // this.timer = setInterval(this.load, 3 * 60 * 1000);
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    pages() {
      return this.limits.length;
    },
    limit() {
      return this.page >= (this.pages - 1);
    },
  },
  methods: {
    source(src) {
      return src ? `${CONFIG.API_PHOTO}${src}` : '';
    },
    load() {
      axios.get(`${CONFIG.API_CONTACT}/api/v1/photoline/${this.limits[this.page]}`).then(({data}) => {
        if (data.list) {
          this.fill(data.list);
        }
      });
    },
    fill(list) {
      this.list = [];
      const result = list;
      for (let i = list.length; i < 30; i++) {
        result.push({id: null, item: null, source: null});
      }
      this.list = result;
    },
    send(confirm) {
      this.confirm = confirm || false;
      if (!this.user.userpic) {
        this.nofile = true;
      } else
      if (!this.confirm) {
        this.accept = true;
      } else {
        axios.post(`${CONFIG.API_CONTACT}/api/v1/photoline/${this.user.uid}`, {source: this.user.userpic.source}, {
          headers: {Authorization: `Bearer ${this.$store.state.token.access}`},
        }).then(() => {
          this.accept = false;
          this.load();
        }).catch(() => {
          // this.$store.commit('settings', {userpic: ''});
          this.accept = false;
          console.log('FAILED send photo');
        });
      }
    },
    quick(uid) {
      this.$router.push({name: 'hotWriteDialog', params: {humanId: uid, initial: true}});
    },
    more() {
      this.page += 1;
      this.load();
    },
    // refresh() {
    //   this.$refs.galery.scrollTop = 0;
    //   this.page = 0;
    //   this.load();
    // },
    select() {
      this.$emit('close');
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<template>
  <ActivityActions caption="Горячие парни" type="wrapped" ref="galery" @close="close">

    <template slot="option">
      <div class="header-bar__button" v-if="user.sex == 1" @click="send()">
        <span class="header-bar__title">Опубликовать фото</span>
        <i class="material-icons">&#xE147;</i>
      </div>
    </template>

    <div class="activity-section">

      <div class="galery-photo" v-if="list.length > 0">
        <div class="galery-photo__item blured-preview" v-for="(item, index) in list"
         :style="{backgroundImage: `url(${source(item.source)})`}"
         @click="quick(item.id)"></div>
      </div>
      <div class="galery-photo__placeholder" v-else>
        <slot></slot>
      </div>

    </div>
    <div class="activity-section">
      <div class="btn btn-default" @click="more()" v-if="!limit">
        Загрузить больше
      </div>
      <!-- <div class="btn btn-default" @click="refresh()">
        Обновить
      </div> -->
    </div>

    <router-view @close="$root.goBack()"/>


          <ConfirmDialog v-if="nofile"
            yesText="Загрузить"
            @confirm="$router.push('/settings/account')"
            @close="nofile = false">
            <div slot="title">У вас нет фото</div>
            В ленту можно добавить фото из вашего профиля, но фотографии там нет. Загрузите ваше фото в профиль, затем добавьте его в ленту нажав эту кнопку ещё раз.
          </ConfirmDialog>

          <ConfirmDialog v-if="accept"
            yesText="Добавить"
            @confirm="send(true)"
            @close="accept = false">
            <div slot="title">Опубликовать фото</div>
            Добавьте ваше фото профиля в ленту. Опубликованная в ленте фотография будет доступна к просмотру всем Пользователям сайта.
          </ConfirmDialog>


  </ActivityActions>
</template>

<style lang="less">
@import '~styles/galery-photo.less';
</style>
