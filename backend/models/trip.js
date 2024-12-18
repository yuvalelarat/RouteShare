import { EntitySchema } from 'typeorm';
import { User } from './user.js';

export const Trip = new EntitySchema({
    name: 'Trip',
    tableName: 'trips',
    columns: {
        trip_id: {
            type: 'uuid',
            primary: true,
            generated: 'uuid'
        },
        trip_name: {
            type: 'varchar',
            length: 255
        },
        start_date: {
            type: 'date'
        },
        end_date: {
            type: 'date'
        },
        description: {
            type: 'text',
            nullable: true
        },
        created_at: {
            type: 'timestamp',
            createDate: true
        },
        updated_at: {
            type: 'timestamp',
            updateDate: true
        }
    },
    relations: {
        user: {
            type: 'many-to-one',
            target: 'User',
            joinColumn: {
                name: 'user_id',
                referencedColumnName: 'user_id'
            },
            onDelete: 'CASCADE'
        },
        participants: {
            type: 'one-to-many',
            target: 'TripParticipant',
            inverseSide: 'trip',
            cascade: true
        },
        journeys: {
            type: 'one-to-many',
            target: 'Journey',
            inverseSide: 'trip'
        }
    }
});
