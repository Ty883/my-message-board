// sw.js
const SB_URL = 'https://iatkqxybgldhxzgqrbxq.supabase.co';
const SB_KEY = 'sb_publishable_29_UPCY6LIOTBTn_UwNrsA_a4uVSxeq';

self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-messages') {
    event.waitUntil(checkNewMessages());
  }
});

async function checkNewMessages() {
  // We fetch only the latest message ID
  const response = await fetch(`${SB_URL}/rest/v1/messages?select=id&order=created_at.desc&limit=1`, {
    headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${SB_KEY}` }
  });
  const data = await response.json();
  
  if (data && data.length > 0) {
    const lastSeen = await getFromCache('last_seen_id');
    if (data[0].id !== lastSeen) {
      // New message detected! Update badge
      if (navigator.setAppBadge) {
        // We can't know the exact count easily in the background, 
        // so we set it to '1' or a generic indicator
        navigator.setAppBadge(1);
      }
    }
  }
}

// Helper to check local storage inside worker
function getFromCache(key) {
  return new Promise((resolve) => {
    // Service workers use IndexedDB or Cache API instead of localStorage
    resolve(null); 
  });
}
