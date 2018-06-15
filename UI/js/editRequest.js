let token;
let requestId;
const requestform = document.getElementById('requestform');
//window.onload = getuserRequests();
try{
    let retrievedUserDataFromLocalStorage = localStorage.getItem('dataAccessibleToOtherPages');
    token = JSON.parse(retrievedUserDataFromLocalStorage).token;
    requestId =  localStorage.getItem('requestid'); 
  }
  catch(err) {
    console.log(err)
    errorDetection = true;
  }

 // fetch(`https://maintenancetr.herokuapp.com/api/v1/users/requests/${requestId}`, {
    fetch(`http://localhost:3000/api/v1/users/requests/${requestId}`, { 
    method: 'GET',
    headers: {'Authorization': 'Bearer ' + token}
}).then(response => response.json())
  .then((data) => {
        let completedata = data;
        console.log(`The completed data is ${completedata.requestFoundById[0].id}`);
        console.log(`The completed data2 is ${data.id}`)
        console.log(`Request data found by Id ${requestId}`);
        if(completedata) {

            let brand = document.getElementById('brand');
            let fault = document.getElementById('fault');
            let model = document.getElementById('model');
            let type = document.getElementById('type');
            let description = document.getElementById('description');

            brand.value = completedata.requestFoundById[0].brand;
            description.value = completedata.requestFoundById[0].description;
            model.value = completedata.requestFoundById[0].modelnumber;
            fault.value = completedata.requestFoundById[0].fault;
            type.value = completedata.requestFoundById[0].other;
            }
                
    })
  .catch(err => console.log(err));

  document.getElementById('updatebtn').addEventListener('click', function(event) {
    event.preventDefault();
    let checker;
    // getuser data from client
   const retrievedUserDataFromLocalStorage = localStorage.getItem('dataAccessibleToOtherPages');
   const token = JSON.parse(retrievedUserDataFromLocalStorage).token;
    let faultValue = document.getElementById('fault');
    let fault = faultValue.options[faultValue.selectedIndex].value;
    let brand = document.getElementById('brand').value;
    let modelnumber = document.getElementById('model').value;
    let description = document.getElementById('description').value;
    let otherValue = document.getElementById('type');
    let other = otherValue.options[otherValue.selectedIndex].value;

    // Remember to use content-type application/json header
    // to avoid vaidation issues in post
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${token}`);
    //fetch('https://maintenancetr.herokuapp.com/api/v1/users/requests', {
        fetch(`http://localhost:3000/api/v1/users/requests/${requestId}`, {
        method: 'PUT',
        body: JSON.stringify({
          brand,
          modelnumber,
          fault,
          other,
          description  
        }),
        headers
        }).then((response) => {
           if(response.status === 200) {
               toastr.success('Request has been modified');
               checker = true;
               // remove text from form controls
               requestForm.reset();
             //  window.location.replace('../userrequests.html');
          }
           if(response.status === 401) {
                window.location.replace('./Index.html');
            } 
           return response.json();
        }).then((result) => {
            // Error exists if checker !== true
            if(checker !== true) {
            // extract the object value from the key, to determine the validation error throw by the api validator
            const displayError = Object.values(result);
            toastr.error(displayError);
            }
        })
        .catch(err => console.log(err));
  });