let addinput = document.getElementById('addtaskinput')
let addtaskbtn = document.getElementById('addtaskbtn')
showtask()
addtaskbtn.addEventListener('click',function(){
   let addtaskinputval = addinput.value
   
    if(addtaskinputval.trim()!=0){
        let webtask =localStorage.getItem('localstorage')
        if (webtask == null){
            taskObj = []
        } else {
            taskObj = JSON.parse(webtask)
        }
        taskObj.push({'task_name':addtaskinputval, "completeStatus":false})
    localStorage.setItem("localstorage",JSON.stringify(taskObj))
    addinput.value = ''
    }
    showtask()
})

function showtask(){
    let webtask = localStorage.getItem("localstorage");
    if(webtask == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webtask);
    }
    let html = '';
    let addedtasklist = document.getElementById("addedtasklist");
    taskObj.forEach((item, index) => {

        if(item.completeStatus==true){
            taskCompleteValue = `<td class="completed">${item.task_name}</td>`;
        }else{
            taskCompleteValue = `<td>${item.task_name}</td>`;
        }
        html += `<tr>
                    <th scope="row">${index+1}</th>
                    ${taskCompleteValue}
                    <td><button type="button" onclick="edittask(${index})" class="text-primary text-center "><i class="fa fa-edit"></i>Edit</button></td>
                    <td><button type="button" class="text-success text-center" id=${index}><i class="fa fa-check-square-o"></i>Complete</button></td>
                    <td><button type="button" onclick="deleteitem(${index})" class="text-danger text-center"><i class="fa fa-trash"></i>Delete</button></td>
                </tr>`;
    });
    addedtasklist.innerHTML = html;
}

function edittask(index) {
   let saveindex = document.getElementById('saveindex') 
   let addtaskbtn = document.getElementById('addtaskbtn')
   let savebtn = document.getElementById('savetaskbtn')
   saveindex.value = index

   let webtask = localStorage.getItem('localstorage')
   let taskObj= JSON.parse(webtask)

   addinput.value = taskObj[index]['task_name']
   addtaskbtn.style.display ='none'
   savebtn.style.display = 'block';
}

let savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function(){
    let addtaskbtn = document.getElementById("addtaskbtn");
    let webtask = localStorage.getItem("localstorage");
    let taskObj = JSON.parse(webtask); 
    let saveindex = document.getElementById("saveindex").value;
    
    for (keys in taskObj[saveindex]) {
        if(keys == 'task_name'){
            taskObj[saveindex].task_name = addtaskinput.value;
        }
      }
    // taskObj[saveindex] = {'task_name':addtaskinput.value, 'completeStatus':false} ;
  //  taskObj[saveindex][task_name] = addtaskinput.value;
    savetaskbtn.style.display="none";
    addtaskbtn.style.display="block";
    localStorage.setItem("localstorage", JSON.stringify(taskObj));
    addtaskinput.value='';
    showtask();
})

function deleteitem(index){
    let webtask = localStorage.getItem("localstorage");
    let taskObj = JSON.parse(webtask);
    taskObj.splice(index, 1);
    localStorage.setItem("localstorage", JSON.stringify(taskObj));
    showtask();
}

let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", function(){
    let savetaskbtn = document.getElementById("savetaskbtn");
    let addtaskbtn = document.getElementById("addtaskbtn");
    let webtask = localStorage.getItem("localstorage");
    let taskObj = JSON.parse(webtask);
    if(webtask == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webtask);
        taskObj = [];
    }
    savetaskbtn.style.display="none";
    addtaskbtn.style.display="block";
    localStorage.setItem("localstorage", JSON.stringify(taskObj));
    showtask();

})

let addedtasklist = document.getElementById("addedtasklist");
    addedtasklist.addEventListener("click", function(e){
       // console.log(e);
        
        // showtask();
        let webtask = localStorage.getItem("localstorage");
        let taskObj = JSON.parse(webtask);
        
        let mytarget = e.target;
        if(mytarget.classList[0] === 'text-success'){
        let mytargetid = mytarget.getAttribute("id");
        
        
        // let taskValue = taskObj[mytargetid]['task_name'];
        
        mytargetpresibling = mytarget.parentElement.previousElementSibling.previousElementSibling;
            
            // let mynewelem = mytargetpresibling.classList.toggle("completed");
            // taskObj.splice(mytargetid,1,mynewelem);
            for (keys in taskObj[mytargetid]) {
                if(keys == 'completeStatus' && taskObj[mytargetid][keys]==true){
                    taskObj[mytargetid].completeStatus = false;
                   // taskObj[mytargetid] = {'task_name':taskValue, 'completeStatus':false};
                }else if(keys == 'completeStatus' && taskObj[mytargetid][keys]==false){
                    taskObj[mytargetid].completeStatus = true;
                    //taskObj[mytargetid] = {'task_name':taskValue, 'completeStatus':true};
                }
              }
        //}
       // showtask();        
        localStorage.setItem("localstorage", JSON.stringify(taskObj));
        showtask();
    }
    })

   
    let sortBtn = document.getElementById("sort");


    
function sortTasks() {
    let webtask = localStorage.getItem("localstorage");
    let taskObj = JSON.parse(webtask);

    
    taskObj.sort((a, b) => {
        return a.task_name.localeCompare(b.task_name);
    });


    localStorage.setItem("localstorage", JSON.stringify(taskObj));
    showtask();
}


sortBtn.addEventListener("click", sortTasks);

    
