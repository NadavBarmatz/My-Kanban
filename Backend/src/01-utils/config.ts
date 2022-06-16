
abstract class Config {
    public port: number = 3001;
    public mySql = { host: "", user: "", password: "", database: "" };
    public loginExpiresIn: string;
}

class DevelopmentConfig extends Config {
    public constructor() {
        super();
        this.mySql = { host: "localhost", user: "root", password: "root1234", database: "todoDB" };
        this.loginExpiresIn = "500h";
    }
}

class ProductionConfig extends Config {
    public constructor() {
        super();
        this.mySql = { host: "", user: "", password: "", database: "" };
        this.loginExpiresIn = "24h";
    }
}

const config = process.env.ENVIRONMENT === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;    
