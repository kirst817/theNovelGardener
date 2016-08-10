$(document).ready(function(){
  var chosenGrid;

// hidden items
  $('.veggie').hide();
  $('.plot').hide();
  $('#veggieChoices').hide();
  $('#plotChoices').hide();
  $('#veggieChoices2').hide();
  $('#plotChoices2').hide();
  $('#grid').hide();
  $('#grid2').hide();
  $('#grid3').hide();
  $('#veggieImages').hide();
  $('.query-params').hide();
  $('aside').hide();
  $('.grid').hide();
  $('.grid2').hide();
  $('.grid3').hide();
  $('#growingTips').hide();
  $('#recipeDiv').hide();

//______________________________________________________________
// AJAX
//CLICKED VEGGIE

var ajaxRecipeSearch = {
 notFired: true,
 startAt: 0
}
var clickedVeggie;

// GETS CHECKED ITEMS AND PUT IN ARRAY

var veggieChoices = [];
var veggie;

var veggieList = $('.veggies');

for (var i = 0; i < veggieList.length; i++) {
  $(veggieList[i]).click(function(e) {
    veggieChoices.push(e.target.id);

  });
}

// .on('change', function(e){
//    veggie = e.target.id;
//      veggieChoices.push(veggie);
//    console.log(veggieChoices);
// });

//__________________________________________________________

   function getRecipeMatches(){

     var key = "2fa6051ee9f20c34fa6088cfc37d8b4e";
     var id = "47ca03a5";


      $(document).on('click', '.gridSquare', function(e){
        clickedVeggie = e.target.id;
          $('span').empty();
          $('#recipeDiv').show();
          $('span').append(clickedVeggie);
          $('#recipes').empty();
          $('.close').show();
          $('.growingTips').hide();

        $.ajax({
          method: 'GET',
          url: "https://api.yummly.com/v1/api/recipes?_app_id=" + id + "&_app_key=" + key + "&requirePictures=true&maxResult=300&start="+ ajaxRecipeSearch.startAt +"&q=" + clickedVeggie,
          dataType: 'jsonp',
          success: function(data){
            data.matches
        //  console.log(data.matches);
          for (var i = 0; i < 15; i++) {
           var matchedRecipes = data.matches[i];

          $('#recipes').append("<center><div class='recipeName'><a target='_blank'>" + matchedRecipes.recipeName + "</a></div>" + "<div class='recipeInfo'><img class='recipes' src='" + matchedRecipes.imageUrlsBySize[90] + "'></div><center>");

// imageUrlsBySize[90]

      };
  getRecipes(matchedRecipes);
      }


      });


    });

    $('.close').on('click', function(){
      $('#recipeDiv').hide();
      $('.growingTips').show();

    });


};

function getRecipes(matchedRecipes){

  var key = "2fa6051ee9f20c34fa6088cfc37d8b4e";
  var id = "47ca03a5";

  $.ajax({
    method: 'GET',
    url: "http://api.yummly.com/v1/api/recipe/" + matchedRecipes.id + "?_app_id="+ id + "&_app_key=" + key,
    dataType: 'jsonp',
    success: function(data){
      data.attribution.url;

      var matchedRecipeInfo = data.attribution.url;
      $('div.recipeName a').attr("href",  matchedRecipeInfo);


    }
  });

}

//__________________________________________________________
firstView();
secondView();
thirdView();
fourthView();
// FIRST VIEW
// removes the main slidebox to reveal options
function firstView(){

  $('.slideBox').on('click',function(){
    $('.slideBox').slideUp(1000, function(){
      $(this).remove();
      $('.veggie').show();
      $('.plot').show();
    });
  });
}

// SECOND VIEW
// removes the main plot and veggie divs and shows the appropriate select box
function secondView(){

  $('.veggie').on('click', function (){

    $('.veggie').slideDown(1000, function(){

      $(this).remove();
      $('.plot').remove();
      $('#veggieChoices').show();
    });
  });
  $('.plot').on('click', function (){
    $('.plot').slideDown(1000, function(){
      $(this).remove();
      $('.veggie').remove();
      $('#plotChoices').show();
    });
  });
}


// THIRD VIEW
// on veggie submit pull up plot options
function thirdView(){

  $('#vegSubmit').on('click', function (){
    event.preventDefault();
    if(veggieChoices.length <= 15 && veggieChoices.length > 10){
      $("#plotChoices2 option[value='twoRows']").remove();
      $("#plotChoices2 option[value='oneRow']").remove();
      $('#veggieChoices').slideDown(1000, function(){
        $(this).remove();
        $('#plotChoices2').show();
      });
    }
    if (veggieChoices.length <= 10 && veggieChoices.length > 6){
      $("#plotChoices2 option[value='oneRow']").remove();
      $("#plotChoices2 option[value='threeRows']").remove();
      $('#veggieChoices').slideDown(1000, function(){
        $(this).remove();
        $('#plotChoices2').show();
      });
    }
    if (veggieChoices.length <= 6 ){
      $("#plotChoices2 option[value='twoRows']").remove();
      $("#plotChoices2 option[value='threeRows']").remove();
      $('#veggieChoices').slideDown(1000, function(){
        $(this).remove();
        $('#plotChoices2').show();
      });
    }

  });
}

// FOURTH VIEW
//when submit clicked populate appropriate grid
function fourthView(){
    populateAppropGridOnSubmit();
    populateAppropGridWhenPlotClicked();
  };

  function populateAppropGridOnSubmit(){

    $('#vegSubmit2').on('click', function (event){
      event.preventDefault();
      $('#veggieChoices2').slideUp(2000, function(){
        $(this).remove();
        $('#veggieChoices2').remove();

      });

    });
  }

  //when plot clicked populate appropriate grid
  function populateAppropGridWhenPlotClicked() {

    $('#plotChoices2 option').on('click', function (e){
      $('#plotChoices2').slideUp(1000, function(){
        $('#plotChoices2').remove();
        $('#veggieChoices2').remove();

      });
    });
  }


// FIFTH VIEW
//populate grids based on which was selected
function populateGrid(){
  $('#plotChoices2 option').on('click', function(e){

  if ($(e.target).text() === 'One Row'){
    chosenGrid = 'grid';
    var result = compareVeggieArrays();
    appendImages(result);
    $('#grid').show();
    $('.grid').show();
    $('aside').show();

  }
  if ($(e.target).text() === 'Two Rows') {
    chosenGrid = 'grid2';
    var result = compareVeggieArrays();
    appendImages(result);
    $('#grid2').show();
    $('.grid2').show();
    $('aside').show();

  }
  if ($(e.target).text() === 'Three Rows') {
    chosenGrid = 'grid3';
    var result = compareVeggieArrays();
    appendImages(result);
    $('#grid3').show();
    $('.grid3').show();
    $('aside').show();
}
});
$('#plotChoices option').on('click', function(e){

if ($(e.target).text() === 'One Row'){
  $('#plotChoices').on('click', function (){

  $('#plotChoices').slideDown(1000, function(){
    $(this).remove();
    $('#plotChoices').remove();
    $('#veggieChoices2').show();
    $('#vegSubmit2').on('click', function(){
      chosenGrid = 'grid';
      var result = compareVeggieArrays();
      appendImages(result);
      $('#grid').show();
      $('.grid').show();
      $('aside').show();
    });
    });
  });
}
if ($(e.target).text() === 'Two Rows') {
  $('#plotChoices option').on('click', function (){
  $('#plotChoices').slideDown(1000, function(){
    $(this).remove();
    $('#plotChoices').remove();
    $('#veggieChoices2').show();
   $('#vegSubmit2').on('click', function(){
     chosenGrid = 'grid2';
     var result = compareVeggieArrays();
     appendImages(result);
     $('#grid2').show();
      $('.grid2').show();
     $('aside').show();
    });
  });
  });
}
if ($(e.target).text() === 'Three Rows') {
  $('#plotChoices option').on('click', function (){
  $('#plotChoices').slideDown(1000, function(){
    $(this).remove();
    $('#plotChoices').remove();
    $('#veggieChoices2').show();
    $('#vegSubmit2').on('click', function(){
      chosenGrid = 'grid3';
      var result = compareVeggieArrays();
      appendImages(result);
      // console.log(result);
      $('#grid3').show();
        $('.grid3').show();
      $('aside').show();
    });
  });
});
}

});
 };
populateGrid();
getRecipeMatches();

var growingTips = document.getElementsByClassName('growingTipInfo');


  for (var i = 0; i < growingTips.length; i++) {
    // console.log(growingTips[i]);
    //  if(vegForInfo === clickedVeggie) {

    $('.growingTips').append(growingTips[i]);
    // if(clickedVeggie === vegForInfo){
    //    var nameInfo = $('.growingTips').append(vegForInfo);
    //    $(nameInfo).append(growingTipsInfo);
    //
    // }
  }

var veggieForInfoArr = {};
var growingTipsByVeggie = document.querySelectorAll('.growingTipInfo h5');
var growingTipsUl = document.querySelectorAll('.growingTipInfo');
var growingTipsInfo = document.querySelectorAll('.growingTipInfo ul');
   for (var i = 0; i < growingTipsByVeggie.length; i++) {
     var vegForInfo = growingTipsByVeggie[i].innerText;
     console.log(growingTipsInfo);

    // veggieForInfoArr[] = vegForInfo;
    // console.log(veggieForInfoArr);
        //  $('.growingTips').append($('.growingTipInfo h5').text(clickedVeggie) +growingTipsUl);
    // console.log(veggieForInfoArr);

  };

//VEGGIE IMAGE ARRAY DATA
var veggies = document.getElementsByClassName('vImage');
var square = document.getElementsByClassName('gridSquare');

var veggiesIdArr = [];
for (var i = 0; i < (veggies).length; i++) {
var veggieId = veggies[i].id;
veggiesIdArr.push(veggieId);
};

  // -------------
//COMPARE VEGGIES CLICKED in checkbox to VEGGIES available, if MATCH append to grid
function compareVeggieArrays(){

var map = {}, result = [], i;
for (i = 0; i < veggieChoices.length; ++i) {
    map[veggieChoices[i]] = 1;
};

for (i = 0; i < veggiesIdArr.length; ++i) {
    if (map[veggiesIdArr[i]] === 1) {
        result.push(veggiesIdArr[i]);

        map[veggiesIdArr[i]] = 0;

    };
  };

  return result;

};
//ADD VEGGIES TO GRID
  // ---------------------------------------------------------------

 function appendImages(matches){
   //matches is the same number of items clicked !!!!
     var foundImages = [];
    //  console.log(matches.length);
    for (var i = 0; i < matches.length; i++) {

      var found = $(document).find('img#' + matches[i]);
      foundImages.push(found);
    }

    var $cells = $('#' + chosenGrid).children(':lt('+ matches.length + ')');
    // console.log($cells);

    for (var i = 0; i < $cells.length; i++) {
    $($cells[i]).append(foundImages[i]);


    var gardenPlotArr = [];
    var myGardenPlot = $($cells[i]).append(foundImages[i]);
    gardenPlotArr.push(myGardenPlot);
    console.log(myGardenPlot);
    console.log(gardenPlotArr);
    function addToLocalStorage(){
    data = JSON.stringify(myGardenPlot);
    window.localStorage.myGardenPlot = data
    console.log(data);
  }
    addToLocalStorage();
  //   getMyPlotFromLocalStorage();
   //
    function getMyPlotFromLocalStorage(){
   if (window.localStorage.myGardenPlot) {
     var myGardenPlot = JSON.parse(window.localStorage.myGardenPlot);
     console.log(myGardenPlot);
    //  for(var key in myGardenPlot){
    //    //$("#" + key).val(colorData[key]);
    //    document.getElementById(key).value = myGardenPlot[key];
    //  }
   }
 }
    // gardenPlotArr.push(gardenPlot);
    // console.log(gardenPlotArr);



        // addRecipeToPopupDiv();

   }
}

//___________________________________________________________________________
//CHECKBOX LIMIT

var limit = 0;
function updateLimit(limit){
$('input').on('change', function() {
   if($(this).siblings(':checked').length >= limit) {
       this.checked = false;
   }
 });
};
  //---------------------------------------------------------------
//ADD LIMIT TO VEGGIES SELECTED
$("select").change(function() {

       var arr = [];
        $( "select option:selected" ).each(function(i, selected) {
       arr[i] = $(selected).text();

            // console.log(arr[i]);
            if (arr[i] === 'One Row'){
             updateLimit(6);
            }
            if (arr[i] === 'Two Rows'){
             updateLimit(10);
            }
            if (arr[i] === 'Three Rows'){
             updateLimit(15);
            }
        });

      });
//________________________________________________________________________
//MORE AJAX CALL STUFFF


//GOOGLE MAPS API
// function gardenStoreLocator() {
//  var userInput, searchUrl, results;
//  var output = $('#locaResults');
//
//  #('#search').on('click', function(){
//
//    var storeQueryRequest;
//    storeQueryString = $('#locaSearch').val();
//
//    searchUrl = "" + storeQueryString;
//------

  });
