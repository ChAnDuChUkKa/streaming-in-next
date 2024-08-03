// components/SocketClient.tsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { fetchStocksData } from '../store/stocksSlice';
import { AppDispatch } from '@/lib/store';

const SocketClient = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const socket: Socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('dataUpdated', (newData) => {
      console.log('Received data update:', newData);
      dispatch(fetchStocksData(newData)); // Update Redux state with new data
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return null;
};

export default SocketClient;
