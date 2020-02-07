// window.fbAsyncInit = function() {FB.init({
// appId      : "220646009103135",
//     ookie     : true,
// xfbml      : true,
// version    : "v6.0"});
//       FB.AppEvents.logPageView();   
//       };
// (function(d, s, id){
// let js, fjs = d.getElementsByTagName(s)[0];
// if (d.getElementById(id)) {return;}
// js = d.createElement(s); js.id = id;
// js.src = "https://connect.facebook.net/en_US/sdk.js";
// fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));



// let provider = new firebase.auth.FacebookAuthProvider();



// firebase.auth().getRedirectResult().then(function(result) {
//     if (result.credential) {
//       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//       var token = result.credential.accessToken;
//       // ...
//       console.log(token)
//     }
//     // The signed-in user info.
//     var user = result.user;
//   }).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.W
//     var credential = error.credential;
//     console.log(error)
//     // ...
//   });