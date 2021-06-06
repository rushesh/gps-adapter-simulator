const events = require("events");
const loginPacketAdapterResponse = new events.EventEmitter();
const jsonfile = require('jsonfile')
const file = '../gspdata.json';
const { hexToDecimal, decimalToBinary, binaryToDecimal } = require("../utils/convert-base");
const {
  bitwisedescription,
  gsmsignalstrength,
  LanguageStatus,
  protocolname,
  courseStatus
} = require("../utils/heartbeat-terminal-contents");

const listernerLoginPacket = (packet) => {
  const splittedPacket = packet.split(" ");
  let startbit,
    packetlength,
    protocalnumber,
    informationcontent,
    infoserialnum,
    errorcheck,
    stopbit;

  startbit = splittedPacket.slice(0, 2);
  packetlength = splittedPacket.slice(2, 3);
  protocalnumber = splittedPacket.slice(3, 4);
  informationcontent = splittedPacket.slice(4, 16);
  infoserialnum = splittedPacket.slice(16, 18);
  errorcheck = splittedPacket.slice(18, 20);
  stopbit = splittedPacket.slice(20, 22);

  const descObj = {
    startbit,
    packetlength,
    protocaolname: protocolname[protocalnumber],
    informationcontent,
    infoserialnum,
    errorcheck,
    stopbit,
  };
  // console.log(descObj);
  const res = "78 78 05 01 00 05 9F F8 0D 0A";
  loginPacketAdapterResponse.emit("login-response", res);
};

const listernerheartbeatPacket = (packet) => {
  const splittedPacket = packet.split(" ");
  let startbit,
    packetlength,
    protocalnumber,
    informationcontent,
    infoserialnum,
    errorcheck,
    stopbit;
  startbit = splittedPacket.slice(0, 2);
  packetlength = splittedPacket.slice(2, 3);
  protocalnumber = splittedPacket.slice(3, 4);
  informationcontent = splittedPacket.slice(4, 10);
  infoserialnum = splittedPacket.slice(10, 12);
  errorcheck = splittedPacket.slice(12, 14);
  stopbit = splittedPacket.slice(14, 16);

  let Terminal_Information_Content,
    Voltage_Level,
    GSM_Signal_Strength,
    Language_Port_Status;
  Terminal_Information_Content = informationcontent.slice(0, 1);
  Terminal_Information_Content = hexToDecimal(Terminal_Information_Content);
  Terminal_Information_Content = decimalToBinary(Terminal_Information_Content);
  Terminal_Information_Content =
    Terminal_Information_Content.toString().split("");
  Terminal_Information_Content_Details = [];

  for (let i = 0; i < Terminal_Information_Content.length; i++) {
    let detail = bitwisedescription[i][Terminal_Information_Content[i]];
    if (i == 3 || i == 4 || i == 5) {
      detail = bitwisedescription[i];
    }
    Terminal_Information_Content_Details.push(
      `Bit ${i} - ${Terminal_Information_Content[i]} - ${detail}`
    );
  }
  Voltage_Level = informationcontent.slice(1, 3);
  const voltage_battery =
    hexToDecimal(Voltage_Level[0] + Voltage_Level[1]) / 100;
  GSM_Signal_Strength = informationcontent.slice(3, 4);
  const signalStrength = gsmsignalstrength[GSM_Signal_Strength[0]];
  Language_Port_Status = informationcontent.slice(4, 6);
  const language = LanguageStatus[Language_Port_Status[1]];
  const decodedObj = {
    startbit,
    packetlength,
    protocalname: protocolname[protocalnumber],
    informationcontent: {
      voltage_battery,
      signalStrength,
      language,
      Terminal_Information_Content_Details,
    },
    infoserialnum,
    errorcheck,
    stopbit,
  };
  // console.log(decodedObj);
  const res = "78 78 05 23 01 00 67 0E 0D 0A";
  loginPacketAdapterResponse.emit("heartbeat-response", res);
};

const listernerGPSPacket = (packet) => {
  const splittedPacket = packet.split(" ");
  // console.log(splittedPacket.length, packet.length);
  let startbit,
    packetlength,
    protocalnumber,
    informationcontent,
    infoserialnum,
    errorcheck,
    stopbit;
  startbit = splittedPacket.slice(0, 2);
  packetlength = splittedPacket.slice(2, 3);
  protocalnumber = splittedPacket.slice(3, 4);
  informationcontent = splittedPacket.slice(4, 37);

  infoserialnum = splittedPacket.slice(37, 39);
  errorcheck = splittedPacket.slice(39, 41);
  stopbit = splittedPacket.slice(41, 43);
  let lat = hexToDecimal(informationcontent.slice(11, 15).join(""));
  lat = lat / 1800000;
  let long = hexToDecimal(informationcontent.slice(15, 19).join(""));
  long = long / 1800000;
  let speed = hexToDecimal(informationcontent.slice(19, 20).join(""));
  let coursestatus = informationcontent.slice(20, 22);
  coursestatus[0] = decimalToBinary(hexToDecimal(coursestatus[0]));
  coursestatus[1] = decimalToBinary(hexToDecimal(coursestatus[1]));
  course_status = {
      'byte_1.bit5': courseStatus[5][coursestatus[5] || 0],
      'byte_1.bit4': courseStatus[4][coursestatus[5] || 0],
      'byte_1.bit3': courseStatus[3][coursestatus[5] || 0],
      'byte_1.bit2': courseStatus[2][coursestatus[5] || 0],
      'course': binaryToDecimal([...coursestatus.slice(0,2),...coursestatus[1]].join(''))
  };
  let mcc = hexToDecimal(informationcontent.slice(20, 22).join(''));
  let mnc = hexToDecimal(informationcontent.slice(22, 23).join(""));
  let lac = hexToDecimal(informationcontent.slice(23, 25).join(""));
  let cellid = hexToDecimal(informationcontent.slice(25, 28).join(""));
  let acc = informationcontent.slice(28, 29).join("");
  let datauploadmode = informationcontent.slice(29, 30).join("");
  let gpsrealtime = informationcontent.slice(30, 31).join("");
  let mileage = hexToDecimal(informationcontent.slice(31, 35).join(""));

  const gpsdetails = {
    startbit,
    packetlength,
    protocalnumber,
    informationcontent: {
        lat,long,speed,course_status,mcc,mnc,lac,cellid,acc,datauploadmode,gpsrealtime,mileage
    },
    infoserialnum,
    errorcheck,
    stopbit,
  };
  
jsonfile.writeFileSync('gspdata.json', gpsdetails, { flag: 'a' })
}

module.exports = {
  listernerLoginPacket,
  listernerheartbeatPacket,
  listernerGPSPacket,
  loginPacketAdapterResponse,
};
