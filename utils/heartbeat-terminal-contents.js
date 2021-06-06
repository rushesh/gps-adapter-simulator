module.exports.bitwisedescription = {
  7: {
    1: "Oil and electricity disconnected",
    0: "Oil and electricity connected",
  },
  6: {
    1: "GPS tracking is on",
    0: "GPS tracking is off",
  },
  5: "Extended Bit",
  4: "Extended Bit",
  3: "Extended Bit",
  2: {
    1: "Charge On",
    0: "Charge Off",
  },
  1: {
    1: "ACC high",
    0: "ACC Low",
  },
  0: {
    1: "Defense Activated",
    0: "Defense Deactivated",
  },
};

module.exports.gsmsignalstrength = {
  "00": "no signal",
  "01": "extremely weak signal",
  "02": "very weak signal",
  "03": "good signal",
  "04": "strong signal",
};

module.exports.LanguageStatus = {
    "01": 'Chinese',
    "02": 'English'
}

module.exports.protocolname = {
    "01" :'Login Information',
'22' :'GPS Positioning Data（UTC)',
'28' :'Multiple Bases Extension Information Packet',
'23':'Heartbeat Packet',
'26':'Alarm Data（UTC)',
'19': 'LBS Alarm',
'80': 'Online Command',
'21': 'Online Command Response of Terminal',
'8A' :'Time Check Packet',
'94': 'Information Transmission Packet',
'2C': 'WIFI Communication Protocol'
}

module.exports.courseStatus = {
 "5": {
     0:'GPS real-time',
     1 : 'differential positioning'
 },
 "4":{
     0: 'GPS having been positioning not',
     1: 'GPS having been positioning'
 },
 "3": {
     0: 'East Longitude', 
     1: 'West Longitude'
 },
 "2": {
     0 : 'South Latitude',
     1: 'North Latitude'
 }
}