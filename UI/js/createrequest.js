var newRequestSubmitButton = document.getElementById('usersubmit');
newRequestSubmitButton.addEventListener('click',function(event) {
const requestForm = document.getElementById('requestform');
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

    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', `Bearer ${token}`);
    fetch('https://maintenancetr.herokuapp.com/api/v1/users/requests', {
        method: 'POST',
        body: JSON.stringify({
          brand,
          modelnumber,
          fault,
          other,
          description  
        }),
        headers
        }).then((response) => {
           if(response.status === 201) {
               toastr.success('Request has been created');
               checker = true;
               requestForm.reset();
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
});