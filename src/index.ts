import 'module-alias/register';

import type { Application } from 'express';
import PingRouter from './routes/ping.routes';
import Routes from './routes/germany.routes';
import config from 'config';
import express from 'express';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';

const PORT = process.env.PORT || 4000;
const app: Application = express();

// Rate limit
const _rateLimitWindowMs: number = Number(config.get('RATE_LIMIT.WINDOW_MS')) || 1000;
const _rateLimitMax: number = Number(config.get('RATE_LIMIT.MAX_LIMIT')) || 5;

const limiter = rateLimit({
    windowMs: _rateLimitWindowMs,
    max: _rateLimitMax,
    standardHeaders: 'draft-7',
    legacyHeaders: true,
});

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: '/swagger.json',
        },
    }),
);
app.use(limiter);

app.use('/germany', Routes);
app.use('/ping', PingRouter);

app.listen(PORT, () => {
    const message = `Server is running on http://localhost:${PORT}`;
    console.log(message);
});
