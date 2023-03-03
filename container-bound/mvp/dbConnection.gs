// function onOpen(e){
//   getConnection();
// }

function getConnection(){
  const username = 'root';
  const password = 'test1234';
  const url = 'jdbc:google:mysql://docsaddonproject:us-central1:doc-add-on/sighted-side-db';
  const conn = Jdbc.getCloudSqlConnection(url, username, password);
  Logger.log(conn);

  const sql3 = `UPDATE locked_sections SET title="Title 1" WHERE id="0";`;
  //update statement - must be data manipulation stm or statement that return nothing
  // let update = statement.executeUpdate(sql3);
  // Logger.log(update);

  return conn;
}

function getAllLockedSections(){
  let conn = getConnection();
  let statement = conn.createStatement();

  // query statement - must me non-data manipulation stm (SELECT, SHOW, ...)
  const sql2 = `SELECT * FROM locked_sections;`;
  let query = statement.executeQuery(sql2);
  Logger.log(query); //returns results set
  let array = [];
  while(query.next()){
    array.push([
      query.getInt('id'),
      query.getString('title'),
      query.getString('text'),
      query.getString('author'),
      query.getDate('date'),
    ]);
  }  
  Logger.log(array);

  return array;
}

function addLockedSection(sectionTitle, sectionText){
  
  try {
    const conn = getConnection();
    let statement = conn.createStatement();
    const sql1 = `INSERT INTO locked_sections (title, text, author, date) VALUES ('${sectionTitle}', '${sectionText}', "lindalomencikova@gmail.com", "2012-11-11");`;
    let results = statement.execute(sql1);
    return results;

  } catch (err) {
    // TODO(developer) - Handle exception from the API
    console.log('Failed with an error %s', err.message);
    return err.message;
  }
}