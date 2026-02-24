  // NAME: CALENDAR_CLEANER
  // AUTHOR: Jake Gascon, Recruitment & Admissions Admin Asst
  // CREATION: Feb 19 2026
  // PURPOSE: Rudimentary script to bulk delete calendar events between given dates , an epoch.
  // REASON:  Bulk remove calendar events within a given epoch for individual role accounts. New employees using alumni accounts when onboarding can execute to ensure reduce storage requirements and preserve privacy before joining shared calendar groups. 
  // NOTE: GS v8 has a 6 min run cap. Avoid error on too many create/delete events by adding sleep [COMPLETE 19/2/2026]
  //CRITICAL VAR: JavaS months zero indexed. 0=Jan 11=Dec. you dont want to mistake this and end up overrunning the end date

function makeCalendarClean() {

  //Define the epoch to remove events
  var epochStart = new Date(2008,0,1); //January 1 2008
  var epochEnd = new Date(2026,0,1); // January 1 2026

  //call the required calendar majiggers
  var calendar = CalendarApp.getDefaultCalendar();
  var events = calendar.getEvents(epochStart,epochEnd);

  //summon the temporal archivist
  Logger.log("Searching epoch...!: " + events.length + " calendar events identified in epoch.");

  //LETS GET SOME USER FEEDBACK STRUCTURE IN HERE, VERIFY SELECTION, ERROR HANDLING, RACE Watch

  //CORE DELETION LOOP

  var killCount = 0;
  
  for (var i = 0; i < events.length; i++) 
  {

    try {
      events[i].deleteEvent();

      killCount++;

      //Need a sleep to avoid "too many new or deleted events" and hangup
      //Utilities.sleep(3000), trying a bit tighter window

      //800ms worked out great on deployment for about 5800 events
      Utilities.sleep(800)

    } catch (error) {
      Logger.log("Event be dissonant bud: " + events[i].getTitle() + " | " + error.message);
    }
  }

  //output the wrap up log.
  //Consider adding some stats and confirmations here

  Logger.log("Goodbye old events, hello new fresh calendar " + killCount + "legacy events removed")
  }
    
