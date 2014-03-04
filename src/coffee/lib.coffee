class TabSchedule
  constructor: ->
    @tabs = []

  save_tabs: (callback) =>
    chrome.storage.sync.set {'tabs': @tabs}, =>
      callback() if callback

  load_tabs: (callback) =>
    chrome.storage.sync.get 'tabs', (data) =>
      @tabs = data.tabs || []
      callback() if callback

  add_tab: (url, callback) =>
    new_url =
      id: (new Date()).getTime()
      url: url
    @tabs.push new_url
    @save_tabs(callback)

  remove_tab: (id, callback) =>
    tab = $.grep(@tabs, ((t) -> t.id == id))[0]
    index = $.inArray(tab, @tabs)
    @tabs.splice(index, 1)
    @save_tabs(callback)

  add_schedule: (id, day, time, callback) =>
    tab = $.grep(@tabs, ((t) -> t.id == id))[0]
    index = $.inArray(tab, @tabs)
    tab.schedules = tab.schedules || []
    tab.schedules.push
      day: day
      time: time
    @tabs[index] = tab
    @save_tabs(callback)

  remove_schedule: (id, day, time, callback) =>
    tab = $.grep(@tabs, ((t) -> t.id == id))[0]
    index = $.inArray(tab, @tabs)
    tab.schedules = tab.schedules.filter (schedule) ->
      (schedule.day != day) && (schedule.time != time)
    @tabs[index] = tab
    @save_tabs(callback)

  mark_as_opened: (id, schedule_to_mark, callback) =>
    tab = $.grep(@tabs, ((t) -> t.id == id))[0]
    index = $.inArray(tab, @tabs)
    tab.schedules = tab.schedules.map (schedule) ->
      if (schedule.day == schedule_to_mark.day) && (schedule.time == schedule_to_mark.time)
        schedule_to_mark.last_opened = moment().format('L')
      schedule_to_mark
    @tabs[index] = tab
    @save_tabs(callback)

  opened_today: (schedule) =>
    (schedule.last_opened == moment().format('L'))

  open_url: (url, callback) =>
    chrome.tabs.create {url: url}, ->
      callback() if callback
