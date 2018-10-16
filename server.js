/**
 * Created by lenovo t520 on 2/28/2018.
 */
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist'));
app.listen(process.env.PORT || 8080);