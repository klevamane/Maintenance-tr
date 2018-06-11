const sumbitButton = document.getElementById('submit').addEventListener('click', login);
let theAuthorizationToken;

/**
  * @description Delete a user
  * @param  {object} e gets values passed to the api
  * @param  {object} res sends result as output
  * @returns {object} Success message with the with 200 status code
  */
function login(e) {
  e.preventDefault();
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  emailvalue = email.value;
  passwordvalue = password.value;
  // console.log(`email and password ${emailvalue} and ${passwordvalue}`);
  fetch('https://maintenancetr.herokuapp.com/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: emailvalue,
      password: passwordvalue
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(response => response.json())
    .then((data) => {
      // check if the output data is a validation error / an error
      const errorExists = Object.keys(data);
      if (errorExists[0] === 'error') {
        // console.log('displaying from inside');
        // extract the object value from the key, to determine the validation error throw by the api validator
        const displayError = Object.values(data);
        // console.log(`Displaying errors ${displayError[0]}`);
        toastr.error(displayError);
      } else {
        // get the jwt authorization token
        dataObject = data;
        theAuthorizationToken = dataObject.token;
        const istheUserAnAdmin = dataObject.isadmin;
        // Check if the user is an admin user
        if (istheUserAnAdmin === false || istheUserAnAdmin === 'false') {
          // localstorage.setItem('usertkn', theAuthorizationToken);
          let dataToBeAccessedByOtherPages = {
            theAuthorizationToken,
            istheUserAnAdmin
          };
          window.location.replace('./User.html');
        } else {
          window.location.replace('./admin.html');
        }
      }
    })
    .catch(err => console.log(err));
}

// function signup(e) {
//     const email = document.getElementById('email');
//     const password = document.getElementById('password');
//     const

//     emailvalue = email.value;
//     passwordvalue = password.value;
//     // console.log(`email and password ${emailvalue} and ${passwordvalue}`);
//     fetch('https://maintenancetr.herokuapp.com/api/v1/auth/login', {
//       method: 'POST',
//       body: JSON.stringify({
//         email: emailvalue,
//         password: passwordvalue
//       }),
//       headers: new Headers({
//         'Content-Type': 'application/json'
//       })
//     }).then(response => response.json())
//       .then((data) => {
// }
