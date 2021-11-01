const express = require('express');
const dotenv = require('dotenv');
const app = express();


// loading env path
const ENV_PATH = ( (process.env.NODE_ENV == 'production') ? './environment/prod.env' : './environment/dev.env' );
dotenv.config({ path:ENV_PATH });

//checking config variables
if(!process.env.PORT){
    console.info(`Please add all required ENV variables.`);
    process.exit(1);
}

//app declarations
const indexRouter = require("./routes/index");

// routes
app.use("/", indexRouter);



// App init
const PORT = process.env.PORT || 3000;
app.listen(PORT,console.info(`Server is running in ( ${process.env.NODE_ENV} ) on PORT ${PORT}`));