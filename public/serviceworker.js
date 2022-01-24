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
    event.responseWith(
        //procura o request no cache
        caches.match(event.request)
            .then(() => {
                console.log(event.request)
                //retorna os dados, caso não encontrar vai retornar a pagina de offline padrão
                return fetch(event.request)
                    .catch(() => caches.match('offline.html'))
            })
    )

});


// ativa o sw
this.self.addEventListener('activate', (event) => {

});