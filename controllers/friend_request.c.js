var friendRequestModel = require("../models/friend_request.m");
var usersModel = require("../models/users.m");

class FriendRequestController {
  async create(data) {
    const { sender_id, receiver_id } = data;
    if (!sender_id || !receiver_id) {
      return { error: "Todos los campos son requeridos." };
    }

    try {
      const user1 = usersModel.showByID(sender_id);
      if (user1.length === 0) {
        return { error: `No se encontró el usuario con id: ${sender_id}` };
      }

      const user2 = usersModel.showByID(receiver_id);
      if (user2.length === 0) {
        return { error: `No se encontró el usuario con id: ${receiver_id}` };
      }

      const newFriendRequest = { sender_id, receiver_id, status: "pendiente" };
      friendRequestModel.create(newFriendRequest);

      return { success: true };
    } catch (error) {
      return { error: `Error al crear la solicitud de amistad: ${error.message}` };
    }
  }

  async show() {
    try {
      const friendRequests = friendRequestModel.show();
      return friendRequests;
    } catch (err) {
      throw new Error(`Error al listar las solicitudes de amistad: ${err}`);
    }
  }

  async showByID(id) {
    try {
      const friendRequest = friendRequestModel.showByID(id);
      return friendRequest;
    } catch (err) {
      throw new Error(`Error al buscar solicitudes de amistad: ${err}`);
    }
  }

  async update(id, data) {
    const { status } = data;
    try {
      const friendRequest = friendRequestModel.showByID(id);
      if (friendRequest.length === 0) {
        return { error: `No se encontró la solicitude de amistad con id: ${id}` };
      }

      const updatedFriendRequest = {
        ...friendRequest[0],
        status: status ? status : friendRequest.status
      };

      const result = friendRequestModel.edit(updatedFriendRequest, id);
      return result;
    } catch (err) {
      throw new Error(`Error al editar solicitud de amistad: ${err}`);
    }
  }

  async delete(id) {
    try {
      const friendRequest = friendRequestModel.showByID(id);
      if (friendRequest.length === 0) {
        return { error: `No se encontró la solicitud de amistad con id: ${id}` };
      }

      const result = friendRequestModel.delete(id);
      return result;
    } catch (err) {
      throw new Error(`Error al eliminar solicitud de amistad: ${err}`);
    }
  }
}

module.exports = new FriendRequestController();