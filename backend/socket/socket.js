import { Server } from "socket.io";

export let io;

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        console.log("a user connected");

        socket.on('join-trip', (tripId) => {
            socket.join(tripId);
            console.log(`User joined trip: ${tripId}`);
        });

        socket.on('join-journey', (journeyId) => {
            socket.join(journeyId);
            console.log(`User joined journey: ${journeyId}`);
        });

        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });
};

export const emitNewJourney = (tripId, newJourney) => {
    io.to(tripId).emit('new-journey', newJourney);
};

export const emitEditJourney = (tripId, updatedJourney) => {
    io.to(tripId).emit('edit-journey', updatedJourney);
};

export const emitDeleteJourney = (tripId, deleteJourney) => {
    io.to(tripId).emit('delete-journey', deleteJourney);
};

export const emitNewActivity = (journeyId, newActivity) => {
    io.to(journeyId).emit('new-activity', newActivity);
};

export const emitDeleteActivity = (journeyId, deleteActivity) => {
    io.to(journeyId).emit('delete-activity', deleteActivity);
};