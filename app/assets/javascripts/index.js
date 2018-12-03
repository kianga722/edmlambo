document.addEventListener('turbolinks:load', function() {
  //Get past invalid CSRF token issue
  const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': token
    }
  })

  //Reveal Change Location popup
  if (document.querySelector('.location-change')) {
    const locationChange = document.querySelector('.location-change');
    locationChange.addEventListener('click', e => {
      const popupBG = document.getElementById('popup-bg');
      const popupLocation = document.getElementById('location-popup');
      popupBG.classList.remove('hide');
      popupLocation.classList.remove('hide');
      e.stopImmediatePropagation();
    })
  }

  //Add locations via dropdown
  if (document.querySelector('.dropdown-menu')) {

    //Check for duplicate locations
    const isLocationDup = (loc) => {
      let locationsArr = [];
      const locationWrapper = document.querySelector('.location-item-wrapper');
      for (let i=0; i<locationWrapper.children.length; i+=1) {
        let location = locationWrapper.children[i].children[0].name;
        if (!locationsArr.includes(location)) {
          locationsArr.push(location)
        }
      }
      return locationsArr.includes(loc) ? true : false;
    }

    //Add a location
    const addLocation = e => {
      target = e.target;
      if (target.classList.contains('dropdown-item')) {
        locationSelect = target.innerHTML;
        //Do not include duplicates
        if (isLocationDup(locationSelect)) {
          return;
        }
        //Create and append location
        const div = document.createElement('div');
        div.classList.add('location-item');
        div.innerHTML = `
          <input type='checkbox' name='${locationSelect}' checked='checked'>
          <label for='${locationSelect}'></label>
          ${locationSelect}
        `;
        const locationWrapper = document.querySelector('.location-item-wrapper');
        locationWrapper.appendChild(div);
      }
    }

    //Add event listener to dropdown menus
    const locationPreselect = document.querySelector('.location-preselect');
    locationPreselect.addEventListener('click', e => {
      addLocation(e);
    })
  }


  //Checking checkbox logic outside of checkbox
  if (document.querySelector('.location-added')) {
    const locationRemove = document.querySelector('.location-added');
    locationRemove.addEventListener('click', e => {
      target = e.target;
      if (target.classList.contains('location-item')) {
        target.children[0].checked = (target.children[0].checked === true ? false : true);       
        return;
      }
      if (target.parentNode.classList.contains('location-item')) {
        target.parentNode.children[0].checked = (target.parentNode.children[0].checked === true ? false : true);
      }
    })
  }
  

  //Exit Change Location popup
  //Same as clicking submit button to send data
  if (document.getElementById('popup-bg')) {
    //Function to hide popup
    const popupHider = () => {
      const popupBG = document.getElementById('popup-bg');
      const popupLocation = document.getElementById('location-popup');
      popupBG.classList.add('hide');
      popupLocation.classList.add('hide');
      //locationsSend();
    }

    //Click on popup close button
    const popupClose = document.querySelector('.popup-close');
    popupClose.addEventListener('click', () => {
      popupHider();
    })
    //Click on Done button
    const done = document.querySelector('.done');
    done.addEventListener('click', () => {
      popupHider();
    })
    //Click outside popup box
    document.body.addEventListener('click', e => {
      let target = e.target;

      const popupBG = document.getElementById('popup-bg');
      if (!popupBG.classList.contains('hide')) {
        if (target.id === 'location-popup'
          ||target.parentNode.id === 'location-popup'
          ||target.parentNode.parentNode.id === 'location-popup'
          ||target.parentNode.parentNode.parentNode.id === 'location-popup'
          ||target.parentNode.parentNode.parentNode.parentNode.id === 'location-popup')
        {
          return;
        } else {
          popupHider();
        }
      }
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