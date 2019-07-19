import { Generator } from '@/generator/index';

self.onmessage = function(event) {
    const configs = event.data.configs;
    const nrows = event.data.nrows;

    const generator = new Generator(configs, nrows, self);
    generator.wokerGenerate(self);

    self.close();
};