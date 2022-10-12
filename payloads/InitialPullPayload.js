const InitialPullPayload = {
  Auth: {
    UserID: "",
    Role: "",
    ExtID: "",
    APIkey: "",
    SessionID: "",
  },

  Request: {
    RequestType: "InitialPull",
    Collection: "",
    Search: {
    },
    Fields: [],
  },
};

module.exports = InitialPullPayload;
