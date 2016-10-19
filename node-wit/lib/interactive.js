//interactive.js

const {DEFAULT_MAX_STEPS} = require('./config'); 
const logger = require('./log.js'); 
const readline = require('readline'); 
const uuid = require('node-uuid'); 

module.exports = (wit, initContext, maxSteps) => { 
console.log(maxSteps);
//console.log(wit);
console.log(wit);
this.inputStr = function(str) {
	
	let context = typeof initContext === 'object' ? initContext : {}; 
	const sessionId = uuid.v1(); 

	const steps = maxSteps ? maxSteps : DEFAULT_MAX_STEPS; 

	console.log(str);
	line = str.trim(); 
	if (!line) { 
	return; 
	} 
	wit.runActions(sessionId, line, context, steps) 
	.then((ctx) => { 
	context = ctx; 
	//prompt(); 
	}) 
	.catch(err => console.error(err)) 
}
};

/*
module.exports = function() { 
    this.sum = function(a,b) { console.log("dfdf");
				 return a+b };
    this.multiply = function(a,b) { return a*b };
    //etc
}
*/
