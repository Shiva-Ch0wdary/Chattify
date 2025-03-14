const chats = [
  {
    isGroupChat: false,
    users: [
      {
        name: "Ram",
        email: "ram@example.com",
      },
      {
        name: "Shiva",
        email: "shiva@example.com",
      },
    ],
    _id: "617a077e18c25468bc7c4dd4",
    chatName: "Ram",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Guest User",
        email: "guest@example.com",
      },
      {
        name: "Shiva",
        email: "shiva@example.com",
      },
    ],
    _id: "617a077e18c25468b27c4dd4",
    chatName: "Guest User",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Krishna",
        email: "krishna@example.com",
      },
      {
        name: "Shiva",
        email: "shiva@example.com",
      },
    ],
    _id: "617a077e18c2d468bc7c4dd4",
    chatName: "Krishna",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "Ram",
        email: "jon@example.com",
      },
      {
        name: "Shiva",
        email: "shiva@example.com",
      },
      {
        name: "Guest User",
        email: "guest@example.com",
      },
    ],
    _id: "617a518c4081150716472c78",
    chatName: "Friends",
    groupAdmin: {
      name: "Guest User",
      email: "guest@example.com",
    },
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Ram",
        email: "ram@example.com",
      },
      {
        name: "Shiva",
        email: "shiva@example.com",
      },
    ],
    _id: "617a077e18c25468bc7cfdd4",
    chatName: "Ram",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "Ram",
        email: "ram@example.com",
      },
      {
        name: "Shiva",
        email: "shiva@example.com",
      },
      {
        name: "Guest User",
        email: "guest@example.com",
      },
    ],
    _id: "617a518c4081150016472c78",
    chatName: "Goa Trip",
    groupAdmin: {
      name: "Guest User",
      email: "guest@example.com",
    },
  },
];

module.exports = chats;
