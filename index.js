//Dal1980 - Uses CLi arguments and builds a model based on a predefined schema
//Version 1.0

let version = "1.0";
process.argv.shift(); //removes the node base path
process.argv.shift(); //removes this filename

//all arguments should be started with a - (dash) i.e. -h or -example
//passing further parameters to an argument should not unclude the opening dash
//example   -example param1 param2 -something else -here
//          The above example has an opening arugment -example which is passed 
//          "param1" "param2". -something is another argument flag and recieves 
//          "else". -here is a closed argument which has not been passed anything
//What you expect for each argument should be defined below in the args Obj. 
//Please note: this currently does not support variations in number of parameters.
//This could probably be easily accounted for removing the (argPackage[flag].length)
//check and also increasing the loop to accommodate an unknown number of parameters
//For now I need only this script for a fixed parameter number.

//format "flag" (without dash), total parameters requested
const args = {
    "v": 0,
    "h": 0,
    "example": 1,
}

const cliHelp = [];
//Update your help HUD for users to understand available options
cliHelp.push("");
cliHelp.push("[no args]             = explain your normal operation           ");
cliHelp.push("");
cliHelp.push("---Arg Options--------------------------------------------------");
cliHelp.push("-h                    = shows this help                         ");
cliHelp.push("-v                    = show version                            ");
cliHelp.push("-example {something}  = example expects 1 parameter             ");
cliHelp.push("----------------------------------------------------------------");
cliHelp.push("");

let argPackage = [];
let argErrors = [];
let a = 0;
let lastFlag = "";
while(a < process.argv.length){
    if(process.argv[a].indexOf('-') == 0){
        let flag = process.argv[a].substr(1);
        lastFlag = flag;
        try {
            if(typeof args[flag] !== "undefined"){
                argPackage[flag] = [];
                if(args[flag] === 0) argPackage[flag].push("");
                else{
                    for(var n = 0; n <= args[flag]; n++){
                        if(process.argv[a + n].indexOf('-') !== 0){
                            argPackage[flag].push(process.argv[a + n]);
                        }  
                    }
                    if((argPackage[flag].length) < args[flag]){
                        argErrors.push("Arg Error: '" + flag + "' expects " + args[flag] + " argument(s)");
                    }
                    a += n - 1;
                }
            }
            else throw flag;
        } catch (e) { argErrors.push("Arg Error: '" + e + "' is not a valid flag"); }
    }
    else argErrors.push("Unknown " + process.argv[a] + " argument for " + lastFlag + " (" + args[lastFlag] + " argument expected)");
    a++;
}

//lets check for errors, report and terminate
if(argErrors.length > 0){
    console.log("Error (see below): Program aborted");
    for(let e = 0; e < argErrors.length; e++) console.log(argErrors[e]);
    process.exit();
}
else if(a == 0) callYourMainFunction(); //default behavour
else{
    console.log(argPackage) //you would normally want to remove this line but it will help to understand how the arguments are organised
    //begin our functions from our flagged arguments
    if(argPackage.v) console.log("DB-Update Version: " + version); //shows ver string (string)
    if(argPackage.h) cliHelp.forEach((helpline) => { console.log(helpline); }); //loops through displaying our help array (string)
    //if(argPackage.example) callYourExampleFunction();
}

//hope this helps your projects
//Like it? Buy me a smile :), acknowledge the GitHub project by clicking the Star or typing a "Thanks" in the issue labelled "Thanks"
