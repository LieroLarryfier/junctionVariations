var generate3 = function () {

// create an new instance of a pixi stage
    var stage = new PIXI.Stage(0xFF00A6);
 
	var STAGE_WIDTH = 640;
	var STAGE_HEIGHT = 640;
	
    // create a renderer instance.
    var renderer = PIXI.autoDetectRenderer(STAGE_WIDTH, STAGE_HEIGHT);
 
    // add the renderer view element to the DOM
    document.body.appendChild(renderer.view);
 	
	drawVariations(3, 20, 0xFFFFFF);
	
	requestAnimFrame( animate );
	
    function animate() {
 
        requestAnimFrame( animate );
 		
        // render the stage  
        renderer.render(stage);
		
    }

	function drawVariations(junctions, distance, color) {
	
	var color = color;
	
	var space = junctions*distance + 1*distance;
	var space2 = space/2;
	
	var distance2 = 2*distance;
	
	drawGrid();
	
	//drawHalfCircle(100, 100, 20, "TOP");
	//drawHalfCircle(120, 100, 20, "BOTTOM");
	//drawJunctions(new PIXI.Point(100, 100), 20, 4, "HORIZONTAL");
	var variations = 64;
	var row = 0;
	var column = 0;
	
	for (var i = 0; i <= variations; i++) {
			
			row = i % 8;
			column = Math.floor(i / 8);
						
			if (i & 1) {
				drawHalfCircle(space2 + row*space, distance + column*space, distance, "LEFT");
			}
			if (i & 2) {
				drawHalfCircle(space2 + row*space, distance + column*space, distance, "RIGHT");
			}
			if (i & 4) {
				drawHalfCircle(space2 + row*space, distance2 + column*space, distance, "LEFT");
			}
			if (i & 8) {
				drawHalfCircle(space2 + row*space, distance2 + column*space, distance, "RIGHT");
			}
			if (i & 16) {
				drawHalfCircle(space2 + row*space, distance + column*space, distance2, "LEFT");
			}
			if (i & 32) {
				drawHalfCircle(space2 + row*space, distance + column*space, distance2, "RIGHT");
			}
		
			//drawJunctions(new PIXI.Point(space2 + row*space, distance + column*space), distance, junctions, "VERTICAL");
		
	}
	
	function drawGrid() {
		var gridGraphics = new PIXI.Graphics();
		gridGraphics.lineStyle(1, color, 1);
		
		vLine = space;
		hLine = space;
		
		while (vLine < STAGE_WIDTH) {
			gridGraphics.moveTo(vLine, 0);
			gridGraphics.lineTo(vLine, STAGE_HEIGHT);
			vLine += space;
		}
		while (hLine < STAGE_HEIGHT) {
			gridGraphics.moveTo(0, hLine);
			gridGraphics.lineTo(STAGE_WIDTH, hLine);
			hLine += space;
		}
		
		stage.addChild(gridGraphics);
	}
	
	function drawHalfCircle(x, y, distance, visibleHalf) {
		//helper
		var diameter = distance;
		var radius = diameter / 2;
		
		var mask = new PIXI.Graphics();
		mask.beginFill();
		
		switch (visibleHalf) {
			case "TOP":
				mask.drawRect(x-2, y, diameter+4 ,-radius-2);
				break;
			case "BOTTOM":
				mask.drawRect(x-2, y, diameter+4 ,radius+2);
				break;
			case "RIGHT":
				mask.drawRect(x, y-2, radius+2, diameter+4);
				break;
			case "LEFT":
				mask.drawRect(x, y-2, -radius-2, diameter+4);
				break;
		}
		
		mask.endFill();
		stage.addChild(mask);
		
		//mask to Remove bottom half;
		
		
		var circleGraphics = new PIXI.Graphics();
		circleGraphics.lineStyle(3, color, 1);
		
		switch (visibleHalf) {
			case "TOP":
			case "BOTTOM":
				circleGraphics.drawCircle(x+radius, y, radius);
				break;
			case "LEFT":
			case "RIGHT":
				circleGraphics.drawCircle(x, y+radius, radius);
				break;
		}		
				
		
		circleGraphics.mask = mask;
		
		stage.addChild(circleGraphics);
		
	}
	
	function drawJunctions(start, distance, times, direction) {
		var junctionGraphics = new PIXI.Graphics();
		junctionGraphics.beginFill(color, 1);
		
		for (var i = 0; i < times; i++) { 
			switch (direction) {
				case "HORIZONTAL":
					junctionGraphics.drawCircle((start.x + distance * i), start.y, 3);
					break;
				case "VERTICAL":
					junctionGraphics.drawCircle(start.x , (start.y + distance * i), 3);
					break;
			}
			
		}
		
		junctionGraphics.endFill();
		
		stage.addChild(junctionGraphics);
		
	}
	
	}
	
}

