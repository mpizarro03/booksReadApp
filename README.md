# Book App

A place to list books you want to read.

## Setup

### Amplify Setup

#### Requirements

- Node 6+ (preferably 8+)
- Yarn
- Xcode (and Command Line Tools)

See [React Native - Getting Started](http://facebook.github.io/react-native/docs/getting-started.html)

### Skip to Project Setup if you have the Amplify CLI and an AWS CLI profile configured

This project uses AWS Amplify to manage deployment, GraphQL schema, and DB resources. To run a local development environment, download and configure Amplify.

1. Obtain AWS credentials
2. Create or update `~/.aws/config` and `~/.aws/credentials`

```
# put the following three lines in ~/.aws/config
[profile booksToRead-amplify]
region=us-west-2
```

```
# put the final three lines in ~/.aws/credentials
# replace the keys with your own keys generated in the previous step
[profile booksToRead-amplify]
aws_access_key_id=<REPLACE_WITH_ACCESS_KEY>
aws_secret_access_key=<REPLACE_WITH_SECRET_ACCESS_KEY>
```

2. Download Amplify CLI
   `npm install -g @aws-amplify/cli`

## Setup

1. `git clone https://github.com/mpizarro03/booksReadApp.git`
2. `cd booksReadApp`
3. `cp .env.example .env`
4. `yarn`
5. `amplify init`

- answer the prompts as follows
  <pre>
  ? Do you want to use an existing environment? <b>Yes</b>
  ? Choose the environment you would like to use: <b>prod</b>
  ? Choose your default editor: <b> // whatever you use</b>
  ? Do you want to use an AWS profile? <b>Yes</b>
  ? Please choose the profile you want to use: <b>booksReadApp</b>
  </pre>

6. `amplify env pull --restore`
7. `yarn start`

## Developer Workflow

- [ ] Create feature branch from master
- [ ] Merge master into your feature branch
- [ ] Open a PR and write description of work
- [ ] Review PR & Merge if approved

## Updating the GraphQL Schema

If you update the graphql schema, run these commands before `amplify publish` or `push`, to ensure that the App Service stays in sync. If these commands are not run, and the App Service src has not changed, the App Service will run with an old version of the graphql schema until the next time the Video Service src changes.

```
amplify api gql-compile
amplify codegen
amplify function build
```

## Publishing to AWS

This project has one AWS environments-- prod.

1.  Check for any resource updates `amplify status`
2.  If any reources do not report 'No change', run `amplify push`to provision the resources in the environment
3.  To build and publish changes to teh AWS environment, run `amplify publish`
