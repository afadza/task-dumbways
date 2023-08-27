function chktpl () {
    var chknya = document.forms["frm"].elements["checkStack"];
    var isichk = "";

    for(i = 0; i < chknya.length; i++) {
        if (chknya[i].checked==true) {
            isichk += chknya[i].value;
        }
        document.getElementById("outhtml").innerHTML = isichk;
    }
}