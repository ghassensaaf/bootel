const fetch = require('node-fetch');
let settings ={methode:"get"};
var api_url_filter ='';
var api_url ='';
var api_url_filtred='';
module.exports={
  hotelSearch: function(cityId, checkIn, checkOut, pax, hotelId){
    api_url = 'https://api.voyages2000.com.tn/hotels/availability?' + 'cityId=' + cityId + '&checkin=' + checkIn + '&checkout=' + checkOut + '&pax=' + pax;
    if (hotelId !== 'x') {
      api_url += '&hotelId=' + hotelId;
    }
    return fetch(api_url, settings);
  },
  hotelFilters:function(searchCode){
    api_url_filter = 'https://api.voyages2000.com.tn/hotels/filters/' + searchCode;
    return fetch(api_url_filter, settings);
    
  },
  hotelFiltredResult:function(page, searchCode, price, rtn, brd, thm, srt){
    api_url_filtred = 'https://api.voyages2000.com.tn/hotels/page/' + page + '/' + searchCode + '?1=1';
    if (price !== 'x') {
      api_url_filtred += '&minP=1&maxP=' + price;
    }
    if (rtn !== 'x') {
      api_url_filtred += '&rating=' + rtn;
    }
    if (brd !== 'x') {
      api_url_filtred += '&boards=' + brd;
    }
    if (thm !== 'x') {
      api_url_filtred += '&themes=' + thm;
    }
    if (srt !== 'x') {
      api_url_filtred += '&sort=' + srt;
    }
    return fetch(api_url_filtred, settings);
  }
};