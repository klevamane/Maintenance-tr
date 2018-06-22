try {
// Access data from local storage
let dataFromLocalStorage = localStorage.getItem('dataAccessibleToOtherPages');
let recievedToken = JSON.parse(dataFromLocalStorage).token;

// Decode the token
let base64Url = recievedToken.split('.')[1];
let base64 = base64Url.replace('-', '+').replace('_', '/');
let payload=JSON.parse(window.atob(base64));

const tokenIssuedTimeInSeconds = payload.iat;
const tokenExpiryInSeconds = payload.exp;

const currentTime = Math.floor(Date.now()/1000);

if(tokenIssuedTimeInSeconds <= currentTime &&  tokenExpiryInSeconds >= currentTime) {
    console.log('Valid user');
}
 else {
    // Token has expired and is invalid, or token is invalid 
    console.log('welcome');
    window.location.replace('./Index.html');
    }
}
catch(e) {
    console.log(e);
// returning to index may be as a result of the required data is not available
// In the local storage, which indicates that the user has not been authenticated
// there for cannot access the page and should be redirected to the index
    window.location.replace('./Index.html');
}