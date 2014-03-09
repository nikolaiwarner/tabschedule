tabschedule = new TabSchedule()

check_time = ->
  tabschedule.load_tabs ->
    date = moment().format('L')

    for tab in tabschedule.tabs
      if tab.schedules
        for schedule in tab.schedules
          if schedule.day == moment().format('dddd')
            unless tabschedule.opened_today(schedule)
              if moment().isAfter moment(date + " " + schedule.time)
                tabschedule.mark_as_opened tab.id, schedule
                tabschedule.open_url tab.url

$ ->
  setInterval check_time, 1000 * 60 * 5

chrome.runtime.onInstalled.addListener (details) ->
  if details.reason == "install"
    chrome.tabs.create
      url: "options.html"
