const students = [
    { 'RF123':{ name: 'John Doe', rollno: '12345', parentMail: 'john@example.com'} },
    { rfid: 'RF124', name: 'Jane Smith', rollno: '12346', parentMail: 'jane@example.com' },
    { rfid: 'RF125', name: 'Michael Brown', rollno: '12347', parentMail: 'michael@example.com' },
    { rfid: 'RF126', name: 'Emily White', rollno: '12348', parentMail: 'emily@example.com' },
    { rfid: 'RF127', name: 'David Johnson', rollno: '12349', parentMail: 'david@example.com' },
];

 const subjects = [
    {
        'subCode1':{
        name: 'Mathematics',
        faculty: 'Dr. Alice Green',
        password: 'math123',
        students: [
            'RF123', 
            'RF124', 
        ]
    }},
    {
        name: 'Physics',
        faculty: 'Dr. Bob White',
        password: 'phy456',
        students: [
            { rfid: 'RF125', name: 'Michael Brown' },
            { rfid: 'RF126', name: 'Emily White' }
        ]
    },
    {
        name: 'Chemistry',
        faculty: 'Dr. Carol Black',
        password: 'chem789',
        students: [
            { rfid: 'RF127', name: 'David Johnson' },
            { rfid: 'RF124', name: 'Jane Smith' }
        ]
    }
];

 let attendance = {
    'RF123': true,  // John Doe is present
    'RF124': false, // Jane Doe is absent
    'RF125': true,  // James Smith is present
    'RF126': true   // Emily Johnson is present
};

export const subCode="c1";
export const subject={	
    faculty:	"f1",
    name	:"s1",
    password:	"p1",
    students:	[
    	"a1",
    	"a2",
    	"a3"]}	;
