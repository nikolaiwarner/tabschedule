var TabSchedule,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

TabSchedule = (function() {
  function TabSchedule() {
    this.open_url = __bind(this.open_url, this);
    this.opened_today = __bind(this.opened_today, this);
    this.mark_as_opened = __bind(this.mark_as_opened, this);
    this.remove_schedule = __bind(this.remove_schedule, this);
    this.add_schedule = __bind(this.add_schedule, this);
    this.remove_tab = __bind(this.remove_tab, this);
    this.add_tab = __bind(this.add_tab, this);
    this.load_tabs = __bind(this.load_tabs, this);
    this.save_tabs = __bind(this.save_tabs, this);
    this.tabs = [];
  }

  TabSchedule.prototype.save_tabs = function(callback) {
    return chrome.storage.local.set({
      'tabs': this.tabs
    }, (function(_this) {
      return function() {
        if (callback) {
          return callback();
        }
      };
    })(this));
  };

  TabSchedule.prototype.load_tabs = function(callback) {
    return chrome.storage.local.get('tabs', (function(_this) {
      return function(data) {
        _this.tabs = data.tabs || [];
        if (callback) {
          return callback();
        }
      };
    })(this));
  };

  TabSchedule.prototype.add_tab = function(url, callback) {
    var new_tab;
    new_tab = {
      id: (new Date()).getTime(),
      url: url,
      schedules: []
    };
    this.tabs.push(new_tab);
    return this.save_tabs(callback);
  };

  TabSchedule.prototype.remove_tab = function(id, callback) {
    var index, tab;
    tab = $.grep(this.tabs, (function(t) {
      return t.id === id;
    }))[0];
    index = $.inArray(tab, this.tabs);
    this.tabs.splice(index, 1);
    return this.save_tabs(callback);
  };

  TabSchedule.prototype.add_schedule = function(id, day, time, callback) {
    var index, tab;
    tab = $.grep(this.tabs, (function(t) {
      return t.id === id;
    }))[0];
    index = $.inArray(tab, this.tabs);
    tab.schedules.push({
      day: day,
      time: time
    });
    this.tabs[index] = tab;
    return this.save_tabs(callback);
  };

  TabSchedule.prototype.remove_schedule = function(id, day, time, callback) {
    var index, tab;
    tab = $.grep(this.tabs, (function(t) {
      return t.id === id;
    }))[0];
    index = $.inArray(tab, this.tabs);
    if (tab.schedules) {
      tab.schedules = tab.schedules.filter(function(schedule) {
        return (schedule.day !== day) && (schedule.time !== time);
      });
      this.tabs[index] = tab;
      return this.save_tabs(callback);
    }
  };

  TabSchedule.prototype.mark_as_opened = function(id, schedule_to_mark, callback) {
    var index, tab;
    tab = $.grep(this.tabs, (function(t) {
      return t.id === id;
    }))[0];
    index = $.inArray(tab, this.tabs);
    if (tab.schedules) {
      tab.schedules = tab.schedules.map(function(schedule) {
        if ((schedule.day === schedule_to_mark.day) && (schedule.time === schedule_to_mark.time)) {
          schedule.last_opened = moment().format('L');
        }
        return schedule;
      });
      this.tabs[index] = tab;
      return this.save_tabs(callback);
    }
  };

  TabSchedule.prototype.opened_today = function(schedule) {
    return schedule.last_opened === moment().format('L');
  };

  TabSchedule.prototype.open_url = function(url, callback) {
    return chrome.tabs.create({
      url: url
    }, function() {
      if (callback) {
        return callback();
      }
    });
  };

  return TabSchedule;

})();
