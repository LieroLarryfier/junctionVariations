// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[0][number] != 'undefined'
        ? args[0][number]
        : match
      ;
    });
  };
}

	var junctionSize;
	var stroke;
	var outline;
	var blur;
	var race;
	var curves;
	var colorFun;
	var strokeWidth;
	var lineWidth;
	var blurFactor;
	
	var iteration = 0;
	
var bindValues = function() {
	//TODO: bessere übertragung von HTML zum Code
	//basics
	var junctions = document.getElementById("junctions").value;
	var junctionsVisible = document.getElementById("junctionsVisible").checked;
	junctionSize = document.getElementById("junctionSize").value;
	var bgColor = document.getElementById("bgColor").value;
	var paintColor = document.getElementById("paintColor").value;
	var gridColor = document.getElementById("gridColor").value;
	var randomnes = document.getElementById("randomnes").value;
	colorFun = document.getElementById("colorFun").checked;
	var columns = document.getElementById("columns").value;
	var rows = document.getElementById("rows").value;
	var seed = document.getElementById("seed").value;
	var gap = document.getElementById("gap").value;
	strokeWidth = document.getElementById("strokeWidth").value;
	lineWidth = document.getElementById("lineWidth").value;
	blurFactor = document.getElementById("blurFactor").value;
	//finishing
	stroke = document.getElementById("stroke").checked;
	outline = document.getElementById("outline").checked;
	blur = document.getElementById("blur").checked;
	race = document.getElementById("race").checked;
	curves = document.getElementById("curves").checked;
	
	generate(junctions, junctionsVisible, bgColor, paintColor, gridColor, randomnes, colorFun, columns, rows, seed, gap);
}

	var BASE_ARC = 10;
	var DISTANCE = 2*BASE_ARC;
	
	
	
