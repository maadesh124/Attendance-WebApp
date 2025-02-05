export const students = [
    { 'RF123':{ name: 'John Doe', rollno: '12345', parentMail: 'john@example.com'} },
    { rfid: 'RF124', name: 'Jane Smith', rollno: '12346', parentMail: 'jane@example.com' },
    { rfid: 'RF125', name: 'Michael Brown', rollno: '12347', parentMail: 'michael@example.com' },
    { rfid: 'RF126', name: 'Emily White', rollno: '12348', parentMail: 'emily@example.com' },
    { rfid: 'RF127', name: 'David Johnson', rollno: '12349', parentMail: 'david@example.com' },
];

export const subjects = [
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
