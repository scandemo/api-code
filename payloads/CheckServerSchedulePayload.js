const CheckServerPayload = {
    Auth: {
      UserID: "",
      Role: "",
      ExtID: "",
      APIkey: "",
      SessionID: "",
    },
  
    Request: {
      RequestType: "CheckPrimarySchedule",
      Collection: "visual",
      Fields:[]
    },
  };
  
  module.exports = CheckServerPayload;
  