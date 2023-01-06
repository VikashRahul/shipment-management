var connToken = "90938156|-31949272994926166|90955137";
var shipDBName = "SHIPMENT-TABLE";
var shipRelationName = "DELIVERY-DB";
var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIML = "/api/iml";
var jpdbIRL = "/api/irl";

$("#shipno").focus();

function saveRecNo2LS(jsonObj)
{
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno",lvData.rec_no);
}

function getShipNoAsJsonObj()
{
    var shipno = $("#shipno").val();
    var jsonStr = {
        shippingNo: shipno
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj)
{
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#desc").val(record.description);
    $("#source").val(record.source);
    $("#dest").val(record.destination);
    $("#shipdate").val(record.shippingDate);
    $("#deldate").val(record.deliveryDate);
    
}

function resetForm(){
    $("#shipno").val("")
    $("#desc").val("");
    $("#source").val("");
    $("#dest").val("")
    $("#shipdate").val("");
    $("#deldate").val("");
    $("#shipno").prop("disabled",false);
    $("#save").prop("disabled",true);
    $("#change").prop("disabled",true);
    $("#reset").prop("disabled",true);
    $("#desc").prop("disabled",true);
    $("#source").prop("disabled",true);
    $("#dest").prop("disabled",true);
    $("#shipdate").prop("disabled",true);
    $("#deldate").prop("disabled",true);
    $("#shipno").focus();
    //console.log("run reset");
    
}

function validateData()
{
    var shipno,desc,source,dest,shipdate,deldate;
    shipno = $("#shipno").val();
    desc= $("#desc").val();
    source = $("#source").val();
    dest = $("#dest").val();
    shipdate = $("#shipdate").val();
    deldate = $("#deldate").val();

    if (shipno === "") {
        alert("Shipment Number Required");
        $("#shipno").focus();
        return "";
    }

    if (desc === "") {
        alert("Description Required Value");
        $("#desc").focus();
        return "";
    }

    if (source === "") {
        alert("Please enter the source location");
        $("#source").focus();
        return "";
    }

    if (dest === "") {
        alert("Please enter the destination");
        $("#dest").focus();
        return "";
    }

    if (shipdate === "") {
        alert("Shipping date  required value");
        $("#shipdate").focus();
        return "";
    }

    if (deldate === "") {
        alert("Expected delivery date Required Value");
        $("#deldate").focus();
        return "";
    }
    
    //console.log("validate run");

    var jsonStrObj={
        shippingNo: shipno,
        description: desc,
        source: source,
        destination: dest,
        shippingDate: shipdate,
        deliveryDate: deldate
    };

    //console.log("validate returned");

    return JSON.stringify(jsonStrObj);
}


function getShipment()
{
    //$("#save").prop("disabled",false);
    //console.log("run");

    var ShipNoJsonObj = getShipNoAsJsonObj();

    var getRequest = createGET_BY_KEYRequest(connToken, shipDBName,shipRelationName, ShipNoJsonObj,false,false);
    jQuery.ajaxSetup({async:false});

    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL);
    jQuery.ajaxSetup({async:true});
   
    //console.log(resJsonObj);

    if(resJsonObj.status === 400)
    {
        
        $("#save").prop("disabled",false);
        $("#reset").prop("disabled", false);

        $("#desc").focus();
        
        $("#desc").prop("disabled",false);
        $("#source").prop("disabled",false);
        $("#dest").prop("disabled",false);
        $("#shipdate").prop("disabled",false);
        $("#deldate").prop("disabled",false);

        
        //console.log("not found");
    }
    else if(resJsonObj.status ===200){
    
       fillData(resJsonObj);
       //console.log("found");

       $("#shipno").prop("disabled",true);

       $("#desc").prop("disabled",false);
        $("#source").prop("disabled",false);
        $("#dest").prop("disabled",false);
        $("#shipdate").prop("disabled",false);
        $("#deldate").prop("disabled",false);
      

       $("#update").prop("disabled",false);
       $("#reset").prop("disabled",false);
    

       $("#desc").focus();
    }

}

function saveData() {
    
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return "";
    }
    
    //console.log("received request");

    $("#save").prop("disabled",false);
    var putRequest = createPUTRequest(connToken, jsonStrObj, shipDBName, shipRelationName);
    //alert(putRequest);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({ async: true });
    //alert(JSON.stringify(resultObj));

    resetForm();
    $("#shipno").focus();

}

function updateData()
{
    $("#update").prop("disabled",true);

    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken,jsonChg, shipDBName, shipRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async:false});
    var resJsonobj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async:true});
    console.log(resJsonobj);
    resetForm();
    $("#shipno").focus();
    
}