import { v2 as cloudinary } from "cloudinary";
import ENV from "../../config/configEnv";
import chalk from "chalk";

cloudinary.config({
    cloud_name: ENV.CLOUD_NAME,
    api_key: ENV.API_KEY,
    api_secret: ENV.API_SECRET,
});

export async function uploadNewsImage(filePath: string) {
    try {
        const result = await cloudinary.uploader.upload(filePath, { folder: "NewsImages" });
        console.log("✅Imagen de noticia subida exitosamente:", result.secure_url);
        return result;
    } catch (error) {
        console.log();
        console.error(chalk.red("Error en la utilidad: uploadNewsImage"));
        console.log();
        console.log(error);
        console.log();
    }
}

export async function deleteNewsImage(publicId: string): Promise<boolean> {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log("Imagen de noticia eliminada de cloudinary");
        return result.result === "ok";
    } catch (error) {
        console.log();
        console.error(chalk.red("Error en la utilidad: deleteNewsImage"));
        console.log();
        console.log(error);
        console.log();
        return false;
    }
}
