class EventsController < ApplicationController

  def index
    @eventsNYC = Event.all.order(:date).select {|e| e.state == 'New York'}
    @dates = []
    @eventsNYC.each do |event|
      @dates.push(event.date) unless @dates.include? event.date
    end
  end

end
