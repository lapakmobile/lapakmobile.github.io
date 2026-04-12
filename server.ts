import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for sending price alert emails
  app.post("/api/send-price-alert", async (req, res) => {
    const { email, productName, targetPrice, currentPrice } = req.body;

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return res.status(500).json({ error: "Email service not configured" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
      const { data, error } = await resend.emails.send({
        from: "LapakMobile <alerts@resend.dev>", // Note: In production, use a verified domain
        to: [email],
        subject: `⚡ Alert Harga: ${productName} Turun!`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; rounded: 10px;">
            <h2 style="color: #00ffa3;">LapakMobile Price Alert</h2>
            <p>Halo!</p>
            <p>Kabar gembira! Harga produk <strong>${productName}</strong> yang Anda pantau telah mencapai target.</p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 5px 0;">Harga Target: <strong>Rp ${targetPrice.toLocaleString('id-ID')}</strong></p>
              <p style="margin: 5px 0;">Harga Sekarang: <strong style="color: #00ffa3;">Rp ${currentPrice.toLocaleString('id-ID')}</strong></p>
            </div>
            <p>Segera lakukan pembelian sebelum harga berubah kembali!</p>
            <a href="${req.headers.origin}" style="display: inline-block; background: #00ffa3; color: #000; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Buka LapakMobile</a>
            <hr style="margin-top: 30px; border: 0; border-top: 1px solid #eee;" />
            <p style="font-size: 12px; color: #888;">Anda menerima email ini karena Anda berlangganan alert harga di LapakMobile.</p>
          </div>
        `,
      });

      if (error) {
        console.error("Resend error:", error);
        return res.status(400).json({ error });
      }

      res.status(200).json({ success: true, data });
    } catch (err) {
      console.error("Server error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
