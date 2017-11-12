/**
 * Created by frinto on 4/5/2017.
 */

var counterOfIndex = 0;
var compareSectionArray = [];
var compareFirstChar = [];
var userInputToSearchForLocation = "";
var outputGlobal = "";

var globalWellLocation = "";
var globalDepthOfWell = "";
var globalOilProduction = "";
var globalGasProduction = "";

var xmldocOilProduction;
var xmldocGasProduction;
var xmlWellDepth;


function clearTextBoxes()
{
    document.getElementById("wellDataSearchTextBox").value = "";
    document.getElementById("wellDepthSearchTextBox").value = "";
    document.getElementById("oilProductionSearchTextBox").value = "";
    document.getElementById("gasProductionSearchTextBox").value = "";
}

function loadGasProductionData()
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            // r = xhr.JSONparse(responseText);
            xmldocGasProduction = xhr.responseXML;
            searchGasProductionData();
        }
    };
    xhr.open("GET", "productiondata.xml", true);
    xhr.send();
}

function searchGasProductionData()
{
    document.getElementById("wellDepthData").innerHTML = "";
    var i;
//start table
    var gasProductionToCompareAgainst = "";
    var location = "";
    var myOutputList = "";

    var userInputGasProduction = document.getElementById("gasProductionSearchTextBox").value;
//process data by record
    var x = xmldocGasProduction.getElementsByTagName("productiondata");
    for (i = 0; i < x.length; i++)
    {
        location = x[i].getElementsByTagName("location")[0].childNodes[0].nodeValue;
        location = location.replace(/(\r\n|\n|\r)/gm, ""); //to remove new lines from string
        location = location.trim(); //remove leading and trailing white spaces

        gasProductionToCompareAgainst = x[i].getElementsByTagName("gasproduction")[0].childNodes[0].nodeValue;
        gasProductionToCompareAgainst = gasProductionToCompareAgainst.replace(/(\r\n|\n|\r)/gm, ""); //to remove new lines from string
        gasProductionToCompareAgainst = gasProductionToCompareAgainst.trim(); //remove leading and trailing white spaces

        var oneDigit = gasProductionToCompareAgainst.match(/^\d{1}/);


        if (userInputGasProduction === oneDigit[0])
        {
            myOutputList += location;
            myOutputList += "<a href='#' onclick='retrieveIndexFromLink.call(this);' indexOfLink=" + i + ">" + "link" + "<a/>";
            myOutputList += "<br>";
        } else
        {
            document.getElementById("wellproductiondata").innerHTML = "ERROR! no well found!";
        }


        var twoDigit = gasProductionToCompareAgainst.match(/^\d{2}/);

        if (userInputGasProduction === twoDigit[0])
        {
            myOutputList += location;
            myOutputList += "<a href='#' onclick='retrieveIndexFromLink.call(this);' indexOfLink=" + i + ">" + "link" + "<a/>";
            myOutputList += "<br>";
        } else
        {
            document.getElementById("wellproductiondata").innerHTML = "ERROR! no well found!";
        }

        var decimal = gasProductionToCompareAgainst.match(/^\d{2}\.?/);

        if (userInputGasProduction === decimal[0])
        {
            myOutputList += location;
            myOutputList += "<a href='#' onclick='retrieveIndexFromLink.call(this);' indexOfLink=" + i + ">" + "link" + "<a/>";
            myOutputList += "<br>";
        } else
        {
            document.getElementById("wellproductiondata").innerHTML = "ERROR! no well found!";
        }

        var oneDecimalPlace = gasProductionToCompareAgainst.match(/^\d{2}(\.?\d?)/);

        if (userInputGasProduction === oneDecimalPlace[0])
        {
            myOutputList += location;
            myOutputList += "<a href='#' onclick='retrieveIndexFromLink.call(this);' indexOfLink=" + i + ">" + "link" + "<a/>";
            myOutputList += "<br>";
        } else
        {
            document.getElementById("wellproductiondata").innerHTML = "ERROR! no well found!";
        }


        if (userInputGasProduction === gasProductionToCompareAgainst)
        {
            myOutputList += location;
            myOutputList += "<a href='#' onclick='retrieveIndexFromLink.call(this);' indexOfLink=" + i + ">" + "link" + "<a/>";
            myOutputList += "<br>";
        } else
        {
            document.getElementById("wellproductiondata").innerHTML = "ERROR! no well found!";
        }

    }
    document.getElementById("wellproductiondata").innerHTML = myOutputList;

    if (myOutputList === "")
    {
        document.getElementById("wellproductiondata").innerHTML = "ERROR! no well found!";
    }
}

