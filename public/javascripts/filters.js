
function filter(searchCode,total)
{
  slider = document.getElementById("price-range");
  output = document.getElementById("output");    
  output.innerHTML = slider.value;
  pages  =Math.ceil(total/10);
  currentPage=1;
  if(currentPage>=pages){
    $('#show-more').hide();
  }
  $('.update').on('change', '', function() {
    currentPage=1;
    $('input[name=sort]:checked').parent().addClass( "border-bottom border-2 border-warning" );
    $('input[name=sort]:not(:checked)').parent().removeClass( "border-bottom border-2 border-warning" );
    $('input[name=order-dir]:checked').parent().addClass( "border-bottom border-2 border-warning" );
    $('input[name=order-dir]:not(:checked)').parent().removeClass( "border-bottom border-2 border-warning" );
    var data3 = {};
    $.ajax({
      type:'GET',
      url:'/hotels/api/FiltredRes/'+getCurrentFilters(currentPage,slider.value,searchCode),
      data:data3,
      success:function(json){   
        $(function() {
          $('.lazy').lazy();
        });
        renderHotels(json.hotels,json.searchCode);
        filterRooms();
        selectRoom();
        $(".nights-count").html(diffDays)
        $('#resultCount').html(json.total + ' Hotels à '+json.hotels[0].city);
        pages=Math.ceil(json.total/10);
        if(currentPage>=pages){
          $('#show-more').hide();
        }
        else{
          $('#show-more').show();
        }
      },
      error:function(){
        console.log('error');
      }        
    });
  });
  $('#show-more').on('click', '', function() {
    $('#show-more').prop('disabled', true);
    currentPage+=1;
    if(currentPage>=pages){
      $('#show-more').hide();
    }
    var data4 = {};
    $.ajax({
      type:'GET',
      url:'/hotels/api/FiltredRes/'+getCurrentFilters(currentPage,slider.value,searchCode),
      data:data4,
      success:function(json){   
        $(function() {
          $('.lazy').lazy();
        });
        showMoreHotels(json.hotels,json.searchCode);
        filterRooms();
        selectRoom();
        $(".nights-count").html(diffDays)
        $('#show-more').prop('disabled', false);
      },
      error:function(){
        console.log('error');
      }        
    });
  });
}
function filterRooms(){
  $('.room-filter').on('change', '', function() {
    var hotelID=this.id.substr(0, this.id.indexOf('-'));
    var hotelRoom='.room-'+hotelID+"[data-group";
    var rooms = $('.room-select')
    if (this.dataset.set == "all") {
      $(hotelRoom+']').show();
      return false;
    }
    console.log($(rooms[0]).is(":checked")) 
    rooms.each(function( index ) {
      var room= rooms[index]
      if($(room).is(":checked")){
        $(room).prop( "checked", false );
        $(room).parent().parent().toggleClass("border-primary border-3");
        // $(rooms[index]).prop('checked', false);
      }
    });
    var $currentLists = $(hotelRoom +'='+ this.dataset.set + "]");
    testtt=$(hotelRoom+']').not($currentLists).hide();
    $currentLists.show();
  });
}
function showRooms(btn){
  var hotelID=btn.id.substr(0, btn.id.indexOf('-'));
  var rooms='#'+hotelID+'-hotelRooms';
  var pic='#'+hotelID+'-pic';
  var showRoomsBtn='#showRooms-btn-'+hotelID
  
  if($(rooms).is(":hidden")){
    $('#'+btn.id).html('Chambre et Tarifs <i class="fas fa-chevron-up"></i>');
  }
  else
  {
    $('#'+btn.id).html('Chambre et Tarifs <i class="fas fa-chevron-down"></i>');
  }
  $(rooms).slideToggle();
}
function getCurrentFilters(currentPage, sliderValue, searchCode){
  var sort = $('input[name=sort]:checked').val()+':'+$('input[name=order-dir]:checked').val()
  var rating = [];
  var board = [];
  var theme = [];
  output.innerHTML = sliderValue;
  $.each($("input[name='rating']:checked"), function() {
      rating.push($(this).val());
  });
  $.each($("input[name='board']:checked"), function() {
      board.push($(this).val());
  });
  $.each($("input[name='theme']:checked"), function() {
      theme.push($(this).val());
  });
  if (rating.length==0){rating='x';}
  if (board.length==0){board='x';}
  if (theme.length==0){theme='x';}
  return searchCode+'/'+currentPage+'/'+sliderValue+'/'+rating+'/'+board+'/'+theme+'/'+sort;
}
function selectRoom(){
  $('.room-card').on('change', 'input[type=checkbox]', function() {
    var parent= $(this).parent().parent()
    var hotel= $(this).parent().parent().parent().parent().parent().parent();
    var hId= hotel.attr('id').split('-')[0];
    var selectedRooms=$("#"+hotel.attr('id')+" .room-select:checked")
    var total=0;
    selectedRooms.each(function( index ){
      total+=parseFloat(selectedRooms[index].getAttribute("price"))
    });
    $('#total-'+hId).html(`Total : ${total} TND`)
    $(parent).toggleClass("border-primary border-2");
  });
}
function reservationValidate(form){
  var id=$(form).attr('id')
  console.log(id);
  if($('#'+id+' input[type=checkbox]:checked').length==0){
    alert("select at least 1 room")
    return false;
  }
  else{
    return true;
  }

}
