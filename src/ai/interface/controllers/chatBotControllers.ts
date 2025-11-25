import { ChatBotDriver } from "../../infrastructure/chatBot.driver";
import { ChatApp } from "../../applications/chatBot.apps/chat";
import { Request, Response } from "express";

const chatDriver = new ChatBotDriver();
const chatApp = new ChatApp(chatDriver);

export class ChatControllers {
  async chat(req: Request, res: Response): Promise<any> {
    try {
      const userId = req.user.id;
      const { sessionId, msg }: { session?: string; sessionId?: string; msg: string } = req.body;

      if (!msg || !sessionId) {
        return res.status(400).json({ msg: "Faltan campos requeridos: 'msg' y 'sessionId'" });
      }

      const resChat: { output: string }[] = await chatApp.exec(msg, userId, sessionId);

      return res.status(200).json(resChat);
    } catch (error: any) {
      console.error("Error en ChatController:", error.message);

      if (error.message.includes("Error HTTP") || error.message.includes("Respuesta inválida") || error.message.includes("Respuesta vacía")) {
        return res.status(502).json({ msg: "Error de comunicación con el servicio de IA", error: error.message });
      }

      return res.status(500).json({ msg: "Error inesperado, por favor intente de nuevo más tarde" });
    }
  }
}
