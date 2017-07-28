var studentArray = [
  // sample data
  {
    firstName : 'Charles',
    lastName : 'Darwin',
    stickers: 7,
    raffleName : 'Charles D.',
  },
  {
    firstName : 'Marie',
    lastName : 'Curie',
    stickers: 10,
    raffleName : 'Marie C.',
  }
];
var raffleArray;

function renderStudentObject(firstName, lastName, stickers) {
  return {
    firstName : firstName,
    lastName : lastName,
    stickers: stickers,
    raffleName : firstName + ' ' + lastName[0] + '.',
  };
}

function modifyCase(str) {
  return str[0].toUpperCase() + str.substring(1).toLowerCase();
}

function studentExists(firstName, lastName) {
  return studentArray.reduce(function(exists, student) {
    return exists ? true : student['firstName'] === firstName && student['lastName'] === lastName;
  }, false);
}

function addStudentOrStickers(firstName, lastName, addStickers) {
  firstName = modifyCase(firstName);
  lastName = modifyCase(lastName);
  addStickers = Number(addStickers);
  if(!studentExists(firstName, lastName)) {
    studentArray.push(renderStudentObject(firstName, lastName, addStickers));
  } else {
    studentArray.forEach(function(student) {
      if(student['firstName'] === firstName && student['lastName'] === lastName) {
        student.stickers += addStickers;
      }
    });
  }
  refreshRaffleArray();
}

function clickToAddStudentInfo() {
  var firstName = $("#firstName").val();
  var lastName = $("#lastName").val();
  var addStickers = $("#addStickers").val();
  console.log(firstName + ', ' + lastName + ', ' + addStickers)
  if(firstName === undefined || !(/^[\w\-]+$/.test(firstName))) {
    alert('Please enter a valid first name. (accepts characters a-z and hyphens)');
    return;
  } else if(lastName === undefined || !(/^[\w\-]+$/.test(lastName))) {
    alert('Please enter a valid last name. (accepts characters a-z and hyphens)');
    return;
  } else if(addStickers === undefined || !(/[\d]+/.test(addStickers))) {
    alert('Please enter a valid number of sticklers. (accepts digits 0-9)');
    return;
  } else {
    alert('Student information successfully updated!');
    return addStudentOrStickers(firstName, lastName, addStickers);
  }
}

function refreshRaffleArray() {
  raffleArray = [];
  studentArray.slice(0).forEach(function(student) {
    for(var i = 1; i <= student.stickers; i++) {
      raffleArray.push(student.raffleName);
    }
  });
  $("ol").html('');
}

function generateRan() {
  if(raffleArray.length === 0) {
    alert('No more names to display!');
    return;
  }
  var randomIndex = Math.floor(Math.random() * raffleArra y.length);
  var chosenStudent = raffleArray[randomIndex];
  raffleArray.splice(randomIndex, 1);
  var li = $("<li>" + chosenStudent + "</li>")
  $(li).prependTo("ol");
  $(li).addClass("text-center");
}

function removeStudent() {

}

function removeStickers() {

}

function displayStudentList() {
  studentArray.forEach(function(student) {
    $("#studentList").toggleClass("hidden");
    var li = $("<li>" + chosenStudent + "</li>")
    // $(li).appendTo("ol");
    $(li).addClass("text-center");
  });
}

$("#updateStudentInfo").click(clickToAddStudentInfo);
$(document).ready(refreshRaffleArray);
$("#startOver").click(refreshRaffleArray);
$("#removeStickers").click(removeStickers);
$("#removeStudent").click(removeStudent);
$("#displayStudentList").click(displayStudentList);
