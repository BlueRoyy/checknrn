var request = require('request');

function main(params) {
    webservice = "https://webservices.barbados.gov.bb/test3/dpd/people/Get_My_Polling_Station_With_IDNO/";
    route = webservice + params.NRN;
    url = "https://query.yahooapis.com/v1/public/yql?q=select * from xml where url='" + route + "'&format=json";
    mapsapi = '<a target="_blank" style="color:red;text-decoration: underline;" href= "https://www.google.com/maps/dir/?api=1&destination=';


    return new Promise(function (resolve, reject) {
        request.get(url, function (error, response, data) {
            var PS = JSON.parse(data).query.results.POLLING_STATION;
            var count = JSON.parse(data).query.count;
            var pollStation = PS.polling_station;
            var constituency = PS.constituency;
            var PD = PS.polling_district;
            var info = "";


            if (error || count == 0) {
                info = "401";
                resolve({ msg: info });
            }
            else if (PS.hasOwnProperty('Error_Message')) {
                info = "400";
                resolve({ msg: info });
            }
            else if (PD === 'KB1') {
                info = "Polling Station: " + "<br>" + pollStation + "<br><br>" + "Constituency: " + "<br>" + constituency + "<br><br>" + "Polling District: " + "<br>" + PD + "<br>" + mapsapi + "13.131330,-59.614744" + '">Directions</a>';
                resolve({ msg: info });
            }
            else {
                info = "Polling Station: " + "<br>" + pollStation + "<br><br>" + "Constituency: " + "<br>" + constituency + "<br><br>" + "Polling District: " + PD;
                resolve({ msg: info });
            }


        });
    });

}
