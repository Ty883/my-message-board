self.addEventListener('push', function(event) {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: 'https://img.icons8.com/fluency/192/000000/chat.png',
        badge: 'https://img.icons8.com/fluency/72/000000/chat.png'
    };
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});