function loadOilProductionData()
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            // r = xhr.JSONparse(responseText);
            xmldocOilProduction = xhr.responseXML;
            searchOilProductionData();
        }
    };
    xhr.open("GET", "productiondata.xml", true);
    xhr.send();
}

function searchOilProductionData()
{
    document.getElementById("wellDepthData").innerHTML = "";
    var i;
//start table
    var oilProductionToCompareAgainst = "";
    var location = "";
    var myOutputList = "";

    var userInputOilProduction = document.getElementById("oilProductionSearchTextBox").value;
//process data by record
    var x = xmldocOilProduction.getElementsByTagName("productiondata");
    for (i = 0; i < x.length; i++)
    {
        location = x[i].getElementsByTagName("location")[0].childNodes[0].nodeValue;
        location = location.replace(/(\r\n|\n|\r)/gm, ""); //to remove new lines from string
        location = location.trim(); //remove leading and trailing white spaces

        oilProductionToCompareAgainst = x[i].getElementsByTagName("oilproduction")[0].childNodes[0].nodeValue;
        oilProductionToCompareAgainst = oilProductionToCompareAgainst.replace(/(\r\n|\n|\r)/gm, ""); //to remove new lines from string
        oilProductionToCompareAgainst = oilProductionToCompareAgainst.trim(); //remove leading and trailing white spaces

        var oneDigit = oilProductionToCompareAgainst.match(/^\d{1}/);


        if (userInputOilProduction === oneDigit[0])
        {
            myOutputList += location;
            myOutputList += "<a href='#' onclick='retrieveIndexFromLink.call(this);' indexOfLink=" + i + ">" + "link" + "<a/>";
            myOutputList += "<br>";
        } else
        {
            document.getElementById("wellproductiondata").innerHTML = "ERROR! no well found!";
        }


        var twoDigit = oilProductionToCompareAgainst.match(/^\d{2}/);

        if (userInputOilProduction === twoDigit[0])
        {
            myOutputList += location;
            myOutputList += "<a href='#' onclick='retrieveIndexFromLink.call(this);' indexOfLink=" + i + ">" + "link" + "<a/>";
            myOutputList += "<br>";
        } else
        {
            document.getElementById("wellproductiondata").innerHTML = "ERROR! no well found!";
        }

        var decimal = oilProductionToCompareAgainst.match(/^\d{2}\.?/);

        if (userInputOilProduction === decimal[0])
        {
            myOutputList += location;
            myOutputList += "<a href='#' onclick='retrieveIndexFromLink.call(this);' indexOfLink=" + i + ">" + "link" + "<a/>";
            myOutputList += "<br>";
        } else
        {
            document.getElementById("wellproductiondata").innerHTML = "ERROR! no well found!";
        }

        var oneDecimalPlace = oilProductionToCompareAgainst.match(/^\d{2}(\.?\d?)/);

        if (userInputOilProduction === oneDecimalPlace[0])
        {
            myOutputList += location;
            myOutputList += "<a href='#' onclick='retrieveIndexFromLink.call(this);' indexOfLink=" + i + ">" + "link" + "<a/>";
            myOutputList += "<br>";
        } else
        {
            document.getElementById("wellproductiondata").innerHTML = "ERROR! no well found!";
        }


        if (userInputOilProduction === oilProductionToCompareAgainst)
        {
            myOutputList += location;
            myOutputList += "<a href='#' onclick='retrieveIndexFromLink.call(this);' indexOfLink=" + i + ">" + "link" + "<a/>";
            myOutputList += "<br>";
        } else
        {
            document.getElementById("wellproductiondata").innerHTML = "ERROR! no well found!";
        }

    }
    document.getElementById("wellproductiondata").innerHTML = myOutputList;

    if (myOutputList === "")
    {
        document.getElementById("wellproductiondata").innerHTML = "ERROR! no well found!";
    }
}

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

function loadWellDataForDepthOfWell()
{

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            // r = xhr.JSONparse(responseText);
            searchWellDataForDepthOfWell(xhr);
        }
    };
    xhr.open("GET", "welldata.xml", true);
    xhr.send();
}

