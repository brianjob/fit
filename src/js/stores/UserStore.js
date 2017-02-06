import {EventEmitter} from "events";
import dispatcher from "../dispatcher";

class UserStore extends EventEmitter {
    constructor() {
        super();

        this.user = {};
        this.token = '';
    }

    login(user, token) {
        this.user = user;
        this.token = token;
        localStorage.setItem('token', token);
        this.emit('change');
    }

    showMessage(message) {
        console.log(message); // wire up alert later
    }

    handleActions(action) {
        console.log('received action', action);

        switch(action.type) {
            case 'REGISTER':
            case 'LOGIN':
                this.login(action.user, action.token);
                break;
            case 'REGISTER_FAILED':
            case 'LOGIN_FAILED':
                this.showMessage(action.message);
        }
    }
}

const userStore = new UserStore();

dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;