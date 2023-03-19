try {
    importScripts('/background.js', '/api/fetchAllPosts.js' /*, and so on */);
  } catch (e) {
    console.log(e);
  }