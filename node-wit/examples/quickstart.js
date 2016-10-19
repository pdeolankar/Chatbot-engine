'use strict';

let Wit = null;
let interactive = null;
var https = require('http');
var sent;

try {
  Wit = require('../').Wit			
} catch (e) {
  Wit = require('node-wit').Wit;
  interactive = require('node-wit').interactive;
}


const firstEntityValue = (entities, entity) => {	
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value
  ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

const actions = {
  send(request, response) {
    const {sessionId, context, entities} = request;
    const {text, quickreplies} = response;
    return new Promise(function(resolve, reject) {
      console.log('sending...', JSON.stringify(response));
      console.log(response);
      console.log(context);
      return resolve();
    });
  },


//getSunglass
getSunglass({context, entities}) {
    return new Promise(function(resolve, reject) {
      var sunglasses = firstEntityValue(entities, 'sunglasses')
      var sunglassbrand = firstEntityValue(entities, 'sunglassbrand')
      var sunglasstype = firstEntityValue(entities, 'sunglasstype')
      var color = firstEntityValue(entities, 'color')
      if (sunglasses && ((sunglassbrand == undefined || sunglassbrand == null) && (sunglasstype == undefined || sunglasstype == null) 
	  && (color == undefined || color == null))) {
		var optionsget = {
		  host: 'localhost',
		  port: 9001,		
		  path: '/api/appsunglasses',
		  method: 'GET'
		};
			
		// do the GET request
			var reqGet = https.request(optionsget, function(res) {
			res.on('data', function(data) {
				
		        			var result = JSON.parse(data.toString('utf8'));
												
						var mykey;
						sent = " ";
						for(mykey in result)
						{
						console.log(result[mykey].description);
						console.log("Avaliable color:" + result[mykey].frame);  //use DOT notation to access json obj
						console.log("Rating:" + result[mykey].rating);
						console.log("brand:" + result[mykey].brand);

sent = sent + '\t \n <br>' + '\t Brand:\n' + result[mykey].brand + '\t Description:\n' + result[mykey].description + '\t Type: \n' + result[mykey].type + '\t Available color:\n' + result[mykey].frame + '\t Rating:\n' + result[mykey].rating ;
						}
						exports.sent = sent;
				    		console.log("Top rated products");
					});
        		});
			reqGet.end();
			reqGet.on('error', function(e) {
				console.error(e);
			});
	
	 context.sunglass = 'These are top rated sunglasses of the season !!';
        delete context.missingSunglasses;
      } 

//for all BRAND, TYPE, FRAME
else if (sunglasses && ((sunglassbrand != undefined || sunglassbrand != null) && (sunglasstype != undefined || sunglasstype != null) && 
	(color != undefined || color != null))) {
  var optionsget = {
  host: 'localhost',
  port: 9001,	
  path: '/api/appsunglasses/brands/types/frames?brand=' +sunglassbrand + '&type=' +sunglasstype + '&frame=' +color,
  method: 'GET'
  };
		var reqGet = https.request(optionsget, function(res) {
			res.on('data', function(data) {

			var result = JSON.parse(data.toString('utf8'));
								
						var mykey;
						sent = " ";
						for(mykey in result)
						{
						console.log(result[mykey].description);
						console.log("Avaliable color:" + result[mykey].frame);  //use DOT notation to access json obj
						console.log("Rating:" + result[mykey].rating);
	sent = sent + '\t  \n <br>' +'\t Brand:\n' + result[mykey].brand + '\t Description:\n' + result[mykey].description + '\t Type: \n' + result[mykey].type + '\t Available color:\n' + result[mykey].frame + '\t Rating:\n' + result[mykey].rating ;
						}
						exports.sent = sent;
				    		console.log("Top rated products");
					});
		});
			reqGet.end();
			reqGet.on('error', function(e) {
			console.log("Inside Error");
			console.error(e);
			});       
    }


// for only BRAND
else if (sunglasses && ((sunglassbrand != undefined || sunglassbrand != null) && (sunglasstype == undefined || sunglasstype == null) && 
	(color == undefined || color == null))) {
  var optionsget = {
  host: 'localhost',
  port: 9001,	
  path: '/api/appsunglasses/brands/types/frames?brand=' +sunglassbrand,
  method: 'GET'
  };
		var reqGet = https.request(optionsget, function(res) {
			res.on('data', function(data) {
			var result = JSON.parse(data.toString('utf8'));
						var mykey;
						sent = " ";
						for(mykey in result)
						{
						console.log(result[mykey].description);
						console.log("Avaliable color:" + result[mykey].frame);  
						console.log("Rating:" + result[mykey].rating);
sent = sent + '\t \n <br>' + '\t Brand:\n' + result[mykey].brand + '\t Description:\n' + result[mykey].description + '\t Type: \n' + result[mykey].type + '\t Available color:\n' + result[mykey].frame + '\t Rating:\n' + result[mykey].rating ;
						}
						exports.sent = sent;
				    	});
		});
			reqGet.end();
			reqGet.on('error', function(e) {
				console.log("Inside Error");
				console.error(e);
			});  
    }

// for only TYPE
else if (sunglasses && ((sunglassbrand == undefined || sunglassbrand == null) && (sunglasstype != undefined || sunglasstype != null) && 
	(color == undefined || color == null))) {
  var optionsget = {
  host: 'localhost',
  port: 9001,	
  path: '/api/appsunglasses/brands/types/frames?type=' +sunglasstype,
  method: 'GET'
  };
		var reqGet = https.request(optionsget, function(res) {
			res.on('data', function(data) {
			var result = JSON.parse(data.toString('utf8'));
						var mykey;
						sent = " ";
						for(mykey in result)
						{
						console.log(result[mykey].description);
						console.log("Avaliable color:" + result[mykey].frame);  
						console.log("Rating:" + result[mykey].rating);
sent = sent + '\t \n <br>' + '\t Brand:\n' + result[mykey].brand + '\t Description:\n' + result[mykey].description + '\t Type: \n' + result[mykey].type + '\t Available color:\n' + result[mykey].frame + '\t Rating:\n' + result[mykey].rating ;
						}
						exports.sent = sent;
				    	});
		});
			reqGet.end();
			reqGet.on('error', function(e) {
				console.log("Inside Error");
				console.error(e);
			});  
    }


// for only FRAME(in this case frame means color)
else if (sunglasses && ((sunglassbrand == undefined || sunglassbrand == null) && (sunglasstype == undefined || sunglasstype == null) && 
	(color != undefined || color != null))) {
  var optionsget = {
  host: 'localhost',
  port: 9001,	
  path: '/api/appsunglasses/brands/types/frames?frame=' +color,
  method: 'GET'
  };
		var reqGet = https.request(optionsget, function(res) {
			res.on('data', function(data) {
			var result = JSON.parse(data.toString('utf8'));
						var mykey;
						sent = " ";
						for(mykey in result)
						{
						console.log(result[mykey].description);
						console.log("Avaliable color:" + result[mykey].frame);
						console.log("Rating:" + result[mykey].rating);
sent = sent + ' <br>' + '\t Brand:\n' + result[mykey].brand + '\t Description:\n' + result[mykey].description + '\t Type: \n' + result[mykey].type + '\t Available color:\n' + result[mykey].frame + '\t Rating:\n' + result[mykey].rating ;
						}
						exports.sent = sent;
				    	});
		});
			reqGet.end();
			reqGet.on('error', function(e) {
				console.log("Inside Error");
				console.error(e);
			});  
    }


// for BRAND & TYPE
else if (sunglasses && ((sunglassbrand != undefined || sunglassbrand != null) && (sunglasstype != undefined || sunglasstype != null) && 
	(color == undefined || color == null))) {
  var optionsget = {
  host: 'localhost',
  port: 9001,	
  path: '/api/appsunglasses/brands/types/frames?brand=' +sunglassbrand + '&type=' +sunglasstype,
  method: 'GET'
  };
		var reqGet = https.request(optionsget, function(res) {
			res.on('data', function(data) {
			var result = JSON.parse(data.toString('utf8'));
						var mykey;
						sent = " ";
						for(mykey in result)
						{
						console.log(result[mykey].description);
						console.log("Avaliable color:" + result[mykey].frame);  
						console.log("Rating:" + result[mykey].rating);
sent = sent + '\t \n <br>' + '\t Brand:\n' + result[mykey].brand + '\t Description:\n' + result[mykey].description + '\t Type: \n' + result[mykey].type + '\t Available color:\n' + result[mykey].frame + '\t Rating:\n' + result[mykey].rating ;
						}
						exports.sent = sent;
				    	});
		});
			reqGet.end();
			reqGet.on('error', function(e) {
				console.log("Inside Error");
				console.error(e);
			});  
    }

// for BRAND & FRAME
else if (sunglasses && ((sunglassbrand != undefined || sunglassbrand != null) && (sunglasstype == undefined || sunglasstype == null) && 
	(color != undefined || color != null))) {
  var optionsget = {
  host: 'localhost',
  port: 9001,	
  path: '/api/appsunglasses/brands/types/frames?brand=' +sunglassbrand + '&frame=' +color,
  method: 'GET'
  };
		var reqGet = https.request(optionsget, function(res) {
			res.on('data', function(data) {
			var result = JSON.parse(data.toString('utf8'));
						var mykey;
						sent = " ";
						for(mykey in result)
						{
						console.log(result[mykey].description);
						console.log("Avaliable color:" + result[mykey].frame);
						console.log("Rating:" + result[mykey].rating);
sent = sent + '\t \n <br>' + '\t Brand:\n' + result[mykey].brand + '\t Description:\n' + result[mykey].description + '\t Type: \n' + result[mykey].type + '\t Available color:\n' + result[mykey].frame + '\t Rating:\n' + result[mykey].rating ;
						}
						exports.sent = sent;
				    	});
		});
			reqGet.end();
			reqGet.on('error', function(e) {
				console.log("Inside Error");
				console.error(e);
			});  //} 
    }

// for TYPE & FRAME
else if (sunglasses && ((sunglassbrand == undefined || sunglassbrand == null) && (sunglasstype != undefined || sunglasstype != null) && 
	(color != undefined || color != null))) {
  var optionsget = {
  host: 'localhost',
  port: 9001,	
  path: '/api/appsunglasses/brands/types/frames?type=' +sunglasstype + '&frame=' +color,
  method: 'GET'
  };
		var reqGet = https.request(optionsget, function(res) {
			res.on('data', function(data) {
			var result = JSON.parse(data.toString('utf8'));
						var mykey;
						sent = " ";
						for(mykey in result)
						{					
						console.log(result[mykey].description);
						console.log("Avaliable color:" + result[mykey].frame); 
						console.log("Rating:" + result[mykey].rating);
sent = sent + '\t \n <br>' + '\t Brand:\n' + result[mykey].brand + '\t Description:\n' + result[mykey].description + '\t Type: \n' + result[mykey].type + '\t Available color:\n' + result[mykey].frame + '\t Rating:\n' + result[mykey].rating ;
						}
						exports.sent = sent;
				    	});
		});
			reqGet.end();
			reqGet.on('error', function(e) {
				console.log("Inside Error");
				console.error(e);
			});  
    }

else {
        context.missingSunglasses = true;
        delete context.sunglass;
      }
      return resolve(context);
    });
  },

//getCOntactlens
  getCOntactlens({context, entities}) {
    return new Promise(function(resolve, reject) {
      var contactlens = firstEntityValue(entities, 'contactlens');
      var contactlensbrand = firstEntityValue(entities, 'contactlensbrand');
      var contactlenscolor = firstEntityValue(entities, 'contactlenscolor');

 if (contactlens && (contactlensbrand ==undefined || contactlensbrand == null) && (contactlenscolor ==undefined || contactlenscolor == null)) {			
		var optionsget = {
		  host: 'localhost',
		  port: 9001,		
		  path: '/api/appcontactlenses',
		  method: 'GET'
		};

		var reqGet = https.request(optionsget, function(res) {
			res.on('data', function(data) {
				var result = JSON.parse(data.toString('utf8'));
					var mykey;
					sent = " ";	
					for(mykey in result)
					{
					console.log(result[mykey].name);
					console.log("Description:" + result[mykey].description);
					console.log("Rating:" + result[mykey].ratings);
					console.log("Available color:" + result[mykey].color);
sent = sent + '\t \n <br>' + '\t Brand:\n' + result[mykey].brand +'\t Description:\n' + result[mykey].description + '\t Rating:\n' + result[mykey].ratings + '\t Available color:\n' + result[mykey].color;
					}
				exports.sent = sent;	       		
			});
		});
			reqGet.end();
			reqGet.on('error', function(e) {
				console.error(e);
			});
        console.log("what number do you prefer? would like professional help to find good contact lens number for you? "); 
} 

// for both BRAND & COLOR
else if (contactlens && ((contactlensbrand !=undefined || contactlensbrand != null) && (contactlenscolor !=undefined || contactlenscolor != null))) {
  var optionsget = {
  host: 'localhost',
  port: 9001,	
  path: '/api/appcontactlenses/brands/types/colors?brand=' +contactlensbrand + '&color=' +contactlenscolor,
  method: 'GET'
  };
		var reqGet = https.request(optionsget, function(res) {
			res.on('data', function(data) {
			
				var result = JSON.parse(data.toString('utf8'));
						
						var mykey;
						sent = " ";	 
						for(mykey in result)
						{
						console.log(result[mykey].name);
						console.log("Description:" + result[mykey].description);
						console.log("Rating:" + result[mykey].ratings);
						console.log("Available color:" + result[mykey].color);
sent = sent +  '\t \n <br>' + '\t Brand:\n' + result[mykey].brand + '\t Description:\n' + result[mykey].description + '\t Rating:\n' + result[mykey].ratings + '\t Available color:\n' + result[mykey].color;
						}  
					exports.sent = sent;      		
			});
		});
			reqGet.end();
			reqGet.on('error', function(e) {
				console.log("Inside Error");
				console.error(e);
			});  
        console.log(context + 'trying to get context - 1');
	console.log(context + 'trying to get context - 2');
    }

// for only BRAND
else if (contactlens && ((contactlensbrand !=undefined || contactlensbrand != null) && (contactlenscolor == undefined || contactlenscolor ==  null))) {
  var optionsget = {
  host: 'localhost',
  port: 9001,	
  path: '/api/appcontactlenses/brands/types/colors?brand=' +contactlensbrand ,
  method: 'GET'
  };
		var reqGet = https.request(optionsget, function(res) {
			res.on('data', function(data) {

				var result = JSON.parse(data.toString('utf8'));
						
						var mykey;
						sent = " ";	
						for(mykey in result)
						{
						console.log(result[mykey].name);
						console.log("Description:" + result[mykey].description);
						console.log("Rating:" + result[mykey].ratings);
						console.log("Available color:" + result[mykey].color);
sent = sent + '\t \n <br>' + '\t Brand:\n ' + result[mykey].brand + '\t Description:\n ' + result[mykey].description + '\t Rating:\n' + result[mykey].ratings + '\t Available color:\n' + result[mykey].color;
						}  
					exports.sent = sent;      		
			});
		});
			reqGet.end();
			reqGet.on('error', function(e) {
				console.log("Inside Error");
				console.error(e);
			});  
  }

// for only COLOR
else if (contactlens && ((contactlensbrand ==undefined || contactlensbrand == null) && (contactlenscolor !=undefined || contactlenscolor != null))) {
  var optionsget = {
  host: 'localhost',
  port: 9001,	
  path: '/api/appcontactlenses/brands/types/colors?color=' +contactlenscolor,
  method: 'GET'
  };
		var reqGet = https.request(optionsget, function(res) {
			res.on('data', function(data) {

				var result = JSON.parse(data.toString('utf8'));
						
						var mykey;
						sent = " ";	
						for(mykey in result)
						{
						console.log(result[mykey].name);
						console.log("Description:" + result[mykey].description);
						console.log("Rating:" + result[mykey].ratings);
						console.log("Available color:" + result[mykey].color);
sent = sent +  '\t \n <br>' + '\t Brand:\n' + result[mykey].brand + '\t Description:\n' + result[mykey].description + '\t Rating:\n' + result[mykey].ratings + '\t Available color:\n' + result[mykey].color;
						}  
					exports.sent = sent;      		
			});
		});
			reqGet.end();
			reqGet.on('error', function(e) {
				console.log("Inside Error");
				console.error(e);
			});  
      }
	return resolve(context);
   });	
	
  },


};

const accessToken = TRDJGBCFJDNIQDWYZ7FQGRB6IE3CYTRF;   //we can replace our wit.ai story token here
const client = new Wit({accessToken, actions}); 
exports.client= client;		

