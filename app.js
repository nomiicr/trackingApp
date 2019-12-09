var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const model = require('./models')
const v1 = require('./api/routes/v1')
const cors = require('cors')
const io = require('./io')

var app = express();

// view engine setup
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

model.sequelize.authenticate().then(() => {
  console.log('connected to SQL Database');

}).catch(err => {
  console.error('unable to connect database', err);

})


app.get('/verify',(req,res)=>{
  
  res.sendFile(__dirname+'/pages/userVerify.html')
})
app.get('/error',(req,res)=>{
  
  res.sendFile(__dirname+'/pages/errorOccured.html')
})
app.get('/alreadyVerified',(req,res)=>{
  
  res.sendFile(__dirname+'/pages/alreadyVerified.html')
})

app.use('/v1', v1)


app.use(express.static(__dirname + '/dist/endless-starterkit'))
// app.get('*',(req,res)=> res.sendFile(path.join(__dirname + "/dist/endless-starterkit")))
app.get('*', (req, res) => res.sendFile('index.html', { root: __dirname + '/dist/endless-starterkit' }))

//  model.sync();




app.get("/test", (req, res) => {
  io.emit('track_user', {
    lat: 24.8939444,
    lng: 67.0657444
  })
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
