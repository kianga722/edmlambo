//Event Logic Module
const eventsLogic = (() => {
  /*
  //Function to Unhide Change Location popup
  const unHidePopup = e => {
    const popupBG = document.getElementById('popup-bg');
    const popupLocation = document.getElementById('location-popup');
    popupBG.classList.remove('hide');
    popupLocation.classList.remove('hide');
    e.stopImmediatePropagation();
  }
  */

  //Function to Unhide Change Location popup
  const unHidePopup = e => {
    const popupBG = document.getElementById('popup-bg');
    popupBG.classList.remove('hide');
    e.stopImmediatePropagation();
  }

  //Function to Unhide Change Location popup
  const unHidePopupLoc = e => {
    const popupLocation = document.getElementById('location-popup');
    popupLocation.classList.remove('hide');
    e.stopImmediatePropagation();
  }

  //Function to Unhide Change Location popup
  const unHidePopupShare = e => {
    let target = e.target;

    const popupShare = document.getElementById('share-popup');
    popupShare.classList.remove('hide');
    //Add top offset to popup
    let topOffset = window.pageYOffset;
    popupShare.style.top = `${topOffset}px`;
    e.stopImmediatePropagation();
  }


  //Add locations through popup options

  //Function to check for duplicate locations
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

  //Function to append location item
  const appendLocation = (location) => {
    const div = document.createElement('div');
    div.classList.add('location-item');
    div.innerHTML = `
      <input type='checkbox' name='${location}' checked='checked'>
      <label for='${location}'></label>
      ${location}
    `;
    const locationWrapper = document.querySelector('.location-item-wrapper');
    locationWrapper.appendChild(div);
  }

  //Function to Add a location from a dropdown
  const addLocation = e => {
    target = e.target;
    if (target.classList.contains('dropdown-item')) {
      //Get location
      locationSelect = target.innerHTML;
      //Do not include duplicates
      if (isLocationDup(locationSelect)) {
        return;
      }

      //Create and append location
      appendLocation(locationSelect);
    }
  }
  
  //Function to Create search terms from dropdown
  const keywordsDropdown = (wordsArr, ele) => {
    let keywords = wordsArr;
    for (let i=0; i<ele.children.length; i+=1) {
      let word = ele.children[i].innerHTML;
      keywords.push(word);
    }
    return keywords;
  }
  //Function to Create array of search terms
  const keywordsCreate = () => {
    const states = document.querySelector('.states-menu');
    const canada = document.querySelector('.canada-menu');
    const cities = document.querySelector('.cities-menu');

    let keywords = [];
    keywords = keywordsDropdown(keywords, states);
    keywords = keywordsDropdown(keywords, canada);
    keywords = keywordsDropdown(keywords, cities);
    return keywords;
  }
  //Function to get results of search and decide result actions
  const searchLocations = () => {
    //Get array of terms
    let keywords = keywordsCreate();
    //Get searchbox input
    const searchBox = document.querySelector('.search-box');
    //Remove whitespace and lowercase
    term = searchBox.value.trim().toLowerCase();
    //Return if empty value
    if (term === '') {
      return;
    }
    //Check if term is in keywords
    let result = false;
    for (let i=0; i<keywords.length; i+=1) {
      let word = keywords[i];
      //Prepare word by lowercasing
      let wordCompare = word.toLowerCase();
      if (wordCompare.includes(term)) {
        //Set result to keyword and break
        result = word;
        break;
      }
    }
    //Decide search result action
    if (result) {
      if (isLocationDup(result)) {
        searchBox.value = '';
        searchBox.placeholder='Location already added!';
        return;
      }
      appendLocation(result);
      searchBox.value = '';
      searchBox.placeholder='Location added!'
    } else {
      searchBox.value = '';
      searchBox.placeholder='Location not found!';
    }
  }

  //Function to Checkbox logic
  const checkboxRemove = e => {
    target = e.target;
    if (target.classList.contains('location-item')) {
      target.children[0].checked = (target.children[0].checked === true ? false : true);       
      return;
    }
    if (target.parentNode.classList.contains('location-item')) {
      target.parentNode.children[0].checked = (target.parentNode.children[0].checked === true ? false : true);
    }
  }
  
  //Exit Change Location popup
  //Same as clicking submit button to send data

  //Function to submit form
  const locationSubmit = () => {
    const locationAdded = document.querySelector('.location-added');
    Rails.fire(locationAdded, 'submit')
  }

/*
  //Function to hide popup bg
  const popupHider = () => {
    const popupBG = document.getElementById('popup-bg');
    const popupLocation = document.getElementById('location-popup');
    popupBG.classList.add('hide');
    popupLocation.classList.add('hide');
  }
  */

  //Function to hide popup bg
  const popupHider = () => {
    const popupBG = document.getElementById('popup-bg');
    popupBG.classList.add('hide');
  }

  //Function to hide location popup 
  const popupHiderLoc = () => {
    const popupLocation = document.getElementById('location-popup');
    popupLocation.classList.add('hide');
  }

  //Function to hide share popup 
  const popupHiderShare = () => {
    const popupShare = document.getElementById('share-popup');
    popupShare.classList.add('hide');
  }

  //Function to hide popup outside popup box
  const popupHiderOutside = e => {
    let target = e.target;

    //Make sure clicking on popup itself does not exit
    const popupBG = document.getElementById('popup-bg');
    if (!popupBG.classList.contains('hide')) {
      if (target.id === 'location-popup'
        ||target.parentNode.id === 'location-popup'
        ||target.parentNode.parentNode.id === 'location-popup'
        ||target.parentNode.parentNode.parentNode.id === 'location-popup'
        ||target.parentNode.parentNode.parentNode.parentNode.id === 'location-popup'
        ||target.id === 'share-popup'
        ||target.parentNode.id === 'share-popup'
        ||target.parentNode.parentNode.id === 'share-popup'
        ||target.parentNode.parentNode.parentNode.id === 'share-popup')
      {
        return;
      } else {
        //Hide correct popup
        const popupLocation = document.getElementById('location-popup');
        if (!popupLocation.classList.contains('hide')) {
          locationSubmit();
          popupHider();
          popupHiderLoc();
          return;
        }
        const popupShare = document.getElementById('share-popup');
        if (!popupShare.classList.contains('hide')) {
          popupHider();
          popupHiderShare();
          return;
        }

      }
    }
  }


  //Event List Rendering

  //Function that goes through all events and hides them
  const eventHider = () => {
    const eventList = document.querySelector('.list-wrapper');
    if (eventList) {
      for (let i=0; i<eventList.children.length; i+=1) {
        let event = eventList.children[i];
        if (event.classList.contains('event')) {
          event.children[5].classList.add('hide');
          //Hide favorite icon if not saved
          if (!event.children[4].children[1].classList.contains('saved')) {
            let arrowLink = event.children[3];
            let favorite = event.children[4];
            arrowLink.classList.remove('hide');
            favorite.classList.add('hide');
          }
        }
      }
    }
  }

  //Function to decide favorite icon or arrow display 
  const arrowFavDisplay = (eventMore) => {
    let event = eventMore.parentNode;
    let arrowLink = event.children[3];
    let favorite = event.children[4];
    //Check if specific eventMore is hidden and if it is a favorite
    if (!eventMore.classList.contains('hide') 
      || eventMore.parentNode.children[4].children[1].classList.contains('saved') ) {
      arrowLink.classList.add('hide');
      favorite.classList.remove('hide');
    } else {
      arrowLink.classList.remove('hide');
      favorite.classList.add('hide');
    }
  }

  //Function that expands event info
  const eventExpand = e => {
    target = e.target;
    let eventMore;
    //Determine what was clicked
    //Do not hide when clicking in expanded space
    if (target.parentNode.classList.contains('event') 
    && !target.classList.contains('event-more')
    && !target.classList.contains('favorite')) {
      //if click on event title
      eventMore = target.parentNode.children[5];
    } else if (target.parentNode.parentNode.classList.contains('event') 
    && !target.parentNode.classList.contains('event-more')
    && !target.classList.contains('favorite')) {
      //if click on event location
      eventMore = target.parentNode.parentNode.children[5];
    } else {
      return;
    }

    //Hide if clicking on already unhidden event
    if (!eventMore.classList.contains('hide') 
     && !target.classList.contains('favorite')) {
      eventMore.classList.add('hide');
    } else {
      //Hide all previous events
      eventHider();
      //Show info on selected
      eventMore.classList.remove('hide');
    }

    //Display favorite or arrow icon
    arrowFavDisplay(eventMore);
  }


  //Filter search

  //Function to unhide all events 
  const eventShowAll = () => {
    const eventList = document.querySelector('.list-wrapper');
    if (eventList) {
      for (let i=0; i<eventList.children.length; i+=1) {
        eventList.children[i].classList.remove('hide');
      }
    }
  }

  //Function to hide days that do not have filtered events
  const hideDays = (dateArr) => {
    const eventList = document.querySelector('.list-wrapper');

    for (let i=0; i<eventList.children.length; i+=1) {
      let child = eventList.children[i];
      if (child.classList.contains('day')) {
        //Date only get month and day of month to compare
        let date = child.innerHTML.trim().substr(5).toLowerCase();
        if (!dateArr.includes(date)) {
          child.classList.add('hide');
        } else {
          child.classList.remove('hide');
        } 
      }
    }
  }

  //Function to filter with every input
  const filter = () => {
    //Get filterbox input
    const filterBox = document.querySelector('.filter-box');
    if (filterBox) {
      term = filterBox.value.trim().toLowerCase();
      const filterIcon = document.querySelector('.filter-icon');
      //Unhide all if empty value
      if (term === '') {
        eventShowAll();
        //Put magnifying icon back
        filterIcon.classList.remove('filter-x');
        return;
      }
      //Get current event list
      const eventList = document.querySelector('.list-wrapper');
  
      if (eventList) {
        //Get array of dates with filtered events 
        let dateArr = [];
        //Check each event for date, artist, venue
        for (let i=0; i<eventList.children.length; i+=1) {
          let child = eventList.children[i];
          if (child.classList.contains('event')) {
            let date = child.dataset.date.toLowerCase();
            let title = child.children[1].innerHTML.toLowerCase();
            let venue = child.children[2].children[0].innerHTML.toLowerCase();
  
            if (!date.includes(term) && !title.includes(term) && !venue.includes(term)) {
              child.classList.add('hide');
            } else {
              if (!dateArr.includes(date)) {
                dateArr.push(date);
              }
              child.classList.remove('hide');
            }
          }
        }
        //Remove all days that dont have events in them
        hideDays(dateArr);   
        //Render no matches page if nothing found
        if (dateArr < 1) {
          const noMatch = document.querySelector('.no-match');
          noMatch.classList.remove('hide');
        }
      }
      //Always change filter icon to X regardless of event listing
      filterIcon.classList.add('filter-x');
    }
  }

  //Function to pass previous filter terms to update/toggle form submission
  const filterGet = (parentEle) => {
    const filterBox = document.querySelector('.filter-box');
    if (filterBox) {
      filterEle = document.createElement('input');
      filterEle.type = 'hidden';
      filterEle.name = 'filterTerm';
      filterEle.value = filterBox.value;
      parentEle.appendChild(filterEle);
    }
  }

  //Function to determine effects of clicking the filter icon
  const changeIcon = () => { 
    const filterBox = document.querySelector('.filter-box');
    const filterIcon = document.querySelector('.filter-icon');
    if (filterBox) {
      if (filterIcon.classList.contains('filter-x')) {
        filterIcon.classList.remove('filter-x');
        filterBox.value = '';
        filterBox.focus();
        filter();
      } else {
        filterBox.focus();
      }
    }
  }

  //Function to light up fav icon
  const favSave = (e) => {
    let target = e.target;
    let favIcon = target.children[1];

    if (favIcon.classList.contains('favorite')) {
      if (favIcon.classList.contains('saved')) {
        favIcon.classList.remove('saved');
      } else {
        favIcon.classList.add('saved');
      }
    }
  }

  //Function to share event
  const shareEvent = (e) => {
    let target = e.target;
    
    if (target.classList.contains('airbnb-share')) {
      unHidePopup(e);
      unHidePopupShare(e);
    }
  }

  //Function to initalize event handlers
  eventsInit = () => {
    //Event Listener to Unhide Change Location popup
    const locationChange = document.querySelector('.location-change');
    locationChange.addEventListener('click', e => {
      unHidePopup(e);
      unHidePopupLoc(e);
    })

    //Event Listener for dropdown menus
    const locationPreselect = document.querySelector('.location-preselect');
    locationPreselect.addEventListener('click', e => {
      addLocation(e);
    })

    //Event Listener for search submit
    const searchSubmit = document.querySelector('.search-submit');
    searchSubmit.addEventListener('click', e => {
      searchLocations();
    })
    //Event Listener for Enter key in searchbox
    const searchBox = document.querySelector('.search-box');
    searchBox.addEventListener('keypress', e => {
      let key = e.keyCode;
      if (key === 13) {
        searchLocations();
      }
    })

    //Event Listener for checkbox logic
    const locationRemove = document.querySelector('.location-added');
    locationRemove.addEventListener('click', e => {
      checkboxRemove(e);
    })
    //Event Listener to prevent Refresh after submit
    locationRemove.addEventListener('submit', e => {
      e.preventDefault();
    })

    //Event Listener for Done button
    const done = document.querySelector('.done');
    done.addEventListener('click', () => {
      popupHider();
      popupHiderLoc();
    })
    //Event Listener for location popup X button
    const popupCloseLoc = document.getElementById('popup-close-loc');
    popupCloseLoc.addEventListener('click', () => {
      locationSubmit();
      popupHider();
      popupHiderLoc();
    })
    //Event Listener for share popup X button
    const popupCloseShare = document.getElementById('popup-close-share');
    popupCloseShare.addEventListener('click', () => {
      popupHider();
      popupHiderShare();
    })
    //Event Listener for outside popup box
    document.body.addEventListener('click', e => {
      popupHiderOutside(e);
    })

    //Event Listeners to each event to expand info
    const eventList = document.querySelector('.event-list');
    eventList.addEventListener('click', e => {
      eventExpand(e);
    })

    //Event Listener for filtering after every input
    const filterBox = document.querySelector('.filter-box');
    if (filterBox) {
      filterBox.addEventListener('keyup', () => {
        filter();
      })
    }

    //Event Listener for sending filter terms on form submission location update
    const locationAdded = document.querySelector('.location-added');
    locationAdded.addEventListener('submit', () => {
      filterGet(locationAdded);
    })

    //Event Listener for sending filter terms on form submission toggle
    const locationCurrent = document.querySelector('.location-current');
    locationCurrent.addEventListener('submit', () => {
      filterGet(locationCurrent);
    })

    //Event Listener for clicking on filter icon
    const filterIcon = document.querySelector('.filter-icon');
    if (filterIcon) {
      filterIcon.addEventListener('click', () => {
        changeIcon();
      })
    }

    //Event Listener for clicking buttons in an event
    const listWrapper = document.querySelector('.list-wrapper');
    if (listWrapper) {
      //Event Listener for favorite icon clicking
      listWrapper.addEventListener('submit', e => {
        favSave(e);
      })
      //Event Listener for share button clicking
      listWrapper.addEventListener('click', e => {
        shareEvent(e);
      })
    }



  }

  return { eventsInit, eventHider, arrowFavDisplay, filter };

})();



