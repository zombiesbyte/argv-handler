# argv-handler

Simple script that helps to handle arguments passed to a node script in CLi environment.

## Examples
*Based on this file but could be any script*

**example 1**

`:/>node index -v`

Output:

>argv-handler Version: 1.0

**example 2**

`:/>node index -example1 something`

Output:

>You passed the param: something

**example 3**

`:/>node index -example2 chicken egg`

Output:

>You passed the params: 1:chicken 2:egg

*chicken,egg = foo,bar :)*

# Setting Your Param Schema

You set each "flag" (without dash) and tell it the total parameters requested. There isn't any limit to the 
amound of flags you can set, simply add your new required flags to the JSON model ("args") and tell it how 
many parameters to watch out for. Please note, the dash/hyphen starts a flag but should not be the start of
parameters as this would imply a new flag. If you need to change flags to a different character then you can 
easily change them in the script (probably better to handle the parameters differently though as the dash is
a universal way of announcing a flag).

```
const args = {
    "v": 0,
    "h": 0,
    "example1": 1,
    "example2": 2,
}
```

*Currently, this does not support unknown amounts of parameters. However, with some small changes you
should be able to get this working. I'd probably start at removing/changing the check on 
`argPackage[flag].length` since you'd not want to do that. Also the looping would need to be handled
slightly differently due to the number of params being unknown. You could then pass in an array of params
to your function call for it to handle rather than trying to break it down to seperate params.*

# Errors

Errors halt the app execution `process.exit()` should any be caught. They may contain a full recursive history
of errors or a single error depending on the type of error caught. This should be enough to indicate what the
problem is and display relevant feedback based specifically on the errors found. Feel free to catch your own errors
and reports specific error messages.

All errors are recorded an the `argErrors` array.

# Output

Once the structure of the aruguments have made it through the error checking, you will have an Object which contains 
all of the arguments passed together with the parameters passed.

## Examples
*Based on this file but could be any script*

**example 1**

`:/>node index -v`

Output:

>argv-handler Version: 1.0

`argPackage.v` is a created object with an empty array

**example 2**

`:/>node index -example1 something`

Output:

>You passed the param: something

`argPackage.example1` is a created object with an array of 1 `['something']`

**example 3**

`:/>node index -example2 chicken egg`

Output:

>You passed the params: 1:chicken 2:egg

`argPackage.example2` is a created object with an array of 2 `['chicken', 'egg']`

## Hope this helps your projects

**Like it? Buy me a smile :)**

Acknowledge the GitHub project by clicking the Star or typing a "Thanks" in the issue labelled "Thanks"




