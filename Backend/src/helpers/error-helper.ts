
export function getError(err: any) {
    if (process.env.ENVIRONMENT === "production") {
        return "Some error occurred, please try again.";
    }
    return err.message;
}