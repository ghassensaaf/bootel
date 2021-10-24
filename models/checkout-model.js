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
    },
    book: function(titles, firstnames, lastnames, ages, searchCode, pensionId, remark, holder, rooms){
        api_book_url = 'https://api-test.boosterbc.com/rest/hotels-v3/book';
        body = createBooking(titles, firstnames, lastnames, ages, searchCode, pensionId, remark, holder,rooms);
        return fetch(api_book_url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 
                'Content-Type': 'application/json',
                'apiKey' : process.env.API_KEY
            },
        });
    }
};


function createBooking(titles, firstnames, lastnames, ages, searchCode, pensionId, remark, holder, rooms){
    var rateKey=[];
    if(pensionId.length>8){
        rateKey.push(pensionId);
    }
    else{
        rateKey = pensionId;
    }
    book={
        "holder": {
          "firstName": holder.firstname,
          "lastName": holder.lastname
        },
        "rooms": [
        ],
        "apikey": process.env.API_KEY,
        "searchCode": searchCode,
        "langId": 1,
        "remark": remark
    };
    for(let i = 0; i < rooms; i++){
        var rm={
            "rateKey" : rateKey[i],
            "paxes" :[]
        };
        for(let j = 0; j < titles[i].length ;j++)
        {
            if(ages[i][j]==='30'){
                pax={
                    "firstName": firstnames[i][j],
                    "lastName": lastnames[i][j],
                    "type": "AD",
                    "title": titles[i][j]
                };
            }
            else{
                pax={
                    "firstName": firstnames[i][j],
                    "lastName": lastnames[i][j],
                    "type": "CH",
                    "age" : ages[i][j],
                    "title": titles[i][j]
                };
            } 
            rm.paxes.push(pax);
        }
        book.rooms.push(rm);
    }
    return book;
}

function createBody(pensionId, searchCode){
    body={
        "apiKey"    :process.env.API_KEY,
        "rooms"     :[],
        "searchCode":searchCode,
        "langId"    :1
    };
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
        body.rooms.push(room);
    }
    return body;
}