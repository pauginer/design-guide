function ensureMainElement(){ //Moves content inside a <main> element if they are not already
  var hasMain = $("body > main").length == 1;
  if (!hasMain){
    var mainElt = $("<main>");
    $("body").contents().appendTo(mainElt);
    $("body").append(mainElt);
  }
}

function loadMenu(){ //loads the contents of menu.html
  ensureMainElement();
  var link = $('link[rel="import"][href^="menu"]');
  if (link.length > 0){
    var content = link[0].import;
    var el = $(content).find('main').contents();
    var target = $("<nav class='menu'>");
    target.append(el.clone());
    target.prependTo($("body"));
  } else{
    console.error("Menu could not be loaded.");
  }
}

function markCurrentSection(){
  var path = window.location.pathname.split("/");
  var fileName = !!(path.length>1)?path[1]:"index.html";
  var current = $(".toc a[href$='"+fileName+"']").parent("li");
  current.addClass("active");
  //Expand subsections
  var subSections = $("<ul class='subsections'>");
  $("section > h2").each(function(i,e){
    var subItem = $("<a>");
    subItem.html($(e).html());
    subItem.attr("href","#section"+i);
    $(e).attr("id","section"+i)
    $("<li>").append(subItem).appendTo(subSections);
  });
  //subSections.appendTo(current);
  subSections.insertAfter(current);
}

function main(){
  loadMenu();
  markCurrentSection();
}


$(main);
