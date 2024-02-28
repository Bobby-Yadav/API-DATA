const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const layouts = require('express-ejs-layouts')
const mongoDB = require('./src/config/mongoose')
const apiModelData = require('./src/models/apidata')
const homeController = require('./src/controllers/homeController');
 

app.use(express.urlencoded({ extended: true }))



app.use(express.json());
app.use(layouts);
app.use(bodyParser.json());


app.get('/',homeController.apiReqData)
app.get('/bar',homeController.barData)
app.get('/transaction',homeController.searchTransactions)





app.set("view engine", 'ejs');

app.set("views",path.join(path.resolve(),'src','views'));

    

 

mongoDB.then(() => {

  app.listen(8001, () => {
      console.log("Server is running!")
  })

})

 