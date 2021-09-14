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
      console.log(datum);
      if (datum.type == "H") {
        $("#cityId").val(datum.cityId);
        $("#hotelId").val(datum.id);
      } else {
        $("#cityId").val(datum.id);
      }
    });
  $(document).ready(function () {
    ch_inp=$(".children-input");
    $(".travelers-btn").html("1 room 2 travelers");
    var pax = "2";
    var travelers = 2;
    $("#pax").val(pax);
    $(".adultes, .children").on("change", function (e) {
        console.log($(".children"));
      var age = ``;
      var chA = "";
      for (let i = 0; i < $("#children-R1").val(); i++) {
        age +=
          "\n" +
          `<select name="" id="r1-ch${i + 1}" class="col mx-1 mt-2 form-control">
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
      $(".ch-r1-age").html(age);
      for (let i = 0; i < $("#children-R1").val(); i++) {
        let chn = i + 1;
        chA += "," + $("#r1-ch" + chn).val();
      }
      pax = $(".a-r1").val() + chA;
      console.log(pax);
      $("#pax").val(pax);
      travelers = 0 + parseInt($(".a-r1").val()) + parseInt($(".ch-r1").val());
      $(".travelers-btn").html("1 room " + travelers + " travelers");
    });
    $('#room-dropdown-btn').on('click', function (event) {
        $('#room-dropdown').toggleClass('show');
    });
    $('body').on('click', function (e) {
        if (!$('#room-dropdown-btn').is(e.target) && !$('#room-dropdown').is(e.target) && $('#room-dropdown').has(e.target).length === 0 && $('.show').has(e.target).length === 0) {
            $('#room-dropdown').removeClass('show');
        }
    });
    $(".ch-r1-age").on("change", "", function () {
      var age = ``;
      var chA = "";
      for (let i = 0; i < $("#children-R1").val(); i++) {
        let chn = i + 1;
        chA += "," + $("#r1-ch" + chn).val();
      }
      pax = $(".a-r1").val() + chA;
      console.log(pax);
      $("#pax").val(pax);
    });
    $("#delRoom").on("click", "", function () {
        ch_inp=$(".children-input");
        console.log(ch_inp);
        $('.sf-room').last().detach();
        var c = $(".sf-room").length;
        console.log(c);
        if(c>1){
            $('#delRoom').show();
        }
        else{
            $('#delRoom').hide();
        }
        if(c===4){
            $('#addRoom').hide();
        }
        else{
            $('#addRoom').show();
        }
    });
    $("#addRoom").on("click", "", function () {
        ch_inp=$(".children-input");
        console.log(ch_inp);
        var c = $(".sf-room").length+1;
        if(c>1){
            $('#delRoom').show();
        }
        else{
            $('#delRoom').hide();
        }
        if(c===4){
            $('#addRoom').hide();
        }
        else{
            $('#addRoom').show();
        }
        $('#sf-rooms').append(`<div class="sf-room r${c}">
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
                                
    });
    $(document).on("change", ".children", function () {
        console.log($(".children"));
        var age = ``;
        var chA = "";
        for (let i = 0; i < $("#children-R1").val(); i++) {
          age +=
            "\n" +
            `<select name="" id="r1-ch${i + 1}" class="col mx-1 mt-2 form-control">
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
        $(".ch-r1-age").html(age);
        for (let i = 0; i < $("#children-R1").val(); i++) {
          let chn = i + 1;
          chA += "," + $("#r1-ch" + chn).val();
        }
        pax = $(".a-r1").val() + chA;
        console.log(pax);
        $("#pax").val(pax);
        travelers = 0 + parseInt($(".a-r1").val()) + parseInt($(".ch-r1").val());
        $(".travelers-btn").html("1 room " + travelers + " travelers");
    });
    $("#sf-rooms").on("change", "", function () {
        console.log("working2");
    });

  });
  