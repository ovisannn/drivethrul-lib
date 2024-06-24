import { createLogger, transports, format } from 'winston'

export const logger = createLogger({
    format: format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss:ms'}),
        format.printf(info=>`${info.timestamp}`)
    )
})