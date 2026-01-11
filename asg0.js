function main() {
    // Draw the canvas black
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    var ctx = canvas.getContext('2d');
    
    // Set canvas background to black
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw v1 and v2
function handleDrawEvent() {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Read v1 values and draw
    var x1 = parseFloat(document.getElementById('v1x').value);
    var y1 = parseFloat(document.getElementById('v1y').value);
    var v1 = new Vector3([x1, y1, 0]);
    drawVector(v1, "red");
    
    // Read v2 values and draw
    var x2 = parseFloat(document.getElementById('v2x').value);
    var y2 = parseFloat(document.getElementById('v2y').value);
    var v2 = new Vector3([x2, y2, 0]);
    drawVector(v2, "blue");
}

// Calc angle between two vectors
function angleBetween(v1, v2) {
    var dotProduct = Vector3.dot(v1, v2);
    var mag1 = v1.magnitude();
    var mag2 = v2.magnitude();
    
    var cosAlpha = dotProduct / (mag1 * mag2);
    var alpha = Math.acos(cosAlpha); // In radians
    
    // Convert to degrees
    var degrees = alpha * (180 / Math.PI);
    
    return degrees;
}

// Calculate area of triangle formed by v1 and v2
function areaTriangle(v1, v2) {
    // The magnitude of cross product = area of parallelogram
    // Area of triangle = half of parallelogram area
    var crossProduct = Vector3.cross(v1, v2);
    var area = crossProduct.magnitude() / 2;
    
    return area;
}

// Handle operations
function handleDrawOperationEvent() {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Read v1 values and draw
    var x1 = parseFloat(document.getElementById('v1x').value);
    var y1 = parseFloat(document.getElementById('v1y').value);
    var v1 = new Vector3([x1, y1, 0]);
    drawVector(v1, "red");
    
    // Read v2 values and draw
    var x2 = parseFloat(document.getElementById('v2x').value);
    var y2 = parseFloat(document.getElementById('v2y').value);
    var v2 = new Vector3([x2, y2, 0]);
    drawVector(v2, "blue");
    
    // Get operation and scalar
    var operation = document.getElementById('operation').value;
    var scalar = parseFloat(document.getElementById('scalar').value);
    
    if (operation === 'add') {
        // v3 = v1 + v2
        var v3 = new Vector3([x1, y1, 0]);
        v3.add(v2);
        drawVector(v3, "green");
        
    } else if (operation === 'sub') {
        // v3 = v1 - v2
        var v3 = new Vector3([x1, y1, 0]);
        v3.sub(v2);
        drawVector(v3, "green");
        
    } else if (operation === 'mul') {
        // v3 = v1 * scalar
        // v4 = v2 * scalar
        var v3 = new Vector3([x1, y1, 0]);
        v3.mul(scalar);
        drawVector(v3, "green");
        
        var v4 = new Vector3([x2, y2, 0]);
        v4.mul(scalar);
        drawVector(v4, "green");
        
    } else if (operation === 'div') {
        // v3 = v1 / scalar
        //  v4 = v2 / scalar
        var v3 = new Vector3([x1, y1, 0]);
        v3.div(scalar);
        drawVector(v3, "green");
        
        var v4 = new Vector3([x2, y2, 0]);
        v4.div(scalar);
        drawVector(v4, "green");
        
    } else if (operation === 'magnitude') {
        // Calculate and print mags
        console.log("Magnitude v1: " + v1.magnitude());
        console.log("Magnitude v2: " + v2.magnitude());
        
    } else if (operation === 'normalize') {
        // Norm and draw
        var v3 = new Vector3([x1, y1, 0]);
        v3.normalize();
        drawVector(v3, "green");
        
        var v4 = new Vector3([x2, y2, 0]);
        v4.normalize();
        drawVector(v4, "green");
        
    } else if (operation === 'angleBetween') {
        // Calculate and print angle
        var angle = angleBetween(v1, v2);
        console.log("Angle between v1 and v2: " + angle + " degrees");
        
    } else if (operation === 'area') {
        // Calculate and print area
        var area = areaTriangle(v1, v2);
        console.log("Area of triangle: " + area);
    }
}

function drawVector(v, color) {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');
    
    // Canvas center
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    
    // Scale factor
    var scale = 20;
    
    // Extract x and y from the vector
    var x = v.elements[0];
    var y = v.elements[1];
    
    // Set line color
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    
    // Draw the line
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + x * scale, centerY - y * scale);
    ctx.stroke();
}