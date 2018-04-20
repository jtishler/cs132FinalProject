let userSocket = io.connect('http://localhost:8080/user', {forceNew: true});

// Sets up the sockets.
$(document).ready(function() {
    $("#submit-res").click(newReservation)

    userSocket.emit('join',"Jimmy Niu", function(reservations){
        //updateReservations(reservations);
        console.log(reservations);
    });

    userSocket.on('reservationChange', function(reservations){
        //updateReservations(reservations);
        console.log("hi");
        console.log(reservations);
    });

    userSocket.on('alternateVehicles', function(vehicles){
        console.log(vehicles);
    });
});

function newReservation(){
    console.log("pressed");

    // let user = // ???
    let start = $('#start-date').val();
    let end = $('#end-date').val();
    // let stops =      // not yet implemented
    // let override =   // ditto
    // let justification =      // yikes

    let res = new Reservation({start: start, end: end});
    console.log(res);

    userSocket.emit('reservation', {user: "Jimmy Niu", start: "2018-04-18 11:00", end: "2018-04-18 16:00", stops: ["home", "work"], override: true, justification: "my oranges fell into the river."});
}

function editReservation(){
    userSocket.emit('edit', {user: "Jimmy Niu", license: "19087", start: "6932", end: "6361", stops: ["home", "work"], override: false, justification: ""});
}

//need to figure out current and past
function updateReservations(){

}

function cancelReservation(reservationID, user){
    userSocket.emit('cancel', reservationID);
}

function submitFeedback(){
    userSocket.emit('reportAdded', reservationID, report);
}

class Reservation {
    constructor(reservationData) {
        this.data = reservationData;
        this.addToDom(this.data);
    }
    addToDom(r) {
        let DOMobject = `hi`;
        console.log(DOMobject);
        $('#cardz').append(DOMobject);
    }
}
