/**
 * Logger.js
 * Strictly enforced trace debugging class for system-wide logging.
 * Prevents "lazy" console.log usage.
 */
class Logger {
    static levels = {
        INFO: 'INFO',
        WARN: 'WARN',
        ERROR: 'ERROR',
        TRACE: 'TRACE'
    };

    static log(level, message, context = '') {
        const timestamp = new Date().toISOString();
        const formattedMessage = `[${timestamp}] [${level}] ${context ? `[${context}] ` : ''}${message}`;
        
        switch (level) {
            case this.levels.ERROR:
                console.error(formattedMessage);
                break;
            case this.levels.WARN:
                console.warn(formattedMessage);
                break;
            default:
                console.log(formattedMessage);
        }
    }

    static info(message, context) { this.log(this.levels.INFO, message, context); }
    static warn(message, context) { this.log(this.levels.WARN, message, context); }
    static error(message, context) { this.log(this.levels.ERROR, message, context); }
    static trace(message, context) { this.log(this.levels.TRACE, message, context); }
}

export default Logger;
