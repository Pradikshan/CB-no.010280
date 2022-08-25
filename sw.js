//Static cache and the dynamic cache
const statCache="statv1";
const dynaCache="dynav1";

//Storing the assets to be cached in an array
const assets=["/","/a_form.html","/activities.html","/attractions.html","/beaches.html","/cave.html","/donate_form.html","/fallback.html","/galle.html","/heritage.html","/homepage.html","/purchase.html","/sigiriya.html","/Styles/a_form.css","/Styles/activities.css","/Styles/beaches.css","/Styles/cave.css","/Styles/donate_form.css","/Styles/fallback.css","/Styles/galle.css","/Styles/heritage.css","/Styles/homepage.css","/Styles/purchase.css","/Styles/sigiriya.css","/Styles/attractions.css","/Scripts/pass.js","/Scripts/d_form.js","/main.js","/site.webmanifest","/android-chrome-192x192.png","android-chrome-512x512.png","apple-touch-icon.png","favicon-16x16.png","favicon-32x32.png","favicon.ico","/images/Activity/background.webp","/images/Activity/ct1.webp","/images/Activity/elephants.webp","/images/Activity/hiking.webp","/images/Activity/hot air balloon.webp","/images/Activity/seafood.webp","/images/Icons/facebook.webp","/images/Icons/instagram.webp","/images/Icons/reddit.webp","/images/Icons/travel.webp","/images/Icons/twitter.webp","/images/Icons/youtube.webp","/images/Purchase/Dehiwala_Zoo_Museum.webp","/images/Purchase/embark.webp","/images/Purchase/Gem.webp","/images/Purchase/Header.webp","/images/Purchase/Maligawa.webp","/images/Purchase/rasksha masks.webp","/images/Purchase/stick.jfif","/images/Purchase/tea.webp"];

//Install event
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(statCache)
    .then((cache)=>{
        console.log("Caching assets...");
        cache.addAll(assets);
    })
    ); 
});

//Activate event
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
        .then((keys)=>{
            return Promise.all(
                keys.filter(key=>key!==statCache && key!==dynaCache)
                .map(key=>caches.delete(key))
            );
        })
    );
});

//Fetch event handler
self.addEventListener("fetch", event => { 
    event.respondWith(
        caches.match(event.request)
        .then((cacheRes) => {
            return cacheRes || fetch(event.request)
            .then(fetchRes=>{
                return caches.open(dynaCache)
                .then(cache=>{
                    cache.put(event.request.url,fetchRes.clone());
                    return fetchRes;
                });
            });
        }).catch(()=>{
            if(event.request.url.indexOf(".html")>-1){
                return caches.match("/fallback.html")
            }
            })
    );
})