$(document).on('ready', function() {


function progressScroll(){
  //scroll
  var winHeight = $(window).height(),
      docHeight = $(document).height(),
      progressBar = $('progress'),
      max, value;

  /* Set the max scrollable area */
  max = docHeight - winHeight;
  progressBar.attr('max', max);

  $(document).on('scroll', function(){
     value = $(window).scrollTop();
     progressBar.attr('value', value);
  });
};
progressScroll();

  $(window).scroll(function(){
    var t = $(window).scrollTop();
    console.log(t);
    var show = (t >= 599) ? $('.four, video').addClass('fadeOut') : [$('.four, video ').removeClass('fadeOut'), $('.four, video').addClass('.fadeIn')];
    var show = (t >= 600)   ? $('.one').addClass('fadeIn') : $('.one').removeClass('fadeIn');
    var show = (t >= 1200)  ? [$('.two').addClass('fadeIn'), $('.one').removeClass('fadeIn')] : $('.two').removeClass('fadeIn');
    var show = (t >= 1800)  ? [$('.three').addClass('fadeIn'), $('.two').removeClass('fadeIn')] : $('.three').removeClass('fadeIn');

  });

  var windowWidth = $(window).width();
  $('#dog, video').css('width',windowWidth);

});
