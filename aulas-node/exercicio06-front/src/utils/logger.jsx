// Configurações do logger
const LOGGER_CONFIG = {
  level: import.meta.env.MODE === 'production' ? 'WARN' : 'DEBUG',
  prefix: '[FRONTEND]',
  enableConsoleColors: import.meta.env.MODE === 'development',
  enableTimestamp: true,
}

// Níveis de log
const LOG_LEVELS = {
  TRACE: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  SILENT: 5
}

// Cores para diferentes níveis
const COLORS = {
  TRACE: '\x1b[37m', // branco
  DEBUG: '\x1b[36m', // cyan
  INFO: '\x1b[32m',  // verde
  WARN: '\x1b[33m',  // amarelo
  ERROR: '\x1b[31m', // vermelho
  RESET: '\x1b[0m'   // reset
}

// Estado interno do logger
let currentLevel = LOG_LEVELS[LOGGER_CONFIG.level] || LOG_LEVELS.DEBUG

// Função para formatar contexto
const formatContext = (context) => {
  if (!context || Object.keys(context).length === 0) {
    return ''
  }

  try {
    return JSON.stringify(context, null, 2)
  } catch (error) {
    return `[Context formatting error: ${error.message}]`
  }
}

// Função para formatar a mensagem de log
const formatMessage = (level, message, context = {}) => {
  const timestamp = LOGGER_CONFIG.enableTimestamp 
    ? `[${new Date().toISOString()}]` 
    : ''
  
  const prefix = LOGGER_CONFIG.prefix
  const levelPrefix = `[${level}]`
  
  const colorStart = LOGGER_CONFIG.enableConsoleColors
    ? COLORS[level] || COLORS.RESET
    : ''
  
  const colorEnd = LOGGER_CONFIG.enableConsoleColors
    ? COLORS.RESET
    : ''

  const formattedContext = formatContext(context)
  const contextPart = formattedContext ? `\n${formattedContext}` : ''

  return {
    prefix: `${colorStart}${timestamp}${prefix}${levelPrefix}${colorEnd}`,
    message,
    context: contextPart
  }
}

// Função para verificar se deve logar
const shouldLog = (level) => {
  return LOG_LEVELS[level] >= currentLevel
}

// Função base para logging
const logMessage = (level, message, context = {}) => {
  if (!shouldLog(level)) return

  const formatted = formatMessage(level, message, context)
  const consoleMethod = console[level.toLowerCase()] || console.log

  if (formatted.context) {
    consoleMethod(formatted.prefix, formatted.message, formatted.context)
  } else {
    consoleMethod(formatted.prefix, formatted.message)
  }
}

// Funções principais de logging
export const trace = (message, context = {}) => {
  logMessage('TRACE', message, context)
}

export const debug = (message, context = {}) => {
  logMessage('DEBUG', message, context)
}

export const info = (message, context = {}) => {
  logMessage('INFO', message, context)
}

export const warn = (message, context = {}) => {
  logMessage('WARN', message, context)
}

export const error = (message, errorObj = null, context = {}) => {
  const errorContext = errorObj ? {
    ...context,
    error: {
      message: errorObj.message,
      stack: errorObj.stack,
      name: errorObj.name
    }
  } : context

  logMessage('ERROR', message, errorContext)
}

// Funções específicas
export const apiCall = (method, url, data = null, context = {}) => {
  debug(`API Call: ${method.toUpperCase()} ${url}`, {
    ...context,
    method,
    url,
    data: data || 'no-data',
    timestamp: new Date().toISOString()
  })
}

export const apiResponse = (method, url, status, data = null, context = {}) => {
  const level = status >= 400 ? 'ERROR' : status >= 300 ? 'WARN' : 'DEBUG'
  const logFunc = level === 'ERROR' ? error : level === 'WARN' ? warn : debug
  
  logFunc(`API Response: ${method.toUpperCase()} ${url} - ${status}`, null, {
    ...context,
    method,
    url,
    status,
    data: data || 'no-data',
    timestamp: new Date().toISOString()
  })
}

export const navigation = (from, to, context = {}) => {
  debug(`Navigation: ${from} -> ${to}`, {
    ...context,
    from,
    to,
    timestamp: new Date().toISOString()
  })
}

export const storeAction = (storeName, actionName, payload = null, context = {}) => {
  debug(`Store Action: ${storeName}.${actionName}`, {
    ...context,
    store: storeName,
    action: actionName,
    payload: payload || 'no-payload',
    timestamp: new Date().toISOString()
  })
}

export const authError = (action, errorObj, context = {}) => {
  error(`Auth Error: ${action}`, errorObj, {
    ...context,
    action,
    timestamp: new Date().toISOString()
  })
}

export const performance = (operation, duration, context = {}) => {
  const logFunc = duration > 1000 ? warn : debug
  
  logFunc(`Performance: ${operation} took ${duration}ms`, {
    ...context,
    operation,
    duration,
    timestamp: new Date().toISOString()
  })
}

// Funções de controle
export const setLevel = (level) => {
  const levelUpper = level.toUpperCase()
  if (LOG_LEVELS[levelUpper] !== undefined) {
    currentLevel = LOG_LEVELS[levelUpper]
    info(`Log level changed to: ${levelUpper}`)
  } else {
    warn(`Invalid log level: ${level}`)
  }
}

export const getLevel = () => {
  return Object.keys(LOG_LEVELS).find(key => LOG_LEVELS[key] === currentLevel)
}

// Export default com todas as funções
const logger = {
  trace,
  debug,
  info,
  warn,
  error,
  apiCall,
  apiResponse,
  navigation,
  storeAction,
  authError,
  performance,
  setLevel,
  getLevel,
  formatContext
}

export default logger