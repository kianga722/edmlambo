#Use global Gon var for now until come up with something better
if Artist.exists?
  Gon.global.artists = Artist.all.order(:name).map { |a| [a.name,a.id] }
end