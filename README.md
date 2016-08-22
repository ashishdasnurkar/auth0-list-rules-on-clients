## Auth0 List Rules on Clients Extension

If you are already using [Auth0](https://auth0.com) services, you should be familiar with [Auth0](https://auth0.com)'s 
management dashboard, clients (A.K.A. applications) and rules. This little extensions extends the management dashboard 
and helps you to view relation between clients and rules.

[PUT PICTURE HERE]

## Deploy the Extension
1. Go to [Auth0 Extensions](https://manage.auth0.com/#/extensions)
2. Click on `+ Create Extension`
3. Fill in the textbox with `https://github.com/saltukalakus/auth0-list-rules-on-clients`
4. Click on `continue`
5. Finally, click on `install`

## Features (I may move to TODO some of them. They are target now)
* View clients for each rule.
* View rules for each client.
* Clickable rule & client details in each view mode.
* Filter, search rules and clients.
* Export rules-clients table as a CSV file. 

## How It Works
In [Auth0](https://auth0.com) dashboard, activated rules are applied on every client by default. However, it is quite
logical to apply some rules only to some of the clients (whitelist). Implementing clientID or clientName based whitelist logic can make this possible. Below you can find two sample whitelist code piece. This extension assumes all or some of your rules have whitelist logic. With statically analysing your rules, this extension can determine which rule is used for any client and show this relation via it's user interface.

### Rule method - 1
Skip code block if the client is not in whitelist

```javascript
function (user, context, callback) {
    if (context.clientName === 'Client1ToWhiteList') || 
       (context.clientName === 'Client2ToWhiteList') ||
       (context.clientID === '3wgXJTZpOPobwfQl8EeAHPsxYpKRdP5B'){
       
        // Write rule logic in this block
    }
    
    // If 'If' block is not hit, rule just returns without any action  
    callback(null, user, context);
}
```

### Rule method - 2
Early return if the client is not in whitelist

```javascript
function (user, context, callback) {
    if (context.clientName !== 'Client1ToWhiteList') && 
       (context.clientName !== 'Client2ToWhiteList') &&
       (context.clientID !== '3wgXJTZpOPobwfQl8EeAHPsxYpKRdP5B') {
       
        // Returns without any rule action  
        return callback(null, user, context);
    }
    
    // Write rule logic after this line
    
    callback(null, user, context);
}
```

## Limitations
If any of your rules have some kind of logic like "apply this rule if not these clients" (blacklist), extension will not be able to list the relations correctly for that rule.

### Sample
```javascript
function (user, context, callback) {
    if (context.clientName !== 'Client1ToBlackList') {
        // Writing rule logic after this line which literally means apply 
        // rule to all clients other than Client1ToBlackList
        return callback(null, user, context);
    }
    
    // Returns without any rule action 
    
    callback(null, user, context);
}
```

## Development
Fork the project in your GitHub account. Install <b>Node.js</b> and <b>npm</b>. Installation steps differ 
according to your operating system. After that, follow the steps for local and remote tests as below.

### Local tests
* Copy sample_config.json as config.json in the same folder. Update AUTH0_DOMAIN setting in config.json with your domain path. It may be something like YourUserName.auth0.com Note that based on your account location auth0.com may not work for you. 

'''bash
     $ cp sample_config.json config.json
'''

* Build and run the application

```bash
    $ cd ./test
    $ npm install # mandatory only for the first time
    $ npm run bundle
    $ cd ..
    $ npm install # mandatory only for the first time
    $ npm start
```
### Remote tests

* Build the application

```bash
    $ cd ./test
    $ npm install # mandatory only for the first time
    $ npm run bundle
    $ cd ..
    $ npm install # mandatory only for the first time
    $ npm run bundle
```

* Deploy the application

Commit your changes to your GitHub account. Run your extension following <b>Deploy the Extension</b> section above. Don't forget to use your GitHub repository path.

## TODO
* Dynamically evaluate rule's code with some clever algorithm to detect behaviour. So that mixture of whitelist, 
blacklist logics can be handled without limitation.

## People
[R. Saltuk Alakus](https://github.com/saltukalakus)

## License
[MIT](LICENSE)
