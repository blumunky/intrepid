// ringIndex values: 0-4
// index: number in bottome left window
function getRingValue(ringIndex, index) {
	if(ringIndex > 4) { return null; }
  
  if(index > 10) { index = (-40 - index) ; }
  else if(index < -29) { index = -40 - index; }
  
	let retVal = index + (ringIndex * 14);
  
  return (retVal > 40 || index < -29 || index > 10) ? null : retVal
}

function getSpokeValues(index) {
	let retVal = [];
  for(let ii=0;ii<5;ii++){ 
  	retVal[ii] = getRingValue(ii, index);
  }
  return retVal;
}

function getChartValues(index) {
	let retVal = [
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null, null]
	];

  for(let ii=0;ii<14;ii++) {
  	if(index > 10) { index = -29; }
    var spokeVals = getSpokeValues(index++);
    for(jj=0;jj<5;jj++) {
    	retVal[jj][ii] = spokeVals[jj];
    }
  }
  return retVal;
}

function getCellClass(value, resourceType) {
	if(value == null) {
  	return null;
  } else if(value < 0) { 
  	return 'cell-negative';
  } else if(value < 4) {
  	return 'cell-caution';
  } else if([18,22,27,34,40].includes(value)) {
  	return "cell-special-" + resourceType;
  } else {
  	return null;
  }
}

function cellClick(e) {
	console.log("Cell has been clicked: ", e.target.innerHTML);
}

function displayChart(resourceType, indexValue) {
	let values = getChartValues(indexValue);
  
  for(let rr=0;rr<5;rr++) {  
  	var tblRow = document.getElementById("row" + rr);
    
  	for(let cc=0;cc<14;cc++) {   
  		let rowCell = document.createElement("td");
      
      let ringValue = values[rr][cc];
      let cellClass = getCellClass(ringValue, resourceType);
      
      if(ringValue != null) {
      	rowCell.classList.add("cell-normal");
      	rowCell.classList.add(cellClass);
        rowCell.onclick = cellClick;  
      }      
      rowCell.innerHTML = ((ringValue==null) ? "" : ringValue);
   	 	tblRow.appendChild(rowCell);
    }  
    
  }
}
