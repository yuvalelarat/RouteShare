import dataSource from '../db/connection.js';
import { User } from '../models/user.js';
import { Trip } from '../models/trip.js';
import { TripParticipant } from '../models/tripParticipant.js';
import { checkIfEntitiesExist } from '../utils/errorHelpers.js';

const tripRepository = dataSource.getRepository(Trip);

export const createTripService = async (user_id, trip_name, start_date, end_date, description) => {
    const user = await dataSource.getRepository(User).findOneBy({ user_id });

    const entitiesNotFound = await checkIfEntitiesExist([user], ['User']);
    if (entitiesNotFound) return { error: 'User not found' };

    const existingTripsCount = await tripRepository.count({
        where: { user: { user_id } }
    });
    if (existingTripsCount >= 3) {
        throw new Error('User already has 3 trips. Cannot create another trip.');
    }

    const newTrip = tripRepository.create({
        user,
        trip_name,
        start_date,
        end_date,
        description
    });

    const savedTrip = await tripRepository.save(newTrip);

    const tripParticipantRepository = dataSource.getRepository(TripParticipant);
    const newParticipant = tripParticipantRepository.create({
        trip: savedTrip,
        user,
        role: 'admin'
    });

    await tripParticipantRepository.save(newParticipant);

    return {
        trip: {
            ...savedTrip,
            user: {
                user_id: savedTrip.user.user_id,
                email: savedTrip.user.email
            },
            participants: [
                {
                    trip_participant_id: newParticipant.trip_participant_id,
                    user_id: newParticipant.user.user_id,
                    role: newParticipant.role
                }
            ]
        }
    };
};

export const getTripService = async (user_id, trip_id) => {
    const trip = await dataSource.getRepository(Trip).findOne({
        where: { trip_id },
        relations: ['user', 'participants', 'participants.user']
    });

    if (!trip) {
        throw new Error('Trip not found');
    }

    if (trip.user.user_id === user_id) {
        return {
            trip_id: trip.trip_id,
            trip_name: trip.trip_name,
            start_date: trip.start_date,
            end_date: trip.end_date,
            description: trip.description,
            user: {
                user_id: trip.user.user_id,
                email: trip.user.email
            },
            participants: trip.participants.map((p) => ({
                user_id: p.user.user_id,
                role: p.role
            }))
        };
    }

    const participant = trip.participants.find((p) => p.user.user_id === user_id);

    if (!participant) {
        throw new Error('You are not a participant in this trip');
    }

    if (!['view', 'edit'].includes(participant.role)) {
        throw new Error('You do not have the required role to view this trip');
    }

    return {
        trip_id: trip.trip_id,
        trip_name: trip.trip_name,
        start_date: trip.start_date,
        end_date: trip.end_date,
        description: trip.description,
        user: {
            user_id: trip.user.user_id,
            email: trip.user.email
        },
        participants: trip.participants.map((p) => ({
            user_id: p.user.user_id,
            role: p.role
        }))
    };
};

export const deleteTripService = async (user_id, trip_id) => {
    const trip = await tripRepository.findOne({
        where: {
            trip_id: trip_id,
            user: { user_id }
        },
        relations: ['user']
    });

    if (!trip) {
        throw new Error('Trip not found');
    }

    if (trip.user.user_id !== user_id) {
        throw new Error('You can only delete your own trips');
    }

    await tripRepository.delete(trip.trip_id);

    return { message: 'Trip deleted successfully' };
};

export const editTripService = async (trip_id, user_id, trip_name, start_date, end_date, description) => {
    const trip = await dataSource.getRepository(Trip).findOne({
        where: { trip_id },
        relations: ['user', 'participants', 'participants.user']
    });

    if (!trip) {
        throw new Error('Trip not found');
    }

    if (trip.user.user_id !== user_id) {
        const participant = trip.participants.find((p) => p.user.user_id === user_id);
        if (!participant || !['edit'].includes(participant.role)) {
            throw new Error('You must be the trip owner or a participant with \'edit\' role to edit this trip');
        }
    }

    trip.trip_name = trip_name || trip.trip_name;
    trip.start_date = start_date || trip.start_date;
    trip.end_date = end_date || trip.end_date;
    trip.description = description || trip.description;

    const updatedTrip = await tripRepository.save(trip);

    return {
        trip: {
            ...updatedTrip,
            user: {
                user_id: updatedTrip.user.user_id,
                email: updatedTrip.user.email
            }
        }
    };
};

export const getSharedTripsService = async (user_id) => {
    try {
        const tripRepository = dataSource.getRepository(Trip);

        const participantTrips = await tripRepository
            .createQueryBuilder('trip')
            .leftJoinAndSelect('trip.user', 'adminUser') //join to get the admin (creator) details using trip.user (creator)
            .innerJoin('trip.participants', 'participant') //join to ensure the user role is checked
            .where('participant.role IN (:...roles)', { roles: ['view', 'edit'] })
            .andWhere('participant.user_id = :user_id', { user_id }) //ensure user is a participant with the correct role
            .select([
                'trip.trip_id',
                'trip.trip_name',
                'trip.start_date',
                'trip.end_date',
                'trip.description',
                'trip.created_at',
                'trip.updated_at',
                //admin (creator) information:
                'adminUser.user_id',
                'adminUser.first_name',
                'adminUser.last_name',
                //logged-in user's role in this trip:
                'participant.role'
            ])
            .getMany();

        return { trips: participantTrips };
    } catch (err) {
        console.error('Error fetching trips:', err);
        throw new Error('Error fetching trips');
    }
};

export const getMyTripsService = async (user_id) => {
    try {
        const tripRepository = dataSource.getRepository(Trip);

        const trips = await tripRepository.find({
            where: { user: { user_id } },
            relations: ['user', 'journeys']
        });

        return {
            trips: trips.map((trip) => {
                const totalExpenses = trip.journeys.reduce((sum, journey) => sum + parseFloat(journey.expenses), 0);
                return {
                    trip_id: trip.trip_id,
                    trip_name: trip.trip_name,
                    start_date: trip.start_date,
                    end_date: trip.end_date,
                    description: trip.description,
                    created_at: trip.created_at,
                    updated_at: trip.updated_at,
                    totalExpenses,
                };
            })
        };
    } catch (err) {
        console.error('Error fetching trips:', err);
        throw new Error('Error fetching trips');
    }
};

