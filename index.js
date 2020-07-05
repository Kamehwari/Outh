const express =             require('express');
const cors   =              require('cors');
const mongoose =            require('mongoose')
const oAuth2Server =        require("node-oauth2-server");
const models = require('./models/models')
const mongoUrl =            process.env.MONGO_URL;

// Configure app
let app = express();

app.oauth = oAuth2Server({
    model : models,
    grants: ["password"],
    debug: true,
})

app.set('port',process.env.PORT || 3000);

mongoose.connect(mongoUrl || "mongodb://localhost/oauth", { useNewUrlParser: true,  useUnifiedTopology: true,useCreateIndex: true,  });
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

// Use middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


// Allow CORS
app.use(cors());


allowCrossDomain = function(req, res, next) {

  res.header('Access-Control-Allow-Credentials', false);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Allow', 'DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT');
  res.header('Accept','application/json');
  res.header('Access-Control-Allow-Methods', 'DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT');
  //res.header('Access-Control-Allow-preflightContinue','false');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Access-Control-Allow-Origin, filters,eventid');

  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);


app.use(require('./routes/user.routes'))
app.use(require('./routes/test.routes'))
/**
 * Start Express server.
 */

app.listen(app.get('port'), function(){
	console.log('Server running on port ' + app.get('port'));
});

