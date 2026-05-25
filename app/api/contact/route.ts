import { NextRequest, NextResponse } from "next/server";
import { validateContactForm, hasErrors } from "@/lib/contact";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const errors = validateContactForm(body);
    
    if (hasErrors(errors)) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    const { name, email, message } = body;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Telegram env vars not configured");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Escape Markdown special characters to prevent injection
    const esc = (s: string) => s.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, "\\$1");
    const safeName = esc(name);
    const safeEmail = esc(email);
    const safeMessage = esc(message);

    const telegramMessage = `📬 *New Contact Form Message*\n\n*Name:* ${safeName}\n*Email:* ${safeEmail}\n*Message:* ${safeMessage}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage,
          parse_mode: "Markdown",
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Telegram API error:", errorData);
      return NextResponse.json(
        { success: false, error: "Failed to send message" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
