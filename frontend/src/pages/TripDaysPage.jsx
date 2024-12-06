import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import PageTitle from '../components/common/PageTitle';
import TripDayCard from '../components/trip-days/TripDayCard.jsx';
import TripDetailsHeaders from '../components/trip-days/TripDetailsHeaders.jsx';
import BluredCard from '../components/trip-days/BluredCard/BluredCard.jsx';
import { useGetAllJourneysQuery } from '../redux/rtk/journeyDataApi.js';
import { useParams } from 'react-router-dom';
import './TripDaysPage.css';
import { calculateNumberOfDays, calculateJourneyDate } from '../utils/common.utils.js';
import useTripSocket from '../hooks/useTripSocket';
import TripContext from '../context/TripContext';

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

    useTripSocket(trip_id, setJourneys);

    const tripName = data?.trip_name;
    const tripAdmin = data?.trip_admin.admin_name;
    const startDate = data?.start_date;
    const endDate = data?.end_date;
    const numberOfJourneys = journeys.length;
    const numberOfDays = calculateNumberOfDays(startDate, endDate);

    const newJourneyDetails = (journeyId, newDate, newDayNumber, newLocation, newDescription) => {
        setJourneys((prevJourneys) =>
            prevJourneys.map((journey) =>
                journey.journey_id === journeyId
                    ? {
                          ...journey,
                          day_number: newDayNumber,
                          date: newDate,
                          country: newLocation,
                          description: newDescription,
                      }
                    : journey,
            ),
        );
        socket.emit('edit-journey', {
            journey_id: journeyId,
            day_number: newDayNumber,
            date: newDate,
            country: newLocation,
            description: newDescription,
        });
    };

    if (isLoading) {
        return <div>Loading journeys...</div>;
    }

    if (error) {
        return <div>Error loading journeys: {error.message}</div>;
    }
    return (
        <TripContext.Provider
            value={{
                trip_id,
                tripName,
                tripAdmin,
                startDate,
                endDate,
                journeys,
                userRole: data.user_role,
                newJourneyDetails,
            }}>
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
                        startDate={new Date(startDate).toLocaleDateString('en-GB')}
                        endDate={new Date(endDate).toLocaleDateString('en-GB')}
                    />
                ))}
                {numberOfJourneys !== numberOfDays && data.user_role !== 'view' && (
                    <BluredCard
                        startDate={new Date(startDate).toLocaleDateString('en-GB')}
                        endDate={new Date(endDate).toLocaleDateString('en-GB')}
                    />
                )}
            </div>
        </TripContext.Provider>
    );
}

export default TripDaysPage;
