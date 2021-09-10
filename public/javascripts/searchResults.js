function renderFilters(filters){
  console.log(filters);
  const pricetemplate = filtersPriceTemplate(filters);
  const ratingtemplate = filters.ratings.length === 0 ? `<p>No matching results found.</p>` : filters.ratings.map((filter) => filtersRatingTemplate(filter)).join("\n");
  const boardtemplate = filters.boards.length === 0 ? `<p>No matching results found.</p>` : filters.boards.map((filter) => filtersBoardTemplate(filter)).join("\n");
  const themetemplate = filters.themes.length === 0 ? `<p>No matching results found.</p>` : filters.themes.map((filter) => filtersThemeTemplate(filter)).join("\n");
  $("#price-filter").html(pricetemplate);
  $("#rating-filter").html(ratingtemplate);
  $("#board-filter").html(boardtemplate);
  $("#theme-filter").html(themetemplate);
}
function renderHotels(hotels) {
  console.log(hotels);
  const template =
  hotels.length === 0 ? `
  <p>No matching results found.</p>
  ` : hotels.map((hotel) => hotelTemplate(hotel)).join("\n");
  $("#products").html(template);
}
function showMoreHotels(hotels) {
  console.log(hotels);
  const template =
  hotels.length === 0 ? `
  <p>No matching results found.</p>
  ` : hotels.map((hotel) => hotelTemplate(hotel)).join("\n");
  $("#products").append(template);
}
var parseQueryString = function() {

  var str = decodeURIComponent(window.location.search);
  var objURL = {};

  str.replace(
      new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
      function( $0, $1, $2, $3 ){
          objURL[ $1 ] = $3;
      }
  );
  return objURL;
};
function getHotels() {
  var params = parseQueryString();
  if(params.hotelId==='')
  {
    params.hotelId='x';
  }
  var url ='hotels/api/Search/'+params.cityId+'/'+params.checkIn+'/'+params.checkOut+'/'+params.pax+'/'+params.hotelId;
  console.log(params);
  $.get(
    url,
    (json) => {
      renderHotels(json.hotels);
      searchCode=json.searchCode;
      total=json.total;
      $('#resultCount').val(total + ' Hotels à '+json.hotels[0].city);
      filterUrl='hotels/api/Filter/'+searchCode;
      $.get(
        filterUrl,
        (json) => {
          renderFilters(json);
          filter(searchCode,total);
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

function getFilters() {
  $.get(
    'hotels/api/Filers',
    (json) => {
      renderFilters(json);
    }
  )
  .fail(() => {
    renderFilters([]);
  });
}
