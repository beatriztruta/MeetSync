import axios from "axios";
import { BASE_URL } from '../utils/constants';

export function postVote(voteInformation) {
    axios.post(`${BASE_URL}/api/vote`, voteInformation)
    .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
    });
}