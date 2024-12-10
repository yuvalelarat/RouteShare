import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:10000');

const useJourneySocket = (journey_id, setActivities) => {
    useEffect(() => {
        socket.emit('join-journey', journey_id);

        socket.on('new-activity', (newActivity) => {
            setActivities((prevActivities) => [...prevActivities, newActivity]);
        });

        return () => {
            socket.off('new-activity');
            socket.emit('leave-journey', journey_id);
        };
    }, [journey_id, setActivities]);
};

export default useJourneySocket;
