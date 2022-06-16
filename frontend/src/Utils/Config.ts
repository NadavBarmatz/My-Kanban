abstract class Config {
    public urls = {
        todos: "",
        login: "",
        register: "",
        tags: "",
        todoTags: "",
        users: "",
    }

    public constructor(baseUrl: string) {
        this.urls = {
            todos: baseUrl + "todos/",
            login: baseUrl + "auth/login/",
            register: baseUrl + "auth/register/",
            tags: baseUrl + "tags/",
            todoTags: baseUrl + "todo-tags/",
            users: baseUrl + "users/",
        };
    }
}

class DevelopmentConfig extends Config {
    public constructor() {
        super("http://localhost:3001/api/");
    }
}

class ProductionConfig extends Config {
    public constructor() {
        super("http://localhost:3001/api/");
    }
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;
