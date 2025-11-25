import { ChatBotRepository } from "../domain/repository/chatBotRepository";

export class ChatBotDriver implements ChatBotRepository {
  async createChat(msg: string, userId: string = "hola", session: string): Promise<{ output: string }[]> {
    const req = await fetch("http://127.0.0.1:5000/agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ msg: msg, userId: userId, sessionId: session }),
    });

    if (!req.ok) {
      const errorText = await req.text();
      throw new Error(`Error HTTP ${req.status} ${req.statusText}: ${errorText}`);
    }

    const contentType = req.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      throw new Error(`Respuesta inválida: Se esperaba JSON pero se recibió ${contentType}`);
    }

    const text = await req.text();
    if (!text.trim()) {
      throw new Error("Respuesta vacía del servidor de IA");
    }

    try {
      const res: { output: string }[] = JSON.parse(text);
      return res;
    } catch (e) {
      throw new Error("Error al parsear la respuesta JSON del servidor de IA");
    }
  }
}
