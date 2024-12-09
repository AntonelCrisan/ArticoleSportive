import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const useWebSocket = (url, topic) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const socket = new SockJS(url);
        const stompClient = new Client({
            webSocketFactory: () => socket,
            debug: console.log,
        });

        stompClient.onConnect = () => {
            console.log('Conectat la WebSocket');
            stompClient.subscribe(topic, (message) => {
                console.log('Notificare primită:', message.body);
                setNotifications((prev) => [...prev, message.body]);
            });
        };

        stompClient.onStompError = (frame) => {
            console.error('Eroare STOMP:', frame);
        };

        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, [url, topic]);

    return notifications;
};

export default useWebSocket;
