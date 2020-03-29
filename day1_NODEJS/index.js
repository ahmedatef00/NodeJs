const fs = require('fs');
const argArray = process.argv;
const path = 'todo.json';
(function run() {
  if (argArray[2] === "create") {
    console.log("create")
    Readfile(add)
  }
  else if (argArray[2] === "edit") {
    Readfile(edit)
  }
  else if (argArray[2] === "remove") {
    Readfile(remove)
  }
  else if (argArray[2] === "check") {
    Readfile(check)
  }
  else if (argArray[2] === "uncheck") {
    Readfile(uncheck)
  }
  else if (argArray[2] === "list") {
    Readfile(list)
  }
  else if (argArray[2] === "list-checked") {
    Readfile(list_checked)
  }
  else if (argArray[2] === "list-unchecked") {
    Readfile(list_unchecked)
  }
  else
    console.log("plz Stick to the indeargArray 2");

})();
function add(content) {
  console.log(content);
  let obj = JSON.parse(content);
  let new_to = {
    "id": obj.length,//So it will be incremntal ;
    "title": argArray[3],
    "checked": false,
  };
  obj.push(new_to);
  console.log("OBJ:", obj);
  WriteFile(obj);
}
function edit(content) {
  console.log(content);
  let obj = JSON.parse(content);
  console.log("obj:", obj);
  edited_list = obj.map((item) => {

    if (item.id == argArray[3]) {//why === is not working ?????
      item.title = argArray[4];
      item.checked = argArray[5];
      return item;
    }
    else {
      console.log("Some Thing is not correct");
      return item;
    }
  });
  console.log("OBJ:", obj);
  WriteFile(obj);
}
function list(contents) {
  let obj = JSON.parse(contents);
  obj.forEach((i) => {
    console.log(i);
  })
}
function list_checked(contents) {
  let obj = JSON.parse(contents);
  const edited_list = obj.filter((i) => {
    if (i.checked == true) { return i }
  })
  console.log(edited_list)
}
function list_unchecked(contents) {
  let obj = JSON.parse(contents);
  const edited_list = obj.filter((i) => {
    if (i.checked == false) { return i }
  })
  console.log(edited_list)
}
function uncheck(contents) {
  let obj = JSON.parse(contents);
  const edited_list = obj.map((i) => {
    if (i.id == argArray[3]) {
      i.checked = false
      return i
    }
    else { return i }
  })
  console.log(edited_list)
  WriteFile(edited_list)
}
function check(contents) {
  let obj = JSON.parse(contents);
  const edited_list = obj.map((i) => {
    if (i.id == argArray[3]) {
      i.checked = true
      return i
    }
    else { return i }
  })
  console.log(edited_list)
  WriteFile(edited_list)
}
function remove(content) {
  let obj = JSON.parse(content);
  for (let i = 0; i < obj.length; i++) {
    if (obj[i].id == argArray[3]) {
      console.log(argArray[3]);
      let retained = obj.splice(0, argArray[3]);
      console.log("retaind Array : ", retained);
      console.log("Remove");
      WriteFile(retained);
    }
  }
}
function Readfile(sendContent) {
  const stats = fs.statSync("todo.json");
  const fileSizeInBytes = stats.size;
  if(fs.existsSync('todo.json') && fileSizeInBytes === 0) 
  {
    sendContent("[]");

  }
  else if (fs.existsSync('todo.json'))
  {
    let content = fs.readFileSync('todo.json', 'utf-8');
    sendContent(content);
  }
  else {
    console.log("not exist");
    f = fs.openSync(path, 'w');//open and creat file
    console.log("done");
    sendContent(content);
  }
}
function WriteFile(obj) {
  let jsonObject = JSON.stringify(obj);
  fs.writeFile('todo.json', [jsonObject], (err, result) => {
    if (err) {
      console.log("ERROR", err);
    }
  });
}