var generate4 = function () {

// create an new instance of a pixi stage
    var stage = new PIXI.Stage(0xFF00A6);
 
	var STAGE_WIDTH = 800;
	var STAGE_HEIGHT = 800;
	
    // create a renderer instance.
    var renderer = PIXI.autoDetectRenderer(STAGE_WIDTH, STAGE_HEIGHT);
 
    // add the renderer view element to the DOM
    document.body.appendChild(renderer.view);
 	
	drawVariations(4, 20, 0xFFFFFF);
	
	requestAnimFrame( animate );
	
    function animate() {
 
        requestAnimFrame( animate );
 		
        // render the stage  
        renderer.render(stage);
		
    }

	function drawVariations(junctions, distance, color) {
	
	var color = color;
	
	var space = junctions*distance + 1*distance;
	var space2 = space/2;
	
	var distance2 = 2*distance;
	var distance3 = 3*distance;
	
	drawGrid();
	
	//drawHalfCircle(100, 100, 20, "TOP");
	//drawHalfCircle(120, 100, 20, "BOTTOM");
	//drawJunctions(new PIXI.Point(100, 100), 20, 4, "HORIZONTAL");
	var variations = 64;
	var row = 0;
	var column = 0;
	
	for (var i = 0; i < variations; i++) {
		//TODO: create only closed symbols	
			row = i % 8;
			column = Math.floor(i / 8);
						
			x = space2 + row*space
			y = column*space
			
			if (i & 1) {
				drawHalfCircle(x, distance + y, distance, "LEFT");
			}
			if (i & 2) {
				drawHalfCircle(x, distance + y, distance2, "RIGHT");
			}
			if (i & 4) {
				drawHalfCircle(x, distance + y, distance3, "LEFT");
			}
			if (i & 8) {
				drawHalfCircle(x, distance2 + y, distance, "RIGHT");
			}
			if (i & 16) {
				drawHalfCircle(x, distance2 + y, distance2, "LEFT");
			}
			if (i & 32) {
				drawHalfCircle(x, distance3 + y, distance, "RIGHT");
			}
			
			//drawJunctions(new PIXI.Point(space2 + row*space, distance + column*space), distance, junctions, "VERTICAL");
		
	}
	
	function drawGrid() {
		var gridGraphics = new PIXI.Graphics();
		gridGraphics.lineStyle(1, color, 1);
		
		vLine = space;
		hLine = space;
		
		while (vLine < STAGE_WIDTH) {
			gridGraphics.moveTo(vLine, 0);
			gridGraphics.lineTo(vLine, STAGE_HEIGHT);
			vLine += space;
		}
		while (hLine < STAGE_HEIGHT) {
			gridGraphics.moveTo(0, hLine);
			gridGraphics.lineTo(STAGE_WIDTH, hLine);
			hLine += space;
		}
		
		stage.addChild(gridGraphics);
	}
	
	function drawHalfCircle(x, y, distance, visibleHalf) {
		//helper
		var diameter = distance;
		var radius = diameter / 2;
		
		var mask = new PIXI.Graphics();
		mask.beginFill();
		
		switch (visibleHalf) {
			case "TOP":
				mask.drawRect(x-2, y, diameter+4 ,-radius-2);
				break;
			case "BOTTOM":
				mask.drawRect(x-2, y, diameter+4 ,radius+2);
				break;
			case "RIGHT":
				mask.drawRect(x, y-2, radius+2, diameter+4);
				break;
			case "LEFT":
				mask.drawRect(x, y-2, -radius-2, diameter+4);
				break;
		}
		
		mask.endFill();
		stage.addChild(mask);
		
		//mask to Remove bottom half;
		
		
		var circleGraphics = new PIXI.Graphics();
		circleGraphics.lineStyle(3, color, 1);
		
		switch (visibleHalf) {
			case "TOP":
			case "BOTTOM":
				circleGraphics.drawCircle(x+radius, y, radius);
				break;
			case "LEFT":
			case "RIGHT":
				circleGraphics.drawCircle(x, y+radius, radius);
				break;
		}		
				
		
		circleGraphics.mask = mask;
		
		stage.addChild(circleGraphics);
		
	}
	
	function drawJunctions(start, distance, times, direction) {
		var junctionGraphics = new PIXI.Graphics();
		junctionGraphics.beginFill(color, 1);
		
		for (var i = 0; i < times; i++) { 
			switch (direction) {
				case "HORIZONTAL":
					junctionGraphics.drawCircle((start.x + distance * i), start.y, 3);
					break;
				case "VERTICAL":
					junctionGraphics.drawCircle(start.x , (start.y + distance * i), 3);
					break;
			}
			
		}
		
		junctionGraphics.endFill();
		
		stage.addChild(junctionGraphics);
		
	}
	
	}
	
}