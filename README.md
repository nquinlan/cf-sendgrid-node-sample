# CF Summit - Bird Call Demo

A quick demo of using SendGrid with Cloud Foundry for the CF Summit.

## Usage
To get setup, take the following steps in your terminal.

### Get the Code
First, clone and move into the repo.

```sh
$ git clone https://github.com/nquinlan/cf-sendgrid-node-sample
$ cd cf-sendgrid-node-sample
```
### Push the code to Cloud Foundry

Push the app to your Cloud Foundry instance of choice. To do this you'll need the [`cf` Command Line Interface (CLI)](http://docs.cloudfoundry.org/devguide/installcf/). _You may be asked to setup the CLI, simply follow the prompts. [More can be found in the cf docs](http://docs.cloudfoundry.org/devguide/installcf/whats-new-v6.html#login)_.

_If this is your first time pushing an app, `cf push` will create an app with the given name._

```sh
$ cf push <app_name>
```

### Create an instance of a managed service
If you do not already have a SendGrid service associated with your space, you'll need to create a [managed service instance](http://docs.cloudfoundry.org/devguide/services/managed.html).

```sh
$ cf create-service sendgrid free <service_name>
```

### Bind the service to your application
Finally, you must connect the service to your application– this is called [binding a service](http://docs.cloudfoundry.org/devguide/services/bind-service.html).

```
$ cf bind-service <app_name> <service_name>
```
