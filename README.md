# Currently in BETA

# Syntax

The syntax is very similar to javascript one:

* `.` Access object path
* `[]` map array
  * `?[]` for lax array. This will just return `undefined` if value isn't array
  * `?[me0]` To access the array item you use `me + nestedLevel`. So for double nested list we would use `[me0.names[me1.value]]`
* `{}` Create new object
  * `{ key: value }` Create new object with values
  * `{ [key.value]: value }` Create new object where key is variable value
  * `{ key: value, ...object }` Create object and copy properties from another one.
* `Input` is the intial value that is supplied.
* `Output` Value that will be returned after interpreter is ran

# Set up

Just create a file called `program` and add your instructions in there, then run `bash run.bash`

# Examples

### To extract nested data

Data

```
{
  INPUT: [{
    values: [{ name: "test" }, { name: "test2" }]
  }]
}
```

Instructions

```
OUTPUT = INPUT.0.values[me0.name];
```

Returns:

```
[
  "test", "test2"
]
```
