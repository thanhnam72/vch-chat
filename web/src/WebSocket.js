import io from "socket.io-client";
const ENDPOINT = 'http://localhost:1337';
export default io(ENDPOINT);