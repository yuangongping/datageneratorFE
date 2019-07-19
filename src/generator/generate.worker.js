import { Generator } from '@/generator/index';
import { WORKER_MESSAGE } from '@/generator/CONST.js';

self.onmessage = function(event) {
    const configs = event.data.configs;
    const nrows = event.data.nrows;

    const generator = new Generator(configs, nrows);
    const data = generator.wokerGenerate(self);

    self.postMessage({
        type: WORKER_MESSAGE.finish,
        data: data
    })

    self.close();
};