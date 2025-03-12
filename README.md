# Friends360

Like Life360 but catered towards friends

## Table of Contents

- [Usage](#usage)
- [Authentication](#authentication)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Demo](#demo)

## Usage

This app has multiple features that can be used among friends:
- The ability to create friend groups 
- Instant messaging across multiple groups powered by Stream API
- Account management (profile picture, profile deletion, updating username, etc)
- A map to track where friends are and the ability to update your location at any given time. This was creating using Google Maps API. Clicking on a user icon on the map shows the current address using reverse geocoding from Google Maps API.
- A feature to invite people to different groups, leave groups, and delete groups
- A feature that allows groups to find nearby events using Google Places API and then add it to a list of plans. Users can accept or decline specific plans.  


## Authentication

User data is stored using MongoDB and react query for fast data retrieval.'

Users are prompted to signup to be able to access the site. Unauthorized users will be redirected to the login page and will not be able to access any of the app's features. 

User data is stored to keep track of plans, current location, friend groups, etc.

## Technologies

Languages: HTML, CSS, Javascript

Server/Database: MongoDB

Libraries: React, React Query, React Router, MantineUI

APIs: Google Maps API, Stream API

Frameworks: Node.js, Express.js

## Contributing

If youd like to contribute, please let me know! I would be glad to work on it more if someone wants to work on it with me.

## License

no license, but you can use this code, however, please credit me

## Contact

- If you have any questions or want to contribute somehow, email me at nessimyohros@gmail.com

## Demo

No demo but a youtube link will be posted soon showing the features and functionalites of the app
