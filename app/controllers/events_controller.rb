class EventsController < ApplicationController

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

    #Prepare variables to render
    @events = get_events(@locationsToggle)
    @dates = get_dates(@events)

    puts @events.inspect

  end

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

    #Prepare variables to render
    @events = get_events(@locationsToggle)
    @dates = get_dates(@events)

    #Render
    respond_to do |format|
      format.js
    end

  end

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

    #Prepare variables to render
    @events = get_events(@locationsToggle)
    @dates = get_dates(@events)

    #Render
    respond_to do |format|
      format.js { render action: 'update'}
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
  def get_events(locationsToggle) 
    #Use active array to only show active events
    locationsActive = findActive(locationsToggle)
    #Prepare locations for get_events function
    locations_edit = locationsPrepare(locationsActive)
    #See if states in locations_edit array
    Event.all.order(:date).select {|e| locations_edit.include? e.state }
  end

  #Get relevant dates
  def get_dates(events)
    dates = []
    events.each do |event|
      dates.push(event.date) unless dates.include? event.date
    end
    return dates
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
