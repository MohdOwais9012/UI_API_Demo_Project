import axios from "axios";
import auth from "../authentication.json";

const TEAMS_WEBHOOK_URL = auth.webhookURL;

export async function sendTeamsMessage(message: string) {
  try {
    await axios.post(TEAMS_WEBHOOK_URL, {
      text: message,
    });
    console.log("✅ Message sent to Teams successfully.");
  } catch (error) {
    console.error("❌ Failed to send message to Teams:", error);
  }
}
