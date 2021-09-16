const fetch = require('node-fetch');
let settings ={methode:"post"};
module.exports={
    checkRate: function(pensionId, searchCode){
        api_checkRate_url = 'https://api-prod.boosterbc.com/rest/hotels-v3/checkRate';
        body =createBody(pensionId, searchCode);
        return fetch(api_checkRate_url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

function createBody(pensionId, searchCode){
    console.log(searchCode);
    body={
        "apiKey"    :process.env.API_KEY,
        "rooms"     :[],
        "searchCode":searchCode,
        "langId"    :1
    };
    console.log(pensionId);
    if(typeof(pensionId)==='string'){
        room={
            "rateKey":pensionId
        };
        body.rooms.push(room);
        return body;
    }

    for(let i = 0; i<pensionId.length; i++){
        room={
            "rateKey":pensionId[i]
        };
        console.log(room);
        body.rooms.push(room);
    }
    return body;
}