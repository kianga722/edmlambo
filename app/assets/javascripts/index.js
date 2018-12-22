//Loading Logic Module
const loadLogic = (() => {
  //Function to hide/unhide elements
  const showLoad = show => {
    const loading = document.querySelector('.loading-wrapper');
    let other;
    let path = window.location.pathname;
    if (path === '/festivals') {
      other = document.getElementById('festivals-wrapper');
    } else if (path === '/tours') {
      other = document.getElementById('tours-wrapper');
    } else {
      other = document.getElementById('concerts-wrapper');
    }

    if (show) {
      loading.classList.remove('hide');
      other.classList.add('hide');
    } else {
      loading.classList.add('hide');
      other.classList.remove('hide');
    }
  }

  return { showLoad };

})();

//Navbar Logic Module
const navLogic = (() => {
  //Function to highlight current tab
  const tabHighlight = (tab) => {
    //Highlight only correct tab
    const tabs = document.querySelector('.tabs');
    for (let i=0; i<tabs.children.length-1; i+=1) {
      if (tabs.children[i] != tab) {
        tabs.children[i].children[0].classList.remove('tab-select');
      } else {
        tabs.children[i].children[0].classList.add('tab-select');
      }
    }
  }
  //Function to highlight current tab on load
  const tabHighlightOnLoad = (tab) => {
    let path = window.location.pathname;
    let tabCurrent;
    if (path === '/festivals') {
      tabCurrent = document.querySelector('.tab-festivals');
    } else if (path === '/tours') {
      tabCurrent = document.querySelector('.tab-tours');
    } else {
      tabCurrent = document.querySelector('.tab-cities');
    }
    tabHighlight(tabCurrent);
  }
  //Function to display correct URL
  const tabURL = (tab) => {
    //Modify url when visiting tabs
    if (tab.classList.contains('tab-cities')) {
      history.pushState(null, '', '/');
      return;
    }
    if (tab.classList.contains('tab-festivals')) {
      history.pushState(null, '', '/festivals');
      return;
    }
    if (tab.classList.contains('tab-tours')) {
      history.pushState(null, '', '/tours');
      return;
    }
  }


  //Function to initializeEvent Listeners for Nav section
  const navInit = () => {
    //Event Listener for Cities option
    const navCities = document.querySelector('.tab-cities');
    navCities.addEventListener('click', () => {
      loadLogic.showLoad(true);
      tabHighlight(navCities);
      tabURL(navCities);
    })
    //Event Listener for Festivals option
    const navFestivals = document.querySelector('.tab-festivals');
    navFestivals.addEventListener('click', () => {
      loadLogic.showLoad(true);
      tabHighlight(navFestivals);
      tabURL(navFestivals);
    })
    //Event Listener for Tours option
    const navTours = document.querySelector('.tab-tours');
    navTours.addEventListener('click', () => {
      loadLogic.showLoad(true);
      tabHighlight(navTours);
      tabURL(navTours);
    })
  }

  return { navInit, tabHighlight, tabURL, tabHighlightOnLoad }

})();


