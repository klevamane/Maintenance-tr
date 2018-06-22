// There is no need to implement try catch
// Because the authorization.js checker will authomatically redirect
// if a catch error occurs
// especially if the data required from localStorage does not exist
    let dataFromLocalStorage = localStorage.getItem('dataAccessibleToOtherPages');
    let isTheUserAnAdmin = JSON.parse(dataFromLocalStorage).isAdmin;
    if(isTheUserAnAdmin === false || isTheUserAnAdmin === 'false') {
        window.location.replace('./Index.html');
    }