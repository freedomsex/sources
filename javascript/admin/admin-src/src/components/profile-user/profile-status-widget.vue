<script>
import _ from 'underscore';
import axios from 'axios';

export default {
  props: ['userId', 'comment'],
  data() {
    return {
      status: '',
      isSuggestShow: 0,
      suggest: [
        { text: 'Предложение оплаты услуг, вирт за деньги, проституция, мошенничество, шантаж, спам', style: 'bg_ored' },
        { text: 'Фото из интернета, парень под видои девушки, вымышленные данные, обман, фейк', style: 'bg_ored' },
        { text: 'Оскорбления, хамство, троллинг, грубые сообщения, жалобы на интим фото, провокации', style: 'bg_oyel' },
        { text: 'Пишет всем подряд, игнорирует анкетные данные, гей пишет натуралам, рассылки', style: 'bg_oyel' },
        { text: 'Ложно, отклоненные жалобы, причина не ясна, ссора, выяснение отношений', style: 'bg_ogrn' },
      ],
      defaults: {
        status: 'Статус не установлен',
        style: '',
      },
    };
  },
  mounted() {
    this.status = this.comment;
  },
  computed: {
    text() {
      return this.status ? this.status : this.defaults.status;
    },
    style() {
      const item = _.findWhere(this.suggest, { text: this.text });
      return item ? item.style : '';
    },
  },
  methods: {
    variant() {
      this.isSuggestShow = true;
    },
    save(text) {
      if (this.userId) {
        axios.post('/userinfo/setcomm/', {
          id: this.userId,
          text,
        });
      }
    },
    select(item) {
      this.status = item.text;
      this.save(item.text);
      this.close();
    },
    close() {
      this.isSuggestShow = false;
    },
  },
};
</script>

<template>
  <div id="profile-status" style="margin: 0px 0 25px;">
    <div v-if="isSuggestShow">
      <div class="list-group profile-status__suggest">
        <a class="list-group-item profile-status__suggest-item"
        :class="item.style" v-for="(item, index) in suggest" @click="select(item)">{{ item.text }}</a>
        <button class="btn btn-link" @click="close()">
          <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
          Скрыть список
        </button>
      </div>
    </div>

    <div class="profile-status__present" :class="style" v-else>
      <div id="profile-status__text">
        {{text}}
      </div>

      <button class="profile-status__button btn btn-primary btn-sm" @click="variant">
        <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
        Изменить статус
      </button>
    </div>
  </div>
</template>

<style lang="less">

</style>
