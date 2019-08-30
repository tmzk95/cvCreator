function printPdf() {
	buildPdfContent();
	var divContents = $("#pdf").html();
	var printWindow = window.open('', '', 'height=800,width=1000');
    var is_chrome = Boolean(printWindow.chrome);
	printWindow.document.write('<html><head><title>CV Creator</title>');
	printWindow.document.write('<meta charset="utf-8">');
	printWindow.document.write('<link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700&display=swap&subset=latin-ext" rel="stylesheet">');
	printWindow.document.write('</head><body >');
	printWindow.document.write(divContents);
	printWindow.document.write('</body></html>');

    printWindow.document.close(); // necessary for IE >= 10 and necessary before onload for chrome

    if (is_chrome) {
        printWindow.onload = function() { // wait until all resources loaded 
            printWindow.focus(); // necessary for IE >= 10
            printWindow.print();  // change window to mywindow
            printWindow.close();// change window to mywindow
        };
    }
    else {
        printWindow.document.close(); // necessary for IE >= 10
        printWindow.focus(); // necessary for IE >= 10
        printWindow.print();
        printWindow.close();
    }

}

function buildPdfContent() {
	buildBasicInfo();
	buildRows("#experianceInputs", "experiance", "Doświadczenie zawodowe");
	buildRows("#educationInputs", "education", "Wykształcenie");
	buildRows("#languageInputs", "languages", "Języki");
	buildRows("#skillInputs", "skills", "Umiejętności");
	buildRows("#hobbyInputs", "hobbys", "Zainteresowania");
}

function buildBasicInfo() {
	document.getElementById("firstName").innerHTML = document.getElementById("firstNameInput").value;
	document.getElementById("lastName").innerHTML = document.getElementById("lastNameInput").value;
	document.getElementById("phone").innerHTML = document.getElementById("phoneInput").value;
	document.getElementById("mail").innerHTML = document.getElementById("mailInput").value;
	document.getElementById("address").innerHTML = document.getElementById("addressInput").value;
	document.getElementById("birthday").innerHTML = document.getElementById("birthdayInput").value;
	document.getElementById("photo").innerHTML =
		"<img src='" +
		document.getElementById("photoInput").value +
		"' />";
}

function buildRows(inputSectionId, outputSectionId, outputSectionHeader) {
	document.getElementById(outputSectionId).innerHTML =
		'<div class="main_header">' +
			outputSectionHeader +
		'</div>';

	var wrapperChildren = $(inputSectionId).children();

	for (var i = 0; i < wrapperChildren.length; i++) {
		let children = wrapperChildren[i].children;

		for(var j = 0; j < children.length; j++) {
			if(children[j].name === "headerInput") {
				var header = children[j].value;
			}
			if(children[j].name === "secondaryInput") {
				var secondary = children[j].value;
			}
			if(children[j].name === "infoInput") {
				var info = children[j].value;
			}
		}
		addRow(header, secondary, info, outputSectionId);
	}
}

function addRow(header, secondary, info, outputSectionId) {
	const div = document.createElement('div');
  
	div.className = 'desc_dot';
	div.innerHTML = `
		<div class="dot_header big_header">
			<div class="header_text">` +
				(header === undefined ? '' : header) + `
			</div>
			<div class="header_data">` +
				(secondary === undefined ? '' : secondary) + `
			</div>
		</div>
		<div class="dot_info">` +
			(info === undefined ? '' : info) + `
		</div>
	`;
  
	document.getElementById(outputSectionId).appendChild(div);
}

function addInput(headerLabel, secondaryLabel, infoLabel, parentId) {
	const div = document.createElement('div');
  
	div.className = 'inputRow';
	div.innerHTML =
	'<textarea rows="3" placeholder="' + headerLabel + '" class="inputText" type="text" name="headerInput" value="" ></textarea>' +
	'<textarea rows="3" placeholder="' + secondaryLabel + '" class="inputText" type="text" name="secondaryInput" value="" ></textarea>' +
	(infoLabel === null ? '' : '<textarea rows="3" placeholder="' + infoLabel + '" class="inputText" name="infoInput" value=""></textarea>') +
	'<input type="button" class="btnStandard btnWarn" value="Usuń" onclick="removeRow(this, \'' + parentId + '\')" />';
  
	document.getElementById(parentId).appendChild(div);
}

function removeRow(input, parentId) {
  document.getElementById(parentId).removeChild(input.parentNode);
}

$(function(){
	$("#btnPrint").on("click", function() {
		printPdf();
	});
	$("#addExperiance").on("click", function() {
		addInput("Pracodawca", "Daty", "Kwalifikacje", "experianceInputs");
	});
	$("#addEducation").on("click", function() {
		addInput("Uczelnia", "Daty", "Informacje", "educationInputs");
	});
	$("#addLanguages").on("click", function() {
		addInput("Język", "Dodatkowe informacje", null, "languageInputs");
	});
	$("#addSkills").on("click", function() {
		addInput("Umiejętność", "Dodatkowe informacje", null, "skillInputs");
	});
	$("#addHobbys").on("click", function() {
		addInput("Hobby", "Dodatkowe informacje", null, "hobbyInputs");
	});
});