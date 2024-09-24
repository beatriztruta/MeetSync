import axios from 'axios';

export function postUser(user) {
    axios.post("http://localhost:3000/api/users", user)
    .then((response) => {
        console.log('deu certo');
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
    });
}