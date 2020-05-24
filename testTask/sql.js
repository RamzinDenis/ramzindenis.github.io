const mysql = require("mysql");
const connection = mysql.createConnection({
	host: "localhost/3306",
	user: "Denis-",
	password: "12332133",
	database: "Local Instance MYSQl80",
});
connection.connect(err => {
	if (err) throw err;
	console.log("Connected!");
});

// Найти сотрудников с максимальной заработной платой в каждом отделе
connection.query(
	"SELECT *, MAX(salary) FROM employee GROUP BY department_id",
	(err, data) => {
		if (err) throw new Error(err);
		console.log(data);
	}
);
// Найти айди отделов в которых количество сотрудников не превышает 3
connection.query(
	"SELECT department_id FROM employee GROUP BY department_id HAVING COUNT(*) <= 3",
	(err, data) => {
		if (err) throw new Error(err);
		console.log(data);
	}
);
// Найти айди отделов с максимальной суммарной зарплатой работников
connection.query(
	"SELECT department_id, sum(salary) AS totalsum FROM employee GROUP BY department_id ORDER BY totalsum DESC",
	(err, data) => {}
);

// Добавить отдел
const addDepartmentInMySQl = `INSERT INTO department (id, name)
VALUES (4, "RPA Developer")`;
connection.query(addDepartmentInMySQl);

// Добавить сотрудников
const statement =
	"INSERT INTO employees(id, chief_id, name, salary, department_id) VALUES ?";

const employees = [
	[8, NULL, "Рамзин Денис Михайлович", 2400, 4],
	[9, NULL, "Дмитрий Бородин Александрович", 1500, 4],
	[10, 2, "Иван Дейко Александрович", 2600, 4],
];

connection.query(statement, [employees], (err, results, fields) => {
	if (err) {
		return console.error(err.message);
	}
	console.log("Row inserted:" + results.affectedRows);
});

// Удалить отдел и сотрудников
connection.query(
	`ALTER TABLE departament
	DROP CONSTRAINTS fk_empoloyees_department_id`,
	(err, data) => {
		if (err) throw new Error(err);
		console.log(data);
	}
);

connection.query(
	`ALTER TABLE employees
	ADD CONSTRAINT fk_empoloyees_department_id
	FOREIGN KEY (department_id)
	REFERENCES department(id)
	ON DELETE CASCADE;`,
	(err, data) => {
		if (err) throw new Error(err);
		console.log(data);
	}
);

connection.query(`DELETE FROM department WHERE id = 4`);

// Обновить айди отдела и сотрудников
connection.query(
	`ALTER TABLE departament
	DROP CONSTRAINTS fk_empoloyees_department_id`,
	(err, data) => {
		if (err) throw new Error(err);
		console.log(data);
	}
);

connection.query(
	`ALTER TABLE employees
	ADD CONSTRAINT fk_empoloyees_department_id
	FOREIGN KEY (department_id)
	REFERENCES department(id)
	ON UPDATE CASCADE;`,
	(err, data) => {
		if (err) throw new Error(err);
		console.log(data);
	}
);

connection.query(`UPDATE department SET id = 5 WHERE id = 3`);
