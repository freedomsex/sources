<script>
import DesireList from '~modules/DesireList/DesireList';

export default {
  props: ['human'],
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    this.$moment().locale('ru');
    console.log(this.$moment.locale());
  },
  computed: {
    age() {
      const ago = this.$moment.duration(this.human.age, 'years').humanize();
      return this.human.age ? ago : null;
    },
    tags() {
      return 'tags' in this.human ? this.human.tags : [];
    },
    social() {
      const {em, vk, ok, fb, go} = this.human;
      if (em || vk || ok || fb || go) {
        return {em, vk, ok, fb, go};
      }
      return null;
    },
    interact() {
      const {ph, sk} = this.human;
      if (ph || sk) {
        return {ph, sk};
      }
      return null;
    },
    figure() {
      const figure = this.human.anketa ? this.human.anketa.figure : null;
      let result = figure;
      switch (figure) {
        case 2:
          result = 'спортивного';
          break;
        case 3:
          result = 'обычного';
          break;
        case 5:
          result = 'полного';
          break;
        case 6:
          result = 'худого';
          break;
        default:
          result = '';
          break;
      }
      return result;
    },
    hold() {
      return this.ignore ? 0 : this.human.hold;
    },
    who() {
      let result = 'Парня ';
      if (this.human.sex) {
        result = this.human.sex == 2 ? 'Парня ' : 'Девушку ';
      }
      if (this.human.who) {
        result = this.human.who == 1 ? 'Парня ' : 'Девушку ';
      }
      if (this.human.up || this.human.to) {
        result += ' в возрасте ';
        result += this.human.up ? ` от ${this.human.up}` : '';
        result += this.human.to ? ` до ${this.human.to}` : '';
        result += ' лет ';
      }
      return result;
    },
    ago() {
      const {last} = this.human;
      let result = 'Онлайн';
      if (last > 2592000) {
        result = null;
      } // else
      if (last > 777) {
        result = this.$moment.duration(0 - last, 'seconds').humanize(true);
      }
      return result;
    },
    search() {
      let who = '';
      let years = '';
      const city = this.human.city ? `/${this.human.city}` : '';
      if (this.human.who == 1) {
        who = '/Парни';
      } else if (this.human.who == 2) {
        who = '/Девушки';
      } else who = '';
      if (this.human.up && this.human.up == this.human.to) {
        years = `/возраст/${this.human.up}`;
      } else if (this.human.up && this.human.to) {
        years = `/возраст/${this.human.up}/${this.human.to}`;
      } else if (this.human.up && !this.human.to) {
        years = `/возраст/от/${this.human.up}`;
      } else if (!this.human.up && this.human.to) {
        years = `/возраст/до/${this.human.to}`;
      } else years = '';
      return city + who + years;
    },
  },
  components: {
    DesireList,
  },
};
</script>

<template>
  <div key="humanId">
    <div class="account-section">
      <div class="human-info__general">
        <span class="human-info__name">{{human.name}}</span>
        <span class="human-info__age">{{age}}</span>
        <span class="human-info__ago">({{ago}})</span>
      </div>
      <div>
        <span class="human-info__city">{{human.city}}</span>
      </div>
    </div>

    <div class="account-section" v-if="who">
      <div class="account-section__header">Я ищу</div>
      <div class="human-info__search">
        <a class="gray_link"
         :href="search"
         target="_blank"
         rel="noopener"
         @click.prevent.stop>{{who}}</a>
      </div>
    </div>

    <div class="account-section" v-if="human.anketa">
      <div class="account-section__header">Обо мне</div>
      <div class="human-info__about">
        Я {{human.sex == 1 ? 'парень' : 'девушка'}}
        <span v-show="figure">{{figure}} телосложения</span>
      </div>
      <div class="human-info__measure">
        <span v-show="human.anketa.growth">Мой рост: {{human.anketa.growth}} см, </span>
        <span v-show="human.anketa.weight">Вес:  {{human.anketa.weight}} кг</span>
      </div>
    </div>

    <div class="account-section" v-if="social">
      <div class="account-section__header">У меня есть</div>
      <div class="human-social">
        <i class="human-social__email" v-show="social.em">Емайл</i>
        <i class="human-social__vkontakte" v-show="social.vk">Вконтакте</i>
        <i class="human-social__google-plus" v-show="social.go">Google-plus</i>
        <i class="human-social__odnoklassniki" v-show="social.ok">Одноклассники</i>
        <i class="human-social__facebook" v-show="social.fb">Facebook</i>
      </div>
    </div>

    <div class="human-contacts" v-if="interact">
      <div><i class="human-contacts__phone" v-show="interact.ph">
        Обязательно позвоню или дам номер телефона
      </i></div>
      <div><i class="human-contacts__skype" v-show="interact.sk">
        Согласен на видеозвонок или видеочат по скайпу
      </i></div>
    </div>

    <div class="account-section" v-if="tags.length">
      <div class="account-section__header">Мои желания и фантазии</div>
      <div class="desire-tag__list">
        <DesireList :tags="tags"/>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.account-component {
  &__wrapper {
    padding-top: @indent-lg;
    padding-bottom: @indent-lg;
  }
}

