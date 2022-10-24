function openForm()
{
    window.location.href = "addWine.html";
}

function retrieveData(e)
{
    const form = new FormData(e.target);
    let color = form.get("color");
    let type = form.get("type"); 
    let obj = new Wine([color, type]);
    saveToLocalStorage(obj);  
}

function Wine(data)
{
    this.color = data[0];
    this.type = data[1];
}

function saveToLocalStorage(obj)
{
    let i = 0;
    if(localStorage.getItem("counter") === null)
    {
        localStorage.setItem("counter", i);
    }
    else
    {
        i = window.localStorage.getItem("counter");
        i++;
        localStorage.setItem("counter", i);
    } 
   
    window.localStorage.setItem(i, JSON.stringify(obj));
    window.location.href = "http://127.0.0.1:5500/index.html";
}


function refreshTable()
{
    const tableRef = document.getElementById('tbody');
    for(let i = 0; i < localStorage.length; i++)
    {
        let obj =localStorage.getItem(i);
        if(obj === null)
        {
            continue;
        }
        let newRow = tableRef.insertRow();   
        let newColorCell = newRow.insertCell(0);
        let newTypeCell = newRow.insertCell(1);
        let newButtonCell = newRow.insertCell(2);

        console.log(obj);
        let wine = JSON.parse(obj);

        newColorCell.innerHTML = wine.color;
        newTypeCell.innerHTML = wine.type;

        var button = document.createElement("button");
        button.innerHTML = "Delete";
        newButtonCell.appendChild(button);
        button.onclick = () => 
        {
            deleteRow(i)
        }            
    }

}

function deleteRow(i)
{
    localStorage.removeItem(i);
    const tableRef = document.getElementById('tbody');
    tableRef.innerHTML = "";
    refreshTable();
}


