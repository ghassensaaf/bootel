
    var cities = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        identify: function(obj) { return obj.name; },
        prefetch :'/data/cities.json',
        limit : 5
        });
    
        function defaultCities(q, sync) {
            if (q === '') {
                sync(cities.all());
            }
    
            else {
                cities.search(q, sync);
            }
        }
    
        var hotels = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
                    url: 'https://www.voyages2000.com.tn/hotels/data/hotels.cfm?query=%QUERY',
                    wildcard: '%QUERY'
                },
        limit : 5
        });
    
        $('#multiple-datasets .typeahead').typeahead({
            minLength:0,
            highlight: true
            },
            {
            name: 'villes',
            display: 'name',
            source: defaultCities,
            templates: {
                header: '<h3 class="typeahead-search pb-2"><i class="fas fa-city"></i> Cities</h3>'
            }
            },
            {
            name: 'hotels',
            display: 'name',
            source: hotels,
            templates: {
                header: '<h3 class="typeahead-search pb-2"><i class="fas fa-hotel"></i> Hotels</h3>'
            }
    }).bind("typeahead:selected", function(obj, datum) {
            console.log(datum);
            if (datum.type == 'H') {
                $("#cityId").val(datum.cityId);
                $("#hotelId").val(datum.id);
            } else {
                $("#cityId").val(datum.id);
            }
        });