//Function to initalize event handlers
const eventsInit = () => {
  
  //Event Listener to Unhide Change Location popup
  const locationChange = document.querySelector('.location-change');
  locationChange.addEventListener('click', e => {
    const popupBG = document.getElementById('popup-bg');
    const popupLocation = document.getElementById('location-popup');
    popupBG.classList.remove('hide');
    popupLocation.classList.remove('hide');
    e.stopImmediatePropagation();
  })


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
  //Event Listener for dropdown menus
  const locationPreselect = document.querySelector('.location-preselect');
  locationPreselect.addEventListener('click', e => {
    addLocation(e);
  })


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
    target = e.target;
    if (target.classList.contains('location-item')) {
      target.children[0].checked = (target.children[0].checked === true ? false : true);       
      return;
    }
    if (target.parentNode.classList.contains('location-item')) {
      target.parentNode.children[0].checked = (target.parentNode.children[0].checked === true ? false : true);
    }
  })


  //Event Listener to prevent Refresh after submit
  locationRemove.addEventListener('submit', e => {
    e.preventDefault();
  })
  

  //Exit Change Location popup
  //Same as clicking submit button to send data

  //Function to submit form
  const locationSubmit = () => {
    const locationAdded = document.querySelector('.location-added');
    Rails.fire(locationAdded, 'submit')
  }

  //Function to hide popup
  const popupHider = () => {
    const popupBG = document.getElementById('popup-bg');
    const popupLocation = document.getElementById('location-popup');
    popupBG.classList.add('hide');
    popupLocation.classList.add('hide');
  }

  //Event Listener for Done button
  const done = document.querySelector('.done');
  done.addEventListener('click', () => {
    popupHider();
  })
  //Event Listener for popup X button
  const popupClose = document.querySelector('.popup-close');
  popupClose.addEventListener('click', () => {
    locationSubmit();
    popupHider();
  })
  //Event Listener for outside popup box
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
        locationSubmit();
        popupHider();
      }
    }
  })


  //Event List Rendering

  //Function that goes through all events and hides them
  const eventHider = () => {
    const eventList = document.querySelector('.event-list');
    for (let i=0; i<eventList.children.length; i+=1) {
      let event = eventList.children[i];
      if (event.classList.contains('event')) {
        event.children[3].classList.add('hide');
      }
    }
  }

  //Event Listeners to each event to expand info
  const eventList = document.querySelector('.event-list');
  eventList.addEventListener('click', e => {
    target = e.target;
    let eventMore;
    //Determine what was clicked
    if (target.parentNode.classList.contains('event')) {
      //if click on event title
      eventMore = target.parentNode.children[3];
    } else if (target.parentNode.parentNode.classList.contains('event')) {
      //if click on event location
      eventMore = target.parentNode.parentNode.children[3];
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


//When page is loaded
document.addEventListener('turbolinks:load', function() {

  //Get past invalid CSRF token issue
  const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': token
    }
  })

  //Initialize event listeners
  eventsInit();

})