let token;
let requestId;
let theOutput ='';
let completedata;
const requestform = document.getElementById('requestform');
//window.onload = getuserRequests();
try{
    let retrievedUserDataFromLocalStorage = localStorage.getItem('dataAccessibleToOtherPages');
    token = JSON.parse(retrievedUserDataFromLocalStorage).token;
  }
  catch(err) {
    console.log(err)
    errorDetection = true;
  }

fetch('https://maintenancetr.herokuapp.com/api/v1/requests', {
 // fetch(`http://localhost:3000/api/v1/requests`, { 
    method: 'GET',
    headers: {'Authorization': 'Bearer ' +token}
}).then(response =>{ 
    // Redirect the user to the login page
    // If the user is not an admin
    if(response.status === 401) {
        window.location.replace('./Index.html');
    }
    return response.json()
})
  .then((data) => {
    console.log(`MAIN DATA OH ${data}`);  
    completedata = data.allRequests;
    console.log(`COMPLETED DATA OH ${completedata[1].id}`);
   
    const filteredArray = completedata.filter(element => element.status = 'Inactive');

    console.log(`FILTERED ARRAY OH .... ${filteredArray[1].status}`);
    console.log(`TOKEN OH ${token}`);
    if(completedata) {
        completedata.forEach((item) => {
            timeStamp = new Date(item.createdon);
            dateTime = timeStamp.toDateString();
            
            theOutput +=`<tr id="listofrequests"><a href=""></a><td data-label="Request Id">${item.id}</td> </a>
            <td data-label="Brand">${item.userid}</td>
            <td data-label="Brand">${item.brand}</td>
            <td data-label="Type">${item.other}</td>
            <td data-label="Status">${item.name}</td>
            <td data-label="Status"><a href="./Request-status.html" class="btn view-detail" id="${item.id}" onClick="adminviewonerequest(this.id)">view</a></td>
            <td data-label="Cancel"><button class="danger" id="${item.id}" name="${item.name}" onClick="return cancelrequest(this.id, this.name)"><i class="fa fa-trash"> Cancel Request</i></button></td>
          </tr>`;
         let preloader = document.getElementById("loader");
         preloader.style.display = 'none'; 
        });
    }
    else {
        toastr.warning(data.message);
    }
    document.getElementById('tablebody').innerHTML = theOutput;           
    })
  .catch((err) => {
    toastr.warning('Unable to display data try refreshing your browser');  
    console.log(err)
});


  function adminviewonerequest (adminViewSelectedRequestId) {
    // store the request Id in local storage when the button is clicked
    // from the client
    localStorage.setItem('adminActionableRequestView', adminViewSelectedRequestId);
    window.location.href('./Request-status.html'); 
}


  function cancelrequest(requestToBeDisapprovedId, selectedRequestStatus) {
    console.log(`TTHE ID ${requestToBeDisapprovedId}`);
    console.log(`TTHE STATUS ${selectedRequestStatus}`);
    if(selectedRequestStatus === 'Resolved' || selectedRequestStatus === 'Disapproved') {
        toastr.error('You cannot disapprove a request that has already been resolved or disapproved');
    } 
    else {
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization', `Bearer ${token}`);
      //  fetch(`http://localhost:3000/api/v1/requests/${requestToBeDisapprovedId}/disapprove`, {
        fetch(`http://maintenancetr.herokuapp.com/api/v1/requests/${requestToBeDisapprovedId}/disapprove`, {
            method: 'PUT',
            headers
        }).then((response) => {
            if(response.status === 200) {
                checker = true;
                window.location.reload();
                if(checker === true) {
                    toastr.success('Request has been Disapproved');
                }
           }
           // Indicates that the user is unauthorized
           // and should be redirected back to the login page
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
    }
}


function filterrequests() {
    let filterOptions = document.getElementById('statusquo');
    let selectedStatusFilter = filterOptions.options[filterOptions.selectedIndex].text;
    console.log(`This the selected status OH ${selectedStatusFilter.trim()}`);
    let filteredArray = completedata.filter(element => element.name == selectedStatusFilter.trim());
    if(selectedStatusFilter === 'Choose') {
     // List all requests
        filteredArray = completedata.filter(element => element.name === element.name);
    }
    console.log(filteredArray)
    console.log(`FILTERED ARRAY LENGTH OHHH ${filteredArray.length}`);
    if(filteredArray.length > 0) {
        theOutput = ''
        if(filteredArray) {
            filteredArray.forEach((item) => {
                timeStamp = new Date(item.createdon);
                dateTime = timeStamp.toDateString();
                theOutput +=`<tr id="listofrequests"><a href=""></a><td data-label="Request Id">${item.id}</td> </a>
                <td data-label="Brand">${item.userid}</td>
                <td data-label="Brand">${item.brand}</td>
                <td data-label="Type">${item.other}</td>
                <td data-label="Status">${item.name}</td>
                <td data-label="Status"><a href="./Request-status.html" class="btn view-detail" id="${item.id}" onClick="adminviewonerequest(this.id)">view</a></td>
                <td data-label="Cancel"><button class="danger" id="${item.id}" name="${item.name}" onClick="return cancelrequest(this.id, this.name)"><i class="fa fa-trash"> Cancel Request</i></button></td>
              </tr>`;
            // let preloader = document.getElementById("loader");
            // preloader.style.display = 'none'; 
            let tableBody = document.getElementById('tablebody');
                while(tableBody.firstChild) {
                    tableBody.removeChild(tableBody.firstChild);
            }
             tableBody.innerHTML = theOutput;
            })
       
    }
     } else {
        let tableBody = document.getElementById('tablebody');
        tableBody.innerHTML = '';
        toastr.warning('The filter retured no result');
        }
    
}