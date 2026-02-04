
import fs from 'fs';

const csvContent = 'Name,Age,City\nAlice,30,New York\nBob,25,Los Angeles\nCharlie,35,Chicago';
const newEmployee = 'David,28,Boston';
const findName = 'Bob';

function addEmployeeRecord(newEmployeeValue) {
    fs.appendFile('employee.csv', `\n${newEmployeeValue}`, (err) => {
        if (err) {
            console.log('Error appending record:', err
                
            );
        } else {
            console.log('New employee record added.');
        }
    });
}

function findEmployee(name) {
    fs.readFile('employee.csv', 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading CSV file:', err);
            return;
        }
        const lines = data.split('\n');
        const headers = lines[0].split(',');
        const rows = lines.slice(1);

        const found = rows.find((row) => row.startsWith(`${name},`));
        if (!found) {
            console.log(`Employee not found: ${name}`);
            return;
        }

        const values = found.split(',');
        const employee = {
            [headers[0]]: values[0],
            [headers[1]]: values[1],
            [headers[2]]: values[2]
        };

        console.log('Employee found:', employee);
    });
}

function saveCsvAsJson() {
    fs.readFile('employee.csv', 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading CSV file:', err);
            return;
        }

        const lines = data.split('\n');
        const headers = lines[0].split(',');
        const rows = lines.slice(1).filter((row) => row.trim().length > 0);

        const employees = rows.map((row) => {
            const values = row.split(',');
            return {
                [headers[0]]: values[0],
                [headers[1]]: values[1],
                [headers[2]]: values[2]
            };
        });

        fs.writeFile('employee.json', JSON.stringify(employees, null, 2), (writeErr) => {
            if (writeErr) {
                console.log('Error writing JSON file:', writeErr);
            } else {
                console.log('JSON file created successfully.');
                readJsonFile();
            }
        });
    });
}

function readJsonFile() {
    fs.readFile('employee.json', 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading JSON file:', err);
        } else {
            const employees = JSON.parse(data);
            console.log('Employees from JSON:', employees);
        }
    });
}

fs.writeFile('employee.csv', csvContent, (err) => {
    if (err) {
        console.log('Error writing CSV file:', err);
    } else {
        console.log('CSV file created successfully.');
        addEmployeeRecord(newEmployee);
        findEmployee(findName);
        saveCsvAsJson();
    }
});
