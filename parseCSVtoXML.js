//Parse a CSV file to xml, executed from Switch command line element
const csv = require('csv-parser');
const fs = require('fs');
const results = [];

var XMLWriter = require('xml-writer');

var csvFile = process.argv[2];
var xmlLoc = process.argv[3] + "/";

fs.createReadStream(csvFile)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {

    var xmlDataArray = Object.values(results);
    var xmlData = xmlDataArray.filter(remEmpty);
    function remEmpty(value, index, array)
    {
      return value.FirstName !== "";
    }

    var xmlJobName = "output.xml";
    var emailCount;

    emailCount = xmlData.length;

    var i;
    for(i = 0; i < emailCount; i++)
    {
      xmlJobName = i + "_" + xmlData[i].FirstName + xmlData[i].LastName + ".xml";
      var ws = fs.createWriteStream(xmlLoc + xmlJobName);
      ws.on('close', function()
        {/*console.log(fs.readFileSync(xmlLoc + xmlJobName));
      */});

      xmlJob = new XMLWriter(true, function(string, encoding)
        {ws.write(string, encoding);
      });
      var firstValue = Object.values(xmlData[i])[0];
      xmlJob.startDocument('1.0', 'UTF-8');
      xmlJob.startElement('EmailJob');
      xmlJob.writeElement('Company', firstValue);
      if (typeof xmlData[i].FirstName !== "undefined")
      {
        xmlJob.writeElement('FirstName', xmlData[i].FirstName);
      } else {
        xmlJob.writeElement('FirstName', ' ');
      }
      if (typeof xmlData[i].LastName !== "undefined")
      {
        xmlJob.writeElement('LastName', xmlData[i].LastName);
      } else {
        xmlJob.writeElement('LastName', ' ');
      }
      if (typeof xmlData[i].Title !== "undefined")
      {
        xmlJob.writeElement('Title', xmlData[i].Title);
      } else {
        xmlJob.writeElement('Title', ' ');
      }
      if (typeof xmlData[i].Persona !== "undefined")
      {
        xmlJob.writeElement('Persona', xmlData[i].Persona);
      } else {
        xmlJob.writeElement('Persona', ' ');
      }
      if (typeof xmlData[i].ContactOrder !== "undefined")
      {
        xmlJob.writeElement('ContactOrder', xmlData[i].ContactOrder);
      } else {
        xmlJob.writeElement('ContactOrder', ' ');
      }
      if (typeof xmlData[i].IsCustomer !== "undefined")
      {
        xmlJob.writeElement('IsCustomer', xmlData[i].IsCustomer);
      } else {
        xmlJob.writeElement('IsCustomer', ' ');
      }
      if (typeof xmlData[i].Phone !== "undefined")
      {
        xmlJob.writeElement('Phone', xmlData[i].Phone);
      } else {
        xmlJob.writeElement('Phone', ' ');
      }
      if (typeof xmlData[i].Website !== "undefined")
      {
        xmlJob.writeElement('Website', xmlData[i].Website);
      } else {
        xmlJob.writeElement('Website', ' ');
      }
      if (typeof xmlData[i].Email !== "undefined")
      {
        xmlJob.writeElement('Email', xmlData[i].Email);
      } else {
        xmlJob.writeElement('Email', ' ');
      }
      if (typeof xmlData[i].Street !== "undefined")
      {
        xmlJob.writeElement('Street', xmlData[i].Street);
      } else {
        xmlJob.writeElement('Street', ' ');
      }
      if (typeof xmlData[i].City !== "undefined")
      {
        xmlJob.writeElement('City', xmlData[i].City);
      } else {
        xmlJob.writeElement('City', ' ');
      }
      if (typeof xmlData[i].State !== "undefined")
      {
        xmlJob.writeElement('State', xmlData[i].State);
      } else {
        xmlJob.writeElement('State', ' ');
      }
      if (typeof xmlData[i].Zip !== "undefined")
      {
        xmlJob.writeElement('Zip', xmlData[i].Zip);
      } else {
        xmlJob.writeElement('Zip', ' ');
      }
      if (typeof xmlData[i].Country !== "undefined")
      {
        xmlJob.writeElement('Country', xmlData[i].Country);
      } else {
        xmlJob.writeElement('Country', ' ');
      }
      xmlJob.endElement('EmailJob');
      xmlJob.endDocument();
      ws.end();
    }

  });
