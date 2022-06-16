import mysql, {QueryError} from "mysql2";
import config from "../01-utils/config";

const connection = mysql.createPool({
    host: config.mySql.host,
    user: config.mySql.user,
    password: config.mySql.password,
    database: config.mySql.database
});

function execute(sql: string, values?: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        connection.query(sql, values, (err : QueryError, result : any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

export default {execute};
