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
function getHotels() {
  $.get(
    'hotels/api/Search',
    (json) => {
      renderHotels(json.hotels);
      $.get(
        'hotels/api/Filter',
        (json) => {
          renderFilters(json);
        }
      )
      .fail(() => {
        renderFilters([])
      })
    }
  )
  .fail(() => {
    renderhotels([])
  })
}

function getFilters() {
  $.get(
    'hotels/api/Filers',
    (json) => {
      renderFilters(json);
    }
  )
  .fail(() => {
    renderFilters([])
  })
}