function searchWellDataForDepthOfWell(xhr)
{
    document.getElementById("wellDepthData").innerHTML = "";
    var i;
//get data as xml file
    var xmldoc = xhr.responseXML;
//start table
    var wellDepthToCompareAgainst = "";
    var location = "";
    var myOutputList = "";

    var userInputFromWellDepth = document.getElementById("wellDepthSearchTextBox").value;
//process data by record
    var x = xmldoc.getElementsByTagName("welldata");
    for (i = 0; i < x.length; i++)
    {
        location = x[i].getElementsByTagName("location")[0].childNodes[0].nodeValue;
        location = location.replace(/(\r\n|\n|\r)/gm, ""); //to remove new lines from string
        location = location.trim(); //remove leading and trailing white spaces

        wellDepthToCompareAgainst = x[i].getElementsByTagName("welldepth")[0].childNodes[0].nodeValue;
        wellDepthToCompareAgainst = wellDepthToCompareAgainst.replace(/(\r\n|\n|\r)/gm, ""); //to remove new lines from string
        wellDepthToCompareAgainst = wellDepthToCompareAgainst.trim(); //remove leading and trailing white spaces

        var oneDigit = wellDepthToCompareAgainst.match(/^\d{1}/);


        if (userInputFromWellDepth === oneDigit[0])
        {
            myOutputList += location;
            myOutputList += "<a href='#' onclick='retrieveIndexFromLink.call(this);' indexOfLink=" + i + ">" + "link" + "<a/>";
            myOutputList += "<br>";
        } else
        {
            document.getElementById("wellproductiondata").innerHTML = "ERROR! no well found!";
        }

        var twoDigit = wellDepthToCompareAgainst.match(/^\d{2}/);

        if (userInputFromWellDepth === twoDigit[0])
        {
            myOutputList += location;
            myOutputList += "<a href='#' onclick='retrieveIndexFromLink.call(this);' indexOfLink=" + i + ">" + "link" + "<a/>";
            myOutputList += "<br>";
        } else
        {
            document.getElementById("wellproductiondata").innerHTML = "ERROR! no well found!";
        }

        var threeDigit = wellDepthToCompareAgainst.match(/^\d{3}/);

        if (userInputFromWellDepth === threeDigit[0])
        {
            myOutputList += location;
            myOutputList += "<a href='#' onclick='retrieveIndexFromLink.call(this);' indexOfLink=" + i + ">" + "link" + "<a/>";
            myOutputList += "<br>";
        } else
        {
            document.getElementById("wellproductiondata").innerHTML = "ERROR! no well found!";
        }

        var fourDigit = wellDepthToCompareAgainst.match(/^\d{4}/);

        if (userInputFromWellDepth === fourDigit[0])
        {
            myOutputList += location;
            myOutputList += "<a href='#' onclick='retrieveIndexFromLink.call(this);' indexOfLink=" + i + ">" + "link" + "<a/>";
            myOutputList += "<br>";
        } else
        {
            document.getElementById("wellproductiondata").innerHTML = "ERROR! no well found!";
        }

        var fourDigitDot = wellDepthToCompareAgainst.match(/^\d{4}\.?/);

        if (userInputFromWellDepth === fourDigitDot[0])
        {
            myOutputList += location;
            myOutputList += "<a href='#' onclick='retrieveIndexFromLink.call(this);' indexOfLink=" + i + ">" + "link" + "<a/>";
            myOutputList += "<br>";
        } else
        {
            document.getElementById("wellproductiondata").innerHTML = "ERROR! no well found!";
        }

        var oneDecimalPlace = wellDepthToCompareAgainst.match(/^\d{4}\.?\d?/);

        if (userInputFromWellDepth === oneDecimalPlace[0])
        {
            myOutputList += location;
            myOutputList += "<a href='#' onclick='retrieveIndexFromLink.call(this);' indexOfLink=" + i + ">" + "link" + "<a/>";
            myOutputList += "<br>";
        } else
        {
            document.getElementById("wellproductiondata").innerHTML = "ERROR! no well found!";
        }

        if (userInputFromWellDepth === wellDepthToCompareAgainst)
        {
            myOutputList += location;
            myOutputList += "<a href='#' onclick='retrieveIndexFromLink.call(this);' indexOfLink=" + i + ">" + "link" + "<a/>";
            myOutputList += "<br>";
        } else
        {
            document.getElementById("wellproductiondata").innerHTML = "ERROR! no well found!";
        }

    }
    document.getElementById("wellproductiondata").innerHTML = myOutputList;

    if (myOutputList === "")
    {
        document.getElementById("wellproductiondata").innerHTML = "ERROR! no well found!";
    }

}

