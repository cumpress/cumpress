# CUMPRESS

```js
const cumpress = require('cumpress');

cumpress.use('/','GET',(req,res) => {
    res.status(200);

    res.json({version:0.1,message:"Cumpress is best backend framework/library!"});
});

cumpress.listen(3000);
```