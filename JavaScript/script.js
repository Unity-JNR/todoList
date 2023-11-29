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