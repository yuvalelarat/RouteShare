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

        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });
};

export const emitNewJourney = (tripId, newJourney) => {
    io.to(tripId).emit('new-journey', newJourney);
};

export const emitDeleteJourney = (tripId, deleteJourney) => {
    io.to(tripId).emit('delete-journey', deleteJourney);
};