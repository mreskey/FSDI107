var detailVisible = true;
var important = false;
var serverURL = "http://fsdi.azurewebsites.net/api";

var hideIcon = '<i class="far fa-eye-slash"></i>';
var showIcon = '<i class="far fa-eye"></i>';

function toggleDetails() {
  if (detailVisible) {
    $("#details").hide();

    $("#btnDetails")
      .html(showIcon + "Show details")
      .removeClass("btn-secondary")
      .addClass("btn-primary");

    detailVisible = false;
  } else {
    $("#details").show();

    $("#btnDetails")
      .html(hideIcon + "Hide details")
      .removeClass("btn-primary")
      .addClass("btn-secondary");

    detailVisible = true;
  }
}

function toggleImportant() {
  if (important) {
    $("#iconImp").removeClass("fas").addClass("far");
    important = false;
  } else {
    $("#iconImp").removeClass("far").addClass("fas");
    important = true;
  }
}

function createTask() {
  // get values from controls
  var title = $("#txtTitle").val();
  var startDate = $("#txtStartDate").val();
  var dueDate = $("#txtDueDate").val();
  var status = $("#selStatus").val();
  var description = $("#txtDescription").val();

  // validations
  let errors = false;
  $("#listErrors").html("");

  if (!title) {
    errors = true;
    $("#listErrors").append("<li>Please verify the Title</li>");
  }

  if (!status) {
    errors = true;
    $("#listErrors").append("<li>Please select an initial Status</li>");
  }

  if (errors) {
    $("#alertError").removeClass("hide");

    // set a timer
    setTimeout(
      function () {
        $("#alertError").addClass("hide");
      },
      6000 // 6 seconds
    );

    return;
  }

  // create an instance of the class
  let task = new Task(
    0,
    title,
    important,
    startDate,
    dueDate,
    description,
    parseInt(status)
  );

  // send obj to server
  $.ajax({
    url: "/api/saveTask",
    type: "POST",
    data: JSON.stringify(task), // parse the obj to string
    contentType: "application/json",
    success: function (res) {
      console.log("Server response", res);
      displayTask(task);
    },
    error: function (errDetails) {
      console.log("Error", errDetails);
      // todo: show an error
    },
  });
}

function fetchData() {
  $.ajax({
    url: "/api/getTasks",
    type: "GET",
    success: function (res) {
      console.log("Response", res);

      for (let i = 0; i < res.length; i++) {
        let task = res[i];
        if (task.user == "Sergio") {
          displayTask(task);
        }
      }
    },
    error: function (errDetails) {
      console.log("Error getting data", errDetails);
    },
  });
}

function displayTask(task) {
  var cssClass = "";
  if (task.important) cssClass = "fas";
  else cssClass = "far";

  // parse the date string into a date object
  var date = new Date(task.dueDate);

  var syntax = `<div id='task${task.id}' class='task'>
        <i class="${cssClass} fa-star task-star task-section"></i>
        <div class='task-desc'>
            <h5>${task.title}</h5>
            <label>${task.description}</label>
        </div>
        <label class='task-section'>${date.toLocaleDateString()} ${date.toLocaleTimeString()}</label>
        <label class='task-section'>${task.location}</label>

        <div class='task-section'>
            <i class="fas fa-trash" onclick='deleteTask(${task.id})'></i>
        </div>

    </div>`;

  $("#pendingTasks").append(syntax);
}

function init() {
  $("#btnDetails").click(toggleDetails);
  $("#iconImp").click(toggleImportant);
  $("#btnSave").click(createTask);

  // load data
  fetchData();
}

function testGet() {
  console.log("Creating a test req");

  $.ajax({
    url: "https://restclass.azurewebsites.net/api/test",
    type: "GET",
    success: function (res) {
      console.log("Req succeed");
      console.log(res);
    },
    error: function (errDetails) {
      console.log("Error on req");
      console.log(errDetails);
    },
  });
}

window.onload = init;
