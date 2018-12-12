#Read in JSON file of events
file = File.read('db/events.json')
parsedEvents = JSON.parse(file)


#Created Artists first
parsedEvents['data'].length.times do |i|             
  parsedEvents['data'][i]['artistList'].each do |artist|
    #Only include if artist is unique
    if Artist.find_by(name: artist['name']) == nil
      Artist.create!(name: artist['name'])
    end
  end
end

#Created Events and Relationship databases
parsedEvents['data'].length.times do |i|
  #Create titles for events
  eventTitle = parsedEvents['data'][i]['name']  
  if eventTitle == nil
    eventTitle = ''
    parsedEvents['data'][i]['artistList'].each do |artist|
      if eventTitle == '' 
        eventTitle = artist['name']
      else
        eventTitle = eventTitle + ', ' + artist['name']
      end
    end   
  end
  

  #Create events
  event = Event.create!(title: eventTitle,
                        date: parsedEvents['data'][i]['date'],
                        venue: parsedEvents['data'][i]['venue']['name'],
                        location: parsedEvents['data'][i]['venue']['location'],
                        state: parsedEvents['data'][i]['venue']['state'],
                        ages: parsedEvents['data'][i]['ages'],
                        added: parsedEvents['data'][i]['createdDate'][0..9],
                        ticketLink: parsedEvents['data'][i]['ticketLink'],
                        address: parsedEvents['data'][i]['venue']['address'])
                
  #Create relationships             
  parsedEvents['data'][i]['artistList'].each do |artist|
    #Include every artist in each event
    artistID = Artist.find_by(name: artist['name']).id
    Relationship.create!(artist_id: artistID,
                         event_id: event.id)
  end

end
