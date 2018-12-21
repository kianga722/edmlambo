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
                        address: parsedEvents['data'][i]['venue']['address'],
                        festival: parsedEvents['data'][i]['festivalInd'])
                
  #Create relationships             
  parsedEvents['data'][i]['artistList'].each do |artist|
    #Include every artist in each event
    artistID = Artist.find_by(name: artist['name']).id
    Relationship.create!(artist_id: artistID,
                         event_id: event.id)
  end

end

#Create footer locations for direct links
places = {'Alabama' => 'alabama',
          'Alaska' => 'alaska',
          'Arizona' => 'arizona',
          'Arkansas' => 'arkansas',
          'California' => 'california',
          'Colorado' => 'colorado',
          'Connecticut' => 'connecticut',
          'Delaware' => 'delaware',
          'Florida' => 'florida',
          'Georgia' => 'georgia',
          'Hawaii' => 'hawaii',
          'Idaho' => 'idaho',
          'Illinois' => 'illinois',
          'Indiana' => 'indiana',
          'Iowa' => 'iowa',
          'Kansas' => 'kansas',
          'Kentucky' => 'kentucky',
          'Louisiana' => 'louisiana',
          'Maine' => 'maine',
          'Maryland' => 'maryland',
          'Massachusetts' => 'massachusetts',
          'Michigan' => 'michigan',
          'Minnesota' => 'minnesota',
          'Mississippi' => 'mississippi',
          'Missouri' => 'missouri',
          'Montana' => 'montana',
          'Nebraska' => 'nebraska',
          'Nevada' => 'nevada',
          'New Hampshire' => 'new-hampshire',
          'New Jersey' => 'new-jersey',
          'New Mexico' => 'new-mexico',
          'New York' => 'new-york',
          'North Carolina' => 'north-carolina',
          'North Dakota' => 'north-dakota',
          'Ohio' => 'ohio',
          'Oklahoma' => 'oklahoma',
          'Oregon' => 'oregon',
          'Pennsylvania' => 'pennsylvania',
          'Rhode Island' => 'rhode-island',
          'South Carolina' => 'south-carolina',
          'South Dakota' => 'south-dakota',
          'Tennessee' => 'tennessee',
          'Texas' => 'texas',
          'Utah' => 'utah',
          'Vermont' => 'vermont',
          'Virginia' => 'virginia',
          'Washington' => 'washington',
          'West Virginia' => 'west-virginia',
          'Wisconsin' => 'wisconsin',
          'Wyoming' => 'wyoming',
          'Alberta' => 'alberta',
          'British Columbia' => 'british-columbia',
          'Manitoba' => 'manitoba',
          'New Brunswick' => 'new-brunswick',
          'Nova Soctia' => 'nova-scotia',
          'Ontario' => 'ontario',
          'Quebec' => 'quebec',
          'Saskatchewan' => 'saskatchewan',
          'Asheville, NC' => 'asheville-nc',
          'Atlanta, GA' => 'atlanta-ga',
          'Atlantic City, NJ' => 'atlantic-city-nj',
          'Austin, TX' => 'austin-tx',
          'Baltimore, MD' => 'baltimore-md',
          'Boston, MA' => 'boston-ma',
          'Buffalo, NY' => 'buffalo-ny',
          'Calgary, AB' => 'calgary-ab',
          'Charlotte, NC' => 'charlotte-nc',
          'Chicago, IL' => 'chicago-il',
          'Cleveland, OH' => 'cleveland-oh',
          'Columbus, OH' => 'columbus-oh',
          'Costa Mesa, CA' => 'costa-mesa-ca',
          'Dallas, TX' => 'dallas-tx',
          'Denver, CO' => 'denver-co',
          'Detroit, MI' => 'detroit-mi',
          'Edmonton, AB' => 'edmonton-ab',
          'El Paso, TX' => 'el-paso-tx',
          'Eugene, OR' => 'eugene-or',
          'Grand Rapids, MI' => 'grand-rapids-mi',
          'Houston, TX' => 'houston-tx',
          'Kansas City, MO' => 'kansas-city-mo',
          'Las Vegas, NV' => 'las-vegas-nv',
          'Los Angeles, CA' => 'los-angeles-ca',
          'Madison, WI' => 'madison-wi',
          'Miami, FL' => 'miami-fl',
          'Milwaukee, WI' => 'milwaukee-wi',
          'Minneapolis, MN' => 'minneapolis-mn',
          'Montreal, QC' => 'montreal-qc',
          'Nashville, TN' => 'nashville-tn',
          'New Orleans, LA' => 'new-orleans-la',
          'New York City, NY'=> 'new-york-city-ny',
          'Orlando, FL' => 'orlando-fl',
          'Ottawa, ON' => 'ottawa-on',
          'Philadelphia, PA' => 'philadelphia-pa',
          'Phoenix, AZ' => 'phoenix-az',
          'Pittsburgh, PA' => 'pittsburgh-pa',
          'Portland, OR' => 'portland-or',
          'Reno, NV' => 'reno-nv',
          'Richmond, VA' => 'richmond-va',
          'Sacramento, CA' => 'sacramento-ca',
          'Saint Louis, MO' => 'saint-louis-mo',
          'Salt Lake City, UT' => 'salt-lake-city-ut',
          'San Diego, CA' => 'san-diego-ca',
          'San Francisco, CA' => 'san-francisco-ca',
          'Santa Barbara, CA' => 'santa-barbara-ca',
          'Seattle, WA' => 'seattle-wa',
          'Tampa, FL' => 'tampa-fl',
          'Toronto, ON' => 'toronto-on',
          'Vancouver, BC' => 'vancouver-bc',
          'Washington, DC' => 'washington-dc'}

places.each do |place, link| 
  Place.create!(location: place,
                link: link)
end