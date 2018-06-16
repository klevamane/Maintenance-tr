let token;
let requestId;
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

 // fetch('https://maintenancetr.herokuapp.com/api/v1/users/requests', {
    fetch(`http://localhost:3000/api/v1/users/requests/${requestId}`, { 
    method: 'GET',
    headers: {'Authorization': 'Bearer ' + token}
}).then(response => response.json())
  .then((data) => {
        let completedata = data;
        console.log(`The completed data is ${completedata.requestFoundById[0].id}`);
        console.log(`The completed data2 is ${data.id}`)
        console.log(`Request data found by Id ${requestId}`);
        let theOutput ='';
        let statusIconIndicator;
        if(completedata) {

                if(completedata.requestFoundById[0].status === 'Inactive') {
                    statusIconIndicator = 'status-pill-inactive'
                } else if(completedata.requestFoundById[0].status === 'Pending') {
                    statusIconIndicator = 'status-pill-pending';
                } else if(completedata.requestFoundById[0].status ==='Disapproved') {
                    statusIconIndicator = 'status-pill-rejected';
                }
                else {
                    statusIconIndicator = 'status-pill-accepted';
                }
                let other = (completedata.requestFoundById[0].other === null)? '': completedata.requestFoundById[0].other;
                timeStamp = new Date(completedata.requestFoundById[0].createdon);
                dateTime = timeStamp.toDateString();
                theOutput +=`<span>
                <strong class="adminrequestheader">${completedata.requestFoundById[0].fault}</strong>
                <hr>
                <h4>${completedata.requestFoundById[0].brand}</h4>
                <h5>Type: <span id="maintenanceheeading">${other}</span></h5>
            </span>
            <p>${completedata.requestFoundById[0].description}
            </p>
            <hr>
            
            <span class="${statusIconIndicator}">${completedata.requestFoundById[0].status}</span>
            <span class="status-date">${dateTime}</span>`;
        }
        else {
            toastr.warning(data.message);
        }
        
        document.getElementById('maintenanceheeading').innerHTML = theOutput;
        //console.log(data.allUserRequests.length);
    })
  .catch(err => console.log(err));
