import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Ambil konfigurasi dari .env
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // Cek apakah konfigurasi ada. Jika tidak, batalkan proses.
  if (!botToken || !chatId) {
    console.error("❌ TELEGRAM CONFIG MISSING: Cek file .env.local kamu");
    return NextResponse.json(
      { success: false, error: "Server misconfiguration" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { nama, whatsapp, domisili, keterangan } = body;

    // Format Pesan
    const message = `
🔔 *LEADS BARU MASUK!*

👤 *Nama:* ${nama}
📱 *WA:* [${whatsapp}](https://wa.me/${whatsapp
      .replace(/^0/, "62")
      .replace(/\+/g, "")})
📍 *Domisili:* ${domisili}
📝 *Pesan:* ${keterangan || "-"}

_Segera follow up via Dashboard Admin!_
    `;

    // Kirim ke Telegram API
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Telegram API Error: ${JSON.stringify(errorData)}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Notification Error:", error.message);
    return NextResponse.json(
      { success: false, error: "Gagal mengirim notifikasi" },
      { status: 500 }
    );
  }
}
