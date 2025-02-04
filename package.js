Package.describe({
    name: 'bento:meteor-mail',
    version: '1.0.0',
    summary: 'Bento mail transport for Meteor',
    git: 'https://github.com/bentonow/meteor-mail',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('2.5');
    api.use('ecmascript');
    api.use('email');
    api.mainModule('dist/index.js', 'server');
});