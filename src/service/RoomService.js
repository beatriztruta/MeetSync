import axios from "axios";
import { BASE_URL } from '../utils/constants';


export async function getRoom(idRoom) {
    try {
      const response = await axios.get(`${BASE_URL}/api/room/${idRoom}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
}

export async function postRoom(room) {
  try {
    const response = await axios.post(`${BASE_URL}/api/room/`, room);
    return response.data.roomId;
  } catch (error) {
    console.log(error);
  }
}