import { observable } from 'mobx';
import { createContext } from 'react';

class UserStore {
  @observable user = {};
}

export const UserStoreContext = createContext(new UserStore());
