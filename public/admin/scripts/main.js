let adminSocket = io.connect('http://localhost:8080/admin', {forceNew: true});

function toggle_hidden(id, object){
    if(object.innerHTML.includes("▼")){
        object.innerHTML = object.innerHTML.replace("▼", "▲");
    } else {
        object.innerHTML = object.innerHTML.replace("▲", "▼");
    }
    console.log(document.getElementById(id));
    console.log(object.innerHTML);
    document.getElementById(id).classList.toggle('hidden');
}


// Sets up the sockets.
$(document).ready(function() {
    adminSocket.on('reservationChange', function(reservations){
        console.log(reservations);
    });
    adminSocket.on('vehicleChange', function(vehicles){
        console.log(vehicles);
    });
    adminSocket.on('reportChange', function(reports){
        console.log(reports);
    });
    //addUser("blahBlahbalh", true);
    removeUser("blahBlahbalh");
});


function addVehicle(vehicle){
    adminSocket.emit('vehicleAdded', vehicle);
    console.log("add vehicle");
    console.log(vehicle);
}

function editVehicle(id, vehicle){
    adminSocket.emit('vehicleEdited', id, vehicle);
}

function removeVehicle(license){
    adminSocket.emit('vehicleRemoved', license);
    console.log(license + " removed");
}

function updateVehicleStatus(license, status){
    adminSocket.emit('vehicleStatusUpdated', license, status);
    console.log(license + "updated to " + status);
}

function removeReport(id){
    adminSocket.emit('reportRemoved', id);
    console.log(id + " removed from reports");
}

function addUser(email, admin){
    adminSocket.emit('userAdded', email, admin);
    console.log(email + " added to user list with value " + 1);
}
function changeUserStatus(email, admin){
    adminSocket.emit('userStatusChanged', email, admin);
    console.log(email + "set to " + admin);
}
function removeUser(email){
    adminSocket.emit('userRemoved', email);
    console.log(email + " removed from user list");
}
