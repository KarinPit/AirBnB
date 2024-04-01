const stays = [
  {
    "_id": "10006546",
    "name": "Ribeira Charming Duplex",
    "type": "House",
    "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "otherImg.jpg"],
    "price": 80.00,
    "summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
    "capacity": 8,
    "amenities": [
      "TV",
      "Wifi",
      "Kitchen",
      "Smoking allowed",
      "Pets allowed",
      "Cooking basics"
    ],
    "labels": [
      "Top of the world",
      "Trending",
      "Play",
      "Tropical"
    ],
    "host": {
      "_id": "u101",
      "fullname": "Davit Pok",
      "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
    },
    "loc": {
      "country": "Portugal",
      "countryCode": "PT",
      "city": "Porto",
      "address": "17 Kombo st",
      "lat": -8.61308,
      "lng": 41.1413
    },
    "reviews": [
      {
        "id": "madeId",
        "txt": "Very helpful hosts. Cooked traditional...",
        "rate": 4,
        "by": {
          "_id": "u102",
          "fullname": "user2",
          "imgUrl": "/img/img2.jpg"
        }
      }
    ],
    "likedByUsers": ['mini-user'] // for user-wishlist : use $in
  }
]

const orders = [
  {
    "_id": "o1225",
    "hostId": "u102",
    "buyer": {
      "_id": "u101",
      "fullname": "User 1"
    },
    "totalPrice": 160,
    "startDate": "2025/10/15",
    "endDate": "2025/10/17",
    "guests": {
      "adults": 2,
      "kids": 1
    },
    "stay": {
      "_id": "h102",
      "name": "House Of Uncle My",
      "price": 80.00
    },
    "msgs": [],
    "status": "pending" // pending, approved
  }
]

const users = [
  {
    "_id": "u101",
    "fullname": "User 1",
    "imgUrl": "/img/img1.jpg",
    "username": "user1",
    "password": "secret"
  },
  {
    "_id": "u102",
    "fullname": "User 2",
    "imgUrl": "/img/img2.jpg",
    "username": "user2",
    "password": "secret",
    // "isOwner" : true // OPTIONAL
  }
]
