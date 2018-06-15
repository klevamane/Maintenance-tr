let token
//window.onload = getuserRequests();
try{
    let retrievedUserDataFromLocalStorage = localStorage.getItem('dataAccessibleToOtherPages');
    token = JSON.parse(retrievedUserDataFromLocalStorage).token;
  }
  catch(err) {
    console.log(err)
    errorDetection = true;
  }

 // fetch('https://maintenancetr.herokuapp.com/api/v1/users/requests', {
    fetch('http://localhost:3000/api/v1/users/requests', { 
    method: 'GET',
    headers: {'Authorization': 'Bearer ' + token}
}).then(response => response.json())
  .then((data) => {
        let completedata = data.allUserRequests;
        let theOutput ='';
        let statusIconIndicator;
        if(completedata) {
            completedata.forEach((item) => {

                if(item.status === 'Inactive') {
                    statusIconIndicator = 'status-pill-inactive'
                } else if(item.status === 'Pending') {
                    statusIconIndicator = 'status-pill-pending';
                } else if(item.status ==='Disapproved') {
                    statusIconIndicator = 'status-pill-rejected';
                }
                else {
                    statusIconIndicator = 'status-pill-accepted';
                }
                timeStamp = new Date(item.createdon);
                dateTime = timeStamp.toDateString();
                theOutput +=`<a href="./Request-info.html" class="card-redirect-tag" id="${item.id}" onClick="getcardid(this.id)">
                    <div class="card-fluid pad20 marg-top10y userrequests-card">
                        <span>
                            <strong>${item.fault}</strong>
                        </span>
                        <p>${item.description}
                        </p>
                        <hr>
                        <span class="${statusIconIndicator}">${item.status}</span>
                        <span class="status-date">${dateTime}</span>
                    </div>
                 </a>`;
            });
        }
        else {
            toastr.warning(data.message);
        }
        
        document.getElementById('cardplaceholder').innerHTML = theOutput;
        console.log(`GETTING ALL DATA FOR A USER  ${data.allUserRequests[0].id}`);
        //console.log(data.allUserRequests.length);
    })
  .catch(err => console.log(err));

  // Store the card Id in localstorage
  function getcardid(retrievedId) {
    window.localStorage.setItem('requestid', retrievedId);
  }