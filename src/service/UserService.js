import axios from "axios";
import { BASE_URL } from '../utils/constants';

export function postUser(user) {
    axios.post(`${BASE_URL}/api/users`, user)
    .then((response) => {
        console.log("deu certo");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
    });
}