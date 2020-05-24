const arrSort = (arr, sortType) => {
	if (sortType !== "ascend" && sortType !== "descend")
		throw new Error("Choose the correct sorting form - 'ascend' or 'descend'");
	else if (sortType === "ascend") return arr.sort((a, b) => a - b);
	else return arr.sort((a, b) => b - a);
};

const testedArr = [3, 4, 1, 2, 6, 9];

arrSort(testedArr, "descend");

console.log(testedArr);
