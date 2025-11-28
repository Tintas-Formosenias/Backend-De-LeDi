import { createServer } from "http";
import { Server, Socket } from "socket.io";
import ENV from "./shared/config/configEnv";
import connections from "./shared/config/db/database";

import { ComentTypes } from "./BookClub/coments/domain/entities/coments.types";
import { findForoById, findForosLogic } from "./BookClub/foros/interface/controllers/findForo";
import { createComentLogic } from "./BookClub/coments/interface/controllers/createComentControllers";
import chalk from "chalk";
import { app } from "./app";
import {
    getAllComents,
    getComentById,
    getComentByUserID,
    getComentsByForo,
} from "./BookClub/coments/interface/controllers/findComentControllers";
import { createAnsweController } from "./BookClub/coments/interface/controllers/createAsnwer.Controller";
import { UpateController } from "./BookClub/coments/interface/controllers/update.Controller";
import { DeleteComent } from "./BookClub/coments/interface/controllers/deleteComentControllers";
import { socketAuth } from "./shared/middlewares/ValidateJWT.Socket";

const server = createServer(app);
const io = new Server(server, {

    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
});
io.use(socketAuth);

io.on("connection", async (socket: Socket) => {
    console.log("Conectado al servidor con id:", socket.id);

    try {
        const coments = await getAllComents();
        socket.emit("coments", coments);
    } catch (error) {
        socket.emit("error", { msg: "Error al cargar comentarios" });
    }
    //? get foros
    socket.on("get-all-foros", async () => {
        try {
            const foros = await findForosLogic();
            socket.emit("all-foros", foros);
        } catch (error) {
            socket.emit("error", { msg: "No se pudo obtener la lista de foros" });
        }
    });

    socket.on("get-foro-id", async (foroId: string) => {
        try {
            const foro = await findForoById(foroId);
            if (!foro) {
                socket.emit("foro-not-found", { msg: "Foro no encontrado" });
            } else {
                socket.emit("foro-data", foro);
            }
        } catch (error) {
            socket.emit("error", { msg: "Error al obtener foro por ID" });
        }
    });
    //? get Coments
    socket.on("all-public", async () => {
        try {
            const result = await getAllComents();
            console.log(result);
            io.emit("coments", result);
        } catch (error) {
            console.error("Error en all-public:", error);
            socket.emit("error", { msg: "Error al obtener todos los comentarios" });
        }
    });
    socket.on("all-public-foro", async (foroId: string) => {
        try {
            const coments = await getComentsByForo(foroId);
            socket.emit("coments-in-the-foro", coments);
        } catch (error) {
            console.error("Error en all-public-foro:", error);
            socket.emit("error", { msg: "Error al obtener comentarios del foro" });
        }
    });
    socket.on("all-publics-idUSer", async () => {
        try {
            const user = socket.data.user.id;
            if (!user) {
                socket.emit("error", { msg: "usuario no logeado" });
            }
            const result = await getComentByUserID(user);
            console.log(result);
            console.log(`comentarios de ${user},result`);
            io.emit("user-publics", result);
        } catch (error) {
            console.error("Error al traer las publicaciones del usuario:", error);
            io.emit("error", {
                msg: "Error al obtener comentarios por userID",
                error,
            });
        }
    });
    // ? get coment by id
    socket.on("get-public-id", async (idComent: any) => {
        try {
            const result = await getComentById(idComent);
            if (!result) {
                socket.emit("error", { msg: "Comentario no encontrado" });
            }
            io.emit("Coment", result);
        } catch (error) {
            console.error("Error al traer los comentarios:", error);
            io.emit("error", {
                msg: "Error al obtener comentarios por userID",
                error,
            });
        }
    });
    // ? created coment and asnwers
    socket.on("new-public", async (data: ComentTypes) => {
        try {
            const user = socket.data.user.id;
            if (!user) {
                socket.emit("error", { msg: "usuario no logeado" });
            }

            await createComentLogic(data);
            const coments = await getAllComents();
            io.emit("coments", coments);
        } catch (error) {
            console.error("Error en new-public:", error);
            socket.emit("error", { msg: "Error al crear el comentario" });
        }
    });
    socket.on("create-answer", async (idComent: any, data: ComentTypes) => {
        try {
            const user = socket.data.user.id;
            if (!user) {
                socket.emit("error", { msg: "usuario no logeado" });
            }

            await createAnsweController(idComent, data,);
            const coments = await getAllComents();
            io.emit("coments", coments);
        } catch (error) {
            console.error("Error en new-public:", error);
            socket.emit("error", { msg: "Error al crear el comentario" });
        }
    });
    //? Update and delete coments and answers
    socket.on("update-coment", async (id: any, coment: ComentTypes) => {
        try {
            const user = socket.data.user.id;
            if (!user) {
                socket.emit("error", { msg: "usuario no logeado" });
            }

            await UpateController(id, user, coment);
            const coments = await getAllComents();
            io.emit("update", coments);
        } catch (error) {
            console.error("Error en update public:", error);
            socket.emit("error", { msg: "Error al actualizar el comentario" });
        }
    });
    socket.on("delete-coment", async (id: any) => {
        try {
            const user = socket.data.user.id;
            if (!user) {
                socket.emit("error", { msg: "usuario no logeado" });
            }
            await DeleteComent(id, user);
            const coments = await getAllComents();
            io.emit("Delete", coments);
        } catch (error) {
            console.error("Error en delete publics:", error);
            socket.emit("error", { msg: "Error al eliminar el comentario" });
        }
    });
});

// ? configuración de puerto

import { initCronJobs } from "./shared/cron/awardMedalCron";

server.listen(Number(ENV.PORT), async () => {
    console.log();
    console.log(chalk.green(`server is Running on http://localhost:${ENV.PORT}`));
    console.log();
    await connections();
    initCronJobs();
});
