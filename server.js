var express = require('express'), 
	http = require('http'), 
	path = require('path'), 
	reload = require('reload'), 
	colors = require('colors'), 
	mongoskin = require('mongoskin')

var nodeExcel = require('excel-export');
var app = express();

var clientDir = path.join(__dirname, 'client');
var env = process.env.NODE_ENV || 'development';

if ('development' == env) {
	app.set('port', process.env.PORT || 3000)
	app.use(express.favicon())
	app.use(express.logger('dev'))
	app.use(express.bodyParser())
	app.use(app.router)
	app.use(express.static(clientDir))
	app.use(express.json());
	app.use(express.urlencoded());
}

app.configure('development', function () {
	app.use(express.errorHandler());
});

app.get('/', function (req, res) {
	res.sendfile(path.join(clientDir, 'rest/index.html'));
});

var db = mongoskin.db('mongodb://localhost:27017/dealsDB', {
		safe : true
	});

app.param('collectionName', function (req, res, next, collectionName) {
	req.collection = db.collection(collectionName);
	return next();
});

app.get('/collections/:collectionName/', function (req, res) {
	console.log("request Params:" + JSON.stringify(req.params));
	console.log("request Query:" + JSON.stringify(req.query));
	console.log("request Body:" + JSON.stringify(req.body));
	
	var result = {};
	var sortArr = new Array();
	var recRetTypeMulti = 'true';
	var recCountNeeded = 'true';

	if (req.query.multiRec !== undefined)
		recRetTypeMulti = req.query.multiRec;

	if (req.query.recCount !== undefined)
		recCountNeeded = req.query.recCount;

	if (req.query.sort !== undefined) {
		var sortArray = JSON.parse(req.query.sort);
		for (idx = 0; idx < sortArray.length; idx++) {
			var sort = sortArray[idx];
			var sortField = '"' + sort.property + '"';
			var sortDir = (sort.direction === 'DESC') ? 'descending' : 'ascending';
			console.log(sortField + " ==> " + sortDir);
			sortArr[idx] = new Array();
			sortArr[idx][0] = sort.property;
			sortArr[idx][1] = sortDir;
		}
	}

	var filter = {};
	if (req.query.filter !== undefined) {
		if (req.query.filter[0].data !== undefined) {
			var filterField = req.query.filter[0].field;
			var filterValue = req.query.filter[0].data.value;
			var filtertype = req.query.filter[0].data.type;

			if (filterField !== undefined && filterValue !== undefined) {
				if (filtertype === 'string')
					filter[filterField] = {
						$regex : filterValue
					};
				else if (filtertype === 'list') {
					var arrayOfNumbers = filterValue.map(Number);
					filter[filterField] = {
						$in : arrayOfNumbers
					};
				}
			}
		} else {
			var filterJson = JSON.parse(req.query.filter);
			var filterField = filterJson[0].property;
			var filterValue = filterJson[0].value;

			filter[filterField] = {
				$regex : filterValue
			};
		}
	}

	console.log("filter: " + JSON.stringify(filter));
	req.collection.find(filter, {
		limit : req.query.limit,
		skip : req.query.start,
		sort : sortArr
	}).toArray(function (e, results) {
		if (e)
			return next(e);
		var result = {};

		if (recRetTypeMulti == 'true')
			result.data = results;
		else
			result.data = results[0];

		result.success = true;

		if (recCountNeeded == 'true') {
			req.collection.count(filter, function (e, recCount) {
				if (e)
					return next(e);
				result.total = recCount;
				console.log("request Body:" + JSON.stringify(result));
				res.send(result);

			});
		} else {
			console.log(JSON.stringify(result));
			res.send(result);
		}
	});

});

app.post('/collections/:collectionName/', function (req, res) {
	console.log("request Params:" + JSON.stringify(req.params));
	console.log("request Query:" + JSON.stringify(req.query));
	console.log("request Body:" + JSON.stringify(req.body));
	req.body._id = null;

	req.collection.insert(req.body, {}, function (e, insertedRec) {
		if (e)
			return next(e);
		var result = {}
		result.success = true;
		result.data = insertedRec;

		console.log("result: " + JSON.stringify(result));
		res.send(result);
	});
});

app.put('/collections/:collectionName/', function (req, res) {
	console.log("request Params:" + JSON.stringify(req.params));
	console.log("request Query:" + JSON.stringify(req.query));
	console.log("request Body:" + JSON.stringify(req.body));

	var _idVal = new require('mongodb').ObjectID(req.body._id);
	req.body._id = _idVal;
	console.log("Inside PUT");

	req.collection.findAndModify(
	{
		_id : _idVal
	}, 
	{}, 
	{
		$set : req.body
	}, {
		multi : false,
		safe : true,
		new : true,
		upsert : false
	},
	function (e, modRec) {
		if (e)
			console.log(e.message);

		var result = {}
		result.success = true;
		result.data = modRec;

		console.log("Output: " + JSON.stringify(result));
		res.send(result);
	});
});