function generate(junctions, junctionsVisible, bgColor, paintColor, gridColor, randomnes, colorFun, columns, rows, seed, gap) {
	var space = DISTANCE * ((junctions-1) + parseInt(gap));
	var midpoint = space / 2;
	
	var STAGE_WIDTH = space * columns;
	var STAGE_HEIGHT = space * rows;
	
	var paper = Snap(STAGE_WIDTH, STAGE_HEIGHT);
	//for export
	var svgId = "svg" + iteration;
	paper.attr({
		id : svgId
		});
	
	drawCanvas(paper, bgColor, gridColor, columns, rows, gap);
	
	drawProceduralVariations(paper, junctions, paintColor, bgColor, seed, columns, rows, randomnes);
	
	exportToPng();
	
	
function exportToPng() {
				var svg = document.getElementById("svg" + iteration);
				var img = document.getElementById("exportPng");
				svg.toDataURL("image/png", {
					callback: function(data) {
						img.setAttribute("src", data)
					}
				})
				iteration++;
			}

function drawProceduralVariations(paper, junctions, paintColor, bgColor, seed, columns, rows, randomnes) {

		var drawSeed = seed;
		var color = paintColor;
		var chromaColor = chroma.hex(color);
		var hslColor = chromaColor.hsl();
				
		for (var r = 0; r < rows; r++) {
			for (var c = 0; c < columns; c++) {
			
			var pathString = drawArcs(junctions, drawSeed);	

			//TODO: colorFun für jeden einzelen pathElement (schwierig)
			if (colorFun) {
					 hslColor[0] += 360/(rows*columns);
					 color = chroma.hsl(hslColor).hex();
			}
			
			var p = paper.path(pathString);
			p.attr({
			transform : "translate(" + (((1 + c) * space) - (space/2)) + "," + (r * space + DISTANCE) +")",
			fill : "none",
			stroke : color,
			"stroke-width" : lineWidth,
			"stroke-linecap" : "square"
			});
			
			if (stroke) {
				
				var mask = paper.mask();
				
				if (outline) {
					var maskField = paper.circle(0, space/2, space);
					maskField.attr({
						fill : "white"
					});
					mask.add(maskField);
				}
				
				var maskPath = p.clone();
				maskPath.attr({
					stroke : "black",
					fill : "white",
					transform : ""
				});
				
				
				mask.add(maskPath);
				
				var strokeMaskWidth = parseInt(strokeWidth) + parseInt(lineWidth);
				
				var s = p.clone();
				s.attr({
					"stroke-width" : strokeMaskWidth,
					mask : mask
				});
			
				p.attr({
				stroke : "none"
				});
			}
			
			if (blur) {
				var f = paper.filter(Snap.filter.blur(blurFactor, blurFactor));
				if (stroke) {
					var b = s.clone();
				} else {
					var b = p.clone();
				}
				b.attr({
					filter : f
				});
			}
			
			if (race) {
				
				var street = p.clone();
				street.attr({
				stroke : "grey",
				'stroke-width' : 4,
				});
				
				var curbs = street.clone();
				curbs.attr({
				stroke : "red",
				'stroke-width' : 7,
				"stroke-linecap" : "butt",
				'stroke-dasharray' : [6 * 0.5 , 6/2]
				});
				
				var white = street.clone();
				white.attr({
				stroke : "white",
				'stroke-width' : 7
				});
				paper.append(street);
			}
			
			if (junctionsVisible) {
				drawJunctions(paper, color, bgColor, junctions, r, c);
			}
			
			//randomize needs to be based on drawSeed for sequential display
			drawSeed = randomizeSeed(drawSeed, randomnes);
			}
		}

}

function drawJunctions(paper, paintColor, bgColor, junctions, r, c) {
		//TODO: junctions an allen ecken bei lines
		var color = paintColor;
		
				var x = (((1+c) * space) - (space/2));
				var y = ((r)*space + DISTANCE);
				 
				for (var k = 0; k < junctions; k++) {
						var junction;
						if (curves) {
							junction = paper.circle(0,0,junctionSize);
							junction.attr({
								transform : "translate(" + x + "," + (y + (k*DISTANCE)) +")"
							});
						} else {
							junction = paper.rect(0,0,junctionSize,junctionSize);
							junction.attr({
								transform : "translate(" + (x - junctionSize/2) + "," + ((y - junctionSize/2) + (k*DISTANCE)) +"), rotate(45,"+junctionSize/2+","+junctionSize/2+")"
							});
						}
						
						junction.attr({
							fill : color
						});
						
						if (stroke) {
							var strokeJunction;
							if (curves) {
								strokeJunction = paper.circle(0,0,junctionSize-strokeWidth/2);
								strokeJunction.attr({
									transform : "translate(" + x + "," + (y + (k*DISTANCE)) +")"
								});
							} else {
								var strokeJunctionSize = junctionSize-(strokeWidth);
								strokeJunction = paper.rect(0,0,strokeJunctionSize,strokeJunctionSize);
								strokeJunction.attr({
									transform : "translate(" + (x - strokeJunctionSize/2) + "," + ((y - strokeJunctionSize/2) + (k*DISTANCE)) +"), rotate(45,"+strokeJunctionSize/2+","+strokeJunctionSize/2+")"
								});
							}
							strokeJunction.attr({
								fill : bgColor
							});
						}
				}
	}

function drawArcs(junctions, seed) {
	
	var arcs = junctions * (junctions - 1);
	var arcSeed = seed
	var pathString = "";
	
	for (var i = 0; i < arcs; i++) {
					if (arcSeed & 1) {
						pathString += addPathElement(i, junctions);
					}
					arcSeed >>>= 1;
			}
	return pathString;
	
}

function addPathElement(i, junctions) {
			
			//left and right arc
			var sweep = i%2;
			//helper to eliminate one side
			var side = Math.floor(i/2);

			//magic
			var start = side % (junctions - Math.floor(i/junctions));
			
			//magic
			var arcWidth = 1 + Math.floor(side / (junctions - Math.floor(i/junctions)));
			
			//limit the length of the arc
			if ((arcWidth + start) >= junctions) {
				arcWidth = junctions - 1 - start;
			}
			
			//calculate end
			var end = start * DISTANCE + 2*arcWidth * BASE_ARC;
			
			//helper for lines
			var half = (start * DISTANCE + end)/2;
						
			var lines = ~curves;
			
			//apply units to the arguments
			if (curves) {
				//curves
				var arcString = "M0,{0} A{1},{1} 0 0 {3} 0,{2}";
				var arcArgs = [start * DISTANCE, arcWidth*BASE_ARC, end, sweep];
			} else if (lines) {
				//lines
				var arcString = "M0,{0} L{1},{3} 0,{2}";
				var arcArgs = [start * DISTANCE, arcWidth*BASE_ARC * (1 + sweep * (-2)), end, half];
			}
			//format arcString
			return arcString.format(arcArgs); 
			
}

function randomizeSeed(seed, randomnes) {
	if (randomnes == 0) {
		//sequential
		seed++;	
	} else {
		//randomize last x bits
		var mask = Math.floor(Math.random() * Math.pow(2,randomnes));
		seed ^= mask;
	}
	return seed;
}

function drawCanvas(paper, bgColor, gridColor, columns, rows, gap) {
	drawBackground(paper, bgColor);
	if (gap == 2) {
		drawGrid(paper, gridColor, columns, rows);
	}
}
	
function drawBackground(paper, bgColor) {
	var bg = paper.rect(0,0, STAGE_WIDTH, STAGE_HEIGHT);
		bg.attr({
				fill : bgColor
		});
}
	
function drawGrid(paper, gridColor, columns, rows) {
		
		var gridString = "";
		
		var columnString = "M{0},0 V{1} ";
		var rowString = "M0,{0} H{1} ";
		
		for (var c = 0; c <= columns; c++) {
			var gridArgs = [c * space, STAGE_HEIGHT];
			gridString += columnString.format(gridArgs);
		}
		for (var r = 0; r <= rows; r++) {
			var gridArgs = [r * space, STAGE_WIDTH];
			gridString += rowString.format(gridArgs);	
		}
		
		var grid = paper.path(gridString);
		grid.attr({
				fill : "none",
				stroke : gridColor
		});

	}
	
	}

	
