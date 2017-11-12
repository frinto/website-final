/**
 * Created by frinto on 4/10/2017.
 */
var xhr;

var rightAnswers = "";

var answerForQuestion1 = "";
var answerForQuestion2 = "";
var answerForQuestion3 = "";
var answerForQuestion4 = "";
var answerForQuestion5 = "";

var grade = 0;

$(document).ready(function ()
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            processXML(xhr);
        }
    };
    xhr.open("GET", "FinalQuiz.xml", true);
    xhr.send();
});

function processXML(xhr)
{
    var i;
//get data as xml file
    var xmldoc = xhr.responseXML;
//start table
    var output = "";
//process data by record
    var x = xmldoc.getElementsByTagName("question");
    var y = xmldoc.getElementsByTagName("finalquiz");

    for (i = 0; i < x.length; i++)
    {
        output +=
            "Question #"
            +
            x[i].getElementsByTagName("qnumber")[0].childNodes[0].nodeValue + "<br>"
            +
            x[i].getElementsByTagName("qtitle")[0].childNodes[0].nodeValue + "<br>"
            +
            "<input type='radio' onclick='retrieveSelection.call(this)' id='multipleChoiceRadio1' name=" + i + "   value='a' index=" + i + ">"
            +
            "A) " + x[i].getElementsByTagName("a")[0].childNodes[0].nodeValue + "<br>"
            +
            "<input type='radio' onclick='retrieveSelection.call(this)' id='multipleChoiceRadio2' name=" + i + "   value='b' index=" + i + ">"
            +
            "B) " + x[i].getElementsByTagName("b")[0].childNodes[0].nodeValue + "<br>"
            +
            "<input type='radio' onclick='retrieveSelection.call(this)' id='multipleChoiceRadio3' name=" + i + "  value='c' index=" + i + ">"
            +
            "C) " + x[i].getElementsByTagName("c")[0].childNodes[0].nodeValue + "<br>"
            +
            "<input type='radio' onclick='retrieveSelection.call(this)' id='multipleChoiceRadio4' name=" + i + "  value='d' index=" + i + ">"
            +
            "D) " + x[i].getElementsByTagName("d")[0].childNodes[0].nodeValue + "<br>"
            +
            "<br>";

        document.getElementById("displayQuiz").innerHTML = output;
    }

    rightAnswers = y[0].getElementsByTagName("rightanswers")[0].childNodes[0].nodeValue.trim();

    document.getElementById("gradeQuizButton").innerHTML = "<input type='button' id='gradeBtn' value='GradeQuiz' onclick='calculateNumOfAnswersRight();'>";
}

var retrieveSelection = function ()
{
    var getIndex = this.getAttribute("index");
    var getAnswer = this.getAttribute("value");

    if (getIndex == 0)
    {
        answerForQuestion1 = getAnswer;
    } else if (getIndex == 1)
    {
        answerForQuestion2 = getAnswer;
    } else if (getIndex == 2)
    {
        answerForQuestion3 = getAnswer;
    } else if (getIndex == 3)
    {
        answerForQuestion4 = getAnswer;
    } else if (getIndex == 4)
    {
        answerForQuestion5 = getAnswer;
    }

}

function calculateNumOfAnswersRight()
{

    if (answerForQuestion1 == "")
    {
        alert("Please Answer Question #1 Before Pressing This Button!")
    } else if (answerForQuestion2 == "")
    {
        alert("Please Answer Question #2 Before Pressing This Button!")
    } else if (answerForQuestion3 == "")
    {
        alert("Please Answer Question #3 Before Pressing This Button!")
    } else if (answerForQuestion4 == "")
    {
        alert("Please Answer Question #4 Before Pressing This Button!")
    } else if (answerForQuestion5 == "")
    {
        alert("Please Answer Question #5 Before Pressing This Button!")
    } else
    {
        var fields = rightAnswers.split(/,/);

        if(fields[0] == answerForQuestion1)
        {
            grade++;
        }
        if(fields[1] == answerForQuestion2)
        {
            grade++;
        }
        if(fields[2] == answerForQuestion3)
        {
            grade++;
        }
        if(fields[3] == answerForQuestion4)
        {
            grade++;
        }
        if(fields[4] == answerForQuestion5)
        {
            grade++;
        }

        document.getElementById("displayGrade").innerHTML = "Your Grade Is: " + parseInt(grade) + "/5";
        grade = 0;
    }
}
