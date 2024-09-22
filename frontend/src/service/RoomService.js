import axios from 'axios';

export function getRoom(idRoom) {
    let room = '';

    axios.get(`http://localhost:3000/api/room/${idRoom}`)
    .then((response) => {
        room = response.data;
        console.log(room);
        return room;
    })
    .catch((error) => {
        console.log(error);
    });
}

export function postRoom(room) {
    axios.post("http://localhost:3000/api/room", room)
    .then((response) => {
        console.log('deu certo');
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
    });
}

export function deleteRoom(idRoom) {
    axios.delete(`http://localhost:4000/api/room/${idRoom}`)
    .then(() => {
        console.log('deu certo');
    })
    .catch((error) => {
        console.log(error);
    });
}