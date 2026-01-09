// import { getToken, messaging } from "./firebaseConfig";
// import { getDeviceId } from "@/utils/getDeviceId";
// import { saveFcmToken } from "@/actions/notification/firebase/saveFcmToken";

// export const requestNotificationPermission = async () => {
//   try {
//     const permission = await Notification.requestPermission();

//     if (permission !== "granted") {
//       console.warn("Notification permission denied.");
//       return;
//     }

//     // const registration = await navigator.serviceWorker.register(
//     //   "/firebase-messaging-sw.js"
//     // );

//     // Register the service worker
//     // await navigator.serviceWorker.register("/firebase-messaging-sw.js");

//     // Wait until the service worker is ready (active and controlling the page)
//     const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");//await navigator.serviceWorker.ready;

//     console.log("registered. getting token...");
    
//     const token = await getToken(messaging, {
//         vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_PUBLIC_KEY,
//         serviceWorkerRegistration: registration,
//     });
    
//     if (!token) {
//       console.warn("Failed to retrieve FCM token.");
//       return;
//     }

//     console.log("token acquired: ", token)
//     console.log("saving fcm token...");

//     const deviceId = getDeviceId();

//     const res = await saveFcmToken({
//       token,
//       deviceId,
//     });

//     if (!res.success) {
//       console.error("Error saving token:", res.error);
//     }

//     else console.log("token saved.");
//   } catch (error) {
//     console.error("Error requesting permission:", error);
//   }
// };
// // // Purpose: Request notification permission, retrieve FCM token and save it
// // import { getToken, messaging, } from "./firebaseConfig";
// // import { saveFcmToken } from "@/actions/notification/firebase/saveFcmToken";

// // export const requestNotificationPermission = async () => {
// //     try {
// //         const permission = await Notification.requestPermission() // Request notification permission

// //         if (permission !== "granted") {
// //             console.warn("Notification permission denied.");
// //             return;
// //         }

// //         // Register the service worker from firebase-messaging-sw.js
// //         const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js")
// //         console.log("Service Worker registered:", registration);

// //         // Request FCM token for the browser/device & link to the service worker
// //         const token = await getToken(messaging, {
// //             vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
// //             serviceWorkerRegistration: registration // Link to service worker, allowing FCM to deliver notifications properly
// //         })

// //         if (!token) {
// //             console.warn("Failed to retrieve FCM token.");
// //             return;
// //         }

// //         // Save the token to supabase
// //         const res = await saveFcmToken(token)
// //         if (!res.success) {
// //             console.error("Error saving token:", res.error);
// //             return
// //         }
// //     } catch (error) {
// //         console.error('Error requesting permission:', error)
// //     }
// // }
