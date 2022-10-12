const CheckSchedulePayload = {
  Auth: {
    UserID: "",
    Role: "",
    ExtID: "",
    APIkey: "",
    SessionID: "",
  },

  Request: {
    RequestType: "CheckSecondarySchedule",
    Collection: "visual",
    Fields:[]
  },
};

module.exports = CheckSchedulePayload;
