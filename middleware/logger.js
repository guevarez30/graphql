import morgan from "morgan";
import chalk from "chalk";

const colorMethod = ( tokens, req, res ) => {
    let color;
    switch ( tokens.method( req, res ) ) {
        case "GET":
            color = chalk.cyan( "GET".padEnd( 8, " " ) );
            break;
        case "POST":
            color = chalk.green( "POST".padEnd( 8, " " ) );
            break;
        case "PUT":
            color = chalk.magenta( "PUT".padEnd( 8, " " ) );
            break;
        case "DELETE":
            color = chalk.red( "DELETE".padEnd( 8, " " ) );
            break;
        default:
            color = chalk.white( tokens.method( req, res ).padEnd( 8, " " ) );
    }
    return color;
};

export const logger = morgan( ( tokens, req, res ) =>
    [
        chalk.white( `[${tokens.date( req, res, "iso" )}]` ),
        colorMethod( tokens, req, res ),
        chalk.white( tokens.url( req, res ).padEnd( 15 ) ),
        tokens.status( req, res ) < 400
            ? chalk.green.bold( tokens.status( req, res ) )
            : chalk.red.bold( tokens.status( req, res ) ),
        chalk.yellow(
            ( tokens[ "response-time" ]( req, res ) + " ms" ).padEnd( 10, " " )
        ),
        chalk.white( tokens[ "remote-addr" ]( req, res ) )
    ].join( " " )
);
