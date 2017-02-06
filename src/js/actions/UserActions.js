import dispatcher from "../dispatcher";
import axios from "axios";

export function register(user) {
    authAction('register', 'REGISTER', 'REGISTER_FAILED', user);
}

export function login(user) {
    authAction('login', 'LOGIN', 'LOGIN_FAILED', user);
}

function authAction(path, eventType, eventFailedType, user) {
    axios.post('/auth/' + path, {user})
    .then(response => {
        if (response.data.user) {
            dispatcher.dispatch({
                type: eventType,
                user: response.data.user,
                token: response.data.token
            });
        } else {
            dispatcher.dispatch({
                type: eventFailedType,
                message: response.message
            });
        }
    });
}