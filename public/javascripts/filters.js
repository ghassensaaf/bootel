
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
              renderHotels(json.hotels);
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
            showMoreHotels(json.hotels);
          },
          error:function(){
            console.log('error');
          }        
        });
    });

}
    
  