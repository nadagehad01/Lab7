// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
    	let numberOfEntreies = 0; 
      entries.forEach(entry => {
      	numberOfEntreies = numberOfEntreies + 1;
      	let thisEntry = numberOfEntreies;
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.onclick = function(){
        	setState(false, {pageType: "Entry", entryNumber: thisEntry, entryDetails: entry}); 
        }
        document.querySelector('main').appendChild(newPost);
      });
    });
});


document.getElementsByTagName('h1')[0].onclick = function(){
	setState(false, {pageType: "Home"}); 
};
document.getElementsByTagName('img')[0].onclick = function(){
	setState(false, {pageType: "Settings"}); 
}

window.addEventListener('popstate', (event) => {
	setState(true, event.state);
});


if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}