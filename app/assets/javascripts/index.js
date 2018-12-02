document.addEventListener('turbolinks:load', function() {

  //Change Locations
  if (document.querySelector('.location-change')) {
    const locationChange = document.querySelector('.location-change');
    locationChange.addEventListener('click', function() {
      const page = document.querySelector('.page');
    })


  }


  //Event List
  if (document.querySelector('.event-list')) {
    //Function that goes through all events and hides them
    const eventHider = () => {
      const eventList = document.querySelector('.event-list');
      for (let i=0; i<eventList.children.length; i+=1) {
        let event = eventList.children[i];
        if (event.classList.contains('event')) {
          event.children[2].classList.add('hide');
        }
      }
    }

    //Add listeners to each event to expand info
    const eventList = document.querySelector('.event-list');
    eventList.addEventListener('click', e => {
      target = e.target;
      let eventMore;
      //Determine what was clicked
      if (target.parentNode.classList.contains('event')) {
        //if click on event title
        eventMore = target.parentNode.children[2];
      } else if (target.parentNode.parentNode.classList.contains('event')) {
        //if click on event location
        eventMore = target.parentNode.parentNode.children[2];
      } else {
        return;
      }

      //Hide if clicking on already unhidden event
      if (!eventMore.classList.contains('hide')) {
        eventMore.classList.add('hide');
      } else {
        //Hide all previous events
        eventHider();
        //Show info on selected
        eventMore.classList.remove('hide');
      }

    })
  }




})