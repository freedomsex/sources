
import Api from '~config/rest-api/core';

export default
class ApiUser extends Api {
  constructor() {
    const key = '1234';
    const host = '/';
    super(host, key, null, null);
  }

  regnow(token) {
    return this.save({token}, null, 'user/regnow');
  }

  saveSex(sex, token) {
    return this.save({sex, token}, null, 'option/sex');
  }

  saveAge(age) {
    return super.save({age}, null, 'option/age');
  }

  saveName(name) {
    return super.save({name}, null, 'option/name');
  }

  saveCity(city) {
    return super.save({city}, null, 'option/city');
  }

  saveContacts(data) {
    return super.save({contact: data}, null, 'option/contact');
  }

  saveSearch(data) {
    return super.save(data, null, 'msett/save');
  }

  syncAbout() {
    return super.load(null, 'sync/anketa');
  }

  syncTrust() {
    return super.load(null, 'sync/trust');
  }

  saveAbout(data) {
    return super.save(data, null, 'option/anketa');
  }

  syncAuth() {
    return super.load(null, 'sync/authdata');
  }

  saveLogin(login) {
    return super.save({login}, null, 'option/login');
  }

  savePasswd(pass) {
    return super.save({pass}, null, 'option/passwd');
  }

  saveEmail(email) {
    return super.save({email}, null, 'option/email');
  }

  removeEmail() {
    return super.remove(null, null, 'option/demail');
  }

  saveSubscribe() {
    return super.save(null, null, 'option/subscr');
  }

  desireList() {
    return super.load(null, 'tag/user');
  }

  desireAdd(tag) {
    return super.save({tag}, null, 'tag/add');
  }

  desireDelete(id) {
    return super.remove({id}, null, 'tag/del');
  }

  visitedList() {
    return super.load(null, 'contact/visited');
  }

  visitedAdd(uid, tid) {
    return super.send({tid, uid}, 'contact/addvisit/{uid}');
  }
}
