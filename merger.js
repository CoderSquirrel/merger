/*
dev sane
@ jmj
*/
function merge() {
    try {
        var config1 = JSON.parse($("#config1").val());
    }
    catch (err) {
        console.log(err);
        alert("Error while parsing consifg1, see console")
        return;
    }
    try {
        var config2 = JSON.parse($("#config2").val());
    }
    catch (err) {
        console.log(err);
        alert("Error while parsing config2, see console")
        return;
    }
    compareStrict(config1, config2);
}

function compareStrict(config1, config2) {
    var extensions1 = config1.extensions.toString().split(',');
    var extensions2 = config2.extensions.toString().split(',');
    var extensionsTotal = [];
    extensions1.forEach(function (line) {
        extensionsTotal.push(line);
    })
    extensions2.forEach(function (line) {
        if (!_.contains(extensionsTotal, line)) extensionsTotal.push(line);
    })
    var components1 = config1.components.toString().split(',');
    var components2 = config2.components.toString().split(',');
    var componentsTotal = [];
    components1.forEach(function (line) {
        componentsTotal.push(line);
    })
    components2.forEach(function (line) {
        if (!_.contains(componentsTotal, line)) componentsTotal.push(line);
    })
    var mergedLine = '"extensions": [\n';
    extensionsTotal.forEach(function (each) {
        mergedLine += '"' + each + '"';
        mergedLine += ',\n';
    });
    mergedLine = mergedLine.substring(0, mergedLine.length - 2);
    mergedLine += ' ],\n"components": [\n';
    componentsTotal.forEach(function (each) {
        mergedLine += '"' + each + '"';
        mergedLine += ',\n';
    });
    mergedLine = mergedLine.substring(0, mergedLine.length - 2);
    mergedLine += ' ]';
    var info = "";
    info += "<b>Extensions</b>: config1 has " + extensions1.length + " lines,";
    info += "config2 has " + extensions2.length + " lines, ";
    info += "total after merge: " + extensionsTotal.length + ".<br/>";
    info += "<b>Components</b>: config1 has " + components1.length + " lines,";
    info += "config2 has " + components2.length + " lines, ";
    info += "total after merge: " + componentsTotal.length + ".\n";
    $("#diff").html(info);
    $("#mergedConfig").text(mergedLine);
}