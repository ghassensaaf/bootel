
function filter(searchCode,total)
{
    slider = document.getElementById("price-range");
    output = document.getElementById("output");    
    output.innerHTML = slider.value;
    pages=Math.ceil(total/10);
    currentPage=1;
    if(currentPage>=pages){
      $('#show-more').hide();
    }
    $('.update').on('change', '', function() {
        console.log(this);
        currentPage=1;
        sort=$("#sort-select option:selected").val();
        rating =[];
        board =[];
        theme =[];
        output.innerHTML = slider.value;
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
        var data3 = {};
        $.ajax({
            type:'GET',
            url:'/hotels/api/FiltredRes/'+searchCode+'/'+currentPage+'/'+slider.value+'/'+rating+'/'+board+'/'+theme+'/'+sort,
            data:data3,
            success:function(json){   
              $(function() {
                $('.lazy').lazy();
              });
              renderHotels(json.hotels);
              filterRooms();
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
        currentPage+=1;
        if(currentPage>=pages){
          $('#show-more').hide();
        }
        sort=$("#sort-select option:selected").val();
        rating =[];
        board =[];
        theme =[];
        output.innerHTML = slider.value;
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
        var data4 = {};
        $.ajax({
          type:'GET',
          url:'/hotels/api/FiltredRes/'+searchCode+'/'+currentPage+'/'+slider.value+'/'+rating+'/'+board+'/'+theme+'/'+sort,
          data:data4,
          success:function(json){   
            $(function() {
              $('.lazy').lazy();
            });
            showMoreHotels(json.hotels);
            filterRooms();
          },
          error:function(){
            console.log('error');
          }        
        });
    });
}
function filterRooms(){
  $('.room-filter').on('change', '', function() {
    console.log(this.id);
    var hotelID=this.id.substr(0, this.id.indexOf('-'));
    var hotelRoom='.room-'+hotelID+"[data-group";
    console.log(hotelID);
    if (this.dataset.set == "all") {
      $(hotelRoom+']').show();
      return false;
    }
    var $currentLists = $(hotelRoom +'='+ this.dataset.set + "]");
    console.log(hotelRoom+']');
    console.log($currentLists);
    testtt=$(hotelRoom+']').not($currentLists).hide();
    $currentLists.show();
  });
}
function showRooms(btn){
  var hotelID=btn.id.substr(0, btn.id.indexOf('-'));
  var rooms='#'+hotelID+'-hotelRooms';
  var pic='#'+hotelID+'-pic';
  
  if($(rooms).is(":hidden")){
    $('#'+btn.id).html("hide rooms")
    $(pic).css("border-bottom-left-radius", "0");
  }
  else
  {
    $('#'+btn.id).html("show rooms")
    $(pic).css("border-bottom-left-radius", "1.5rem");
  }
  $(rooms).slideToggle();
  
  
}