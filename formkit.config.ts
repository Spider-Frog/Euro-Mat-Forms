import { DefaultConfigOptions } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'
import theme from "~/theme";


const config: DefaultConfigOptions = {
    config: {
        classes: generateClasses(theme)
    }
}

export default config
