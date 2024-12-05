import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import PageTitle from '../components/common/PageTitle';
import TripDayCard from '../components/trip-days/TripDayCard.jsx';
import TripDetailsHeaders from '../components/trip-days/TripDetailsHeaders.jsx';
import BluredCard from '../components/trip-days/BluredCard/BluredCard.jsx';
import { useGetAllJourneysQuery } from '../redux/rtk/tripsDataApi.js';
import { useParams } from 'react-router-dom';
import './TripDaysPage.css';
import { calculateNumberOfDays, calculateJourneyDate } from '../utils/common.utils.js';

const socket = io('http://localhost:10000');

function TripDaysPage() {
    const { trip_id } = useParams();
    const { data, error, isLoading } = useGetAllJourneysQuery(trip_id);
    const [journeys, setJourneys] = useState([]);

    useEffect(() => {
        if (data) {
            setJourneys(data.journeys);
        }
    }, [data]);

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

        return () => {
            socket.off('new-journey');
            socket.off('delete-journey');
            socket.emit('leave-trip', trip_id);
        };
    }, [trip_id]);

    const tripName = data?.trip_name;
    const tripAdmin = data?.trip_admin.admin_name;
    const startDate = data?.start_date;
    const endDate = data?.end_date;
    const numberOfJourneys = journeys.length;
    const numberOfDays = calculateNumberOfDays(startDate, endDate);

    if (isLoading) {
        return <div>Loading journeys...</div>;
    }

    if (error) {
        return <div>Error loading journeys: {error.message}</div>;
    }
    return (
        <>
            <div className={'titleDiv '}>
                <PageTitle title={tripName} />
            </div>
            <TripDetailsHeaders
                tripAdmin={tripAdmin}
                startDate={new Date(startDate).toLocaleDateString('en-GB')}
                endDate={new Date(endDate).toLocaleDateString('en-GB')}
            />
            <div className={'cardDiv'}>
                {journeys.map((journey) => (
                    <TripDayCard
                        key={journey.journey_id}
                        dayNumber={journey.day_number}
                        country={journey.country}
                        description={journey.description}
                        expenses={journey.expenses}
                        date={calculateJourneyDate(startDate, journey.day_number)}
                        journeyId={journey.journey_id}
                    />
                ))}
                {numberOfJourneys === numberOfDays ? null : (
                    <BluredCard
                        startDate={new Date(startDate).toLocaleDateString('en-GB')}
                        endDate={new Date(endDate).toLocaleDateString('en-GB')}
                    />
                )}
            </div>
        </>
    );
}

export default TripDaysPage;
