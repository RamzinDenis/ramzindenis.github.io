const makeRussianFedaritionFlag = () => {
	const flag = document.createElement("div");
	flag.className = "flag";
	flag.append(createFlagParts("header"));
	flag.append(createFlagParts("body"));
	flag.append(createFlagParts("footer"));
	document.body.append(flag);
};

const createFlagParts = className => {
	const flagPart = document.createElement("div");
	flagPart.className = className;

	for (let i = 0; i < 20; i++) {
		const flagRow = document.createElement("div");
		for (let i = 0; i < 80; i++) {
			const O = document.createTextNode("O");
			flagRow.append(O);
		}
		flagPart.append(flagRow);
	}

	return flagPart;
};

makeRussianFedaritionFlag();
