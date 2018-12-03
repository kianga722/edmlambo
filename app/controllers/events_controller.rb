class EventsController < ApplicationController

  def index
    #Check if have location cookies
    #Set default to New York otherwise
    if (cookies.encrypted[:locations])
      @locationsAdded = JSON.load(cookies.encrypted[:locations])
    else
      @locationsAdded = ['New York']
    end
    
    @eventsNYC = Event.all.order(:date).select {|e| e.state == 'New York'}
    @dates = []
    @eventsNYC.each do |event|
      @dates.push(event.date) unless @dates.include? event.date
    end
  end

  def update
    @locationsAdded = []
    params.each do |key, value|
      if value === 'on' 
        @locationsAdded.push(key)
      end
    end

    @eventsNYC = 

    
    
    cookies.permanent.encrypted[:locations] = JSON.dump(@locationsAdded)

    render 'events/index'

  end

end
