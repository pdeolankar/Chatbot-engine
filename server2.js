// call the packages we need
var wait = require('wait.for'); 
var Fiber = require('fibers');
var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser'); 
var mongodb = require('mongodb');	    
var mongojs = require('mongojs'); 
var db = mongojs('mongodb://localhost:27017/myappdb'); 
var isomorphicfetch = require('isomorphic-fetch'); 
var nodefetch = require('node-fetch'); 
var nodeuuid = require('node-uuid');    
var quickstart = require('/home/osboxes/Chatbot/node-wit/examples/quickstart.js');     

const {DEFAULT_MAX_STEPS} = require('/home/osboxes/Chatbot/node-wit/lib/config.js'); 
const logger = require('/home/osboxes/Chatbot/node-wit/lib/log.js'); 
const readline = require('readline'); 
const uuid = require('node-uuid'); 
let context = typeof initContext === 'object' ? initContext : {}; 
const sessionId = uuid.v1(); 
const steps = DEFAULT_MAX_STEPS;		

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 

// UI Librairies       
var https = require('http')
  , server = https.createServer(app)
  , io = require('socket.io').listen(server);

var jade = require('jade');
var pseudoArray = ['admin'];      

app.set('views', __dirname + '/views');		
app.set('view engine', 'jade');
app.set("view options", { layout: false });

app.use(express.static(__dirname + '/public')); 

// Render and send the main page
app.get('/', function(req, res){
  res.render('home.jade');
});			

var mongoose   = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/myappdb'); 

var Appsunglass     = require('./appsunglass.js');     
var Appcontactlens  = require('./appcontactlens.js');  

// Handle the socket.io connections here
var users = 0;		 
io.sockets.on('connection', function (socket) { 
	users += 1; 
	reloadUsers(); 
	socket.on('message', function (data) { 
		if(pseudoSet(socket))
		{	
			let context = typeof initContext === 'object' ? initContext : {};			
			line = data.trim(); 		
			if (!line) { 
			return; 
			} 
			quickstart.client.runActions(sessionId, line, context, steps).then((ctx) => {		
			context = ctx;
			console.log(quickstart.sent);
			var transmit = {date : new Date().toISOString(), pseudo : 'BOT', message : quickstart.sent};
			socket.emit('message', transmit);
			}) 
			.catch(err => console.error(err))  	
		}
	});   
	socket.on('setPseudo', function (data) { 

		if (pseudoArray.indexOf(data) == -1) 
		{
			pseudoArray.push(data);	
			pseudoArray.push('BOT');	
			socket.nickname = data;
			socket.emit('pseudoStatus', 'ok');
			console.log("user " + data + " connected");
		}
		else
		{
			socket.emit('pseudoStatus', 'error') 
		}
	});
	socket.on('disconnect', function () { 
		users -= 1;
		reloadUsers();
		if (pseudoSet(socket))
		{
			console.log("disconnect...");
			var pseudo;
			pseudo = socket.nickname;
			var index = pseudoArray.indexOf(pseudo);
			pseudo.slice(index - 1, 1);
		}
	});
});

function reloadUsers() { 
	io.sockets.emit('nbUsers', {"nb": users});
}
function pseudoSet(socket) { 
	var test;
	if (socket.nickname == null ) test = false;
	else test = true;
	return test;
}

var port = process.env.PORT || 9001;        

// ROUTES FOR OUR API 
var router = express.Router();              
   router.use(function(req, res, next) {     
   console.log('Something is happening.'); 
   next(); 
}); 
 
// test access at GET method
router.get('/', function(req, res) { 
    res.json({ message: 'welcome to our Sunglass api!' });   
}); 


// writing more routes 
router.route('/appsunglasses') 

    // create a appsunglass access at POST METHOD
    .post(function(req, res) { 
        
        var appsunglass = new Appsunglass();     
        appsunglass.name = req.body.name; 
	appsunglass.description = req.body.description;   
	appsunglass.size = req.body.size; 
	appsunglass.type = req.body.type; 
	appsunglass.brand = req.body.brand; 
	appsunglass.gender = req.body.gender; 
	appsunglass.frame = req.body.frame; 
	appsunglass.rating = req.body.rating; 
 	appsunglass.price = req.body.price;
	console.log(req.body.name); 
	 
        // save the appsunglass and check for errors 
        appsunglass.save(function(err) { 
            if (err) 
                res.send(err); 

            res.json({ message: 'A Sunglass is created!' });   
	}); 
}) 

// get all the appsunglasses GET ALL 
    .get(function(req, res) { 
        Appsunglass.find({},{_id: 0, brand: 1, description: 1, rating: 1, frame: 1}).sort({ rating: -1}).limit(3) 
.execFind( function(err, appsunglasses) { 
            if (err) 
		res.send(err);    
		res.json(appsunglasses); 
			 });	 
    }) 

