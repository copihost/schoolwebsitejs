function getDocHeight() {
  var D = document;
  return Math.max(
    D.body.scrollHeight,
    D.documentElement.scrollHeight,
    D.body.offsetHeight,
    D.documentElement.offsetHeight,
    D.body.clientHeight,
    D.documentElement.clientHeight
  );
}
function amountscrolled() {
  var winheight =
    window.innerHeight ||
    (document.documentElement || document.body).clientHeight;
  var docheight = getDocHeight();
  var scrollTop =
    window.pageYOffset ||
    (document.documentElement || document.body.parentNode || document.body)
      .scrollTop;
  var trackLength = docheight - winheight;
  var pctScrolled = Math.floor((scrollTop / trackLength) * 100); // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
  return pctScrolled;
}

window.addEventListener(
  "scroll",
  function () {
    const s = this.document.getElementById("movingShoe");
    const l = amountscrolled() + 1;
    console.log(l)
    if (l > 45 & l < 85) {
      s.style.display = "none"
    }
    else {
      s.style.display = "block"
    }
    if (l % 20 < 4) {
      s.style.transform = "translateX(0%)";
    } else if (l % 20 < 8) {
      s.style.transform = "translateX(-20%)";
    } else if (l % 20 < 12) {
      s.style.transform = "translateX(-40%)";
    } else if (l % 20 < 16) {
      s.style.transform = "translateX(-60%)";
    } else {
      s.style.transform = "translateX(-80%)";
    }
    
  },
  false
);

function closepopup(item, itemsParent){
  item.style.display = "none"
}
function openpopup(item, color){
  const popup = document.getElementById('popup')
  const img = document.getElementById('popimg')
  img.src = item.src
  popup.style.display = "block"
}
function toggleNav(){
  const navbar = document.getElementById('navbar')
  console.log(navbar.style.height)
  if (navbar.style.height == "50px"){
    navbar.style.height = "250px";
  }
  else {
    navbar.style.height = "50px"
  }
}
function showContactForm(){
  const myformbk = document.getElementById("contactPop");
  const myform = document.getElementById("form_body");
  myform.style.display = "block"
  myformbk.style.display = "block"
}
function hideContactForm(){
  const myformbk = document.getElementById("contactPop");
  const myform = document.getElementById("form_body");
  myform.style.display = "none"
  myformbk.style.display = "none"
}

