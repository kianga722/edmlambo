class EventsController < ApplicationController

  #Homepage
  def index
    #Check if have location cookies
    #Set default to New York otherwise
    if (cookies.encrypted[:locations])
      @locationsAdded = JSON.load(cookies.encrypted[:locations])
      @locationsToggle = JSON.load(cookies.encrypted[:locationsToggle])
    else
      @locationsAdded = ['New York']
      @locationsToggle = [['New York', 'active']]
      #Set checkbox cookies
      cookies.permanent.encrypted[:locations] = JSON.dump(@locationsAdded)
      #Set toggle cookies
      cookies.permanent.encrypted[:locationsToggle] = JSON.dump(@locationsToggle)
    end

    #Repeating Preparation Steps
    #Prepare favorite cookies for slider
    if (cookies.encrypted[:favsArr])
      favsArr = JSON.load(cookies.encrypted[:favsArr])
    else
      favsArr = []
      cookies.permanent.encrypted[:favsArr] = JSON.dump(favsArr)
    end
    #Get event arr from list of event IDs
    @eventFavs = get_favs(favsArr)

    #Prepare variables to check
    @eventsNoFavs = get_events(@locationsToggle)
    @togglesInactive = isAllInactive(@locationsToggle)

    #Prepare variables to render
    @events = get_events(@locationsToggle, false, false, favsArr)
    @dates = get_dates(@events)

    #Prepare events for slider
    @eventSlider = get_events(@locationsToggle, true, false, favsArr)

    #Prepare new tags
    @eventNew = get_events(@locationsToggle, false, true, favsArr)

    #Render
    respond_to do |format|
      format.js
      format.html
    end

  end

  #Location Popup
  def update
    #Get current locations before change
    locationsCurrent = get_locationsCurrent(params)

    #Get current locations after change
    @locationsAdded = get_locationsAdded(params)

    #Compare arrays to current to see if rendering is required
    @renderPage = locationsCompare(locationsCurrent, @locationsAdded)

    #Set checkbox cookies
    cookies.permanent.encrypted[:locations] = JSON.dump(@locationsAdded)

    #Make locations array for top toggling
    locationsToggleOld = JSON.load(cookies.encrypted[:locationsToggle])
    @locationsToggle = toggleNewUpdate(locationsToggleOld, @locationsAdded)

    #Set toggle cookies
    cookies.permanent.encrypted[:locationsToggle] = JSON.dump(@locationsToggle)

    #Get previous filter terms
    @filter = params[:filterTerm];

    #Repeating Preparation Steps
    #Prepare favorite cookies for slider
    if (cookies.encrypted[:favsArr])
      favsArr = JSON.load(cookies.encrypted[:favsArr])
    else
      favsArr = []
      cookies.permanent.encrypted[:favsArr] = JSON.dump(favsArr)
    end
    #Get event arr from list of event IDs
    @eventFavs = get_favs(favsArr)

    #Prepare variables to check
    @eventsNoFavs = get_events(@locationsToggle)
    @togglesInactive = isAllInactive(@locationsToggle)

    #Prepare variables to render
    @events = get_events(@locationsToggle, false, false, favsArr)
    @dates = get_dates(@events)

    #Prepare events for slider
    @eventSlider = get_events(@locationsToggle, true, false, favsArr)

    #Prepare new tags
    @eventNew = get_events(@locationsToggle, false, true, favsArr)

    #Render
    respond_to do |format|
      format.js
    end

  end

  #Toggle Location
  def create
    #Create location arrays
    locationsToggleOld = []
    @locationsAdded = []
    params.each do |key, value|
      if value === 'active' || value === 'inactive'
        locationsToggleOld.push([key, value])
        @locationsAdded.push(key)
      end
    end

    #Decide if need to render page or not
    @renderPage = toggleDecide(locationsToggleOld)

    #Prepare location toggle arrays
    locationSelected = params[:locationClicked]
    @locationsToggle = toggleNew(locationsToggleOld, locationSelected)

    #Set toggle cookies
    cookies.permanent.encrypted[:locationsToggle] = JSON.dump(@locationsToggle)

    #Get previous filter terms
    @filter = params[:filterTerm];

    #Repeating Preparation Steps
    #Prepare favorite cookies for slider
    if (cookies.encrypted[:favsArr])
      favsArr = JSON.load(cookies.encrypted[:favsArr])
    else
      favsArr = []
      cookies.permanent.encrypted[:favsArr] = JSON.dump(favsArr)
    end
    #Get event arr from list of event IDs
    @eventFavs = get_favs(favsArr)

    #Prepare variables to check
    @eventsNoFavs = get_events(@locationsToggle)
    @togglesInactive = isAllInactive(@locationsToggle)

    #Prepare variables to render
    @events = get_events(@locationsToggle, false, false, favsArr)
    @dates = get_dates(@events)

    #Prepare events for slider
    @eventSlider = get_events(@locationsToggle, true, false, favsArr)

    #Prepare new tags
    @eventNew = get_events(@locationsToggle, false, true, favsArr)

    #Render
    respond_to do |format|
      format.js { render action: 'update'}
    end

  end

  #Favorites
  def new
    #Get event that was clicked
    eventID = params[:eventID].to_i
    #Get favorites from cookies
    favsArr = JSON.load(cookies.encrypted[:favsArr])
    #Push event to favorites or delete if same event
    if favsArr.include? eventID
      favsArr.delete(eventID)
    else
      favsArr.push(eventID)
    end 

    #Save favs arr to cookies
    cookies.permanent.encrypted[:favsArr] = JSON.dump(favsArr)

    #Need only IDs for festivals
    @favsArr = favsArr
    #Get event arr from list of event IDs for Cities
    @eventFavs = get_favs(favsArr)

    #Only diplay fav slider if in Cities
    @displayFavs = params[:path] === '/' ? true : false
   

    respond_to do |format|
      format.js
    end

  end


  #Festivals
  def festivals 
    #Get festival events
    @festivalDatesArr = get_festivals()
    #Get month headers
    @months = get_months(@festivalDatesArr)

    #Repeating Preparation Steps
    #Prepare favorite cookies for slider
    if (cookies.encrypted[:favsArr])
      favsArr = JSON.load(cookies.encrypted[:favsArr])
    else
      favsArr = []
      cookies.permanent.encrypted[:favsArr] = JSON.dump(favsArr)
    end

    #Use favsArr to get list of event IDs because just need ID and not entire event
    @favsArr = favsArr

    #Prepare new tags for recently added festivals
    @eventNew = new_festivals(@festivalDatesArr)

    respond_to do |format|
      format.js
      format.html
    end

  end


  #Tours
  def tours
    #List of artists to pass to JS
    #gon.artists = Artist.all.order(:name).map { |a| [a.name,a.id] }
    #gon.watch.artists = Artist.all.order(:name).map { |a| [a.name,a.id] }
    #Gon.global.artists = Artist.all.order(:name).map { |a| [a.name,a.id] }



    @renderTour = false

    #Check if search term was sent
    if params[:artist]
      @artist = Artist.find_by(id: params[:artist])
      @renderTour = true
    else
      #Pick random artist otherwise
      @artist = get_random_artist()
    end

    #Find events if there are any
    today = Time.now.strftime('%Y-%m-%d')
    @events = @artist.events.where('date >= ?', today)
    #Prepare months
    @months = get_months_tour(@events)
    #Prepare new tags for recently added tours
    @eventNew = new_tours(@events)

    #Repeating Preparation Steps  
    #Prepare favorite cookies for slider
    if (cookies.encrypted[:favsArr])
      favsArr = JSON.load(cookies.encrypted[:favsArr])
    else
      favsArr = []
      cookies.permanent.encrypted[:favsArr] = JSON.dump(favsArr)
    end

    #Get event arr from list of event IDs for Cities
    @eventFavs = get_favs(favsArr)


    respond_to do |format|
      format.js
      format.html
    end
  
  end



  private

  #Get current locations before change
  def get_locationsCurrent(par)
    locationsCurrent = []
    par.each do |key, value|
      if value === 'current' 
        loc = key[0..-9]
        locationsCurrent.push(loc)
      end
    end
    return locationsCurrent
  end

  #Get current locations after change
  def get_locationsAdded(par)
    locationsAdded = []
    par.each do |key, value|
      if value === 'on' 
        locationsAdded.push(key)
      end
    end
    return locationsAdded
  end

  #Compare arrays to current to see if rendering is required
  def locationsCompare(arr1, arr2)
    if arr2.length == 0
      return false
    elsif arr1.length != arr2.length || arr1 & arr2 != arr1
      return true
    end
    return false
  end

  #Prepare locations for get_events function
  def locationsPrepare(locationsAdded)
    locations_edit = []
    locationsAdded.each do |location|
      loc = location
      if location.include? ','
        loc = to_state(location[-2..-1])
      end
      locations_edit.push(loc) unless locations_edit.include? loc
    end
    return locations_edit
  end
  
  #See if all toggles were active
  def isAllActive(locationsToggleOld) 
    locationsToggleOld.each do |loc|
      return false if loc[1] === 'inactive'
    end
    return true
  end

  #Find all active locations
  def findActive(locationsToggleOld)
    arrActive = []
    locationsToggleOld.each do |arr|
      arrActive.push(arr[0]) if arr[1] === 'active'
    end
    return arrActive
  end

  #See if all toggles inactive
  def isAllInactive(locationsToggle) 
    arr = findActive(locationsToggle)
    return true if arr.length === 0
    return false
  end

  #Decide if rendering needed
  def toggleDecide(locationsToggleOld)
    #No if only 1 location and it is active
    if (locationsToggleOld.length === 1) && (findActive(locationsToggleOld).length === 1)
      return false
    end
    return true
  end 

  #Get simple array of toggle locations
  def justLocations(locationsToggle) 
    arrNew = []
    locationsToggle.each do |arr|
      arrNew.push(arr[0])
    end
    return arrNew
  end

  #Create new array of locationsToggle
  def toggleNew(locationsToggleOld, locationSelected)
    #Return 2 arrays
    arrNew = []
    #If all active, only clicked becomes active
    if isAllActive(locationsToggleOld)
      locationsToggleOld.each do |arr|
        if arr[0] === locationSelected
          arr[1] = 'active'
        else
          arr[1] = 'inactive'
        end
        arrNew.push(arr)
      end
    else
      #If not all active
      #Get array of locations that were active
      arrActiveOld = findActive(locationsToggleOld)
      #If click on active, everything active
      if arrActiveOld.include? locationSelected
        locationsToggleOld.each do |arr|
          arr[1] = 'active'
          arrNew.push(arr)
        end
      else
      #If click on inactive, adds to active
        locationsToggleOld.each do |arr|
          if (arrActiveOld.include? arr[0]) || (arr[0] == locationSelected)
            arr[1] = 'active'
          end
          arrNew.push(arr)
        end
      end

    end
    return arrNew
  end

  #Creating toggle array with changing locations in update action
  def toggleNewUpdate(locationsToggleOld, locationsAdded)
    #Get just locations of old toggle array
    locationsOld = justLocations(locationsToggleOld)
    #Get active locations from before update
    locationsActiveOld = findActive(locationsToggleOld)
    #Get new locations added base array
    locationsDefault= locationsAdded.map { |n| [n, 'active']}

    #Make new array of corrected active locations
    arrNewToggle = []
    locationsDefault.each do |arr|
      #make inactive if part of old toggle and was inactive
      if (locationsOld.include? arr[0]) && (!locationsActiveOld.include? arr[0])
        arr[1] = 'inactive'
      end
      arrNewToggle.push(arr)
    end
    return arrNewToggle
  end

  #Get event list
  def get_events(locationsToggle, recent=false, newEvent=false, favsArr=[]) 
    #Use active array to only show active events
    locationsActive = findActive(locationsToggle)
    #Prepare locations for get_events function
    locations_edit = locationsPrepare(locationsActive)
    #See if states in locations_edit array and on or after current date
    today = Time.now.strftime('%Y-%m-%d')
    #Decide which array to return
    if recent
      #Array of recent events max 10
      return Event.where(state: locations_edit).or(Event.where(id: favsArr)).where('date >= ?', today).order(added: :desc).limit(10);
    elsif newEvent
      #Array of recently added events no older than last week
      lastWeek = (Time.now - (7*24*60*60)).strftime('%Y-%m-%d');
      return Event.where(state: locations_edit).or(Event.where(id: favsArr)).where('date >= ?', today).where('added >= ?', lastWeek).order(added: :desc)
    else
      #Array of all events found
      return Event.where(state: locations_edit).or(Event.where(id: favsArr)).where('date >= ?', today).order(:date)
    end
  end

  #Get relevant dates
  def get_dates(events)
    dates = []
    events.each do |event|
      dates.push(event.date) unless dates.include? event.date
    end
    return dates
  end

  #Get fav event list from event IDs 
  def get_favs(favsArr)
    favEventArr = Event.order(:date).where(id: favsArr)
    return favEventArr if favEventArr.length > 0
    return []
  end

  #Get festival event list
  def get_festivals() 
    #Start from 3 days ago since can be in the middle of a festival
    threeDaysAgo = (Time.now - (3*24*60*60)).strftime('%Y-%m-%d')
    #Find relevant events
    events = Event.where(festival: 1).where('date >= ?', threeDaysAgo).order(:date)

    #Make hash of hashes that include all necessary info
    festivalDatesArr = {}
    events.each do |event|
      #Need to account for same name different locations
      name = "#{event.title} #{event.location}"
      if festivalDatesArr.has_key?(name)
        festivalDatesArr[name]['dates'].push(event.date) 
      else
        festName = "#{event.title} #{event.location}"
        festivalDatesArr[festName] = {
          'dates' => [event.date],
          'id' => event.id,
          'title' => event.title,
          'location' => event.location,
          'ages' => event.ages,
          'link' => event.ticketLink,
          'address' => event.address
        }
      end
    end
    return festivalDatesArr
  end

  #Get month headers
  def get_months(festivalDatesArr)
    months = []
    festivalDatesArr.each do |festival, info|
      info['dates'].each do |date|
        month = DateTime.parse(date).strftime('%B')
        months.push(month) unless months.include? month
      end
    end
    return months
  end

  #Get new festivals
  def new_festivals(festivalDatesArr) 
    newFestivalsArr = []
    #Array of recently added events no older than last week
    lastWeek = (Time.now - (7*24*60*60)).strftime('%Y-%m-%d');
    festivalDatesArr.each do |festival, info|
      if Event.find_by(id: info['id']).added >= lastWeek
        newFestivalsArr.push(info['id'])
      end
    end
    return newFestivalsArr
  end

  #Get random artist for tours
  def get_random_artist()
    today = Time.now.strftime('%Y-%m-%d')

    randArtist = Artist.find_by(id: rand(Artist.count))
    while randArtist == nil || randArtist.events.where('date >= ?', today).length < 20 do
      randArtist = Artist.find_by(id: rand(Artist.count))
    end
    return randArtist
  end

  #Get tour months
  def get_months_tour(eventsArr)
    months = []
    eventsArr.each do |event|
      month = DateTime.parse(event.date).strftime('%B')
      months.push(month) unless months.include? month
    end
    return months
  end

  #Get new tours
  def new_tours(events)
    new_tours = []
    lastWeek = (Time.now - (7*24*60*60)).strftime('%Y-%m-%d');
    events.each do |event|
      if event.added >= lastWeek
        new_tours.push(event)
      end
    end
    return new_tours
  end

  #Translate state abbreviations to full
  def to_state(x)
    states = {
      'AL' => 'Alabama',
      'AK' => 'Alaska',
      'AS' => 'America Samoa',
      'AZ' => 'Arizona',
      'AR' => 'Arkansas',
      'CA' => 'California',
      'CO' => 'Colorado',
      'CT' => 'Connecticut',
      'DE' => 'Delaware',
      'DC' => 'District of Columbia',
      'FM' => 'Micronesia1',
      'FL' => 'Florida',
      'GA' => 'Georgia',
      'GU' => 'Guam',
      'HI' => 'Hawaii',
      'ID' => 'Idaho',
      'IL' => 'Illinois',
      'IN' => 'Indiana',
      'IA' => 'Iowa',
      'KS' => 'Kansas',
      'KY' => 'Kentucky',
      'LA' => 'Louisiana',
      'ME' => 'Maine',
      'MH' => 'Islands1',
      'MD' => 'Maryland',
      'MA' => 'Massachusetts',
      'MI' => 'Michigan',
      'MN' => 'Minnesota',
      'MS' => 'Mississippi',
      'MO' => 'Missouri',
      'MT' => 'Montana',
      'NE' => 'Nebraska',
      'NV' => 'Nevada',
      'NH' => 'New Hampshire',
      'NJ' => 'New Jersey',
      'NM' => 'New Mexico',
      'NY' => 'New York',
      'NC' => 'North Carolina',
      'ND' => 'North Dakota',
      'OH' => 'Ohio',
      'OK' => 'Oklahoma',
      'OR' => 'Oregon',
      'PW' => 'Palau',
      'PA' => 'Pennsylvania',
      'PR' => 'Puerto Rico',
      'RI' => 'Rhode Island',
      'SC' => 'South Carolina',
      'SD' => 'South Dakota',
      'TN' => 'Tennessee',
      'TX' => 'Texas',
      'UT' => 'Utah',
      'VT' => 'Vermont',
      'VI' => 'Virgin Island',
      'VA' => 'Virginia',
      'WA' => 'Washington',
      'WV' => 'West Virginia',
      'WI' => 'Wisconsin',
      'WY' => 'Wyoming'
    }
    return states[x]
  end


end