.human-info {
  padding: @indent-lg @indent-md;
  &__general {
    margin-bottom: 0;
  }
  &__name {
    display: inline-block;
    font-size: @font-xl;
  }
  &__age {
    display: inline-block;
  }
  &__ago {
    color: @gray;
  }
  &__city {
    display: inline-block;
  }

  &__search {
    color: @dark;
    font-size: @font-sm;
    display: block;
    text-decoration: none;
    margin: 0px 0px @indent-sm 1px;
  }

  &__status {
  }

  &__loader {
    padding-left: @indent-xs;
    font-size: 0;
    display: inline-block;
    vertical-align: middle;
    width: 16px;
    height: 11px;
    background-image: url('/img/ajax_loader_gray.gif');
    background-repeat: no-repeat;
    //     display: none;
  }

  &__about {
    color: @dark;
    font-size: @font-sm;
  }
  &__measure {
    color: @dark;
    font-size: @font-sm;
    margin-bottom: @indent-md;
  }

  //flex: none;
  //display: block;
}

.account-section {
  margin: @indent-sm 0;
  &__header {
    color: @dark;
    font-size: @font-md;
    margin-bottom: @indent-sm;
    margin-top: @indent-md;
  }
}

@icon-path: '~static/img/icon';

.human-social {
  i {
    background-position: left center;
    background-repeat: no-repeat;
    border-radius: 3px;
    border: 1px solid @gray-light;
    color: @dark-light;
    cursor: pointer;
    display: inline-block;
    font-size: 12px;
    font-style: normal;
    margin-bottom: @indent-xs;
    margin-right: @indent-xs;
    padding: @indent-xs;
    padding-left: 30px;
    vertical-align: middle;
    line-height: 1;
  }
  &__email {
    background-image: url('@{icon-path}/ac_em.png');
  }
  &__vkontakte {
    background-image: url('@{icon-path}/ac_vk.png');
  }
  &__google-plus {
    background-image: url('@{icon-path}/ac_go.png');
  }
  &__odnoklassniki {
    background-image: url('@{icon-path}/ac_ok.png');
  }
  &__facebook {
    background-image: url('@{icon-path}/ac_fb.png');
  }
}

.human-contacts {
  margin-top: @indent-md;
  i {
    background-position: left center;
    background-repeat: no-repeat;
    border-radius: 3px;
    border: 1px solid @gray-light;
    color: @dark-light;
    cursor: pointer;
    display: inline-block;
    font-size: @font-sm;
    font-style: normal;

    margin-bottom: @indent-xs;
    margin-right: @indent-xs;
    padding: @indent-xs;
    padding-left: 30px;
    vertical-align: middle;
    line-height: 1;
  }
  &__phone {
    background-image: url('@{icon-path}/ac_ph.png');
  }
  &__skype {
    background-image: url('@{icon-path}/ac_sk.png');
  }
}
</style>
