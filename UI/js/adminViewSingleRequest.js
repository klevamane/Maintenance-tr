let theOutput;
let token;
let requestId;
let requestStatus;
let checker;
try{
    let retrievedUserDataFromLocalStorage = localStorage.getItem('dataAccessibleToOtherPages');
    token = JSON.parse(retrievedUserDataFromLocalStorage).token;
    // retrieve the Id of the request that was clicked
    requestId =  localStorage.getItem('adminActionableRequestView'); 
  }
  catch(err) {
    console.log(err)
    errorDetection = true;
  }

    fetch(`https://maintenancetr.herokuapp.com/api/v1/requests/${requestId}`, {
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
            requestStatus = completedata.requestFoundById[0].status;
                timeStamp = new Date(completedata.requestFoundById[0].createdon);
                dateTime = timeStamp.toDateString();
                // set status class from css
                // depending on the status of the request
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
                theOutput =`<span>
                <strong class="adminrequestheader">${completedata.requestFoundById[0].fault}</strong>
                <hr>
                <h4>${completedata.requestFoundById[0].brand}</h4>
                <h5>Type: <span id="maintenanceheeading">${completedata.requestFoundById[0].other}</span></h5>
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
        
        document.getElementById('cardplaceholder').innerHTML = theOutput;
        //console.log(data.allUserRequests.length);
        }).catch(err => console.log(err));

        
        // On submit
        // extract status value from the selected dropdown option
        // not that status value is numerical
        // Implement immediate checks to avoid log trips to the server
        document.getElementById('makedecision').addEventListener('click', () => {
            let dropdownControl = document.getElementById('statusselection');
            let selectedStatus = dropdownControl.options[dropdownControl.selectedIndex].value;
            if((selectedStatus === '3' || selectedStatus === 3) && (requestStatus === 'Disapproved')) {
                toastr.error("The request has already been disapproved");
            }else if ((selectedStatus === '3' || selectedStatus === 3) && (requestStatus === 'Resolved')) {
                toastr.error("You cannot disapproved a request that has already been approved");
            }
            else if ((selectedStatus === '4' || selectedStatus === 4) && (requestStatus === 'Disapproved')) {
                toastr.error("You cannot Reolve a request that has already been Disapproved");
            }else if ((selectedStatus === '4' || selectedStatus === 4) && (requestStatus === 'Resolved')) {
                toastr.error("The request has already been resolved");
            }else if ((selectedStatus === '2' || selectedStatus === 2) && (requestStatus === 'Pending')) {
                toastr.error("The request has already been approved");
            }else if ((selectedStatus === '2' || selectedStatus === 2) && (requestStatus === 'Disapproved')) {
                toastr.error("You cannot Approve a request that has already been Disapproved");
            }else if ((selectedStatus === '2' || selectedStatus === 2) && (requestStatus === 'Resolved')) {
                toastr.error("You cannot Approve a request that has already been Resolve");
            }
            else {
                // write less code by checking for the status selected
                // and implementing the fetch routes with variables
                // since the resolve, approve and disapprove route are 
                // very similar. 
                let message;
                let decision;
                if(selectedStatus === 3 || selectedStatus === '3') {
                    message = 'Request has been disapproved';
                    decision = 'disapprove';
                }
                else if (selectedStatus === 4 || selectedStatus === '4') {
                    message = 'The request has been resolved';
                    decision = 'resolve';
                }
                else {
                    message = 'The request has been approved';
                    decision = 'approve'
                }

                let headers = new Headers({'Content-Type': 'application/json'});
                headers.append('Authorization', `Bearer ${token}`);            
                
                // use this code for approve, disapprove and resolve implentations
                fetch(`https://maintenancetr.herokuapp.com/api/v1/requests/${requestId}/${decision}`, {
                     method: 'PUT',
                     headers
                       }).then((response) => {
                             if(response.status === 200) {
                                toastr.success(message);
                                checker = true;
                                window.location.reload();
                    }
                    // If status = 401 the user is unauthorized
                    // return to login
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
                    }
                });
