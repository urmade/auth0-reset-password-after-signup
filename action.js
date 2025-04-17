exports.onExecutePostLogin = async (event, api) => {
  //This could be replaced by if(event.stats.login_count === 0)
  if (!event.user.app_metadata.has_set_password) {
    try {
      //Any npm request library would work. This example usese node-fetch@2.7.0 which has to be set as a dependency for the action
      const fetch = require('node-fetch');
      const req = await fetch('https://{your-base-tenant-url}/dbconnections/change_password', {
        method: 'POST',
        body: JSON.stringify({
          client_id: 'client_with_db_enabled',
          email: event.user.email,
          connection: 'Username-Password-Authentication',
          organization: ''
        }),
        headers: { 'Content-Type': 'application/json' }
      })
      console.info(req);
      api.user.setAppMetadata("has_set_password", true);
    }
    catch (e) {
      console.info(e);
    }
  }
};
