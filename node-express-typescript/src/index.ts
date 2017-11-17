require('source-map-support').install();

'use strict';

import { start } from './start';

start()
    .catch((err) => {
        console.error(`Error starting server: ${err.message}`);
        process.exit(-1);
    });
