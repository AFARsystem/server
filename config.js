config = {};

config.twilio = {};

config.twilio.sid = "AC65713b161d8e4fa2be27a4dd77bf5a60";
config.twilio.auth = "6c2747b860112eb7770cfe6741f3b727";
config.twilio.smsWebHook = "http://afar.jackcook.us/sms";


config.countries = {
    "China" :{
	"emergencyNumber":"110",
	"language":"zh-CN"
    },
    "Canada" : {
	"emergencyNumber":"3476955532", //Usually 911
	"language":"en-CA"
    },
    "United States" : {
	"emergencyNumber":"3476955532", //Usually 911
	"language":"en-US"
    },
    "Mexico" : {
	"emergencyNumber":"080",
	"language":"es-MX"
    },
    "Japan" : {
	"emergencyNumber":"110",
	"language":"ja-JP"
    },
    "Spain" : {
	"emergencyNumber":"112",
	"language":"es-ES"
    },
    "Italy" : {
	"emergencyNumber":"112",
	"language":"it-IT"
    },
    "France" : {
	"emergencyNumber":"112",
	"language":"fr-FR"
    },
    "Germany" : {
	"emergencyNumber":"112",
	"language":"de-DE"
    },
    "United Kingdom" : {
	"emergencyNumber":"999",
	"language":"en-gb"
    },
    "Denmark" : {
	"emergencyNumber":"112",
	"language":"da-DK"
    }
}


module.exports = config;
