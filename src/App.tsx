import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import VideoTemplate from "./components/video/VideoTemplate";

export default function App() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // 1. Supabase se current login session check karna
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserEmail(session.user.email ?? null);
        console.log("User logged in:", session.user.email);
      }
    };

    checkUser();

    // 2. Login state badalne par nazar rakhna (Data Tracking)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Aapka promo video aur design 'VideoTemplate' ke andar hi hai
  // Humne bas piche se Supabase connect kar diya hai
  return (
    <div className="app-container">
      <VideoTemplate />
      
      {/* Hidden Logic: Agar aapko dashboard mein dekhna hai ki user active hai */}
      {userEmail && <span style={{display: 'none'}}>User: {userEmail}</span>}
    </div>
  );
}