function searchWellData(xhr)
{

    document.getElementById("wellDepthData").innerHTML = "";
    var i;
    var j;
    var k;
    //get data as xml file
    var xmldoc = xhr.responseXML;

    var locationToCompareAgainst = "";

    userInputToSearchForLocation = document.getElementById("wellDataSearchTextBox").value;
    userInputToSearchForLocation = userInputToSearchForLocation.toUpperCase();

    //process data by record
    var x = xmldoc.getElementsByTagName("welldata");
    for (i = 0; i < x.length; i++)
    {
        locationToCompareAgainst = x[i].getElementsByTagName("location")[0].childNodes[0].nodeValue;

        locationToCompareAgainst = locationToCompareAgainst.replace(/(\r\n|\n|\r)/gm, ""); //to remove new lines from string
        locationToCompareAgainst = locationToCompareAgainst.trim(); //remove leading and trailing white spaces

        var sectionToCompare = locationToCompareAgainst.match(/^[A-D]\d\d?/).toString(); // get the first section code example "B15"

        var firstChar = locationToCompareAgainst.match(/^[a-dA-D]/).toString();

        compareSectionArray.push(sectionToCompare); // add the first section code to the array

        compareFirstChar.push(firstChar);


        if (userInputToSearchForLocation === locationToCompareAgainst)
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
    var outputForWellDataLocation = "";

    var w = xmldoc.getElementsByTagName("welldata");
    for (j = 0; j < compareSectionArray.length; j++)
    {
        if (compareFirstChar[j] === userInputToSearchForLocation)
        {
            locationToCompareAgainst = w[j].getElementsByTagName("location")[0].childNodes[0].nodeValue;
            outputForWellDataLocation += locationToCompareAgainst;
            outputForWellDataLocation += "<a href='#' onclick='retrieveIndexFromLink.call(this);' indexOfLink=" + j + ">" + "link" + "<a/>";
            outputForWellDataLocation += "<br>";
        }
        else
        {
            document.getElementById("wellproductiondata").innerHTML = "ERROR! no well found!";
        }

        if (compareSectionArray[j] === userInputToSearchForLocation)
        {
            locationToCompareAgainst = w[j].getElementsByTagName("location")[0].childNodes[0].nodeValue;
            outputForWellDataLocation += locationToCompareAgainst;
            outputForWellDataLocation += "<a href='#' onclick='retrieveIndexFromLink.call(this);' indexOfLink=" + j + ">" + "link" + "<a/>";
            outputForWellDataLocation += "<br>";
        }
        else
        {
            document.getElementById("wellproductiondata").innerHTML = "ERROR! no well found!";
        }

    }
    compareSectionArray = [];
    document.getElementById("wellproductiondata").innerHTML = outputForWellDataLocation;

    if (outputForWellDataLocation === "")
    {
        document.getElementById("wellproductiondata").innerHTML = "ERROR! no well found!";
    }

}

var retrieveIndexFromLink = function ()
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
    loadWellDepth();

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

    globalWellLocation = x[counterOfIndex].getElementsByTagName("location")[0].childNodes[0].nodeValue.trim();
    document.getElementById("wellDataSearchTextBox").value = globalWellLocation;

    globalOilProduction = x[counterOfIndex].getElementsByTagName("oilproduction")[0].childNodes[0].nodeValue.trim();
    document.getElementById("oilProductionSearchTextBox").value = globalOilProduction;

    globalGasProduction = x[counterOfIndex].getElementsByTagName("gasproduction")[0].childNodes[0].nodeValue.trim();
    document.getElementById("gasProductionSearchTextBox").value = globalGasProduction;

    document.getElementById("wellproductiondata").innerHTML = outputGlobal;

    outputGlobal = "";

    //readDataFromWell();
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

    globalDepthOfWell = x[counterOfIndex].getElementsByTagName("welldepth")[0].childNodes[0].nodeValue.trim();
    document.getElementById("wellDepthSearchTextBox").value = globalDepthOfWell;

    document.getElementById("wellproductiondata").innerHTML = outputGlobal;
    outputGlobal = "";
}

function loadWellDepth()
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            // r = xhr.JSONparse(responseText);
            xmlWellDepth = xhr.responseXML;
            displayWellDepth(xhr);
        }
    };
    xhr.open("GET", "welldata.xml", true);
    xhr.send();
}

function displayWellDepth()
{
    var size = counterOfIndex;
    var x = xmlWellDepth.getElementsByTagName("welldata");

    var outputWellDepth = "";

    if(size < x.length)
    {

        outputWellDepth = "welldepth:" + x[size].getElementsByTagName("welldepth")[0].childNodes[0].nodeValue + " meters" + "<br>";

        globalDepthOfWell = x[size].getElementsByTagName("welldepth")[0].childNodes[0].nodeValue.trim();
        document.getElementById("wellDepthSearchTextBox").value = globalDepthOfWell;
        document.getElementById("wellDepthData").innerHTML = outputWellDepth;

        globalDepthOfWell = "";
        outputWellDepth = "";

    }
    globalDepthOfWell = "";
    outputWellDepth = "";


}



