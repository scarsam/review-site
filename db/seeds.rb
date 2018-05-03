# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
author = Author.create(
  name: 'Sam Ojling',
  email: 'sam@ojling.com',
  image: 'http://test.jpg',
  uid: '1'
)

author.reviews.create(
  title: 'Gaijin Sushi, Birmingham: ‘An utter delight’',
  description: 'I think I’m in love, in that sweaty-palmed, unhealthy way; the sort that makes you think you’re going down with the flu. The object of my desire: Ugly Delicious on Netflix, which I have binge watched until images of bronzed and shiny Peking duck, golden-carapaced fried chicken and plump, taut-skinned soupy dumplings were flashing through my tortured mind each night as I drifted off to sleep.',
  rating: 3
)

author1 = Author.create(
  name: 'Oscar Ojling',
  email: 'oscar@ojling.com',
  image: 'http://test2.jpg',
  uid: '2'
)

author1.reviews.create(
  title: 'Perfect Portuguese white wines',
  description: 'Portugal is rightly known as the home of classy reds and, of course, Port. But its white wines deserve to be tasted, too. Here are three great bottles to get you started',
  rating: 1
)