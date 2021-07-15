<script>
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
    self: null,
  }),
  components: {
    ActivityActions,
    ConfirmDialog,
  },
  mounted() {
    this.fill([]);
    this.load();
    this.loadSelf();
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
      return this.page >= this.pages - 1;
    },
  },
  methods: {
    source(src) {
      return src ? `${CONFIG.API_PHOTO}${src}` : '';
    },
    loadSelf() {
      this.$api
        .res('contact_photolines', 'initials')
        .load({id: this.user.id})
        .then(({data}) => {
          if (data && data.length) {
            this.self = data[0];
          }
        });
    },
    load() {
      this.$api
        .res('contact_photolines', 'initials')
        .load({page: 1})
        .then(({data}) => {
          if (data && data.length) {
            this.fill(data);
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
      console.log('list', this.list);
    },
    async send(confirm) {
      this.confirm = confirm || false;
      if (!this.user.userpic) {
        this.nofile = true;
      } else if (!this.confirm) {
        this.accept = true;
      } else {
        // const {uid} = this.$store.state.token;

        const res = this.$api.res('contact_photolines', 'initials');
        const params = {
          source: this.user.userpic.source,
        };
        try {
          if (this.self) {
            console.log('put', this.self);
            await res.put(params, {id: this.self.id});
          } else {
            params.userId = this.user.id;
            await res.post(params);
          }
        } catch (e) {
          // this.$store.commit('settings', {userpic: ''});
          this.accept = false;
          console.log('FAILED send photo');
        } finally {
          this.accept = false;
          this.load();
        }
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

    image(item) {
      return {backgroundImage: `url(${this.source(item.source)})`};
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
        <div class="galery-photo__item" v-for="(item, index) in list" :style="image(item)">
          <div
            class="photo-line__item-blured"
            :style="image(item)"
            @click="quick(item.userId)"
          ></div>
        </div>
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

    <router-view @close="$root.goBack()" />

    <ConfirmDialog
      v-if="nofile"
      yesText="Загрузить"
      @confirm="$router.push('/settings/account')"
      @close="nofile = false"
    >
      <div slot="title">У вас нет фото</div>
      В ленту можно добавить фото из вашего профиля, но фотографии там нет. Загрузите ваше фото в
      профиль, затем добавьте его в ленту нажав эту кнопку ещё раз.
    </ConfirmDialog>

    <ConfirmDialog v-if="accept" yesText="Добавить" @confirm="send(true)" @close="accept = false">
      <div slot="title">Опубликовать фото</div>
      Добавьте ваше фото профиля в ленту. Опубликованная в ленте фотография будет доступна к
      просмотру всем Пользователям сайта.
    </ConfirmDialog>
  </ActivityActions>
</template>

<style lang="less">
@import '~styles/galery-photo.less';
</style>
