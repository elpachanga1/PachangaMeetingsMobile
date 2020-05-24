import { observable, action } from 'mobx';
import { createContext } from 'react';

class UserStore {
  @observable user = {};

  //@action setUser(user) {
  //  console.log('setting user');
  //  this.user = user;
  //}
}

export const UserStoreContext = createContext(new UserStore());
