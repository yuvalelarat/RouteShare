import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:10000');

const useTripSocket = (trip_id, setJourneys) => {
    useEffect(() => {
        socket.emit('join-trip', trip_id);

        socket.on('new-journey', (newJourney) => {
            setJourneys((prevJourneys) =>
                [...prevJourneys, newJourney].sort((a, b) => a.day_number - b.day_number),
            );
        });

        socket.on('delete-journey', (deletedJourneyId) => {
            setJourneys((prevJourneys) =>
                prevJourneys.filter((journey) => journey.journey_id !== deletedJourneyId),
            );
        });

        socket.on('edit-journey', (updatedJourney) => {
            setJourneys((prevJourneys) =>
                prevJourneys
                    .map((journey) =>
                        journey.journey_id === updatedJourney.journey_id ? updatedJourney : journey,
                    )
                    .sort((a, b) => a.day_number - b.day_number),
            );
        });

        return () => {
            socket.off('new-journey');
            socket.off('delete-journey');
            socket.off('edit-journey');
            socket.emit('leave-trip', trip_id);
        };
    }, [trip_id, setJourneys]);
};

export default useTripSocket;
