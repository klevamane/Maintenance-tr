const retrievedUserDataFromLocalStorage = localStorage.getItem('dataAccessibleToOtherPages');
const token = JSON.parse(retrievedUserDataFromLocalStorage).token;
if (token === null || token === '') {
    window.location.replace('./Index.html');
}
else {
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
  .catch(error => console.log(err));
 
}