var tabschedule, update_list;

tabschedule = new TabSchedule();

update_list = function() {
  var $tab_list, day, row, schedule, schedule_html, tab, tabs, time, _i, _j, _len, _len1, _ref, _ref1;
  if (tabschedule.tabs.length > 0) {
    $('.tabs').show();
  }
  $tab_list = $('.tabs tbody');
  $tab_list.empty();
  tabs = tabschedule.tabs || [];
  _ref = tabschedule.tabs;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    tab = _ref[_i];
    day = tab.day || "saturday";
    time = tab.time || "12:00 PM";
    row = "<tr id='tab" + tab.id + "' data-id='" + tab.id + "' class='tab'> <td class='url'> <a href='" + tab.url + "'>" + tab.url + "</a> </td> <td class='schedule'> <ul class='list-group schedules'></ul> <label>Add a day and time:</label> <div class='input-group input-group-sm schedule-form'> <span class='input-group-addon'> <select class='day'> <option value='Monday'>Monday</option> <option value='Tuesday'>Tuesday</option> <option value='Wednesday'>Wednesday</option> <option value='Thursday'>Thursday</option> <option value='Friday'>Friday</option> <option value='Saturday'>Saturday</option> <option value='Sunday'>Sunday</option> </select> </span> <input type='text' class='form-control time' id='time" + tab.id + "' value='" + time + "'> <div class='input-group-btn'><button type='button' class='save btn btn-default'>+</button></div> </div> </td> <td> <span class='remove remove-tab'>x</span> </td> </tr>";
    $tab_list.append(row);
    if (tab.schedules) {
      _ref1 = tab.schedules;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        schedule = _ref1[_j];
        schedule_html = "<li class='list-group-item schedule-item'> <span class='day'>" + schedule.day + "</span> <span class='time'>at " + schedule.time + "</span> <span class='remove remove-schedule pull-right'>x</span> </li>";
        $("#tab" + tab.id + " .schedules").append(schedule_html);
      }
    }
    $("#tab" + tab.id + " .schedule-form .save").on('click', function(event) {
      var id;
      id = $(event.currentTarget).closest('tr').data('id');
      day = $("#tab" + id + " .schedule-form .day").val();
      time = $("#tab" + id + " .schedule-form .time").val();
      return tabschedule.add_schedule(id, day, time, function() {
        return update_list();
      });
    });
    $("#tab" + tab.id + " .schedules .remove-schedule").on('click', function(event) {
      var $schedule, id;
      id = $(event.currentTarget).closest('tr').data('id');
      $schedule = $(event.currentTarget).closest('.schedule-item');
      day = $schedule.find('.day').text();
      time = $schedule.find('.time').text();
      return tabschedule.remove_schedule(id, day, time, function() {
        return update_list();
      });
    });
    $("#time" + tab.id).timePicker({
      show24Hours: false,
      step: 15
    });
  }
  return $('.tab .remove-tab').on('click', function(event) {
    var id;
    id = $(event.currentTarget).closest('tr').data('id');
    return tabschedule.remove_tab(id, function() {
      return update_list();
    });
  });
};

$(function() {
  $('.new_tab .save').click(function() {
    var $input;
    $input = $('.new_tab .url');
    tabschedule.add_tab($input.val(), function() {
      return update_list();
    });
    return $input.val("");
  });
  return tabschedule.load_tabs(function() {
    return update_list();
  });
});
