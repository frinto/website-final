var counterOfIndex = 0;
var compareSectionArray = [];
var userInputToSearchFor = "";
var outputGlobal = "";

function loadWellData()
{

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            // r = xhr.JSONparse(responseText);
            searchWellData(xhr);
        }
    };
    xhr.open("GET", "welldata.xml", true);
    xhr.send();
}

function searchWellData(xhr)
{

    var i;
    var j;
    //get data as xml file
    var xmldoc = xhr.responseXML;

    var locationToCompareAgainst = "";

    userInputToSearchFor = document.getElementById("wellDataSearchTextBox").value;
    userInputToSearchFor = userInputToSearchFor.toUpperCase();

    //process data by record
    var x = xmldoc.getElementsByTagName("welldata");
    for (i = 0; i < x.length; i++)
    {
        locationToCompareAgainst = x[i].getElementsByTagName("location")[0].childNodes[0].nodeValue;

        locationToCompareAgainst = locationToCompareAgainst.replace(/(\r\n|\n|\r)/gm, ""); //to remove new lines from string
        locationToCompareAgainst = locationToCompareAgainst.trim(); //remove leading and trailing white spaces

        var sectionToCompare = locationToCompareAgainst.match(/^[A-D]\d\d?/).toString(); //get the first section code example "B15"

        compareSectionArray.push(sectionToCompare); // add the first section code to the array

        if (userInputToSearchFor === locationToCompareAgainst)
        {
            readDataFromProduction();
            counterOfIndex = i;
        }
        else
        {
            document.getElementById("wellproductiondata").innerHTML = "ERROR! no well found!";
        }
    }

    //start table
    var output = "";

    var w = xmldoc.getElementsByTagName("welldata");
    for (j = 0; j < compareSectionArray.length; j++)
    {
        if (compareSectionArray[j] === userInputToSearchFor)
        {
            locationToCompareAgainst = w[j].getElementsByTagName("location")[0].childNodes[0].nodeValue;
            output += locationToCompareAgainst;
            output += "<a href='#' onclick='retrieveIndexFromLink.call(this);' indexOfLink=" + j + ">" + "link" + "<a/>";
            output += "<br>";
        }
        else
        {
            document.getElementById("wellproductiondata").innerHTML = "ERROR! no well found!";
        }

    }
    compareSectionArray = [];
    document.getElementById("wellproductiondata").innerHTML = output;

    if (output === "")
    {
        document.getElementById("wellproductiondata").innerHTML = "ERROR! no well found!";
    }

}

var retrieveIndexFromLink = function()
{
    var getTheIndexOfThis = this.getAttribute("indexOfLink");

    counterOfIndex = getTheIndexOfThis;
    readDataFromProduction();
}

function readDataFromProduction()
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            // r = xhr.JSONparse(responseText);
            displayData(xhr);
        }
    };
    xhr.open("GET", "productiondata.xml", true);
    xhr.send();
}

function displayData(xhr)
{

    var i;
//get data as xml file
    var xmldoc = xhr.responseXML;

//process data by record
    var x = xmldoc.getElementsByTagName("productiondata");

    outputGlobal += "Location:" + x[counterOfIndex].getElementsByTagName("location")[0].childNodes[0].nodeValue.trim() + "<br>";

    outputGlobal += "date:" + x[counterOfIndex].getElementsByTagName("date")[0].childNodes[0].nodeValue + "<br>";

    outputGlobal += "oilproduction:" + x[counterOfIndex].getElementsByTagName("oilproduction")[0].childNodes[0].nodeValue + " m3/day" + "<br>";

    outputGlobal += "waterproduction:" + x[counterOfIndex].getElementsByTagName("waterproduction")[0].childNodes[0].nodeValue + " m3/day" + "<br>";

    outputGlobal += "gasproduction:" + x[counterOfIndex].getElementsByTagName("gasproduction")[0].childNodes[0].nodeValue + " 10m3/day" + "<br>";

    outputGlobal += "<br>";

    readDataFromWell();
}

function readDataFromWell()
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            // r = xhr.JSONparse(responseText);
            displayDataFinal(xhr);
        }
    };
    xhr.open("GET", "welldata.xml", true);
    xhr.send();
}
function displayDataFinal(xhr)
{

    var i;
//get data as xml file
    var xmldoc = xhr.responseXML;

//process data by record
    var x = xmldoc.getElementsByTagName("welldata");

    outputGlobal += "welldepth:" + x[counterOfIndex].getElementsByTagName("welldepth")[0].childNodes[0].nodeValue + " meters" + "<br>";

    outputGlobal += "perfdepth:" + x[counterOfIndex].getElementsByTagName("perfdepth")[0].childNodes[0].nodeValue + " meters" + "<br>";

    outputGlobal += "perfzone:" + x[counterOfIndex].getElementsByTagName("perfzone")[0].childNodes[0].nodeValue + " meters" + "<br>";

    outputGlobal += "stroke:" + x[counterOfIndex].getElementsByTagName("stroke")[0].childNodes[0].nodeValue + " length" + "<br>";

    outputGlobal += "strokepermin:" + x[counterOfIndex].getElementsByTagName("strokepermin")[0].childNodes[0].nodeValue + " strokes per minute" + "<br>";

    outputGlobal += "<br>";

    document.getElementById("wellproductiondata").innerHTML = outputGlobal;
    outputGlobal = "";
}


