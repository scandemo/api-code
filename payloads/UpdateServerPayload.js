const UpdateServerPayload = {
  Auth: {
    UserID: "",
    Role: "",
    ExtID: "",
    APIkey: "",
    SessionID: "",
  },

  Request: {
    RequestType: "UpdatePrimary",
    Collection: "visual",
    Fields:[]
  },
};

module.exports = UpdateServerPayload;
