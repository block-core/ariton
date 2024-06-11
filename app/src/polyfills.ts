import * as process from 'process';
import * as crypto from 'crypto';
import * as stream from 'stream';

(window as any).process = process;
(window as any).crypto = crypto;
(window as any).stream = stream;