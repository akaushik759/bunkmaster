/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
$(document).ready(function(){
  var subjects = JSON.parse(localStorage.getItem('subjects'));
  if(subjects!= null){
  for(var i=0;i<subjects.length;i++)
    {
      var sub = subjects[i];
      $('#subjects').append('<div id="div"'+i+'><div class="col-md-12"><div class="card"><div class="card-body"><h5 class="card-title">Subject : '+sub['sname']+'</h5><h6 class="card-subtitle mb-2 text-muted">Total Classes : '+sub['total_classes']+'</h6><p> Missed till now : '+sub['missed_till_now']+'</p><h6> Bunks Left</h6><hr><div class="container"><div class="row"><div class="col-md-12"></div></div><div class="row"><div class="col-md-4"><p class="btn btn-warning"> 65% : '+sub['six']+'</p></div><div class="col-md-4"><p class="btn btn-warning"> 75% : '+sub['seven']+'</p></div><div class="col-md-4"><p class="btn btn-warning"> 85% : '+sub['eight']+'</p></div></div></div></div></div> <button class="btn btn-outline-dark delete-subject" id="'+i+'"> Delete </button></div></div>');
    }
  }
});

$("#add-subject").click(function() {
  if (
    $("#sub").val().length === 0 ||
    $("#tc").val().length === 0 ||
    $("#mtn").val().length === 0
  ) {
    window.alert("Please fill all the data and then submit");
  }
  var sname = $("#sub").val();
  var total_classes = parseInt($("#tc").val());
  var missed_till_now = parseInt($("#mtn").val());

  var six = total_classes - Math.floor(total_classes * 0.65) - missed_till_now;
  var seven = total_classes - Math.floor(total_classes * 0.75) - missed_till_now;
  var eight = total_classes - Math.floor(total_classes * 0.85) - missed_till_now;
  
  if(six<0)
    six = 0;
  if(seven<0)
    seven = 0;
  if(eight<0)
    eight = 0;
  
  var subjects = JSON.parse(localStorage.getItem('subjects'));
  var no;
  if(subjects==null)
    {
      subjects = [];
      no = 0;
    }
  else{
    no = subjects.length;
  }

  
  var cur = {
    'sname':sname,
    'total_classes':total_classes,
    'missed_till_now':missed_till_now,
    'six':six,
    'seven':seven,
    'eight':eight
  };
  
  subjects.push(cur);
  localStorage.setItem('subjects',JSON.stringify(subjects));
  
  $('#subjects').append('<div id="div"'+no+'><div class="col-md-12"><div class="card"><div class="card-body"><h5 class="card-title">Subject : '+sname+'</h5><h6 class="card-subtitle mb-2 text-muted">Total Classes : '+total_classes+'</h6><p> Missed till now : '+missed_till_now+'</p><h6> Bunks Left</h6><hr><div class="container"><div class="row"><div class="col-md-12"></div></div><div class="row"><div class="col-md-4"><p class="btn btn-warning"> 65% : '+six+'</p></div><div class="col-md-4"><p class="btn btn-warning"> 75% : '+seven+'</p></div><div class="col-md-4"><p class="btn btn-warning"> 85% : '+eight+'</p></div></div></div></div></div> <button class="btn btn-outline-dark delete-subject" id="'+no+'"> Delete </button></div></div>');
  
  
});

$('.delete-subject').click(function(){
  $('#'+this.id).remove();
  var subjects = JSON.parse(localStorage.getItem('subjects'));
  subjects.splice(parseInt(this.id), 1);
  localStorage.setItem('subjects',JSON.stringify(subjects));
});

$('#clear-all').click(function(){
  localStorage.removeItem('subjects');
  $('#subjects').empty();
});

