let errorDetection;
let retrievedUserDataFromLocalStorage;
let token;
try{
  retrievedUserDataFromLocalStorage = localStorage.getItem('dataAccessibleToOtherPages');
  token = JSON.parse(retrievedUserDataFromLocalStorage).token;
}
catch(err) {
  console.log(err)
  window.location.replace('./Index.html');
  errorDetection = true;
}
// if (token === null || token === '') {
//     window.location.replace('./Index.html');
// }
// else {
if(errorDetection !== true) {

  const headers = new Headers({'Content-Type': 'application/json'});
  headers.append('Authorization', `Bearer ${token}`);
  fetch('https://maintenancetr.herokuapp.com/api/v1/users/requests', {
    method: 'GET',
    headers
}).then((response) => {
  if(response.status === 401) {
    window.location.replace('./Index.html');
  }
  })
  .catch(err => console.log(err));
}