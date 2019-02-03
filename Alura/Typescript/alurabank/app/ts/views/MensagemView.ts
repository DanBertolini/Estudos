import { View } from "./View";

//namespace Views {
    export class MensagemView extends View<String> {

        template(model: string): string {
            return model ? `<p class="alert alert-info">${model}</p>` : '';
        }
    }
//}