import {io, Socket} from 'socket.io-client';

const SOCKET_URL = 'http://192.168.0.16:3000/';

class WSService {
  private socket?: Socket;

  initializeSocket = async () => {
    try {
      this.socket = await io(SOCKET_URL, {
        transports: ['websocket'],
      });
      console.log('Inicializando Socket', this.socket);
      this.socket.on('connect', () => {
        console.log('Socket conectado');
      });
      this.socket.on('disconnect', () => {
        console.log('Socket desconectado');
      });
      this.socket.on('connect_error', error => {
        console.log('Error de conexión', error);
      });
      this.socket.on('error', error => {
        console.log('Error de socket', error);
      });
    } catch (error) {
      console.log('socket is not initialized:', error);
    }
  };

  emit(event: string, data: any = {}) {
    this.socket?.emit(event, data);
  }
  on(event: string, cb: any) {
    this.socket?.on(event, cb);
  }
  removeListener(event: string) {
    this.socket?.removeListener(event);
  }
}

const socketService = new WSService();

export default socketService;
