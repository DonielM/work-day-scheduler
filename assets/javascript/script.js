// This creates the functionality for the daily planner, allowing users to save notes for each hour of the day, display the current date and time, and clear all saved notes.
// It uses jQuery for DOM manipulation and the dayjs library for time-related operations.


//made optimisations to the code:
// Cached jQuery objects are used for frequently accessed DOM elements.
// DOM manipulations are minimized by batching operations and caching jQuery objects.
// Local storage operations are simplified and batched where possible.

$(function() {
  var $timeBlocks = $(".time-block");
  var $descriptionInputs = $("textarea.description");
  var $saveBtns = $(".saveBtn");
  var $clearBtn = $("#clearBtn");

  $saveBtns.on("click", function() {
    var $parent = $(this).parent();
    var value = $parent.find(".description").val();
    var time = $parent.attr("id");
    localStorage.setItem(time, value);
  });

  $timeBlocks.each(function() {
    var $this = $(this);
    var id = $this.attr("id");
    var value = localStorage.getItem(id);

    if (value) {
      $this.find(".description").val(value);
    }

    var currentHour = dayjs().hour();
    var timeBlockHour = parseInt(id.split("-")[1]);
    $this.removeClass("past present future");
    if (timeBlockHour < currentHour) {
      $this.addClass("past");
    } else if (timeBlockHour === currentHour) {
      $this.addClass("present");
    } else {
      $this.addClass("future");
    }
  });

  $clearBtn.on("click", function() {
    $descriptionInputs.val("");
    localStorage.clear();
  });

  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
  $("#currentTime").text(dayjs().format("h:mm A"));
});