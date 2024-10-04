const { v4: uuidv4 } = require('uuid');

let friendRequestDB = [
  {
    id: "1",
    sender_id: "1",
    receiver_id: "2",
    status: "pendiente" // "pendiente", "aceptada", "rechazada
  }
]

class FriendRequestModel {
  create(friend_request) {
    friend_request.id = uuidv4();
    friendRequestDB.push(friend_request);
  }

  show() {
    return friendRequestDB;
  }

  showByID(id) {
    return friendRequestDB.filter(friend_request => friend_request.id == id);
  }

  showByUserID(receiver_id) {
    return friendRequestDB.filter(friend_request => friend_request.receiver_id == receiver_id);
  }

  edit(updatedFriendRequest, id) {
    const index = friendRequestDB.findIndex(friendRequest => friendRequest.id == id);
    return friendRequestDB[index] = { id, ...updatedFriendRequest };
  }

  delete(id) {
    const index = friendRequestDB.findIndex(friendRequest => friendRequest.id == id);
    friendRequestDB.splice(index, 1);
    return friendRequestDB;
  }
}

module.exports = new FriendRequestModel();