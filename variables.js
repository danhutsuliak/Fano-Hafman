//DOM variables
//common
var stats = document.getElementById("stats");
var alphabetContainer = document.getElementById("alphabetContainer");
//fano
var fanoInput = document.getElementById("fanoText");
var fanoEncode = document.getElementById("fanoEncode");
var fanoDecode = document.getElementById("fanoDecode");
var fanoFile = document.getElementById("fanoFile");
var fanoFileBtn = document.getElementById("fano-file-btn");
//hafman
var hafmanInput = document.getElementById("hafmanText");
var hafmanEncode = document.getElementById("hafmanEncode");
var hafmanDecode = document.getElementById("hafmanDecode");
var hafmanFile = document.getElementById("hafmanFile");
var hafmanFileBtn = document.getElementById("hafman-file-btn");

//Global variables
var fanoOrigin = "";
var hafmanOrigin = "";
var letterCode = ""; //string code for letter
var codedObject = {}; //object of pair "letter:code"
var hafmanLetterCode = {};
