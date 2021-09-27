$(document).ready(function () {
  // ***********************************initialize Search Engine***************************************************
  initializeSE();
  // ***********************************delete room***************************************************
  $("#delRoom").on("click", "", function () {
    deleteRoom();
    update();
  });
  // ***********************************add room***************************************************
  $("#addRoom").on("click", "", function () {
    addRoom();
    update();
  });
  // ***********************************update children select boxes***************************************************
  $(document).on("input", ".children", function (e) {
    updateChildren(e);
  });
  // ***********************************update***************************************************
  $(document).on("change", "#sf-rooms", function () {
    update();
  });
});

// *******************************************************************************************************************
// ****************************************functions******************************************************************
// *******************************************************************************************************************

function addRoom() {
  var c = $(".sf-room").length + 1;
  if (c > 1) {
    $("#delRoom").show();
  } else {
    $("#delRoom").hide();
  }
  if (c === 4) {
    $("#addRoom").hide();
  } else {
    $("#addRoom").show();
  }
  $("#sf-rooms").append(`<div class="sf-room r${c}">
                              <h6>room ${c}</h6>
                              <div class="container">
                                  <div class="row">
                                      <div class="col">
                                          <label for="adultes">adultes</label>
                                      </div>
                                      <div class="col">
                                          <input class="adultes a-r${c} form-control" type="number" id="adultesR${c}" value="2" max="6" min="1">
                                      </div>
                                  </div>
                                  <div class="row">
                                      <div class="col">
                                          <label for="children-R1">children</label>
                                      </div>
                                      <div class="col children-input">
                                          <input class="ch-r${c} form-control children" type="number" name="" id="children-R${c}" value="0" max="3" min="0">
                                      </div>
                                  </div>
                                  <div class="ch-r${c}-age row"></div>
                              </div>
                              
                          </div>`);
}
// *******************************************************************************************************************
// *******************************************************************************************************************
function deleteRoom() {
  $(".sf-room").last().detach();
  var c = $(".sf-room").length;
  if (c > 1) {
    $("#delRoom").show();
  } else {
    $("#delRoom").hide();
  }
  if (c === 4) {
    $("#addRoom").hide();
  } else {
    $("#addRoom").show();
  }
}
// *******************************************************************************************************************
// *******************************************************************************************************************
function initializeSE() {
  // initialize city/hotels typeahead
  var cities = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace("name"),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    identify: function (obj) {
      return obj.name;
    },
    prefetch: "/data/cities.json",
    limit: 5,
  });

  function defaultCities(q, sync) {
    if (q === "") {
      sync(cities.all());
    } else {
      cities.search(q, sync);
    }
  }
  var hotels = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace("name"),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: "https://www.voyages2000.com.tn/hotels/data/hotels.cfm?query=%QUERY",
      wildcard: "%QUERY",
    },
    limit: 5,
  });

  $("#multiple-datasets .typeahead")
    .typeahead(
      {
        minLength: 0,
        highlight: true,
      },
      {
        name: "villes",
        display: "name",
        source: defaultCities,
        templates: {
          header: '<h3 class="typeahead-search pb-2"><i class="fas fa-city"></i> Cities</h3>',
        },
      },
      {
        name: "hotels",
        display: "name",
        source: hotels,
        templates: {
          header: '<h3 class="typeahead-search pb-2"><i class="fas fa-hotel"></i> Hotels</h3>',
        },
      }
    )
    .bind("typeahead:selected", function (obj, datum) {
      if (datum.type == "H") {
        $("#cityId").val(datum.cityId);
        $("#hotelId").val(datum.id);
      } else {
        $("#cityId").val(datum.id);
      }
    });
  // initialize rooms
  $(".travelers-btn").html("1 room, 2 adultes");
  var pax = "2";
  var travelers = 2;
  $("#pax").val(pax);

  $("#room-dropdown-btn").on("click", function (event) {
    $("#room-dropdown").toggleClass("show");
  });
  $("body").on("click", function (e) {
    if (!$("#room-dropdown-btn").is(e.target) && !$("#room-dropdown").is(e.target) && $("#room-dropdown").has(e.target).length === 0 && $(".show").has(e.target).length === 0) {
      $("#room-dropdown").removeClass("show");
    }
  });
  // initialize checkin/checkout dates
  var params = parseQueryString();
  if (typeof params.checkIn !== "undefined" && typeof params.checkOut !== "undefined" && typeof params.cityId !== "undefined") {
    $("#checkIn").val(params.checkIn);
    $("#checkOut").val(params.checkOut);
    start = params.checkIn.substr(5, 2) + "/" + params.checkIn.substr(8, 2) + "/" + params.checkIn.substr(0, 4);
    end = params.checkOut.substr(5, 2) + "/" + params.checkOut.substr(8, 2) + "/" + params.checkOut.substr(0, 4);
    $.get("/data/cities.json", (json) => {
      $.each(json, function (index, obj) {
        if (obj.id == params.cityId) {
          $("#typeaheadsearch").val(obj.name);
          $("#cityId").val(obj.id);
        }
      });
    }).fail(() => {
      renderFilters([]);
    });
  } else {
    today = new Date();
    trw = new Date();
    trw.setDate(today.getDate() + 1);
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    var ddt = String(trw.getDate()).padStart(2, "0");
    var mmt = String(trw.getMonth() + 1).padStart(2, "0");
    var yyyyt = trw.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    trw = yyyyt + "-" + mmt + "-" + ddt;
    $("#checkIn").val(today);
    $("#checkOut").val(trw);
    start = mm + "/" + dd + "/" + yyyy;
    end = mmt + "/" + ddt + "/" + yyyyt;
  }
  $("#dateRange").daterangepicker(
    {
      startDate: start,
      endDate: end,
      minDate: new Date()
    },
    function (start, end, label) {
      $("#checkIn").val(start.format("YYYY-MM-DD"));
      $("#checkOut").val(end.format("YYYY-MM-DD"));
    }
  );
}
// *******************************************************************************************************************
function updateChildren(event) {
  var chN = event.target.id[event.target.id.length - 1];
  var age = ``;
  for (let i = 0; i < $("#children-R" + chN).val(); i++) {
    age +=
      "\n" +
      `<select name="" id="r${chN}-ch${i + 1}" class="col mx-1 mt-2 form-control">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
            </select>`;
  }
  $(".ch-r" + chN + "-age").html(age);
}
function update() {
  var roomCount = $(".sf-room").length;
  var adultCount = 0;
  var childrenCount = 0;
  pax = "";
  for (let i = 1; i < parseInt(roomCount + 1); i++) {
    adultCount += parseInt($("#adultesR" + i).val());
    childrenCount += parseInt($("#children-R" + i).val());
    pax += $("#adultesR" + i).val();
    for (let j = 1; j < parseInt($("#children-R" + i).val()) + 1; j++) {
      pax += "," + $("#r" + i + "-ch" + j).val();
    }
    pax += ";";
  }
  var occu= roomCount;
  if(roomCount===1){occu+=' room';}else{occu+=' rooms';}
  if(adultCount===1){occu+=', '+adultCount+' adulte';}else{occu+=', '+adultCount+' adultes';}
  if(childrenCount>0){
    if(childrenCount===1){occu+=', '+childrenCount+' enfant';}else{occu+=', '+childrenCount+' enfants';}
  }

  $(".travelers-btn").html(occu);
  $("#pax").val(pax);
}
