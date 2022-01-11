# graphql
This is just an example of how a graphql server could be implemented with user authentication and resolver authentication. **PASSWORDS** are not encrypted to keep things easy. 

## Getting Started
1. clone down repository
2. ```$ npm install```
3. ```$ npm run start:graph```
4. Go to `localhost:4000`

### Security
Most mutations/queries are available without authentication required. `users`, `user`, `createTeam` will require authentication.


### Auth Wrapper Methods
Wrappers are a simple way to put simple auth at the top entry level of your resolver nodes.

#### adminAuth() 
Simple authWrapper, hypothetical master admin auth to allow all view access
```javascript
  users: adminAuth((_parent, args, context) =>
    context.models.users.list({ where: args })
  ),
```

#### userAuth()
The entry node for user returns only the data they have ownership too
```javascript
  user: userAuth((_parent, _args, context) =>
    context.models.users.getById(context.user.id)
  ),
```

#### belongsToTeam()
Validates a user belongs to the team prior to query/mutation
```javascript
  createJob: belongsToTeam((_parent, args, context) =>
    context.models.jobs.create(args)
  ),
```


### Example Queries
Jobs and teams queries require no authentication.
```
query{
  teams{
    id
    name
    jobs{
      id
      description
    }
  }
}
```
