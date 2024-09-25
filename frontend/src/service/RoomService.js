import axios from 'axios';

export async function getRoom(idRoom) {
    try {
      const response = await axios.get(`http://localhost:3000/api/room/${idRoom}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
}

export async function postRoom(room) {
  try {
    const response = await axios.post("http://localhost:3000/api/room/", room);
    return response.data.roomId;
  } catch (error) {
    console.log(error);
  }
}

export function deleteRoom(idRoom) {
    axios.delete(`http://localhost:3000/api/room/${idRoom}`)
    .then(() => {
        console.log('deu certo');
    })
    .catch((error) => {
        console.log(error);
    });
}