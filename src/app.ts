// ? importación de módulos necesarios
import express from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import cookies from "cookie-parser";

// ? importación de módulos locales
import { userRoutes } from "./userService/interfaces/routes/userService.routes";
import { autorRoutes } from "./authorService/interfaces/routes/authors.routes";
import bookRouter from "./books/interfaces/router/index";
import { authRoutes } from "./authService/interfaces/routes/auth.routes";
import session from "express-session";
import { progressRouter } from "./userPogressBooks/interface/routes/bookProgress.routes";
import { avaRoutes } from "./avatars/interface/routes/avatar.routes";
import { forosRoutes } from "./BookClub/foros/interface/routes/foros.routes";
import recommendationRouters from "./recommendations/interfaces/routers/recommendationRouters";
import gameRouter from "./ai/interface/routers/gameRouters";
import chatRouter from "./ai/interface/routers/chatBotRouters";
import memoryRouter from "./ai/interface/routers/memoryRouters";
import { bookMetricRouter } from "./metrics/interface/router/book.route";
import { subgenreMetricRouter } from "./metrics/interface/router/subgenre.route";
import { formatMetricRouter } from "./metrics/interface/router/format.route";
import { authorMetricRouter } from "./metrics/interface/router/author.route";
import { usersMetricRouter } from "./metrics/interface/router/users.route";
import { levelRoutes } from "./gamification/levels/interface/routes/level.routes";
import { medalRoutes } from "./gamification/games.medals/interface/routes/medal.routes";
import { comentRoutes } from "./BookClub/coments/interface/routes/coment.routes";
import { newsRouter } from "./BookClub/news/interface/routers/news.routes";

// ? creación de la aplicación Express
export const app = express();

// ? configuración del directorio de subida de archivos
const fileUpload = path.join(__dirname, "./uploads");
app.use(express.static(path.join(__dirname, "public")));

// ? verificación de la existencia del directorio de subida de archivos
if (!fs.existsSync(fileUpload)) fs.mkdirSync(fileUpload, { recursive: true });

// ? configuración de middlewares
app.use(
  cors({
    origin: ["http://localhost:5500", "http://localhost:3402", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(cookies());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/uploads"));

// ? configuración de sesiones
app.use(
  session({
    secret: "tu_clave_secreta",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // poner true solo si usas HTTPS
      maxAge: 3600000,
    },
  })
);

// ? configuración de rutas
app.use(userRoutes);
app.use(authRoutes);
app.use(autorRoutes);
app.use(progressRouter);
app.use(avaRoutes);
app.use(levelRoutes);
app.use(bookRouter);
app.use(forosRoutes);
app.use(recommendationRouters);
app.use(gameRouter);
app.use(chatRouter);
app.use(memoryRouter);
app.use(bookMetricRouter);
app.use(subgenreMetricRouter);
app.use(medalRoutes);
app.use(formatMetricRouter);
app.use(authorMetricRouter);
app.use(usersMetricRouter);
app.use(comentRoutes);
app.use(newsRouter);