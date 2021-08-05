function makeApiCall() {

    var name = document.getElementById("name").value;

    var url = `http://universities.hipolabs.com/search?name=${name}`;

  
    $.ajax({url:url, dataType:"json"}).then(function(data) {

        console.log(data);
        var count = Object.keys(data).length;

        for(i=0;i<count;i++)
        {
            var uni_name = data[i].name;
            var uni_country = data[i].country;
            var uni_url = data[i].web_pages;
            var html_code = '';
            var id = i.toString();
            html_code += '<div style="width: 20%;">' + '<div class="card">' + '<div class="card-body">';
            html_code += '<h5 class="card-title">' + uni_name + '</h5>' + '<br>';
            html_code += '<p>' + uni_country + '</p>' + '<br>';
            html_code += '<a href="'+ uni_url +'">' + '<button class="btn btn-primary">' + 'University Website' + '</button>' + '</a>' + '<br>';
            html_code += '<br>' + '<button class="btn btn-danger" onclick="displayModal(\''+ uni_name +'\')">' + 'Add Review' + '</button>';
            html_code += '</div>' + '</div>'+ '</div>';
            document.getElementById("cards").innerHTML += html_code;
        }

    })
};


function displayModal(name) {

    var modal = document.getElementById("modal_a");
    document.getElementById("university").value = name;
    modal.style.display = "block";

};

function makeDate() {

    // var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var d = new Date();
    var date = formatDate(d.getDate(),d.getMonth()+1,d.getFullYear()) 
    document.getElementById("date").value = date;
}

function makeID() {
    var id = Math.floor(Math.random() * 100);
    document.getElementById("db_id").value = id;
}

function formatDate(date, month, year)
{
  month = (month.length < 2) ? ('0' + month) : month;
  date = (date.length < 2)? ('0' + date) : date;
  return [year,month,date].join('-');
}