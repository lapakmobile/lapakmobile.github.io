import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";
import dotenv from "dotenv";
import { ALL_PRODUCTS } from "./src/constants";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Google Merchant Center XML Feed
  app.get("/api/products/xml", (req, res) => {
    const baseUrl = process.env.APP_URL || `http://localhost:${PORT}`;
    
    let xml = `<?xml version="1.0"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>LapakMobile Product Feed</title>
    <link>${baseUrl}</link>
    <description>Top Up Game dan Layanan Digital Terpercaya</description>`;

    ALL_PRODUCTS.forEach(product => {
      // Use the first package as the base price for the feed
      const basePackage = product.packages[0];
      const priceValue = basePackage.price.replace(/[^0-9]/g, '');
      
      xml += `
    <item>
      <g:id>${product.id}</g:id>
      <g:title>${product.name}</g:title>
      <g:description>Top up ${product.name} murah dan instan di LapakMobile. Tersedia berbagai pilihan paket.</g:description>
      <g:link>${baseUrl}/#product-${product.id}</g:link>
      <g:image_link>${product.image.startsWith('http') ? product.image : baseUrl + '/' + product.image}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>in stock</g:availability>
      <g:price>${priceValue} IDR</g:price>
      <g:brand>LapakMobile</g:brand>
      <g:google_product_category>Software &gt; Video Game Software</g:google_product_category>
    </item>`;
    });

    xml += `
  </channel>
</rss>`;

    res.setHeader("Content-Type", "application/xml");
    res.send(xml);
  });

  // JSON Products API
  app.get("/api/products", (req, res) => {
    res.json(ALL_PRODUCTS);
  });

  // OpenAI Client
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // API Route for Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, systemInstruction } = req.body;

      if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: "OPENAI_API_KEY is not configured" });
      }

      const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemInstruction },
          ...messages.map((m: any) => ({
            role: m.role === "model" ? "assistant" : "user",
            content: m.text,
          })),
        ],
        stream: true,
      });

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }

      res.write("data: [DONE]\n\n");
      res.end();
    } catch (error) {
      console.error("OpenAI Error:", error);
      res.status(500).json({ error: "Failed to fetch from OpenAI" });
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
