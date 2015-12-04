// var validator = require('validator');


function getCssValuePrefix()
{
    var rtrnVal = '';//default to standard syntax
    var prefixes = ['-o-', '-ms-', '-moz-', '-webkit-'];

    // Create a temporary DOM object for testing
    var dom = document.createElement('div');

    for (var i = 0; i < prefixes.length; i++)
    {
        // Attempt to set the style
        dom.style.background = prefixes[i] + 'liner-gradient(#000000, #ffffff)';

        // Detect if the style was successfully set
        if (dom.style.background)
        {
            rtrnVal = prefixes[i];
        }
    }

    dom = null;
    delete dom;

    return rtrnVal;
}

document.addEventListener('lazybeforeunveil', function(e){
    var bg = e.target.getAttribute('data-bg');
    if(bg){
        e.target.style.backgroundImage = getCssValuePrefix() + 'linear-gradient(rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.8)),'+'url(' + bg + ')';
    }
});

$( "#image" )
  .focusout(function() {
      $text = $(this).val();
      $.ajax({url:$text,type:'HEAD',error:
        function() {
          $('#add-image-here').html( "<p><em>Oops! Doesn't look like a valid image url! Try again?</em></p>" );
        },
        success:
          function(){
            $('#add-image-here').html( "<img class='added-image' src='"+$text+"'></img>" );
          }
      });
  });
