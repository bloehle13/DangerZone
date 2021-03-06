var admobid = {};

// TODO: replace the following ad units with your own
if( /(android)/i.test(navigator.userAgent) ) {
  admobid = { // for Android
    banner: 'ca-app-pub-2641444780553413/2469205087',
    interstitial: 'ca-app-pub-2641444780553413/7377934687'
  };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
  admobid = { // for iOS
    banner: 'ca-app-pub-6869992474017983/4806197152',
    interstitial: 'ca-app-pub-2641444780553413/7377934687'
  };
} else {
  admobid = { // for Windows Phone
    banner: 'ca-app-pub-6869992474017983/8878394753',
    interstitial: 'ca-app-pub-2641444780553413/7377934687'
  };
}

function initApp() {
  if (!AdMob) { alert( 'admob plugin not ready' ); return; }
  // this will load a full screen ad on startup
  AdMob.prepareInterstitial({
    adId: admobid.interstitial,
    autoShow: true
  });

}

if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
    document.addEventListener('deviceready', initApp, false);
} else {
    initApp();
}

function prepareAd(){
  AdMob.prepareInterstitial({
    adId: admobid.interstitial,
    autoShow: false
  });
}

function showAd(){
  if(AdMob) AdMob.showInterstitial();
}
