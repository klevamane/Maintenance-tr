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

    fetch(`https://maintenancetr.herokuapp.com/api/v1/users/requests/${requestId}`, {
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
                timeStamp = new Date(completedata.requestFoundById[0].createdon);
                dateTime = timeStamp.toDateString();
                theOutput +=`<div class="card-fluid pad10 marg-top50y">
                <span>
                    <strong>${completedata.requestFoundById[0].fault}</strong>
                </span>
                <hr>
                <p>${completedata.requestFoundById[0].description}
                </p>
                <hr>
                <span class="${statusIconIndicator}">${completedata.requestFoundById[0].status}</span>
                <span class="status-date">${dateTime}</span>
            </div>`;
        }
        else {
            toastr.warning(data.message);
        }
        
        document.getElementById('viewrequestplachholder').innerHTML = theOutput;
        //console.log(data.allUserRequests.length);
    })
  .catch(err => console.log(err));