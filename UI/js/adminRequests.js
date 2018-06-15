let token;
let requestId;
let theoutput ='';
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

 // fetch(`https://maintenancetr.herokuapp.com/api/v1/requests`, {
    fetch(`http://localhost:3000/api/v1/requests`, { 
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
    let completedata = data.allUserRequests;
    console.log(`COMPLETED DATA OH ${completedata}`);
    console.log(`TOKEN OH ${token}`);
    if(completedata) {
        completedata.forEach((item) => {
            timeStamp = new Date(item.createdon);
            dateTime = timeStamp.toDateString();
            theOutput +=`<tr><a href=""></a><td data-label="Request Id">${item.id}</td> </a>
            <td data-label="Brand">${item.brand}</td>
            <td data-label="Type">${item.other}</td>
            <td data-label="Status">${item.status}</td>
            <td data-label="Status"><a href="./Request-info.html" class="btn view-detail" id="${item.id}">view</a></td>
            <td data-label="Cancel"><button class="danger" id="cancelrequest"><i class="fa fa-trash"> Cancel Request</i></button></td>
          </tr>`;
        });
    }
    else {
        toastr.warning(data.message);
    }
    document.getElementById('tablebody').innerHTML = theOutput;           
    })
  .catch(err => console.log(err));