//Event Logic Module
const eventsLogic = (() => {

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

  //Function to Unhide Share popup
  const unHidePopupShare = e => {
    const popupShare = document.getElementById('share-popup');
    popupShare.classList.remove('hide');
    //Add top offset to popup
    let topOffset = window.pageYOffset + 69;
    popupShare.style.top = `${topOffset}px`;
    e.stopImmediatePropagation();
  }

  //Function to Unhide Report popup
  const unHidePopupReport = e => {
    const popupReport = document.getElementById('report-popup');
    popupReport.classList.remove('hide');
    //Add top offset to popup
    let topOffset = window.pageYOffset + 100;
    popupReport.style.top = `${topOffset}px`;
    e.stopImmediatePropagation();
    popupReport.children[2].focus();
  }

  //Function to Unhide Notify popup
  const unHidePopupNotify = e => {
    const popupNotify = document.getElementById('notification-popup');
    popupNotify.classList.remove('hide');
    //Add top offset to popup
    let topOffset = window.pageYOffset + 69;
    popupNotify.style.top = `${topOffset}px`;
    e.stopImmediatePropagation();
  }
  


  //Add locations through popup options

  //Function to check for duplicate locations
  const isLocationDup = (loc, type) => {
    let locationsArr = [];
    let locationWrapper;
    if (type === 'location') {
      locationWrapper = document.querySelector('.location-item-wrapper');
    } else {
      locationWrapper = document.querySelector('.location-item-notify-wrapper');
    }

    for (let i=0; i<locationWrapper.children.length; i+=1) {
      let location = locationWrapper.children[i].children[0].name;
      if (!locationsArr.includes(location)) {
        locationsArr.push(location)
      }
    }
    return locationsArr.includes(loc) ? true : false;
  }

  //Function to append location item
  const appendLocation = (location, type) => {
    const div = document.createElement('div');
    div.classList.add('location-item');
    div.innerHTML = `
      <input type='checkbox' name='${location}' checked='checked'>
      <label for='${location}'></label>
      ${location}
    `;
    let locationWrapper;
    if (type === 'location') {
      locationWrapper = document.querySelector('.location-item-wrapper');
    } else {
      locationWrapper = document.querySelector('.location-item-notify-wrapper');
    }
    locationWrapper.appendChild(div);
  }

  //Function to Add a location from a dropdown
  const addLocation = (e, type) => {
    target = e.target;
    if (target.classList.contains('dropdown-item')) {
      //Get location
      locationSelect = target.innerHTML;
      //Do not include duplicates
      if (isLocationDup(locationSelect, type)) {
        return;
      }

      //Create and append location
      appendLocation(locationSelect, type);
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
  const searchLocations = (type) => {
    //Get array of terms
    let keywords = keywordsCreate();
    //Get searchbox input
    let searchBox;
    if (type === 'location') {
      searchBox = document.querySelector('.search-box');
    } else {
      searchBox = document.querySelector('.search-notify-box');
    }

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
      if (isLocationDup(result, type)) {
        searchBox.value = '';
        searchBox.placeholder='Location already added!';
        return;
      }
      appendLocation(result, type);
      searchBox.value = '';
      searchBox.placeholder='Location added!'
    } else {
      searchBox.value = '';
      searchBox.placeholder='Location not found!';
    }
  }

  //Function to Checkbox logic
  const checkboxRemove = (e) => {
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

  //Function to hide report popup 
  const popupHiderReport = () => {
    const popupReport = document.getElementById('report-popup');
    popupReport.classList.add('hide');
  }

  //Function to hide notify popup 
  const popupHiderNotify = () => {
    const popupNotify = document.getElementById('notification-popup');
    popupNotify.classList.add('hide');
  }

  //Function to hide popup outside popup box
  const popupHiderOutside = e => {
    let target = e.target;

    //Make sure clicking on popup itself does not exit
    const popupBG = document.getElementById('popup-bg');
    if (popupBG) {
      if (!popupBG.classList.contains('hide')) {
        if (target.id === 'location-popup'
          ||target.parentNode.id === 'location-popup'
          ||target.parentNode.parentNode.id === 'location-popup'
          ||target.parentNode.parentNode.parentNode.id === 'location-popup'
          ||target.parentNode.parentNode.parentNode.parentNode.id === 'location-popup'
          ||target.id === 'share-popup'
          ||target.parentNode.id === 'share-popup'
          ||target.parentNode.parentNode.id === 'share-popup'
          ||target.parentNode.parentNode.parentNode.id === 'share-popup'
          ||target.id === 'report-popup'
          ||target.parentNode.id === 'report-popup'
          ||target.id === 'notification-popup'
          ||target.parentNode.id === 'notification-popup'
          ||target.parentNode.parentNode.id === 'notification-popup'
          ||target.parentNode.parentNode.parentNode.id === 'notification-popup'
          ||target.parentNode.parentNode.parentNode.parentNode.id === 'notification-popup')
        {
          return;
        } else {
          //Hide correct popup
          const popupLocation = document.getElementById('location-popup');
          if (popupLocation) {
            if (!popupLocation.classList.contains('hide')) {
              locationSubmit();
              popupHider();
              popupHiderLoc();
              //Show Loading Animation
              loadLogic.showLoad(true);
              return;
            }
          }
          const popupShare = document.getElementById('share-popup');
          if (!popupShare.classList.contains('hide')) {
            popupHider();
            popupHiderShare();
            return;
          }
          const popupReport = document.getElementById('report-popup');
          if (!popupReport.classList.contains('hide')) {
            popupHider();
            popupHiderReport();
            return;
          }
          const popupNotify = document.getElementById('notification-popup');
          if (!popupNotify.classList.contains('hide')) {
            popupHider();
            popupHiderNotify();
            return;
          }

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
    let event = eventMore.parentNode;;
    let arrowLink;
    let favorite;
    let favSaved;

    if (window.location.pathname === '/festivals'
      ||window.location.pathname === '/tours') {
      arrowLink = event.children[1];
      favorite = event.children[2];
      favSaved = eventMore.parentNode.children[2].children[1];
    } else {
      arrowLink = event.children[3];
      favorite = event.children[4];
      favSaved = eventMore.parentNode.children[4].children[1];
    }

    //Check if specific eventMore is hidden and if it is a favorite

    if (!eventMore.classList.contains('hide') 
      ||favSaved.classList.contains('saved') ) {
      arrowLink.classList.add('hide');
      favorite.classList.remove('hide');
    } else {
      arrowLink.classList.remove('hide');
      favorite.classList.add('hide');
    }
  }

  //Function that expands event info
  const eventExpand = e => {
    let target = e.target;
    let eventMore;
    //Determine what was clicked
    //Do not hide when clicking favorites
    if (!target.classList.contains('favorite')) {
      if (target.classList.contains('event')) {
        //if click on event div
        eventMore = target.children[5];
      } else if (target.parentNode.classList.contains('event') 
      && !target.classList.contains('event-more')) {
        //if click on event title
        eventMore = target.parentNode.children[5];
      } else if  (target.parentNode.parentNode.classList.contains('event') 
      && !target.parentNode.classList.contains('event-more')) {
        //if click on event location
        eventMore = target.parentNode.parentNode.children[5];
      } else {
        //Ignore all other clicks
        return;
      }
    } else {
      //Ignore all other clicks
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

      //Scroll into view if not in view
      let eventAll = eventMore.parentNode;
      let rect = eventAll.getBoundingClientRect();
      let moreTop = rect.top;
      let moreBottom = rect.bottom;
    
      if (moreTop < 0) {
        eventAll.scrollIntoView({block: 'start'});
      } else if (moreBottom > window.innerHeight) {
        eventAll.scrollIntoView({block: 'end'});
      }
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
        //Hide no match message if displayed
        const noMatch = document.querySelector('.no-match');
        noMatch.classList.add('hide');
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
        } else {
          const noMatch = document.querySelector('.no-match');
          noMatch.classList.add('hide');
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
  const changeIcon = (iconType) => { 
    //Decide which searchbox is being used
    let searchIcon;
    let searchBox;
    if (iconType === document.querySelector('.filter-icon')) {
      searchIcon = document.querySelector('.filter-icon');
      searchBox = document.querySelector('.filter-box');
      xClass = 'filter-x';
    } else {
      searchIcon = document.querySelector('.tour-search-icon');
      searchBox = document.querySelector('.tour-search-box');
      xClass = 'tour-x';
    }
    if (searchBox) {
      //Remove string if click on X
      if (searchIcon.classList.contains(xClass)) {
        searchIcon.classList.remove(xClass);
        searchBox.value = '';
        searchBox.focus();
        if (iconType === document.querySelector('.tour-search-icon')) {
          const noArtists = document.querySelector('.no-artists');
          const foundArtists = document.querySelector('.found-artists');
          noArtists.classList.add('hide');
          foundArtists.classList.add('hide');
        } else {
          filter();
        }
      } else {
        //Focus into searchbox if click on magnifying glass
        searchBox.focus();
      }
    }

/*
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
    */
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

  //Function to send current URL path in favorite submission
  const pathGet = (e) => {
    let target = e.target;

    if (target) {
      pathEle = document.createElement('input');
      pathEle.type = 'hidden';
      pathEle.name = 'path';
      pathEle.value = window.location.pathname;
      target.appendChild(pathEle);
    }
  }

  //Function to share event
  const shareEvent = (e) => {
    let target = e.target;
    
    if (target.classList.contains('airbnb-share')
      ||target.classList.contains('shareIcon')
      ||target.classList.contains('shareApp')) {
      unHidePopup(e);
      unHidePopupShare(e);
    }
  }

  //Function to notify event
  const notifyGetPop = (e) => {
    let target = e.target;
    
    if (target.classList.contains('notificationsGet')
      ||target.classList.contains('sideNotify')
      ||target.parentNode.classList.contains('sideNotify')) {
      unHidePopup(e);
      unHidePopupNotify(e);
    }
  }

  //Function to select notification frequency
  const freqSelect = (e) => {
    let target = e.target;
    
    if (target.classList.contains('dropdown-item')) {
      const freqChoice = document.getElementById('freq-choice');
      freqChoice.innerHTML = `
        ${target.innerHTML}
      `;
    }
  }

  //Function to fill in members list
  const membersFill = () => {
    const membersList = document.querySelector('.members-list');
    for (let i=1; i<=100; i+=1) {
      let member = document.createElement('div');
      member.classList = 'member-container';
      let rep = 69000 - i
      member.innerHTML = `
        <span class='rank'>
          ${i}.
        </span>
        <span class='username'>
          housegod${i}
        </span>
        <span class='rep'>
          ${rep.toLocaleString()}
        </span>
      `;
      membersList.append(member);
    }
  }

  //Function to fill in member sliders list
  const memberSliderFill = () => {
    const memberSlider = document.getElementById('member-slider');
    for (let i=1; i<=10; i+=1) {
      let memberBlock = document.createElement('div');
      memberBlock.classList = 'member-block';
      if (i===1) {
        memberBlock.innerHTML = `
          <div class='members-title'>
            Members
          </div>
          <div class='rep-title'>
            Rep
          </div>
        `;
      }
      memberSlider.append(memberBlock);
      for (let j=1; j<=10; j+=1) {
        let index = (i-1)*10 + j;
        let member = document.createElement('div');
        let rep = 69000 - index;
        member.classList = 'member-container';
        member.innerHTML = `
          <span class='rank'>
            ${index}.
          </span>
          <span class='username'>
            housegod${index}
          </span>
          <span class='rep'>
            ${rep.toLocaleString()}
          </span>
        `;
        memberBlock.append(member);
      }
    }
  }


  //Function to initalize event handlers
  const eventsInit = () => {
    //Event Listener to Unhide Change Location popup
    const locationChange = document.querySelector('.location-change');
    if (locationChange) {
      locationChange.addEventListener('click', e => {
        unHidePopup(e);
        unHidePopupLoc(e);
      })
    }
   
    //Event Listener for dropdown menus
    const locationPreselect = document.querySelector('.location-preselect');
    if (locationPreselect) {
      locationPreselect.addEventListener('click', e => {
        addLocation(e, 'location');
      })
    }
    //Event Listener for search submit
    const searchSubmit = document.querySelector('.search-submit');
    if (searchSubmit) {
      searchSubmit.addEventListener('click', e => {
        searchLocations('location');
      })
    }
    //Event Listener for Enter key in searchbox
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
      searchBox.addEventListener('keypress', e => {
        let key = e.keyCode;
        if (key === 13) {
          searchLocations('location');
        }
      })
    }
    
    //Event Listener for checkbox logic
    const locationRemove = document.querySelector('.location-added');
    if (locationRemove) {
      locationRemove.addEventListener('click', e => {
        checkboxRemove(e);
      })
      //Event Listener to prevent Refresh after submit
      locationRemove.addEventListener('submit', e => {
        e.preventDefault();
      })
    }
    

    //Event Listener for Done button
    const done = document.querySelector('.done');
    if (done) {
      done.addEventListener('click', () => {
        popupHider();
        popupHiderLoc();
        //Show Loading Animation
        loadLogic.showLoad(true);
      })
    }
  
    //Event Listener for location popup X button
    const popupCloseLoc = document.getElementById('popup-close-loc');
    if (popupCloseLoc) {
      popupCloseLoc.addEventListener('click', () => {
        locationSubmit();
        popupHider();
        popupHiderLoc();
        //Show Loading Animation
        loadLogic.showLoad(true);
      })
    }
    
    //Event Listener for share popup X button
    const popupCloseShare = document.getElementById('popup-close-share');
    if (popupCloseShare) {
      popupCloseShare.addEventListener('click', () => {
        popupHider();
        popupHiderShare();
      })
      //Event Listener for outside popup box
      document.body.addEventListener('click', e => {
        popupHiderOutside(e);
      })
    }
    
    //Event Listener for filtering after every input
    const filterBox = document.querySelector('.filter-box');
    if (filterBox) {
      filterBox.addEventListener('keyup', () => {
        filter();
      })
    }

    //Event Listener for sending filter terms on form submission location update
    const locationAdded = document.querySelector('.location-added');
    if (locationAdded) {
      locationAdded.addEventListener('submit', () => {
        filterGet(locationAdded);
      })
    }
    
    //Event Listener for sending filter terms on form submission toggle
    const locationCurrent = document.querySelector('.location-current');
    if (locationCurrent) {
      locationCurrent.addEventListener('submit', () => {
        filterGet(locationCurrent);
        //Show Loading Animation
        loadLogic.showLoad(true);
      })
    }
    
    //Event Listener for clicking on filter icon
    const filterIcon = document.querySelector('.filter-icon');
    if (filterIcon) {
      filterIcon.addEventListener('click', () => {
        changeIcon(filterIcon);
      })
    }

    //Event Listener for clicking buttons in an event
    const listWrapper = document.querySelector('.list-wrapper');
    if (listWrapper) {
      //Event Listener for favorite icon clicking
      listWrapper.addEventListener('submit', e => {
        favSave(e);
        pathGet(e);
      })
      //Event Listener for share button clicking
      listWrapper.addEventListener('click', e => {
        shareEvent(e);
      })
      //Event Listeners for each event to expand info
      listWrapper.addEventListener('click', e => {
        eventExpand(e);
      })
      //Event Listeners for clicking on link to artist tour in event more
      listWrapper.addEventListener('click', e => {
        let target = e.target;
        if (target.classList.contains('soundcloud-artist')) {
          const navTours = document.querySelector('.tab-tours');
          navLogic.tabHighlight(navTours);
          navLogic.tabURL(navTours);
          //Show Loading Animation
          loadLogic.showLoad(true);
        }
      })
    }

    //Event Listener for report button clicking
    const reportIssue = document.querySelector('.report');
    if (reportIssue) {
      reportIssue.addEventListener('click', e => {
        unHidePopup(e);
        unHidePopupReport(e);
      })
    }

    //Event Listener for share popup X button
    const popupCloseReport = document.getElementById('popup-close-report');
    if (popupCloseReport) {
      popupCloseReport.addEventListener('click', () => {
        popupHider();
        popupHiderReport();
      })
      //Event Listener for outside popup box
      document.body.addEventListener('click', e => {
        popupHiderOutside(e);
      })
    }

    //Event Listener for Go to Top button
    const toTop = document.querySelector('.toTop');
    if (toTop) {
      toTop.addEventListener('click', () => {
        window.scrollTo(0, 0);
      })
    }

    //Event Listener for Footer Share App button
    const shareApp = document.querySelector('.shareApp');
    if (shareApp) {
      shareApp.addEventListener('click', e => {
        shareEvent(e);
      })
    }

    //Event Listener for Footer Notify button
    const notifyGet = document.querySelector('.notificationsGet');
    if (notifyGet) {
      notifyGet.addEventListener('click', e => {
        notifyGetPop(e);
      })
    }

    //Event Listener for Sidebar Notify button
    const notifyGetSide = document.querySelector('.sideNotify');
    if (notifyGetSide) {
      notifyGetSide.addEventListener('click', e => {
        notifyGetPop(e);
      })
    }

    //Event Listener for Notifications Frequency selection
    const freqMenu = document.querySelector('.frequency-menu');
    if (freqMenu) {
      freqMenu.addEventListener('click', e => {
        freqSelect(e);
      })
    }
    //Event Listener for notify dropdown menus
    const locationPreselectNotify = document.querySelector('.location-preselect-notify');
    if (locationPreselectNotify) {
      locationPreselectNotify.addEventListener('click', e => {
        addLocation(e, 'notify');
      })
    }
    //Event Listener for notify search submit
    const searchNotifySubmit = document.querySelector('.search-notify-submit');
    if (searchNotifySubmit) {
      searchNotifySubmit.addEventListener('click', e => {
        searchLocations('notify');
      })
    }

    //Event Listener for Enter key in notify searchbox
    const searchNotifyBox = document.querySelector('.search-notify-box');
    if (searchNotifyBox) {
      searchNotifyBox.addEventListener('keypress', e => {
        let key = e.keyCode;
        if (key === 13) {
          searchLocations('notify');
        }
      })
    }
    //Event Listener for notify checkbox logic
    const locationNotifyRemove = document.querySelector('.location-notify-added');
    if (locationNotifyRemove) {
      locationNotifyRemove.addEventListener('click', e => {
        checkboxRemove(e);
      })
    }

    //Event Listener for notify popup X button
    const popupCloseNotify = document.getElementById('popup-close-notification');
    if (popupCloseNotify) {
      popupCloseNotify.addEventListener('click', () => {
        popupHider();
        popupHiderNotify();
      })
    }

    //Fill in sidebar members list
    membersFill();

    //Fill in member slider frame
    memberSliderFill();

    //Event Listener for member slider scrolling
    const memberSlider = document.getElementById('member-slider');
    memberSlider.addEventListener('wheel', e => {
      //Prevent default scrolling of page
      e.preventDefault();
      if (e.deltaY > 0) {
        sliderLogic.shiftLeft(memberSlider);
      } else {
        sliderLogic.shiftRight(memberSlider);
      }
    })
    

  }

  return { eventsInit, eventHider, arrowFavDisplay, filter, favSave, pathGet, shareEvent, changeIcon };

})();


//Recent Events Slider Module
const sliderLogic = (() => {
  //Function to shift right
  const shiftRight = (sliderType, dist=false) => {
    //Number of events
    let eventLength = sliderType.children.length;
    //Figure out how many events are on left and right of frame
    let frameRect = sliderType.parentNode.getBoundingClientRect();
    //last event
    let eventLast = sliderType.children[eventLength-1].getBoundingClientRect();

    //Only shift if last event still overflowing to the right
    if (window.getComputedStyle(sliderType).getPropertyValue('transform') === 'none') {
      sliderType.style.transform = `translateX(0)`;
    }

    //Decide width increment
    let stepWidth;
    if (dist) {
      stepWidth = Math.abs(dist);
    } else if (sliderType === document.querySelector('.recent-slider')) {
      if (window.innerWidth <= 750) {
        stepWidth = 140;
      } else {
        stepWidth = 240;
      }
    } else if (sliderType === document.querySelector('.fav-slider')) {
      stepWidth = 110;
    } else {
      stepWidth = 280;
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
  const shiftLeft = (sliderType, dist=false) => {
    //Number of events
    let eventLength = sliderType.children.length;
    //Figure out how many events are on left and right of frame
    let frameRect = sliderType.parentNode.getBoundingClientRect();
    //first event
    let eventFirst = sliderType.children[0].getBoundingClientRect();

    //Only shift if first event still overflowing to the left
    if (window.getComputedStyle(sliderType).getPropertyValue('transform') === 'none') {
      sliderType.style.transform = `translateX(0)`;
    }

    //Decide width increment
    let stepWidth;
    if (dist) {
      stepWidth = Math.abs(dist);
    } else if (sliderType === document.querySelector('.recent-slider')) {
      if (window.innerWidth <= 750) {
        stepWidth = 140;
      } else {
        stepWidth = 240;
      }
    } else if (sliderType === document.querySelector('.fav-slider')) {
      stepWidth = 110;
    } else {
      stepWidth = 280;
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
    if (event) {
      event.scrollIntoView({block: 'center'});
      //Expand event by simulating click
      eventsLogic.eventHider();
      event.children[5].classList.remove('hide');
      eventsLogic.arrowFavDisplay(event.children[5]);
    }
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

    //Detect touch for mobile
    let startx;
    let lastx;
    slideFrame.addEventListener('touchstart', e => {
      startx = parseInt(e.changedTouches[0].clientX);
      //Last touch is same as first touch for first touchmove
      //lastx = startx;
    })
    slideFrame.addEventListener('touchmove', e => {
      let endx = parseInt(e.changedTouches[0].clientX);
      let dist = endx - startx;
      //let dist = endx - lastx;

      //If current touch is to right of beginning touch
     // if (endx > startx) {
        //If current touch is to right of last fired touch
      //  if (lastx > endx) {
       //   
        //}
     // }
      console.log(dist)

      if (dist > 0 ) {
        shiftLeft(sliderType, dist);
      } else {
        shiftRight(sliderType, dist);
      }

      //Change last fired touch to current touch for next touchmove
      //lastx = endx ;
    })

    /*
    slideFrame.addEventListener('touchstart', e => {
      let startx = parseInt(e.changedTouches[0].clientX);

      slideFrame.addEventListener('touchmove', g => {
        let endx = parseInt(g.changedTouches[0].clientX);
        let dist = endx - startx;
        if (dist > 0 ) {
          shiftLeft(sliderType, dist);
        } else {
          shiftRight(sliderType, dist);
        }
      })

    })
    */



    //Event Listener when slide transition ends
    sliderType.addEventListener('transitionend', () => {
      arrowDisplay(sliderType, slideLeft, slideRight);
    })
    //Event Listener for slide linking
    sliderType.addEventListener('click', e => {
      eventJump(e);
    })
  }

  return { sliderInit, shiftLeft, shiftRight }

})();

//Festivals Module
const festivalsLogic = (() => {
  //Function that goes through all festivals and hides them
  const festivalHider = (tab) => {
    //Check classes based on tab section
    let tabList;
    let classCheck;
    if (tab === 'festival') {
      tabList = document.querySelector('.festival-list');
      classCheck = 'festival';
    } else if (tab === 'tour') {
      tabList = document.querySelector('.tours-list-wrapper');
      classCheck = 'event';
    }

    if (tabList) {
      for (let i=0; i<tabList.children.length; i+=1) {
        let festival = tabList.children[i];
        if (festival.classList.contains(classCheck)) {
          festival.children[3].classList.add('hide');
          //Hide favorite icon if not save
          if (!festival.children[2].children[1].classList.contains('saved')) {
            let arrowLink = festival.children[1];
            let favorite = festival.children[2];
            arrowLink.classList.remove('hide');
            favorite.classList.add('hide');
          }
        }
      }
    }
  }

  //Function to expand festival info
  const festivalExpand = (e, tab) => {
    let target = e.target;

    //Check classes based on tab section
    let classCheck;
    let classMore;
    if (tab === 'festival') {
      classCheck = 'festival';
      classMore = 'festival-more';
    } else if (tab === 'tour') {
      classCheck = 'event';
      classMore = 'event-more'
    }

    let festMore;
    //Determine what was clicked
    //Do not hide when clicking favorites
    if (!target.classList.contains('favorite')
      &&!target.classList.contains('scIcon')) {
      if (target.classList.contains(classCheck)) {
        //if click on festival div
        festMore = target.children[3];
      } else if (target.parentNode.classList.contains(classCheck)
      && !target.classList.contains(classMore)) {
        //if click on date info wrapper
        festMore = target.parentNode.children[3];
      } else if (target.parentNode.parentNode.classList.contains(classCheck)
      && !target.parentNode.classList.contains(classMore)) {
        //if click on date wrapper or festival info
        festMore = target.parentNode.parentNode.children[3];
      } else if     (target.parentNode.parentNode.parentNode.classList.contains(classCheck) 
      && !target.parentNode.parentNode.classList.contains(classMore)) {
        //if click on festival pic wrapper or festival dates
        festMore = target.parentNode.parentNode.parentNode.children[3];
      } else if (target.parentNode.parentNode.parentNode.parentNode.classList.contains(classCheck)) {
        //if click on festival pic or date divs
        festMore = target.parentNode.parentNode.parentNode.parentNode.children[3];
      } else {
        //Ignore all other clicks
        return;
      }
    } else {
      //Ignore all other clicks
      return;
    }

    //Hide if click on already unhidden event
    if (!festMore.classList.contains('hide')) {
      festMore.classList.add('hide');
    } else {
      //Hide all previous events
      festivalHider(tab);
      //Show info on selected
      festMore.classList.remove('hide');

      //Scroll into view if not in view
      let eventAll = festMore.parentNode;
      let rect = eventAll.getBoundingClientRect();
      let moreTop = rect.top;
      let moreBottom = rect.bottom;
    
      if (moreTop < 0) {
        eventAll.scrollIntoView({block: 'start'});
      } else if (moreBottom > window.innerHeight) {
        eventAll.scrollIntoView({block: 'end'});
      }
    }

    //Display favorite or arrow icon
    eventsLogic.arrowFavDisplay(festMore);
  }



  //Function to initialize festival handlers
  const festivalsInit = () => {
    //Event Listeners for clicking buttons in a festival
    const festivalList = document.querySelector('.festival-list');
    if (festivalList) {
      //Event Listener for favorite icon clicking
      festivalList.addEventListener('submit', e => {
        eventsLogic.favSave(e);
        eventsLogic.pathGet(e);
      })
      //Event Listeners for share button clicking
      festivalList.addEventListener('click', e => {
        eventsLogic.shareEvent(e);
      })
      //Event Listeners for each festival to expand info
      festivalList.addEventListener('click', e => {
        festivalExpand(e, 'festival');
      })
    }
  }

  return { festivalsInit, festivalExpand }

})();


//Tours Module
const toursLogic = (() => {
  //Function to give search suggestions

  //Automatically search if complete an artist's name
  const tourSearch = () => {
    const tourSearchBox = document.querySelector('.tour-search-box');
    if (tourSearchBox) {
      const noArtists = document.querySelector('.no-artists');
      const foundArtists = document.querySelector('.found-artists');
      //Get searchbox input
      term = tourSearchBox.value.toLowerCase();
      const searchIcon = document.querySelector('.tour-search-icon');
      //Put magnifying icon back if just whitespace
      if (term.trim() === '') {
        searchIcon.classList.remove('tour-x');
      } else {
        searchIcon.classList.add('tour-x');
      }

      //Only Start suggesting after 2 inputs
      if (term.length < 2) {
        noArtists.classList.add('hide');
        foundArtists.classList.add('hide');
        foundArtists.innerHTML = ``;
        return;
      } else {
        //Create array of artist suggestions max 5
        //artists = gon.artists;
        //gon.watch('artists', (artists) => {
        artists = gon.global.artists;

        let suggestions = []
        for (let i=0; i<artists.length; i+=1) {
          let artist = artists[i][0];
          let id = artists[i][1];
          if (artist.toLowerCase().includes(term)) {
            suggestions.push([artist, artist.toLowerCase().indexOf(term), id])
          }
          if (suggestions.length === 5) {
            break;
          }
        }
        //Check if no suggestions
        if (suggestions.length === 0) {
          noArtists.classList.remove('hide');
          foundArtists.classList.add('hide');
          foundArtists.innerHTML = ``;
        } else {
          //Display suggestions
          noArtists.classList.add('hide');
          foundArtists.classList.remove('hide');
          foundArtists.innerHTML = ``;
          //Want to highlight part of artist that was searched
          for (let i=0; i<suggestions.length; i+=1) {
            let link = document.createElement('a');
            link.href = `/tours?artist=${suggestions[i][2]}`;
            link.setAttribute('data-remote', 'true');

            link.innerHTML = `
              <div>${suggestions[i][0].slice(0, suggestions[i][1])}</div><div class='highlight'>${suggestions[i][0].slice(suggestions[i][1], suggestions[i][1]+term.length)}</div><div>${suggestions[i][0].slice(suggestions[i][1]+term.length, suggestions[i][0].length)}</div>
            `;
            foundArtists.appendChild(link);
          }
        }
        //Automatically follow suggestion if only one and typed term matches exactly
        if (suggestions.length === 1 && suggestions[0][0].toLowerCase() === term) {
          //Don't render and just place the name in the search bar if the page is already the searched artist
          const toursArtist = document.querySelector('.tours-artist');
          if (toursArtist.innerHTML.trim().slice(0,-5) === suggestions[0][0]) {
            tourSearchBox.value = suggestions[0][0];
            foundArtists.classList.add('hide');
          } else {
            foundArtists.children[0].click();
          }
        }

      //})

      }

    }
  }

  //Function to add No artists found to searchbox
  const noArtistsAdd = () => {
    const noArtistsFound = document.querySelector('.no-artists');
    noArtistsFound.classList.add('hide');
    const tourSearchBox = document.querySelector('.tour-search-box');
    tourSearchBox.value = noArtistsFound.innerHTML.trim();
  }


  //Function to initialize tour handlers
  const toursInit = () => {
    //Event Listener for typing into search box
    const tourSearchBox = document.querySelector('.tour-search-box');
    if (tourSearchBox) {
      tourSearchBox.addEventListener('keyup', () => {
        tourSearch();
      })
    }

    //Event Listener for clicking on No artists found suggestion
    const noArtistsFound = document.querySelector('.no-artists');
    if (noArtistsFound) {
        noArtistsFound.addEventListener('click', () => {
          noArtistsAdd();
      })
    }

    //Event Listener for clicking on filter icon
    const searchIcon = document.querySelector('.tour-search-icon');
    if (searchIcon) {
      searchIcon.addEventListener('click', () => {
        eventsLogic.changeIcon(searchIcon);
      })
    }

    //Event Listeners for clicking buttons in a tour
    const toursList = document.querySelector('.tours-list-wrapper');
    if (toursList) {
      //Event Listener for favorite icon clicking
      toursList.addEventListener('submit', e => {
        eventsLogic.favSave(e);
        eventsLogic.pathGet(e);
      })
      //Event Listeners for share button clicking
      toursList.addEventListener('click', e => {
        eventsLogic.shareEvent(e);
      })
      //Event Listeners for each festival to expand info
      toursList.addEventListener('click', e => {
        festivalsLogic.festivalExpand(e, 'tour');
      })
      //Event Listeners for clicking on link to artist tour in event more
      toursList.addEventListener('click', e => {
        let target = e.target;
        if (target.classList.contains('soundcloud-artist')) {
          const navTours = document.querySelector('.tab-tours');
          navLogic.tabHighlight(navTours);
          navLogic.tabURL(navTours);
          //Show Loading Animation
          loadLogic.showLoad(true);
        }
      })
    }
  }

  return { toursInit }

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

  //Initialize Nav 
  navLogic.navInit();
  //Highlight Correct Tab on First Load
  navLogic.tabHighlightOnLoad();


  //Initialize Recent Slider
  const recentSlider = document.querySelector('.recent-slider');
  sliderLogic.sliderInit(recentSlider);
  //Initialize Fav Slider
  const favSlider = document.querySelector('.fav-slider');
  sliderLogic.sliderInit(favSlider);


  //Initialize Event listeners
  eventsLogic.eventsInit();

  //Initialize Festival Listeners
  festivalsLogic.festivalsInit();

  //Initialize Tour Listeners
  toursLogic.toursInit();

})