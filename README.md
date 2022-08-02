# CUMPRESS

Minimalist web framework for [node](https://nodejs.org/).

Example code:

```js
const cumpress = require('cumpress');

//add routers
require('./routes/IndexRouter');

//set and get settings.
//Cumpress uses morgan.
cumpress.set("logger",true);
//Serve files.
cumpress.set("static_dir","public");

//Router example.
cumpress.use('/','GET',async(req,res) => {
    //Cumpress use emejs template engine.
    res.status(200).render('views/index.eme',[{name:'title',value:'Cumpress.'}]);
});

cumpress.use('/','POST',(req,res) => {
    //req.body = post data
    res.status(200).json(req.body);
});

//Listen app.
cumpress.listen(3000);

```

## Installation

```console
$ npm install cumpress
```

or

```console
$ yarn add cumpress
```

## Developer

arasemr12

My discord: arasemr12#9891

[My Website.](https://arasemr12.tk/)

[My Github.](https://github.com/arasemr12)