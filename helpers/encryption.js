import bcrypt from "bcrypt";
const saltRounds = 10;

export const hash = ( password ) => bcrypt.hash( password, saltRounds );

export const compare = ( password, hash ) => bcrypt.compare( password, hash );
