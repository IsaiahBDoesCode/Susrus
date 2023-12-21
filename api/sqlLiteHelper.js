const sqlite3 = require('sqlite3').verbose();
const fs = require('fs-extra')




const insertJobsDataIntoSqliteDb = async function(firstToInsert, lastToInsert, jobNumberToInsert, jobStatus, createdAt, dueDate) {
//NOTE TO SELF, THESE FUNCTION NAMES YOU HAVE ARE ABSOLUTLEY TERRIBLE AND YOU NEED TO FIX THEM BEFORE YOU COMMIT THIS
let db = new sqlite3.Database('./sql/jobsData.db',sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

let insertQuery = `INSERT INTO JobsData (first_name, last_name, jobNumber, Status, createdAt, dueDate) VALUES('${firstToInsert}', '${lastToInsert}', '${jobNumberToInsert}', '${jobStatus}', '${createdAt}', '${dueDate}');`
 await db.all(insertQuery, [], (err, rows) => {
  console.log("Inserting data")
    if (err) {
      throw err;
    }
  })
  console.log("Finished Inserting Data")

  return insertQuery
   
}

function removeDataFromDb(jobNumber) {
  let db = new sqlite3.Database('sql/jobsData.db',sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err.message);
    }
  });
  let selectQuery = `DELETE FROM JobsData WHERE "jobNumber" = "${jobNumber}";`
  console.log("Query to remove", selectQuery)
     db.all(
        `${selectQuery}`,
        (err, row) => {
          console.log(row)
        } 
      )
      return
}

const insertUsersToDB = async function(userid,userFirstName, userLastName, userRole, createdAt ) {
  //NOTE TO SELF, THESE FUNCTION NAMES YOU HAVE ARE ABSOLUTLEY TERRIBLE AND YOU NEED TO FIX THEM BEFORE YOU COMMIT THIS
  let db = new sqlite3.Database('./sql/jobsData.db',sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
  });
  
  let insertQuery = `INSERT INTO Users (id, first_name, last_name, role, createdAt) VALUES('${userid}', '${userFirstName}', '${userLastName}', '${userRole}', '${createdAt}');`
   await db.all(insertQuery, [], (err, rows) => {
    console.log("Inserting data")
      if (err) {
        throw err;
      }
    })
    console.log("Finished Inserting Data")
  
    return insertQuery
     
  }

  function getUsers(){
    console.log("in get users")
    let newArray = []
    let db = new sqlite3.Database('sql/jobsData.db',sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        return console.error(err.message);
      }
    });
    let selectQuery = `SELECT * FROM Users;`
       db.all(
          `${selectQuery}`,
          (err, row) => {
            row.forEach(x => {
              newArray.push(x)
            })
      
          } 
          
        )

  return newArray

  }

 function getJobData() {
    let newArray = []
    let db = new sqlite3.Database('sql/jobsData.db',sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        return console.error(err.message);
      }
    });
    let selectQuery = `SELECT * FROM JobsData;`
       db.all(
          `${selectQuery}`,
          (err, row) => {
            row.forEach(x => {
              newArray.push(x)
            })
      
          } 
          
        )

  return newArray
}
module.exports = { insertJobsDataIntoSqliteDb, getJobData, removeDataFromDb, insertUsersToDB, getUsers }

