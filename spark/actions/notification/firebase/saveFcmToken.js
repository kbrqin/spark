"use server";

import { createClient } from "@/utils/supabase/server";

export const saveFcmToken = async ({ token, deviceId }) => {
  const supabase = await createClient();

  const { error } = await supabase.from("push_notifications").upsert(
    {
      endpoint: token,
      device_id: deviceId,
    },
    {
      onConflict: "user_id,device_id",
    }
  );

  if (error) {
    console.log("Error saving FCM token:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
};

// "use server";

// import { createClient } from "@/utils/supabase/server";

// // Purpose: Save the retrieved FCM token into Supabase database
// export const saveFcmToken = async (token) => {
//   const supabase = await createClient();

//   const deviceId =
//   localStorage.getItem("device_id") ??
//   (() => {
//     const id = crypto.randomUUID();
//     localStorage.setItem("device_id", id);
//     return id;
//   })();

//   const { error } = await supabase.from("push_notifications").upsert(
//     {
//         endpoint: token,
//         device_id: deviceId,
//     },
//     {
//         onConflict: "user_id,device_id",
//     }
//     );

//   if (error) {
//     console.log("Error saving FCM token:", error);
//     return { success: false, error: error.message };
//   }

//   return { success: true, message: "FCM Token saved successfully" };
// };