router.route('/appsunglasses/:appsunglass_id') 
// get the appsunglasses with id  GET 
    .get(function(req, res) { 
       Appsunglass.findById(req.params.appsunglass_id, function(err, appsunglasses) { 
            if (err) 
                res.send(err); 
            res.json(appsunglasses); 
        }); 
    }); 


router.route('/appsunglasses/brands/types/frames')  
// get the appsunglasses with id  GET 
    .get(function(req, res) { 
console.log("Reached"); 
	console.log(req.query.brand); 
	console.log(req.query.type);	 
	console.log(req.query.frame); 

	var br = req.query.brand;   var ty = req.query.type; var fr = req.query.frame; 
	 
	var matchCondition = '{'	 
		var parambrand = req.query.brand; var paramtype = req.query.type; var paramframe = req.query.frame; 
	
	  if(parambrand !=undefined || parambrand != null ){ 
	  matchCondition = matchCondition + ' "brand" : "' + parambrand + '" ,';  
	  }  
	  if(paramtype !=undefined || paramtype != null ){ 
	  matchCondition = matchCondition + '"type" : "'+ paramtype + '",';	 
	  }	 
          if(paramframe !=undefined || paramframe != null ){ 
	  matchCondition = matchCondition + ' "frame" : "' + paramframe + '" ,';	 
	  }
	matchCondition = matchCondition.replace(/,\s*$/, "");
	matchCondition = matchCondition + '}'; 

	console.log(matchCondition);		

	matchCondition = JSON.parse(matchCondition); 

	if (matchCondition == '{}'){ 
		res.json({"msg":"Please rephrase your query"}); 
		console.log("adsvnsdivisdvnl");
	}else{ 
		db.collection('appsunglasses').find(matchCondition, { _id: 0, brand: 1, description: 1, type: 1, frame: 1, rating: 1 }).sort({rating: -1}).limit(3,function(err,result){ 
            		if (err) 
			{ 
			res.send(err); 
			console.log(result); 
			console.log(err);   
			res.json({ message: 'something is wrong!!' }); 
			} 
			res.json(result); 
		}); 
	 } 
}); 


//for appcontactlens 
router.route('/appcontactlenses') 

    // create a appsunglass access at POST METHOD
    .post(function(req, res) { 
        
        var appcontactlens = new Appcontactlens();     
        appcontactlens.name = req.body.name; 
	appcontactlens.description = req.body.description;   
	appcontactlens.type = req.body.type; 
	appcontactlens.brand = req.body.brand; 
	appcontactlens.color = req.body.color; 
	appcontactlens.price = req.body.price; 
	appcontactlens.ratings = req.body.ratings;    
        console.log(req.body.name); 

        // save the appcontactlens and check for errors 
        appcontactlens.save(function(err) { 
            if (err) 
                res.send(err); 
	       res.json({ message: 'A Contactlens is created!' });   
	}); 
}) 

// get all the appcontactlens GET ALL
    .get(function(req, res) { 
       Appcontactlens.find({},{_id: 0, brand: 1, description: 1, color:1, ratings: 1}).sort({ ratings: -1}).limit(3) 
.execFind( function(err, appcontactlenses) { 
            if (err) 
		res.send(err);    
		res.json(appcontactlenses); 
			}); 
    }) 

router.route('/appcontactlenses/:appcontactlens_id') 
// get the appsunglasses with id  GET 
    .get(function(req, res) { 
       Appcontactlens.findById(req.params.appcontactlens_id, function(err, appcontactlenses) { 
            if (err) 
                res.send(err); 
            res.json(appcontactlenses); 
        }); 
    }); 

router.route('/appcontactlenses/brands/types/colors')		
    .get(function(req, res) { 
	var matchCondition = '{'	 
	var parabrand = req.query.brand; var paratype = req.query.type;  var paracolor = req.query.color; 
	if(parabrand !=undefined || parabrand != null ){ 
	matchCondition = matchCondition + ' "brand" : "' + parabrand + '" ,'; 
	} 

	
	if(paracolor !=undefined || paracolor != null ){ 
	matchCondition = matchCondition + ' "color" : "' + paracolor + '" ,';	 
	} 
	 
	matchCondition = matchCondition.replace(/,\s*$/, ""); 
	matchCondition = matchCondition + '}'; 		 
	matchCondition = JSON.parse(matchCondition); 
	if (matchCondition == '{}'){ 
		res.json({"msg":"Please rephrase your query"}); 
	}else{ 
		db.collection('appcontactlens').find(matchCondition, { _id: 0, brand: 1, description: 1,  color:1, ratings: 1}).sort({ratings: -1}).limit(3, function(err, result){ 
            		if (err) 
			{ 
			res.send(err); 
			console.log(err);   
			res.json({ message: 'something is wrong!!' }); 
			} 
			res.json(result); 
		}); 
	} 
}); 


// all are prefixed with /api 
app.use('/api', router); 

//start server
server.listen(port);	
console.log('Magic happens on port ' + port);
