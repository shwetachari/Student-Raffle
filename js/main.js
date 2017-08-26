var studentArray;
var raffleArray;
var firstName;
var lastName;
var changeStickers;

if(localStorage["students"] === "undefined" || localStorage["students"] === undefined) {
  studentArray = [
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
} else {
  studentArray = JSON.parse(localStorage["students"]);
}

// Store
// Each student takes up ~0.15KB local storage
// Local Storage Limit = 4KB
// Approx student capacity = 26 students
function store() {
  if(studentArray !== undefined) {
    localStorage['students'] = JSON.stringify(studentArray);
  }
  // each time information is added/removed to storage, display size of localStorage object and properties in console
  var _lsTotal=0,_xLen,_x;for(_x in localStorage){_xLen= ((localStorage[_x].length + _x.length)* 2);_lsTotal+=_xLen; console.log(_x.substr(0,50)+" = "+ (_xLen/1024).toFixed(2)+" KB")};console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
}

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

function addStudentOrStickers(firstName, lastName, changeStickers) {
  firstName = modifyCase(firstName);
  lastName = modifyCase(lastName);
  changeStickers = Number(changeStickers);
  if(!studentExists(firstName, lastName)) {
    studentArray.push(renderStudentObject(firstName, lastName, changeStickers));
  } else {
    studentArray.forEach(function(student) {
      if(student['firstName'] === firstName && student['lastName'] === lastName) {
        student.stickers += changeStickers;
      }
    });
  }
  refreshRaffleArray();
}

function validForm() {
  firstName = $("#firstName").val();
  lastName = $("#lastName").val();
  changeStickers = $("#changeStickers").val();
  if(firstName === undefined || !(/^[\w\-]+$/.test(firstName))) {
    alert('Please enter a valid first name. (accepts characters a-z and hyphens)');
    return false;
  } else if(lastName === undefined || !(/^[\w\-]+$/.test(lastName))) {
    alert('Please enter a valid last name. (accepts characters a-z and hyphens)');
    return false;
  } else if(changeStickers === undefined || !(/[\d]+/.test(changeStickers))) {
    alert('Please enter a valid number of stickers. (accepts digits 0-9)');
    return false;
  } else {
    alert('Student information successfully updated!');
    return true;
  }
}

function clickToAddStudentInfo() {
  $("#studentList").addClass('hidden');
  var valid = validForm();
  if(valid) {
    addStudentOrStickers(firstName, lastName, changeStickers);
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
  store();
}

function generateRan() {
  $("#studentList").addClass('hidden');
  if(raffleArray.length === 0) {
    alert('No more names to display!');
    return;
  }
  var randomIndex = Math.floor(Math.random() * raffleArray.length);
  var chosenStudent = raffleArray[randomIndex];
  raffleArray.splice(randomIndex, 1);
  var li = $("<li>" + chosenStudent + "</li>")
  $(li).prependTo("ol");
  $(li).addClass("text-center");
}

function validRemoveStudentForm() {
  if(firstName === undefined || !(/^[\w\-]+$/.test(firstName))) {
    alert('Please enter a valid first name. (accepts characters a-z and hyphens)');
    return false;
  } else if(lastName === undefined || !(/^[\w\-]+$/.test(lastName))) {
    alert('Please enter a valid last name. (accepts characters a-z and hyphens)');
    return false;
  } else {
    alert('Request processed.');
    return true;
  }
}

function removeStudent() {
  $("#studentList").addClass('hidden');
  firstName = $("#firstName").val();
  lastName = $("#lastName").val();
  var valid = validRemoveStudentForm();
  if(valid) {
  firstName = modifyCase(firstName);
  lastName = modifyCase(lastName);
    studentArray.forEach(function(student, index) {
      if(student.firstName === firstName && student.lastName === lastName) {
        studentArray.splice(index, 1);
      }
    });
  }
  refreshRaffleArray();
}

function removeStickers(firstName, lastName, changeStickers) {
  firstName = modifyCase(firstName);
  lastName = modifyCase(lastName);
  studentArray.forEach(function(student) {
    if(student.firstName === firstName && student.lastName === lastName) {
      student.stickers -= Number(changeStickers);
    }
  });
  refreshRaffleArray();
}

function displayStudentList() {
  $("#studentList").html('');
  $("#studentList").toggleClass("hidden");
  studentArray.forEach(function(student) {
    var li = $("<li>" + '<span class="bold">' + student.firstName + ' ' + student.lastName + '</span> (' + student.raffleName + ') <br><span class="bold">Stickers:</span> ' + student.stickers + "</li>")
    $(li).appendTo("#studentList");
  });
}

$("#updateStudentInfo").click(clickToAddStudentInfo);
$(document).ready(refreshRaffleArray);
$("#startOver").click(refreshRaffleArray);
$("#removeStickers").click(function() {
  $("#studentList").addClass('hidden');
  var valid = validForm();
  if(valid) {
    removeStickers(firstName, lastName, changeStickers);
  }
});
$("#removeStudent").click(removeStudent);
$("#displayStudentList").click(displayStudentList);
