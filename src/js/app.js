// Example 1: Import jQuery
//import "jquery"

// Example 2: Import Handlebars template
import HelloTemplate from "../templates/hello.handlebars"

// Example 2: Compile the template
let hellohtml = HelloTemplate({ Name: 'Peter' });

// Example 2: Render the template
document.getElementById('container').innerHTML = hellohtml;

// Example 3: Log to console
console.log('Hello World');
