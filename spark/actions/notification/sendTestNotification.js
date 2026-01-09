    "use server";

    import { sendNotification } from "@/lib/firebase/sendNotification";
    import { createClient } from "@/utils/supabase/server";

    export async function sendTestNotification() {
    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return { success: false, error: "Not authenticated" };
    }

    // fetch saved tokens for the user
    const { data: tokens, error: tokenError } = await supabase
        .from("push_notifications")
        .select("endpoint")
        .eq("user_id", user.id);

    if (tokenError || !tokens?.length) {
        return { success: false, error: "No tokens found" };
    }
    console.log("TOKENS: ");
    console.log(tokens);

    console.log("sending message...");
    
    await sendNotification(
        "weeee test test",
        "test push",
        tokens
    );
    
    console.log("message sent");

    return { success: true };
    }