//Recent Events Slider Module
const sliderLogic = (() => {
  //Function to shift right
  const shiftRight = (sliderType) => {
    //Number of events
    let eventLength = sliderType.children.length;
    //Figure out how many events are on left and right of frame
    let frameRect = sliderType.parentNode.getBoundingClientRect();
    //first event
    let eventFirst = sliderType.children[0].getBoundingClientRect();
    //last event
    let eventLast = sliderType.children[eventLength-1].getBoundingClientRect();

    //Only shift if last event still overflowing to the right
    if (window.getComputedStyle(sliderType).getPropertyValue('transform') === 'none') {
      sliderType.style.transform = `translateX(0)`;
    }

    //Decide width increment
    let stepWidth;
    if (sliderType === document.querySelector('.recent-slider')) {
      stepWidth = 240;
    } else {
      stepWidth = 110;
    }

    if (frameRect.right < eventLast.right) {
      //Get current translateX
      let widthCurrent = window.getComputedStyle(sliderType).getPropertyValue('transform').split(',')[4];
      //Advance right for 1 event
      let width = Number(widthCurrent) - stepWidth;
      //Do the translateX
      sliderType.style.transform = `translateX(${width}px)`;
      sliderType.style.transition = '0.3s';
    }
  }
  //Function to shift left
  const shiftLeft = (sliderType) => {
    //Number of events
    let eventLength = sliderType.children.length;
    //Figure out how many events are on left and right of frame
    let frameRect = sliderType.parentNode.getBoundingClientRect();
    //first event
    let eventFirst = sliderType.children[0].getBoundingClientRect();
    //last event
    let eventLast = sliderType.children[eventLength-1].getBoundingClientRect();

    //Only shift if first event still overflowing to the left
    if (window.getComputedStyle(sliderType).getPropertyValue('transform') === 'none') {
      sliderType.style.transform = `translateX(0)`;
    }

    //Decide width increment
    let stepWidth;
    if (sliderType === document.querySelector('.recent-slider')) {
      stepWidth = 240;
    } else {
      stepWidth = 110;
    }

    if (eventFirst.left < frameRect.left) {
      //Get current translateX
      let widthCurrent = window.getComputedStyle(sliderType).getPropertyValue('transform').split(',')[4];
      //Advance left for 1 event
      let width = Number(widthCurrent) + stepWidth;
      //If first event, align to left side
      if (width > 0) {
        width = 0;
      }
      //Do the translateX
      sliderType.style.transform = `translateX(${width}px)`;
      sliderType.style.transition = '0.3s';
    }
  }
  //Function to display arrows
  const arrowDisplay = (sliderType, slideLeft, slideRight) => {
    //Number of events
    let eventLength = sliderType.children.length;
    //Figure out how many events are on left and right of frame
    let frameRect = sliderType.parentNode.getBoundingClientRect();
    //first event
    let eventFirst = sliderType.children[0].getBoundingClientRect();
    //last event
    let eventLast = sliderType.children[eventLength-1].getBoundingClientRect();

    //Show left arrow if first event overflowing
    if (eventFirst.left < frameRect.left) {
      slideLeft.classList.remove('hide');
    }
    //Show right arrow if last event overflowing
    if (eventLast.right > frameRect.right) {
      slideRight.classList.remove('hide');
    }
    //Hide right arrow if last event right edge visible
    if (eventLast.right <= frameRect.right) {
      slideRight.classList.add('hide');
    }
    //Hide left arrow if first event left edge visible
    if (eventFirst.left >= frameRect.left) {
      slideLeft.classList.add('hide');
    }
  }
  //Function to jump to event from slider link
  const eventJump = e => {
    target = e.target;
    //Get id of event
    let eventID;
    if (target.classList.contains('event-slide')
      ||target.classList.contains('fav-slide')) {
      eventID = target.dataset.id;
    } else if (target.parentNode.classList.contains('event-slide')
    ||target.parentNode.classList.contains('fav-slide')) {
      eventID = target.parentNode.dataset.id;
    } else {
      return;
    }
    //Jump to event
    let event = document.getElementById(`${eventID}`);
    event.scrollIntoView({block: 'center'});
    //Expand event by simulating click
    eventsLogic.eventHider();
    event.children[5].classList.remove('hide');
    eventsLogic.arrowFavDisplay(event.children[5]);
  }

  //Initialize slider width
  const sliderWidthInit = (sliderType) => {
    let eventLength = sliderType.children.length;

    let sliderWidth = 240*eventLength;
    if (sliderType === document.querySelector('.recent-slider')) {
      sliderWidth = 240*eventLength;
    } else {
      sliderWidth = 110*eventLength;
    }
    
    sliderType.style.width = `${sliderWidth}px`;
  }

  //Initialize slider arrows
  const sliderArrowsInit = (sliderType) => {
    //Number of events
    eventLength = sliderType.children.length;
    //Figure out how many events are on left and right of frame
    frameRect = sliderType.parentNode.getBoundingClientRect();
    //last event right edge
    eventLast = sliderType.children[eventLength-1].getBoundingClientRect();

    //Decide which slider
    let slideRight;
    if (sliderType === document.querySelector('.recent-slider')) {
      slideRight = document.querySelector('.slide-right');
    } else {
      slideRight = document.querySelector('.fav-slide-right');
    }

    if (eventLast.right <= frameRect.right) {
      slideRight.classList.add('hide');
    }
  }

  //Initialize slider and event listeners
  const sliderInit = (sliderType) => {
    if (!sliderType) {
      return;
    }

    //Initialize slider width
    sliderWidthInit(sliderType);
    //Initialize slider arrows
    sliderArrowsInit(sliderType);

    //Decide which slider
    let slideRight;
    let slideLeft;
    let slideFrame;
    if (sliderType === document.querySelector('.recent-slider')) {
      slideRight = document.querySelector('.slide-right');
      slideLeft = document.querySelector('.slide-left');
      slideFrame = document.querySelector('.recent-slider-frame');
    } else {
      slideRight = document.querySelector('.fav-slide-right');
      slideLeft = document.querySelector('.fav-slide-left');
      slideFrame = document.querySelector('.fav-slider-frame');
    }
    
    //Event Listener for slide right arrow click
    slideRight.addEventListener('click', () => {
      shiftRight(sliderType);
    })
    //Event Listener for slide left arrow click
    slideLeft.addEventListener('click', () => {
      shiftLeft(sliderType);
    })

    //Event Listener for scrolling
    slideFrame.addEventListener('wheel', e => {
      //Prevent default scrolling of page
      e.preventDefault();
      if (e.deltaY > 0) {
        shiftLeft(sliderType);
      } else {
        shiftRight(sliderType);
      }
    })


    //Event Listener when slide transition ends
    sliderType.addEventListener('transitionend', () => {
      arrowDisplay(sliderType, slideLeft, slideRight);
    })
    //Event Listener for slide linking
    sliderType.addEventListener('click', e => {
      eventJump(e);
    })
  }

  return { sliderInit }

})();


//When page is loaded
document.addEventListener('turbolinks:load', function() {

  //Get past invalid CSRF token issue
  const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': token
    }
  })

  //Initialize Recent Slider
  const recentSlider = document.querySelector('.recent-slider');
  sliderLogic.sliderInit(recentSlider);

  //Initialize Fav Slider
  const favSlider = document.querySelector('.fav-slider');
  sliderLogic.sliderInit(favSlider);

  //Initialize Event listeners
  eventsLogic.eventsInit();
})