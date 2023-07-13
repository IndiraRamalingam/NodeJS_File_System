const fs=require('fs')
const express=require('express');
const app=express();

//For Timestamp
let date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();
var hrs = date.getHours();
var mins = date.getMinutes();
var secs = date.getSeconds();
var file_name = `${day}-${month}-${year}_${hrs}-${mins}-${secs}`;

console.log("Times  "+ date)
//set the endpoints
app.get('/',(request,response) =>{
   response.send(`<br><h4> To create a file add</h4> /createFile
                  <br><h4>To read a file add</h4> /readFile`)
})

//set the endpoints to create a new File with Timestamp
app.get('/createFile',(request,response) =>{
    fs.writeFile(        
        `./DateTime/${file_name}.txt`,
        `${date}`,err => {
        if(err){
            console.error(err);
            return;
        }
        console.log("File Created Successfully")
    });
    response.send(`${date}`)
})

//set the endpoints to read a new File
app.get('/readFile',(request,response) =>{
    fs.readdir(`./DateTime/`,(err,files)=>{
        if(files.length==0)
        {
            response.send(`No Files in directory`);
        }
        else{
            let fileList= `Files in directory : <br><br>`
            files.forEach((file) =>{
                fileList = fileList + file + `<br>`;
            });
            response.send(fileList);
        }
    })
})

const PORT=3001;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
