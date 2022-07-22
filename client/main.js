let yearBttn = document.getElementById('yearbttn');

yearBttn.addEventListener('click', () => showOrHide('year'));



//button show
function showOrHide(displayElem){
  let elem = document.getElementById(displayElem);

  if(elem.style.display === 'none'){
    elem.style.display = 'block';
  }
  else{
    elem.style.display = 'none';
  }
}

function render(element){
  element.innerHTML = '';
  
  
}