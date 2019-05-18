//キャッシュ名
var CACHE_NAME = 'cache-v1';

//キャッシュに入れるリソースのパス
var urlsToCache = [
    '/01_ohitsuji.html',
    '/01_taiyou.html',
    '/02_oushi.html',
    '/02_suisei.html',
    '/03_kinsei.html',
    '/03_shinwa_q1.html',
    '/04_futago.html',
    '/04_taiyoukei_q1.html',
    '/05_chikyuu.html',
    '/05_kani.html',
    '/06_kasei.html',
    '/06_shinwa_q2.html',
    '/07_shishi.html',
    '/07_taiyoukei_q2.html',
    '/08_mokusei.html',
    '/08_otome.html',
    '/09_dosei.html',
    '/09_shinwa_q3.html',
    '/10_taiyoukei_q3.html',
    '/10_tenbin.html',
    '/11_sasori.html',
    '/11_tennousei.html',
    '/12_kaiousei.html',
    '/12_shinwa_q4.html',
    '/13_ite.html',
    '/13_taiyoukei_q4.html',
    '/14_yagi.html',
    '/15_shinwa_q5.html',
    '/16_mizugame.html',
    '/17_uo.html',
    '/18_shinwa_q6.html',
    '/coin.html',
    '/functions.js',
    '/hoshizora.html',
    '/ifb.js',
    '/index.html',
    '/logincheck.js',
    '/manifest.json',
    '/OrbitControls.js',
    '/shinwa.html',
    '/style.css',
    '/sw.js',
    '/s_icon.jpg',
    '/taiyoukei.html',
    '/top.html',
    '/img/coin.png',
    '/img/coin_book.jpg',
    '/img/doctor.jpg',
    '/img/hatena.jpg',
    '/img/hatena.png',
    '/img/hoshizora',
    '/img/hoshizora.jpg',
    '/img/module_table_bottom.png',
    '/img/module_table_top.png',
    '/img/quiz.png',
    '/img/shinwa.png',
    '/img/taiyoukei.jpg',
    '/img/yajirushi.jpg',
    '/img/shinwa/01_ohitsuji.png',
    '/img/shinwa/02_oushi.png',
    '/img/shinwa/04_futago.png',
    '/img/shinwa/05_kani.png',
    '/img/shinwa/07_shishi.png',
    '/img/shinwa/08_otome.png',
    '/img/shinwa/10_tenbin.png',
    '/img/shinwa/11_sasori.png',
    '/img/shinwa/13_ite.png',
    '/img/shinwa/14_yagi.png',
    '/img/shinwa/16_mizugame.png',
    '/img/shinwa/17_uo.png',
    '/img/taiyoukei/01_taiyou.png',
    '/img/taiyoukei/02_suisei.jpg',
    '/img/taiyoukei/03_kinsei.jpg',
    '/img/taiyoukei/05_chikyuu.jpg',
    '/img/taiyoukei/06_kasei.jpg',
    '/img/taiyoukei/08_mokusei.jpg',
    '/img/taiyoukei/09_dosei.jpg',
    '/img/taiyoukei/11_tennousei.jpg',
    '/img/taiyoukei/12_kaiousei.jpg',
    '/img/medal_shinwa/medal_01_ohitsuji.png',
    '/img/medal_shinwa/medal_02_oushi.png',
    '/img/medal_shinwa/medal_04_futago.png',
    '/img/medal_shinwa/medal_05_kani.png',
    '/img/medal_shinwa/medal_07_shishi.png',
    '/img/medal_shinwa/medal_08_otome.png',
    '/img/medal_shinwa/medal_10_tenbin.png',
    '/img/medal_shinwa/medal_11_sasori.png',
    '/img/medal_shinwa/medal_13_ite.png',
    '/img/medal_shinwa/medal_14_yagi.png',
    '/img/medal_shinwa/medal_16_mizugame.png',
    '/img/medal_shinwa/medal_17_uo.png',
    '/img/medal_taiyoukei/medal_01_taiyou.png',
    '/img/medal_taiyoukei/medal_02_suisei.png',
    '/img/medal_taiyoukei/medal_03_kinsei.png',
    '/img/medal_taiyoukei/medal_05_chikyuu.png',
    '/img/medal_taiyoukei/medal_06_kasei.png',
    '/img/medal_taiyoukei/medal_08_mokusei.png',
    '/img/medal_taiyoukei/medal_09_dosei.png',
    '/img/medal_taiyoukei/medal_11_tennousei.png',
    '/img/medal_taiyoukei/medal_12_kaiousei.png'
];

//インストール状態のイベント処理
self.addEventListener('install', function (event) {
    event.waitUntil(

        //キャッシュの中に必要なリソースを格納する
        caches.open(CACHE_NAME).then(function (cache) {

            return cache.addAll(urlsToCache);

        })

    );
});

//有効化状態のイベント処理
self.addEventListener('activate', function (event) {
    event.waitUntil(

        //現在のキャッシュをすべて取得する
        caches.keys().then(function (cache) {
            //新しいキャッシュ以外は削除する
            cache.map(function (name) {
                if (CACHE_NAME !== name) caches.delete(name);
            })
        })

    );
});

//リクエスト取得状態のイベント処理
self.addEventListener('fetch', function (event) {
    event.respondWith(

        //リクエストに応じたリソースがキャッシュにあればそれを使う
        caches.match(event.request).then(function (res) {
            if (res) return res;

            return fetch(event.request);
        })

    );
});