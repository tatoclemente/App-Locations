const PUBLIC_VAPID_KEY = "BIrtHw89vM8h0t0Oe74qZSxJ-n2RvdmG4JDAzbRIBbcU7D9-acVy0Jn8NFu1E5zfRpKlVZ5WsU5O1ABOcxtZtQM"


const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;

}
const suscription = async () => {

    // Registro en el service worker
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    })

    console.log('new Service Worker');

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
    })
    await fetch('http://localhost:3001/user', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    console.log("Suscribed");

}

suscription()