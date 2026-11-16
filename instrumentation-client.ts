import { initBotId } from "botid/client/core";

// Vercel BotID: an invisible bot check attached to these requests. The estimate form's server
// actions (submitLead, signPhotoUpload) POST to /contact. Checked server-side with checkBotId().
initBotId({
  protect: [{ path: "/contact", method: "POST" }],
});
