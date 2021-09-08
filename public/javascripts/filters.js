function showResult(hotels) {
    $('#hotels').html(hotels);
  }
  function showFilters(filters) {
    $('#filter').html(filters);
  }
function filter()
{
    slider = document.getElementById("price");
    output = document.getElementById("output");    
    output.innerHTML = slider.value;

    $('.update').on('change', '', function() {
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
            url:'/hotels/api/FiltredRes/'+slider.value+'/'+rating+'/'+board+'/'+theme+'/'+sort,
            data:data3,
            success:function(data3){   
              showResult(data3);
            },
            error:function(){
              console.log('error');
            }        
          });
    });
}
    
  