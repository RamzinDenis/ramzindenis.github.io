const createForm = (input1, input2, input3) => {
	const form = document.createElement("form");
	form.classList.add("form");

	const nameInput = createInput(input1.name, input1.placeholder);
	const commentInput = createInput(input2.name, input2.placeholder);
	const phoneInputWrapper = createPhoneFieldWrapper(
		true,
		commentInput,
		input3.name,
		input3.placeholder
	);
	const phoneInput = phoneInputWrapper.querySelector(".phone");
	const submitBtn = createSubmitBtn(nameInput, phoneInput, commentInput);

	form.append(nameInput, phoneInputWrapper, commentInput, submitBtn);

	document.body.append(form);
};

const createInput = (name, placeholder) => {
	const input = document.createElement("input");
	input.name = name;
	input.className = name;
	input.placeholder = placeholder;
	return input;
};

const createSubmitBtn = (nameInput, phoneInput, commentInput) => {
	const button = document.createElement("button");
	button.textContent = "submit";

	button.addEventListener("click", e => {
		e.preventDefault();

		const additionalPhones = getOptinionalPhones();
		const person = new Person(
			nameInput.value,
			commentInput.value,
			phoneInput.value,
			additionalPhones.extraPhone1?.value,
			additionalPhones.extraPhone2?.value
		);
		if (!nameInput.value || !phoneInput.value || !commentInput.value)
			return alert("Пожалуйста, заполните все формы");

		person.send();

		resetFields([
			nameInput,
			commentInput,
			phoneInput,
			additionalPhones.extraPhone1,
			additionalPhones.extraPhone2,
		]);
	});
	return button;
};

const getOptinionalPhones = () => {
	const optionalPhones = document.querySelectorAll(".extra-phone");
	const extraPhone1 = optionalPhones[0];
	const extraPhone2 = optionalPhones[1];
	return {
		extraPhone1,
		extraPhone2,
	};
};

const createAddPhoneBtn = commentInput => {
	const btn = document.createElement("button");
	btn.textContent = "+";
	btn.className = "form__btn";
	btn.addEventListener("click", event =>
		handleAddExtraPhoneClick.call(btn, event, commentInput)
	);
	return btn;
};

function handleAddExtraPhoneClick(event, commentInput) {
	event.preventDefault();
	if (document.querySelectorAll(".extra-phone").length > 1) return;
	commentInput.before(
		createPhoneFieldWrapper(true, commentInput, "extra-phone", "Телефон N")
	);
	this.remove();
}

const createPhoneFieldWrapper = (
	isAddButton,
	commentInput,
	name,
	placeholder
) => {
	const wrapper = document.createElement("div");
	wrapper.className = "phone__wrapper";

	const phoneInput = createInput(name, placeholder);

	wrapper.append(phoneInput);
	isAddButton && wrapper.append(createAddPhoneBtn(commentInput));
	return wrapper;
};

const resetFields = fiels => {
	fiels.forEach(field => (field ? (field.value = "") : field));
};

class Person {
	constructor(name, comment, phone, extraPhone1, extraPhone2) {
		this.name = name;
		this.comment = comment;
		this.phone = phone;
		this.extraPhone1 = extraPhone1;
		this.extraPhone2 = extraPhone2;
	}
	send = () => {
		alert(this.getMessage());
	};
	getMessage = () => {
		const extraPhone1 = this.extraPhone1
			? `Дополнительный телефон 1 : ${this.extraPhone1}`
			: "";
		const extraPhone2 = this.extraPhone2
			? `Дополнительный телефон 2 : ${this.extraPhone2}`
			: "";
		const message = `Имя : ${this.name}, комментарий : ${this.comment}, телефон : ${this.phone}. ${extraPhone1} ${extraPhone2} 
Данные успешно отправлены!`;
		return message;
	};
}

createForm(
	{ name: "name", placeholder: "ФИО" },
	{ name: "comment", placeholder: "Комментарий" },
	{ name: "phone", placeholder: "Телефон" }
);
