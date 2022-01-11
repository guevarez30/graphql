# graphql
This is just an example of how a graphql server could be implemented with user authentication and resolver authentication. **PASSWORDS** are not encrypted to keep things easy. 

## Getting Started
1. clone down repository
2. ```$ npm install```
3. ```$ npm run start:graph```
4. Go to `localhost:4000`

## Security
Most mutations/queries are available without authentication required. `users`, `user`, `createTeam` will require authentication in this example project.

### Auth Wrapper Methods
Wrappers are a simple way to put simple auth at the top entry level of your resolver nodes.
```javascript

const adminAuth = (resolver) => (parent, args, context) => {
  if (context.user.isAdmin) return resolver(parent, args, context);
  throw new Error("Unauthorized");
}; 

export const Query => {
  users: adminAuth((_parent, args, context) =>
    context.models.users.list({ where: args })
  )
}
```

### Type Security
Use "public" types that only give fields you are comfortable sharing in other relationships. Ex: Instead of returning a type: `User` return a type: `PublicUser` for a `team.users` so user relationships are secured.

```javascript
type User {
  name: String
  email: String
  last4CreditCard: String
  address: String
}

type PublicUser {
  name: String
  email: String
}

type Team {
  users: [PublicUser]
}

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
