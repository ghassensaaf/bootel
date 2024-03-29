function renderFilters(filters){
  const pricetemplate = filtersPriceTemplate(filters);
  const ratingtemplate = filters.ratings.length === 0 ? `<p>No matching results found.</p>` : filters.ratings.map((filter) => filtersRatingTemplate(filter)).join("\n");
  const boardtemplate = filters.boards.length === 0 ? `<p>No matching results found.</p>` : filters.boards.map((filter) => filtersBoardTemplate(filter)).join("\n");
  const themetemplate = filters.themes.length === 0 ? `<p>No matching results found.</p>` : filters.themes.map((filter) => filtersThemeTemplate(filter)).join("\n");
  $("#price-filter").html(pricetemplate);
  $("#rating-filter").html(ratingtemplate);
  $("#board-filter").html(boardtemplate);
  $("#theme-filter").html(themetemplate);
}
function renderHotels(hotels,searchCode) {
  const template =
  hotels.length === 0 ? `
  <p>No matching results found.</p>
  ` : hotels.map((hotel) => hotelTemplate(hotel,searchCode)).join("\n");
  $("#products").html(template);
}
function showMoreHotels(hotels,searchCode) {
  const template =
  hotels.length === 0 ? `
  <p>No matching results found.</p>
  ` : hotels.map((hotel) => hotelTemplate(hotel,searchCode)).join("\n");
  $("#products").append(template);
}
function parseQueryString(){

  var str = decodeURIComponent(window.location.search);
  var objURL = {};

  str.replace(
      new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
      function( $0, $1, $2, $3 ){
          objURL[ $1 ] = $3;
      }
  );
  return objURL;
}
function getHotels() {
  var params = parseQueryString();
  if(params.hotelId==='')
  {
    params.hotelId='x';
  }
  var url ='hotels/api/Search/'+params.cityId+'/'+params.checkIn+'/'+params.checkOut+'/'+params.pax+'/'+params.hotelId+'/'+params.city;
  console.log(params);
  $.get(
    url,
    (json) => {
      $(function() {
        $('.lazy').lazy();
      });
      searchCode=json.searchCode;
      renderHotels(json.hotels,searchCode);
      total=json.total;
      filterRooms();
      selectRoom();
      $('#resultCount').html(total + ' Hotels à '+json.hotels[0].city);
      filterUrl='hotels/api/Filter/'+searchCode;
      $(".nights-count").html(diffDays)
      $.get(
        filterUrl,
        (json) => {
          renderFilters(json);
          filter(searchCode,total);
          $(".nights-count").html(diffDays)
        }
      )
      .fail(() => {
        renderFilters([]);
      });
    }
  )
  .fail(() => {
    renderhotels([]);
  });
}
par=parseQueryString();

if(typeof(par.cityId)!=='undefined'){
  getHotels();
}
