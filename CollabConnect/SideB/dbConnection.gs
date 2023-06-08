// function onOpen(e){
//   getConnection();
// }

function getConnection(){
  const username = 'root';
  const password = 'test1234';
 
  const url = 'jdbc:google:mysql://docsaddonproject-385820:us-central1:collab-connect-instance/CollabConnectDb';
  const conn = Jdbc.getCloudSqlConnection(url, username, password);
  Logger.log(conn);

  return conn;
}

function postAllCollaborators(name){
  const doc_id = DocumentApp.getActiveDocument().getId();
  
  try {
    const conn = getConnection();
    let statement = conn.createStatement();
    const sql1 = `INSERT INTO collaborators (doc_id, name) VALUES ('${doc_id}', '${name}');`;
    let results = statement.execute(sql1);
    Logger.log(results);

    return results;
  } catch (err) {
    // TODO(developer) - Handle exception from the API
    console.log('Failed with an error %s', err.message);
    return err.message;
  }
}

function getAllLockedSections(){
  let conn = getConnection();
  let statement = conn.createStatement();
  const docId = DocumentApp.getActiveDocument().getId();

  // query statement - must me non-data manipulation stm (SELECT, SHOW, ...)
  const sql2 = `SELECT * FROM locked_sections WHERE doc_id= '${docId}'`;
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
      query.getString('summary'),
    ]);
  }  
  Logger.log(array);
  return array;
}

function addDocument(doc_id){
   try {
    const conn = getConnection();
    let statement = conn.createStatement();
    const sql1 = `INSERT INTO documents (doc) VALUES ('${doc_id}');`;
    let results = statement.execute(sql1);
    Logger.log(results);

    return results;
  } catch (err) {
    // TODO(developer) - Handle exception from the API
    console.log('Failed with an error %s', err.message);
    return err.message;
  }
}

function getId(sectionTitle){
try {
    const conn = getConnection();
    let statement = conn.createStatement();
    const sql3 = `SELECT id FROM locked_sections WHERE title='${sectionTitle}';`;
    let query = statement.executeQuery(sql3);
    let array = [];
    while(query.next()){
      array.push([
        query.getInt('id'),
      ]);
    }  
  Logger.log(parseInt(array[0][0]));
  return array[0];

  } catch (err) {
    // TODO(developer) - Handle exception from the API
    console.log('Failed with an error %s', err.message);
    return err.message;
  }
}

function addLockedSection(sectionTitle, sectionText){
  const author = Session.getActiveUser().getEmail();
  const docId = DocumentApp.getActiveDocument().getId();

  highlightSection();
  try {
    const conn = getConnection();
    let statement = conn.createStatement();
    const sql1 = `INSERT INTO locked_sections (doc_id, title, text, author, date) VALUES ('${docId}','${sectionTitle}', '${sectionText}', '${author}', "2012-11-11");`;
    let results = statement.execute(sql1);
    
    highlightSection(getMyColor());
    return results;

  } catch (err) {
    // TODO(developer) - Handle exception from the API
    console.log('Failed with an error %s', err.message);
    return err.message;
  }
}

function addSummaryToLockedSection(sectionTitle, summaryText){
  const newText = getHighlightedText();
  const id = getId(sectionTitle);

  try {
    const conn = getConnection();
    let statement = conn.createStatement();
    const sql3 = `UPDATE locked_sections SET new_text='${newText}',summary='${summaryText}' WHERE id='${id[0]}';`;
    let update = statement.executeUpdate(sql3);

    resetColor();
    return update;

  } catch (err) {
    // TODO(developer) - Handle exception from the API
    console.log('Failed with an error %s', err.message);
    return err.message;
  }
}