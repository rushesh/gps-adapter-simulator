const events = require("events");
const {
  listernerLoginPacket,
  listernerGPSPacket,
  listernerheartbeatPacket,
  loginPacketAdapterResponse,
} = require("../adapter/adapter");
const loginEventEmitter = new events.EventEmitter();

const loginResponse = (packet) => {
  console.log("Login Response : ", packet);
  console.log('Sending Heart beat');
  loginEventEmitter.emit(
    "heartbeat-packet-on-login-packet-response",
    heartbeat
  );
};

const heartBeatResponse = (packet)=>{
    console.log('Heart Beat Response : ', packet);
    console.log('Sending GPS : ');
    loginEventEmitter.emit("GPS-location-packet-on-login-packet-response", GPS);
}
const loginPacket =
  "78 78 11 01 03 51 60 80 80 77 92 88 22 03 32 01 01 AA 53 36 0D 0A";
const heartbeat = "78 78 0B 23 C0 01 22 04 00 01 00 08 18 72 0D 0A";
const GPS =
  "78 78 22 22 0F 0C 1D 02 33 05 C9 02 7A C8 18 0C 46 58 60 00 14 00 01 CC 00 28 7D 00 1F 71 00 00 01 00 08 20 86 0D 0A";

loginEventEmitter.on("login-packet", listernerLoginPacket);
loginEventEmitter.on(
  "heartbeat-packet-on-login-packet-response",
  listernerheartbeatPacket
);
loginEventEmitter.on(
  "GPS-location-packet-on-login-packet-response",
  listernerGPSPacket
);

loginPacketAdapterResponse.on("login-response", loginResponse);
loginPacketAdapterResponse.on("heartbeat-response", heartBeatResponse);

loginEventEmitter.emit("login-packet", loginPacket);

module.exports = {
  loginEventEmitter,
};
