Package.describe({
    name: 'bento:meteor-mail',
    version: '1.0.0',
    summary: 'Bento mail transport for Meteor',
    git: 'https://github.com/bentonow/meteor-mail',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('3.1.1'); // We changed to 3.1.1 to satisy Meteor 3.1.1 requirements
    api.use('ecmascript');
    api.use('email');
    api.mainModule('server/index.js', 'server'); // Changed to 'server' to follow Meteor client/server structure. Peace of mind to know this code will only run on the server.
});