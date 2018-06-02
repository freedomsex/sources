<script>
import _ from 'underscore';
import AccountSettings from '~closed-activity/AccountSettings';
import InfoDialog from '~dialogs/InfoDialog';
import CitySuggest from '~modules/CitySuggest';

export default {
  extends: AccountSettings,
  props: ['humanCity', 'humanAge'],
  created() {
    if (!this.selectCity && this.humanCity) {
      this.selectCity = this.humanCity;
    }
    if (!this.selectAge && this.humanAge) {
      this.selectAge = this.humanAge;
    }
  },
  methods: {
    approve() {
      this.save();
      this.$emit('approve');
      this.$emit('close');
    },
    close() {
      this.$emit('close');
    },
  },
  computed: {
    range: () => _.range(16, 81),
  },
  components: {
    InfoDialog,
    CitySuggest,
  },
};
</script>

<template>
  <InfoDialog yesText="Продолжить"
   @close="close" @confirm="approve">
    <div class="modal-dialog__section">
      Ваше имя:<br>
      <input class="form-control"
       type="text"
       v-model="selectName"
       @blur="saveName"
       placeholder="Ваше имя">
    </div>
    <div class="modal-dialog__section">
      Город:<br>
      <CitySuggest :city="selectCity" @select="saveCity"/>
    </div>
    <div class="modal-dialog__section">
      Возраст:<br>
      <select class="form-control" v-model.number="selectAge" @change="saveAge">
        <option v-for="(item, index) in range"
         :value="item" >{{item ? item : ''}}</option>
      </select>
    </div>
  </InfoDialog>
</template>
