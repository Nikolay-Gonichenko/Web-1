
    function getX(){
        var rates = document.getElementsByName('x_value');
        var rate_value = null;
        for(var i=0; i<rates.length;i++){
            if(rates[i].checked){
               rate_value = rates[i].value;
            }
        }  
        return rate_value;
    }
    function addRow(x,y,r,result,time,delta){
        var tbody = document.getElementById("results").getElementsByTagName("tbody")[0];
        var row = document.createElement("tr");

        var tdX = document.createElement("td");
        tdX.appendChild(document.createTextNode(x));

        var tdY = document.createElement("td");
        tdY.appendChild(document.createTextNode(y));

        var tdR = document.createElement("td");
        tdR.appendChild(document.createTextNode(r));

        var tdResult = document.createElement("td");
        tdResult.appendChild(document.createTextNode(result));

        var tdTime = document.createElement("td");
        tdTime.appendChild(document.createTextNode(time));

        var tdDelta = document.createElement("td");
        tdDelta.appendChild(document.createTextNode(delta));
        
        row.appendChild(tdX);
        row.appendChild(tdY);
        row.appendChild(tdR);
        row.appendChild(tdResult);
        row.appendChild(tdTime);
        row.appendChild(tdDelta);
        tbody.appendChild(row);
    }
    function checkY(){
        document.querySelector('#y_value').addEventListener('keyup',function(){
            var reg = /[^(\-?(\d\.))]/;
            var c = parseFloat(this.value);
            if(this.value.search(reg)!=-1 || c<-5 || c>3){
                    this.value = "";
            }
            
        })
    }
    function checkZ(){
        document.querySelector('#r_value').addEventListener('keyup',function(){
            var reg = /[^\d\.]/;
            var c = parseFloat(this.value);
            if(this.value.search(reg)!=-1 || c<2 || c>5 || isNaN(this.value)){
                this.value = "";
            }
            
        })
    }
    function checkData(){
        var x = getX()!=null;
        var y_check = parseFloat(document.getElementById("y_value").value.substring(0, 12).replace(',', '.'));
        var y = !isNaN(y_check) && y_check>=-5 && y_check<=3;
        var r_check = parseFloat(document.getElementById("r_value").value.substring(0, 12).replace(',', '.'))
        var r = !isNaN(r_check) && r_check>=2 && r_check<=5;
        return x && y && r;
    }
    function getData(){
        let data = "x_value=";
        document.getElementsByName("x_value").forEach(x => {
            if (x.checked) {
                data += x.value
            }
        })
        data += "&y_value=" + parseFloat(document.getElementById("y_value").value.substring(0, 12).replace(',', '.'));
        data += "&r_value=" + parseFloat(document.getElementById("r_value").value.substring(0, 12).replace(',', '.'));
        

        return data;  
        
    }
$(document).ready(function() {   
    $('#form_send').on('submit',function(event){
        if(checkData()){
            var str = getData();
            event.preventDefault();
                $.ajax({
                url: 'server.php',
                type: 'GET',
                data: str,
                dataType: 'json',
                success: function(data){
                    var count_rows = document.getElementById("results").rows.length;
                    console.log(count_rows);
                    if(count_rows>1){
                        var data_i = data[count_rows-1];
                        if(data_i!=null){
                            addRow(data_i[0], data_i[1], data_i[2], data_i[3], data_i[4], data_i[5]); 
                        }else{
                            alert("Что-то пошло не так на сервере");
                        }
                    }else{
                        for(let i=0;i<data.length;i++){
                            var data_i = data[i];
                            addRow(data_i[0], data_i[1], data_i[2], data_i[3], data_i[4], data_i[5]);
                        }
                    }
                },
                error: function(){
                    console.log("no lol");
                }
                });  
        }else{
            alert("Введите все значения в нужном диапазоне!");
        }
        
    });
}); 