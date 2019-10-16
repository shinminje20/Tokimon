const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express();

const { Pool } = require('pg');
var pool;
pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// pool.connect();

// pool.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {res.render('pages/tokimon')});
app.get('/manage', (req, res) => {
  
  var query = `SELECT name, height, weight, fly, fight, fire, water, electric, frozen, teleport, timetravel, total FROM tokimon`;
console.log(query);
if(query){
pool.query(query, (error, result) => {
  if (error)
    res.end(error);
  var results = {'rows': result.rows };
  console.log(results);

  res.render('pages/manage', results)
});
}


});
app.get('/db', (req,res) => {

  var query = `SELECT name, height, weight, fly, fight, fire, water, electric, frozen, teleport, timetravel, total FROM tokimon`;
  console.log(query);
  if(query){
  pool.query(query, (error, result) => {
    if (error)
      res.end(error);
    var results = {'rows': result.rows };
    console.log(results);
  
    res.render('pages/manage', results)
  });
  }

  
});

app.post('/change', async(req,res) => {
  var name = req.body.manage_name;
  var changeName = req.body.change_name;
  var trigger = req.body.trigger;

  if(trigger != "0"){
    var query = 'SELECT name, height, weight, fly, fight, fire, water, electric, frozen, teleport, timetravel, total FROM tokimon WHERE name = '+"'"+name+"'";
    console.log(query);
      
    pool.query(query, (error, result) => {
      if (error)
        res.end(error);
      console.log(result.rows);
      // console.log(result.rows[0].name);
      var results = {'rows': result.rows};
      console.log(results);
    
      res.render('pages/change', results);
    });
  }
  else{
    var name = req.body.change_name,
        height = req.body.change_height,
        weight = req.body.change_weight,
        fly = req.body.change_fly,
        fight = req.body.change_fight,
        fire = req.body.change_fire,
        water = req.body.change_water,
        electric = req.body.change_electric,
        frozen = req.body.change_frozen,
        teleport = req.body.change_teleport,
        time = req.body.change_time; 
    let n = Number(fly) + Number(fight) + Number(fire) + Number(water) + Number(electric) + Number(frozen) + Number(teleport) + Number(time);
 
    console.log(name);
    console.log(height);
    console.log(weight);
    console.log(fly);
    console.log(fight);
    console.log(fire);
    console.log(water);
    console.log(electric);
    console.log(frozen);
    console.log(teleport);
    console.log(time);
    console.log(n);

    let sql = 'UPDATE tokimon SET name = $1, height = $2, weight = $3, fly = $4, fight = $5, fire=$6, water=$7, electric=$8, frozen=$9, teleport=$10, timetravel=$11, total=$12 WHERE name = $13';
    params = [name, height, weight, fly, fight, fire, water, electric, frozen, teleport, time, n, name];
      console.log('sql =');
      console.log(sql);
      
      
      try {
        const client = await pool.connect();
          client.query(sql, params, function(error) {
              if(error){
                throw error
              }
              
              // client.release();
          });
          
      }
      catch (err) {
          console.error(err);
          res.send("Error " + err);
      }
      res.redirect('/manage');
  }
  // res.redirect('/manage');
});

app.post('/db', async (req, res) => {
  var  option = req.body.selection;
  var modify = req.body.modify;
  var params;
  console.log('what is the option');
  console.log(modify);
  
  console.log(option);
  console.log('option');
  if(!(option == "none" || option == "delete" || option == "change" || option == "info")){
    var name = req.body.tokimon_name,
        height = req.body.tokimon_height,
        weight = req.body.tokimon_weight,
        fly = req.body.tokimon_fly,
        fight = req.body.tokimon_fight,
        fire = req.body.tokimon_fire,
        water = req.body.tokimon_water,
        electric = req.body.tokimon_electric,
        frozen = req.body.tokimon_frozen,
        teleport = req.body.tokimon_teleport,
        time = req.body.tokimon_time; 
    let n = Number(fly) + Number(fight) + Number(fire) + Number(water) + Number(electric) + Number(frozen) + Number(teleport) + Number(time);
   
    console.log(name);
    console.log(height);
    console.log(weight);
    console.log(fly);
    console.log(fight);
    console.log(fire);
    console.log(water);
    console.log(electric);
    console.log(frozen);
    console.log(teleport);
    console.log(time);
    console.log(n);

    
    
    let sql = 'INSERT INTO tokimon (name, height, weight, fly, fight, fire, water, electric, frozen, teleport, timetravel, total) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11, $12)';
    params = [name, height, weight, fly, fight, fire, water, electric, frozen, teleport, time, n];
    
      try {
        const client = await pool.connect();
        
          client.query(sql, params, function(error) {
              if(error){
                console.log("==================================");
                console.log("==================================");
                
                throw error
              }
              
              client.release();
          });

      }
      catch (err) {
          console.error(err);
          res.send("Error " + err);
      }
    } else {
      var name = req.body.manage_name;
      var sql;
      
      console.log(name);
      console.log(option);
      switch(option){
        case "delete":
            console.log("==================================");
            console.log("==================================");
          sql = 'DELETE FROM tokimon WHERE name = ($1)';
          params = [name];
          break;
        case "info":
          sql = 'SELECT * FROM tokimon WHERE name = ($1)';
          params = [name];
          break;

        case "change":
          break;
        
        default:
          
          return;

      }
      try {
        console.log(sql);
        
        const client = await pool.connect();
        client.query(sql, params, function(error) {
            if(error){
              console.log("==================================");
              console.log("==================================");
                
              throw error
            }
           
            client.release();
        });
  
      }
      catch (err) {
          console.error(err);
          res.send("Error " + err);
      }
    }
});

app.post('/info', async(req,res) => {
  var name = req.body.manage_name;
  
    var query = 'SELECT name, height, weight, fly, fight, fire, water, electric, frozen, teleport, timetravel, total FROM tokimon WHERE name = '+"'"+name+"'";
    console.log(query);
      
    pool.query(query, (error, result) => {
      if (error)
        res.end(error);
      console.log(result.rows);
      console.log(result.rows[0].name);
      var results = {'rows': result.rows};
      console.log(results);
    
      res.render('pages/info', results);
    });
  
  
  
});


app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
