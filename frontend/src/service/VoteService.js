import axios from 'axios';

export function postVote(voteInformation) {
    axios.post("http://localhost:3000/api/vote", voteInformation)
    .then((response) => {
        console.log('deu certo');
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
    });
}