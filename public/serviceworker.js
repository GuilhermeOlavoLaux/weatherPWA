const CACHE_NAME = "version-1"

const urlsToCache = ['index.html', 'offline.html']


// instalação do service worker
this.self.addEventListener('install', (event) => {
    event.waitUntil(
        //vai aguardar ate abrir o cache, nomea-lo para 'version-1' e adicionar as urls no cache
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened Cache')
                return cache.addAll(urlsToCache)
            })
    )
});


// liesten para as requests
this.self.addEventListener('fetch', (event) => {
    event.respondWith(
        //responde com todos os requests salvos no cache
        caches.match(event.request)
            .then(() => {
                //retorna os dados, caso não tenha sucesso, vai retornar a pagina de offline padrão
                return fetch(event.request)
                    .catch(() => caches.match('offline.html'))
            })
    )

});




// ativa o sw
this.self.addEventListener('activate', (event) => {
    const cacheWhitelist = []
    cacheWhitelist.push(CACHE_NAME)
    //remove do cache tudo que não estiver no cache original (['index.html', 'offline.html'])
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName)
                }
            })
        ))
    )

});

