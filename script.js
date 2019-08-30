var sectionValues = [
	{ 
		inputSectionId : "experianceInputs",
		outputSectionId : "experiance",
		outputSectionHeader : "Doświadczenie zawodowe",
		headerInputLabel : "Pracodawca",
		secondaryInputLabel : "Daty",
		infoInputLabel : "Kwalifikacje",
		buttonId: "addExperiance"
	},
	{ 
		inputSectionId : "educationInputs",
		outputSectionId : "education",
		outputSectionHeader : "Wykształcenie",
		headerInputLabel : "Uczelnia",
		secondaryInputLabel : "Daty",
		infoInputLabel : "Informacje",
		buttonId: "addEducation"
	},
	{ 
		inputSectionId : "languageInputs",
		outputSectionId : "languages",
		outputSectionHeader : "Języki",
		headerInputLabel : "Język",
		secondaryInputLabel : undefined,
		infoInputLabel : "Dodatkowe informacje",
		buttonId: "addLanguages"
	},
	{ 
		inputSectionId : "skillInputs",
		outputSectionId : "skills",
		outputSectionHeader : "Umiejętności",
		headerInputLabel : "Umiejętność",
		secondaryInputLabel : undefined,
		infoInputLabel : "Dodatkowe informacje",
		buttonId: "addSkills"
	},
	{ 
		inputSectionId : "hobbyInputs",
		outputSectionId : "hobbys",
		outputSectionHeader : "Zainteresowania",
		headerInputLabel : "Hobby",
		secondaryInputLabel : undefined,
		infoInputLabel : "Dodatkowe informacje",
		buttonId: "addHobbys"
	}
];

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
	for(const row of sectionValues) {
		buildRows(row);
	}
}

function buildBasicInfo() {
	document.getElementById("firstName").innerHTML = document.getElementById("firstNameInput").value;
	document.getElementById("lastName").innerHTML = document.getElementById("lastNameInput").value;
	document.getElementById("phone").innerHTML = document.getElementById("phoneInput").value;
	document.getElementById("mail").innerHTML = document.getElementById("mailInput").value;
	document.getElementById("address").innerHTML = document.getElementById("addressInput").value;
	document.getElementById("birthday").innerHTML = document.getElementById("birthdayInput").value;
	document.getElementById("photo").innerHTML = `<img src="${document.getElementById("photoInput").value}" />`;
}

function buildRows({inputSectionId, outputSectionId, outputSectionHeader}) {
	document.getElementById(outputSectionId).innerHTML =
		`<div class="main_header">${outputSectionHeader}</div>`;

	var wrapperChildren = [...$(`#${inputSectionId}`).children()];

	wrapperChildren.map(wrapperChild => {
		var children = [...wrapperChild.children];
		var row = {header : '', secondary : '', info : ''};
		children.map(v => {
			row.header = v.name === "headerInput" ? v.value : row.header;
			row.secondary = v.name === "secondaryInput" ? v.value : row.secondary;
			row.info = v.name === "infoInput" ? v.value : row.info;
		});
		addRow(row, outputSectionId);
	});
}

function addRow({header, secondary, info}, outputSectionId) {
	const div = document.createElement('div');
  
	div.className = 'desc_dot';
	div.innerHTML = `
		<div class="dot_header big_header">
			<div class="header_text">
				${header}
			</div>
			<div class="header_data">
				${secondary}
			</div>
		</div>
		<div class="dot_info">
			${info}
		</div>
	`;
  
	document.getElementById(outputSectionId).appendChild(div);
}

function addInput({headerInputLabel, secondaryInputLabel, infoInputLabel, inputSectionId}) {
	const div = document.createElement('div');
  
	div.className = 'inputRow';
	div.innerHTML =
	'<textarea rows="3" placeholder="' + headerInputLabel + '" class="inputText" type="text" name="headerInput" value="" ></textarea>' +
	(secondaryInputLabel === undefined ? '' : '<textarea rows="3" placeholder="' + secondaryInputLabel + '" class="inputText" name="secondaryInput" value=""></textarea>') +
	(infoInputLabel === undefined ? '' : '<textarea rows="3" placeholder="' + infoInputLabel + '" class="inputText" name="infoInput" value=""></textarea>') +
	'<input type="button" class="btnStandard btnWarn" value="Usuń" onclick="removeRow(this, \'' + inputSectionId + '\')" />';
  
	document.getElementById(inputSectionId).appendChild(div);
}

function removeRow(input, parentId) {
  document.getElementById(parentId).removeChild(input.parentNode);
}

function addSection() {
	var sectionNameHeader = document.getElementById("sectionName").value;
	var sectionName = sectionNameHeader;
	sectionName = sectionName.replace(/\s/g,'');

	var section = {
		inputSectionId : `${sectionName}Inputs`,
		outputSectionId : sectionName,
		outputSectionHeader : sectionNameHeader,
		headerInputLabel : "Info",
		secondaryInputLabel : "Info",
		infoInputLabel : "Info",
		buttonId: `add${sectionName}`
	};
	sectionValues = [...sectionValues, section];


	const inputDiv = document.createElement('div');
	inputDiv.className = 'inputSection';
	inputDiv.innerHTML = `
		<div class="sectionHeader">
			<span>${sectionNameHeader}</span>
			<input class="btnStandard" type="button" value="Dodaj" id="add${sectionName}" />
		</div>
		<div id="${sectionName}Inputs"></div>
	`;
	document.getElementById("inputsContainer").appendChild(inputDiv);

	
	const outputDiv = document.createElement('div');
	outputDiv.className = 'desc_section';
	outputDiv.id = sectionName;
	document.getElementById("desc_info").appendChild(outputDiv);


	$(`#add${sectionName}`).on("click", function() {
		addInput(section);
	});
}

$(function(){
	$("#btnPrint").on("click", function() {
		printPdf();
	});

	$("#addSection").on("click", function() {
		addSection();
	});
	
	for(const row of sectionValues) {
		$(`#${row.buttonId}`).on("click", function() {
			addInput(row);
		});
	}
});