app.del('/collections/:collectionName/', function (req, res) {
	console.log("request Params:" + JSON.stringify(req.params));
	console.log("request Query:" + JSON.stringify(req.query));
	console.log("request Body:" + JSON.stringify(req.body));

	var _idVal = new require('mongodb').ObjectID(req.body._id);
	console.log(_idVal);
	req.collection.remove({
		_id : _idVal
	}, function (e, result) {
		if (e)
			return next(e);

		res.send((result === 1) ? {
			msg : 'success'
		}
			 : {
			msg : 'error'
		});
	});
});

function json2array(json) {
	var results = [];
	console.log(JSON.stringify(json));
	// var parsedJSON = JSON.parse(json);
	for (var x in json) {
		var result = [];
		result.push(json[x].dealname);
		result.push(json[x].brokername);
		result.push(json[x].customername);
		result.push(json[x].dealtype);
		result.push(json[x].dealstartdate);
		result.push(json[x].dealenddate);
		result.push(json[x].deal);
		result.push(json[x].comments);
		result.push(json[x].status);
		result.push(json[x].lumpsum);
		result.push(json[x].totaldealamount);
		
		results.push(result);
	}

	return results;
}

app.get('/collections/:collectionName/exportToExcel', function(req, res){
   console.log("request Params:" + JSON.stringify(req.params));
   console.log("request Query:" + JSON.stringify(req.query));
   console.log("request Body:" + JSON.stringify(req.body));
  var filter = {};
  if(req.query.filter !== undefined){    
      var filterJson = JSON.parse(req.query.filter);
      var filterField = filterJson.property;
      var filterValue = filterJson.value;

      if(filterField !== undefined && filterValue !== undefined)
        filter[filterField] = {$regex: filterValue};
  }
  var sortArr = ['dealname'];
  
  console.log("filter: " + JSON.stringify(filter));
  req.collection.find(filter, {sort:  sortArr}) .toArray(function(e, results){
      if (e) return next(e);
      var result = [];
      result = json2array(results);
      var conf ={};
      conf.stylesXmlFile = "styles.xml";
      conf.cols = [{
        caption:'Name',
        type:'string',
        width:28.7109375,
        beforeCellWrite:function(row, cellData){
            if(cellData === undefined)
                return '';
            return cellData;
        }
    },{
        caption:'Broker',
        type:'string',
        width:28.7109375,
        beforeCellWrite:function(row, cellData){
            if(cellData === undefined)
                return '';
            return cellData;
		}
    },{
        caption:'Customer',
        type:'string',
        beforeCellWrite:function(row, cellData){
            if(cellData === undefined)
                return '';
            return cellData;
        },
        width:28.7109375
     },{
        caption:'Type',
        type:'string',
        width:28.7109375,
        beforeCellWrite:function(row, cellData){
            if(cellData === undefined)
                return '';
            return cellData;
		}
    },{
        caption:'Start Date',
        type:'date',
        width:28.7109375,
        beforeCellWrite:function(row, cellData){
            if(cellData === undefined)
                return '';
            return cellData;
        }
    },{
        caption:'End Date',
        type:'date',
        width:28.7109375,
        beforeCellWrite:function(row, cellData){
            if(cellData === undefined)
                return '';
            return cellData;
		}
    },{
        caption:'Deal',
        type:'string',
        width:28.7109375,
        beforeCellWrite:function(row, cellData){
            if(cellData === undefined)
                return '';
            return cellData;
		}
    },{
        caption:'Comments',
        type:'string',
        width:28.7109375,
        beforeCellWrite:function(row, cellData){
            if(cellData === undefined)
                return '';
            return cellData;
		}
    },{
        caption:'Status',
        type:'string',
        width:28.7109375,
        beforeCellWrite:function(row, cellData){
            if(cellData === undefined)
                return '';
            return cellData;
        }
    },{
        caption:'Lumpsum',
        type:'number',
        width:28.7109375,
        beforeCellWrite:function(row, cellData){
            if(cellData === undefined)
                return '';
            return cellData;
        }
    },{
        caption:'Total Deal Amount',
        type:'number',
        width:28.7109375,
        beforeCellWrite:function(row, cellData){
            if(cellData === undefined)
                return '';
            return cellData;
        }
    }];
      conf.rows =result;
      var result = nodeExcel.execute(conf);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats');
      res.setHeader("Content-Disposition", "attachment; filename=" + "Deals.xlsx");
      res.end(result, 'binary');
    });
});

app.get('/collections/:collectionName/importFromExcel', function (req, res) {
	console.log("request Params:" + JSON.stringify(req.params));
	console.log("request Query:" + JSON.stringify(req.query));
	console.log("request Body:" + JSON.stringify(req.body));

});

var server = http.createServer(app);
reload(server, app);

server.listen(app.get('port'), function () {
	console.log("Web server listening in %s on port %d", colors.red(process.env.NODE_ENV), app.get('port'));
});
