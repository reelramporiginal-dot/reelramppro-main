import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase'; 
import { ReplitLoadingScene } from './ReplitLoadingScene';

export default function VideoTemplate() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [view, setView] = useState<'promo' | 'home'>('promo');

  // Bunny.net Links (Yahan apne links daal dena)
  const promoVideoUrl = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"; 

  useEffect(() => {
    async function checkSubscription() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('subscription_status')
            .eq('id', user.id)
            .single();

          if (!error && data?.subscription_status === 'premium') {
            setIsSubscribed(true);
            setView('home');
          }
        }
      } catch (err) {
        console.error("Subscription check failed:", err);
      } finally {
        setTimeout(() => setIsLoading(false), 3000);
      }
    }
    checkSubscription();
  }, []);

  if (isLoading) return <ReplitLoadingScene />;

  return (
    <div className="w-full h-screen overflow-hidden relative bg-black font-sans">
      <AnimatePresence mode="wait">
        
        {!isSubscribed && view === 'promo' && (
          <motion.div 
            key="paywall" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="w-full h-full relative"
          >
            <video src={promoVideoUrl} className="w-full h-full object-cover opacity-60" autoPlay muted loop playsInline />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center bg-gradient-to-t from-black via-transparent to-black">
              <h1 className="text-4xl font-black mb-4 tracking-tighter">KUKU TV <span className="text-red-600">PREMIUM</span></h1>
              <p className="text-xl mb-8 max-w-md text-gray-200">Poori video dekhne ke liye ₹2 ka trial plan active karein.</p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-full font-bold text-xl shadow-2xl transition-all transform hover:scale-105">
                Pay ₹2 Now
              </button>
              <button onClick={() => setView('home')} className="mt-6 text-gray-400 hover:text-white underline text-sm">
                Skip Preview (Free Content Only)
              </button>
            </div>
          </motion.div>
        )}

        {(isSubscribed || view === 'home') && (
          <motion.div 
            key="home" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="w-full h-full p-8 text-white overflow-y-auto bg-[#0a0a0a]"
          >
            <header className="flex justify-between items-center mb-10">
              <h1 className="text-3xl font-black text-red-600 tracking-tighter">KUKU TV</h1>
              <div className="flex gap-4">
                 {!isSubscribed && <button className="bg-red-600 text-xs px-4 py-2 rounded-md font-bold">UPGRADE</button>}
                 <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700" />
              </div>
            </header>
            <section>
              <h2 className="text-2xl font-bold mb-6">Short Stories For You</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                <div className="group relative">
                  <div className="aspect-[9/16] bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 group-hover:border-red-600 transition-all flex items-center justify-center">
                    {!isSubscribed && <span className="text-4xl">🔒</span>}
                  </div>
                  <p className="mt-3 font-semibold text-gray-300">Desi Kahani - Part 1</p>
                </div>
              </div>
            </section>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
