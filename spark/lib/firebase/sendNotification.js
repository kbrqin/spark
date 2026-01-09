import admin from "@/lib/firebase/firebaseAdmin";

// Purpose: Send push notification when an event occurs in Supabase
export const sendNotification = async (title, body, recipients) => {
  // try {

  console.log("sending message...");

  const message = {
    data: { title, body },
    tokens: recipients.map((recipient) => recipient.endpoint),
  };

  admin.messaging().sendEachForMulticast(message).then((response) => {
    if (response.failureCount > 0) {
      const failedTokens = [];
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failedTokens.push(registrationTokens[idx]);
        }
      });
      console.log("List of tokens that caused failures: " + failedTokens);
    }
  });

  console.log("message sent: ", message);

  //     ;

  //     console.log(`Notification sent! Success: ${response.successCount}, Failures: ${response.failureCount}`);

  //     if (response.failureCount > 0) {
  //         response.responses.forEach((res, index) => {
  //             if (!res.success && res.error.code === 'messaging/registration-token-not-registered') {
  //                 console.warn(`⚠️ Invalid token found: ${recipients[index].endpoint}`);
  //             }
  //         });
  //     }
  // } catch (error) {
  //     console.error('Error sending notifications:', error)
  // }
};
