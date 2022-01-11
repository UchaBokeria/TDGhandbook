import { Handbook } from "./Handbook";
import { Auth } from "./Auth/Auth";
import { Serve } from "./Serve";

Serve( async () => {
    Auth();
    await Handbook();
});