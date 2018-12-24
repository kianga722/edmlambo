require 'rails_helper'

RSpec.describe 'site layout' do

  before(:all) do 
    twoWeeksAgo = (Time.now - (14*24*60*60)).strftime('%Y-%m-%d');
    yesterday = (Time.now - (24*60*60)).strftime('%Y-%m-%d');
    tomorrow = (Time.now + (24*60*60)).strftime('%Y-%m-%d');
    dayAfterTom = (Time.now + (2*4*60*60)).strftime('%Y-%m-%d');
    nextWeek = (Time.now + (7*4*60*60)).strftime('%Y-%m-%d');
  
    #New York Event added 2 weeks ago
    Event.create!(title: 'Alesso Allday',
                  date: tomorrow,
                  venue: 'Schimanski',
                  location: 'Brooklyn, NY',
                  state: 'New York',
                  ages: nil,
                  added: twoWeeksAgo,
                  ticketLink: 'https://edmtrain.com/new-york?event=99260&tickets',
                  address: '54 N 11th St, Brooklyn, NY 11249, USA',
                  festival: 0)
    #Recently Added New York Event
    Event.create!(title: 'Zeddy',
                  date: dayAfterTom,
                  venue: 'Output',
                  location: 'Brooklyn, NY',
                  state: 'New York',
                  ages: nil,
                  added: yesterday,
                  ticketLink: 'https://edmtrain.com/new-york?event=99160&tickets',
                  address: '54 N 11th St, Brooklyn, NY 11249, USA',
                  festival: 0)
    #Festival
    Event.create!(title: 'The Cityfox Odyssey - NYE & NYD',
                  date: nextWeek,
                  venue: 'AvantGardner',
                  location: 'Brooklyn, NY',
                  state: 'New York',
                  ages: '21+',
                  added: yesterday,
                  ticketLink: 'https://edmtrain.com/new-york?event=98160&tickets',
                  address: '140 Stewart Ave, Brooklyn, NY 11237, USA',
                  festival: 1)
    #Alabama Event
    Event.create!(title: 'Daily Bread',
                  date: tomorrow,
                  venue: 'Zydeco',
                  location: 'Birmingham, AL',
                  state: 'Alabama',
                  ages: '18+',
                  added: twoWeeksAgo,
                  ticketLink: 'https://edmtrain.com/alabama?event=100330&tickets',
                  address: '2001 15th Ave S, Birmingham, AL 35205, USA',
                  festival: 0)
    #Place Alabama
    Place.create!(:location => 'Alabama', :link => 'alabama')
    #Artists create
    Artist.create!(:name => 'Alesso')
    Artist.create!(:name => 'Zedd')
    Artist.create!(:name => 'Martin Garrix')
    #Relationships create
    Relationship.create!(:artist_id => 1,
                         :event_id => 1)
    Relationship.create!(:artist_id => 2,
                         :event_id => 2)
    Relationship.create!(:artist_id => 3,
                         :event_id => 3)
    Relationship.create!(:artist_id => 2,
                         :event_id => 4)   
    #Create over 20 events for random artist on tours page
    i=1
    20.times do 
      Event.create!(title: "Amazing Event ##{i}",
                    date: tomorrow,
                    venue: 'Amazing Venue',
                    location: 'San Francisco, CA',
                    state: 'California',
                    ages: '18+',
                    added: twoWeeksAgo,
                    ticketLink: 'https://edmtrain.com/alabama?event=100330&tickets',
                    address: '101 6th St, San Francisco, CA 94103, USA',
                    festival: 0)
      Relationship.create!(:artist_id => 2,
                           :event_id => 4+i)
      i+=1
    end
                  
  end

  describe 'home page', :type => :request do
    it 'displays New York events on home page' do
      get '/'
      assert_select 'title', 'edmlambo - EDM Concerts App'
      assert_match 'Change Locations', response.body
      assert_select "form input[type=submit][value='New York']"
      assert_match 'Alesso Allday', response.body
      assert_match 'Zeddy', response.body
      assert_match 'The Cityfox Odyssey', response.body
      assert_select 'div', text: 'new'
    end 
  end

  describe 'direct location url', :type => :request do
    it 'displays state events from state URL' do
      get '/alabama'
      assert_select 'title', 'edmlambo - EDM Concerts App'
      assert_match 'Change Locations', response.body
      assert_select 'form input[type=submit][value=Alabama]'
      assert_match 'Zydeco', response.body
    end
  end

  describe 'festivals page', :type => :request do
    it 'displays only festivals on festivals page' do
      get '/festivals'
      assert_select 'title', 'edmlambo - EDM Concerts App'
      expect(response.body).not_to match('Change Locations')
      expect(response.body).not_to match('Enter artist to see tour dates')
      assert_match 'The Cityfox Odyssey', response.body
    end
  end


  describe 'tours page' do
    it 'displays tours page of random artist', :type => :request do
      get '/tours'
      assert_select 'title', 'edmlambo - EDM Concerts App'
      expect(response.body).not_to match('Change Locations')
      assert_match 'Enter artist to see tour dates', response.body
      assert_match 'Amazing Event #16', response.body
    end
  end


end