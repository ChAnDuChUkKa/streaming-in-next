import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import   
 { fetchStocksData } from '../store/stocksSlice';
import { AppDispatch, RootState } from '@/lib/store';
import { socket } from '@/socket';

const SocketClient = () => {
  // const dispatch = useDispatch<AppDispatch>();
  // const data = useSelector((state: RootState) => state.stocks.stocks);

  socket.on("hello", (value)=> {
    console.log("ERRR",value)
  })


  // useEffect(() => {
    
  //   const socket: Socket = io();

  //   socket.on('connect', () => {
  //     console.log('Connected to WebSocket server');
  //   });

  //   socket.on('dataUpdated', (newData) => {
  //     console.log('Received data update:', newData);
  //     // Check if data exists in store before dispatching update
  //     if (data) {
  //       dispatch(fetchStocksData(newData)); // Update Redux state with new data
  //     }
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []); // Empty dependency array ensures client-side execution only

  return <div>Chandu Chukka</div>

};

export default SocketClient;