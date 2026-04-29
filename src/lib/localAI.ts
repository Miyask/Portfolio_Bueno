// Sistema de IA local - Chatbots únicos por proyecto

interface KnowledgeBase {
  keywords: string[];
  response: string;
}

interface ProjectChatbot {
  name: string;
  greeting: string;
  knowledgeBase: KnowledgeBase[];
  defaultResponse: string;
}

// Patrones de seguridad comunes a todos los chatbots
const securityKeywords = [
  'contraseña', 'password', 'clave', 'pin', 'tarjeta', 'crédito', 'credito',
  'débito', 'debito', 'cvv', 'cvc', 'dni', 'nif', 'nie', 'pasaporte',
  'cuenta bancaria', 'iban', 'número de cuenta', 'social security',
  'credit card', 'bank account', 'ssn'
];

const securityResponse = '🔒 **Protección de Datos:**\n\nPor seguridad, no puedo solicitar ni proporcionar datos sensibles como:\n\n• Contraseñas o PIN\n• Números de tarjeta de crédito/débito\n• DNI, NIE o pasaporte\n• Datos bancarios (IBAN, cuentas)\n\nSi necesitas gestionar datos personales, te recomiendo acceder a tu área de cliente en la web oficial o contactar con atención al cliente por teléfono.\n\n¿Puedo ayudarte con algo más?';

const chatbots: Record<string, ProjectChatbot> = {
  'correos-express': {
    name: 'Correos Express AI',
    greeting: '¡Hola! 📦 Soy el asistente virtual de Correos Express. Puedo ayudarte a consultar el estado de tu paquete, resolver incidencias de envío y responder preguntas sobre nuestros servicios. ¿En qué puedo ayudarte?',
    knowledgeBase: [
      {
        keywords: ['hola', 'hi', 'hey', 'buenas'],
        response: '¡Hola! 👋 Soy el asistente de Correos Express. ¿Necesitas ayuda con algún envío o paquete?'
      },
      {
        keywords: ['paquete', 'envío', 'envio', 'seguimiento', 'tracking', 'dónde', 'donde', 'estado', 'rastrear', 'localizar'],
        response: '📦 **Seguimiento de Paquetes:**\n\nPara consultar el estado de tu envío necesito tu **número de seguimiento** (lo encontrarás en el email de confirmación de compra).\n\nTambién puedo ayudarte con:\n• Información sobre plazos de entrega estimados\n• Cambios de dirección de entrega\n• Reenvíos a otra ubicación\n• Consultar puntos de recogida cercanos\n\n¿Tienes tu número de seguimiento a mano?'
      },
      {
        keywords: ['retraso', 'tarda', 'lento', 'demora', 'retrasado', 'no llega', 'perdido'],
        response: '⏱️ **Incidencias de Entrega:**\n\nLamento que tu envío se esté demorando. Las causas más frecuentes son:\n\n• Alta demanda en temporadas pico\n• Condiciones meteorológicas adversas\n• Dirección incompleta o incorrecta\n• Ausencia del destinatario\n\n**¿Qué puedo hacer?**\n1. Verificar el estado actual con tu número de seguimiento\n2. Abrir una incidencia de investigación\n3. Reprogramar la entrega en otra fecha u horario\n\n¿Quieres que compruebe el estado de tu envío?'
      },
      {
        keywords: ['precio', 'coste', 'cuánto', 'cuanto', 'tarifa', 'cuesta'],
        response: '💰 **Tarifas Orientativas Correos Express:**\n\n• **Nacional estándar (24-48h):** desde 4.99€\n• **Nacional urgente (24h):** desde 7.99€\n• **Internacional UE (3-5 días):** desde 12.99€\n• **Internacional mundial (5-10 días):** desde 19.99€\n\n*Los precios pueden variar según peso, dimensiones y destino.*\n\n¿Quieres que te ayude a calcular un envío específico?'
      },
      {
        keywords: ['incidencia', 'problema', 'error', 'queja', 'reclamación', 'reclamacion'],
        response: '⚠️ **Resolución de Incidencias:**\n\nEntiendo que tienes un problema. Puedo ayudarte con:\n\n1️⃣ Abrir una investigación sobre tu paquete\n2️⃣ Reprogramar la entrega en nueva fecha\n3️⃣ Cambiar el punto de recogida\n4️⃣ Informarte sobre el proceso de reclamación\n\nPara localizar tu envío, necesitaré tu **número de seguimiento**.\n\n¿Cuál es el problema que estás experimentando?'
      },
      {
        keywords: ['recoger', 'oficina', 'punto', 'agencia', 'locker'],
        response: '🏢 **Puntos de Recogida:**\n\nPuedes recoger tu paquete en:\n\n• Oficinas Correos Express\n• Puntos de conveniencia (tiendas colaboradoras)\n• Lockers automáticos (disponibles 24h)\n\nRecibirás un SMS/email cuando esté listo para recogida. Tienes un plazo de **15 días** para recogerlo.\n\n¿Necesitas encontrar un punto de recogida cercano?'
      },
      {
        keywords: ['devolver', 'devolución', 'devolucion', 'reembolso', 'devolver paquete'],
        response: '🔄 **Devoluciones:**\n\nEl proceso de devolución depende del comercio donde realizaste la compra:\n\n• **Plazo habitual:** 14-30 días desde la entrega\n• **Estado:** el producto debe estar en condiciones originales\n• **Etiqueta:** contacta con la tienda para obtener la etiqueta de devolución\n\nUna vez tengas la etiqueta, puedes dejarlo en cualquier punto Correos Express.\n\n¿El comercio ya te ha proporcionado la etiqueta de devolución?'
      },
      {
        keywords: ['horario', 'hora', 'cuándo', 'cuando', 'entrega'],
        response: '🕐 **Horarios de Entrega:**\n\n• **Franja habitual:** 8:00 - 20:00 (lunes a viernes)\n• **Sábados:** 9:00 - 14:00 (según zona)\n• **Festivos:** no se realizan entregas\n\nSi no estás en casa, el repartidor:\n1. Intentará entrega con un vecino\n2. Dejará un aviso de paso\n3. Llevará el paquete al punto de recogida más cercano\n\n¿Necesitas reprogramar una entrega?'
      }
    ],
    defaultResponse: '📦 Entiendo tu consulta. Como asistente de Correos Express puedo ayudarte con:\n\n• **Seguimiento de paquetes** — localizar tu envío\n• **Incidencias** — retrasos, paquetes no recibidos\n• **Tarifas** — precios y servicios disponibles\n• **Puntos de recogida** — encontrar el más cercano\n• **Devoluciones** — proceso y plazos\n• **Horarios** — franjas de entrega\n\n¿Con cuál de estos temas necesitas ayuda?'
  },

  'seur-logistics': {
    name: 'SEUR Smart Logistics',
    greeting: '¡Hola! 🚚 Soy el asistente virtual de SEUR. Puedo ayudarte con el seguimiento de tus envíos, resolver incidencias de entrega o informarte sobre nuestros servicios logísticos. ¿Qué necesitas?',
    knowledgeBase: [
      {
        keywords: ['hola', 'hi', 'hey', 'buenas'],
        response: '¡Hola! 👋 Soy el asistente de SEUR. ¿Necesitas ayuda con algún envío o servicio logístico?'
      },
      {
        keywords: ['paquete', 'envío', 'envio', 'seguimiento', 'tracking', 'dónde', 'donde', 'estado', 'rastrear', 'localizar', 'pedido'],
        response: '📦 **Seguimiento de Envíos SEUR:**\n\nPara localizar tu paquete necesito tu **número de seguimiento SEUR** (formato: suelen ser 13-22 dígitos).\n\nCon él puedo informarte sobre:\n• Estado actual del envío\n• Última ubicación registrada\n• Fecha estimada de entrega\n• Intentos de entrega previos\n\n¿Tienes el número de seguimiento?'
      },
      {
        keywords: ['retraso', 'tarda', 'lento', 'demora', 'retrasado', 'no llega', 'perdido'],
        response: '⏱️ **Incidencias de Entrega SEUR:**\n\nLamento la demora. Los motivos más habituales son:\n\n• Volumen elevado en la zona de reparto\n• Incidencias en ruta (tráfico, climatología)\n• Dirección incompleta o errónea\n• Destinatario ausente en intentos previos\n\n**Opciones disponibles:**\n1. Consultar estado con tu número de seguimiento\n2. Reprogramar entrega a otra fecha\n3. Redirigir a un punto SEUR Pickup\n4. Abrir incidencia formal\n\n¿Cómo prefieres proceder?'
      },
      {
        keywords: ['ruta', 'rutas', 'optimización', 'optimizacion', 'camino', 'recorrido'],
        response: '🗺️ **Optimización de Rutas SEUR:**\n\nNuestro sistema de IA optimiza las rutas de reparto analizando:\n\n• Tráfico en tiempo real\n• Condiciones meteorológicas\n• Volumen de paquetes por zona\n• Ventanas horarias de entrega preferidas\n\n**Resultado:** Hasta un **30% de mejora** en eficiencia de entrega y reducción de huella de carbono.\n\nEsta tecnología beneficia directamente a nuestros clientes con entregas más rápidas y puntuales.'
      },
      {
        keywords: ['precio', 'coste', 'cuánto', 'cuanto', 'tarifa', 'cuesta', 'presupuesto'],
        response: '💰 **Servicios y Tarifas SEUR:**\n\n• **SEUR 24h Nacional:** desde 5.50€\n• **SEUR 48h Económico:** desde 3.99€\n• **SEUR Internacional:** desde 14.99€ (UE)\n• **SEUR Frío (temperatura controlada):** consultar\n• **SEUR e-Commerce:** tarifas especiales por volumen\n\n*Precios orientativos. Varían según peso, dimensiones y destino.*\n\n¿Necesitas un presupuesto personalizado?'
      },
      {
        keywords: ['pickup', 'punto', 'recogida', 'oficina', 'tienda', 'recoger', 'locker'],
        response: '📍 **Puntos SEUR Pickup:**\n\nTenemos más de **6.500 puntos de recogida** en España:\n\n• Tiendas de conveniencia\n• Gasolineras\n• Lockers automáticos 24h\n• Centros comerciales\n\nPuedes redirigir tu envío a un punto Pickup si no estarás en casa. Plazo de recogida: **7 días hábiles**.\n\n¿Quieres buscar el punto Pickup más cercano a tu dirección?'
      },
      {
        keywords: ['devolver', 'devolución', 'devolucion', 'reembolso'],
        response: '🔄 **Devoluciones con SEUR:**\n\nPara devolver un paquete:\n\n1. Contacta con la tienda donde compraste para obtener la **etiqueta de devolución**\n2. Empaqueta el producto en su estado original\n3. Deposítalo en un **punto SEUR Pickup** o programa recogida a domicilio\n\n*Nota: las condiciones de devolución las establece el vendedor, no SEUR.*\n\n¿Ya tienes la etiqueta de devolución?'
      },
      {
        keywords: ['flota', 'vehículos', 'vehiculos', 'camiones', 'reparto'],
        response: '🚛 **Gestión de Flota SEUR:**\n\nNuestra flota inteligente cuenta con:\n\n• **+5.000 vehículos** en toda España\n• Furgonetas eléctricas para última milla urbana\n• Mantenimiento predictivo con IoT\n• Asignación dinámica según demanda\n\nEsta tecnología nos permite ofrecer un servicio más eficiente y sostenible.'
      },
      {
        keywords: ['incidencia', 'problema', 'error', 'queja', 'reclamación', 'reclamacion'],
        response: '⚠️ **Gestión de Incidencias:**\n\nEntiendo que tienes un problema con tu envío. Puedo ayudarte con:\n\n1️⃣ Localizar tu paquete con el número de seguimiento\n2️⃣ Reprogramar la entrega\n3️⃣ Redirigir a un punto SEUR Pickup\n4️⃣ Informarte sobre el proceso de reclamación\n\nPara empezar, ¿podrías indicarme tu **número de seguimiento**?'
      },
      {
        keywords: ['horario', 'hora', 'cuándo', 'cuando', 'entrega'],
        response: '🕐 **Horarios de Entrega SEUR:**\n\n• **Lunes a viernes:** 8:00 - 19:00\n• **Sábados:** disponible en algunas zonas (9:00 - 14:00)\n\nSi no estás en casa:\n• El repartidor dejará aviso e intentará al día siguiente\n• Puedes redirigir a un punto SEUR Pickup\n• Puedes reprogramar la entrega online\n\n¿Necesitas cambiar la fecha o lugar de entrega?'
      }
    ],
    defaultResponse: '🚚 Entiendo tu consulta. Como asistente de SEUR puedo ayudarte con:\n\n• **Seguimiento de envíos** — localizar tu paquete\n• **Incidencias** — retrasos, problemas de entrega\n• **Tarifas** — precios y servicios\n• **Puntos Pickup** — puntos de recogida cercanos\n• **Devoluciones** — proceso de devolución\n• **Horarios** — franjas de entrega\n\n¿Con cuál de estos temas necesitas ayuda?'
  },

  'telefonica-neural': {
    name: 'Telefónica Neural Search',
    greeting: '¡Hola! 🔍 Soy el asistente de Telefónica Neural Search. Puedo ayudarte con problemas de conexión, configuración de tu router, consultas sobre tu línea móvil o fibra, y búsqueda de documentación técnica. ¿En qué puedo ayudarte?',
    knowledgeBase: [
      {
        keywords: ['hola', 'hi', 'hey', 'buenas'],
        response: '¡Hola! 👋 Soy el asistente de Telefónica Neural Search. ¿Tienes algún problema con tu conexión o necesitas información sobre nuestros servicios?'
      },
      {
        keywords: ['internet', 'conexión', 'conexion', 'wifi', 'red', 'se va', 'lento', 'velocidad', 'no funciona'],
        response: '🌐 **Problemas de Conexión:**\n\nVamos a diagnosticar paso a paso:\n\n1️⃣ **¿El problema es por WiFi o cable?**\n2️⃣ **¿Afecta a todos los dispositivos?**\n3️⃣ **¿Desde cuándo ocurre?**\n\n**Soluciones rápidas:**\n• Reinicia el router (desconecta 30 segundos y vuelve a conectar)\n• Acércate al router si usas WiFi\n• Comprueba que los cables están bien conectados\n\n¿El problema persiste tras reiniciar el router?'
      },
      {
        keywords: ['fibra', 'adsl', 'mbps', 'megas', 'velocidad', 'baja'],
        response: '📡 **Verificación de Velocidad:**\n\nPara comprobar tu velocidad real:\n\n1. Conecta por **cable Ethernet** al router\n2. Cierra todas las aplicaciones y descargas\n3. Accede a **speedtest.net** o **fast.com**\n\n**Velocidades esperadas (por cable):**\n• Fibra 300Mb → 280-310 Mb/s\n• Fibra 600Mb → 550-620 Mb/s\n• Fibra 1Gb → 900-950 Mb/s\n\nSi obtienes menos del 70% de tu velocidad contratada, podríamos abrir una incidencia técnica.\n\n¿Qué velocidad tienes contratada y qué resultado obtienes?'
      },
      {
        keywords: ['router', 'configurar', 'configuración', 'configuracion', 'puerto', 'dmz', 'nat'],
        response: '🔧 **Configuración del Router:**\n\nPuedo orientarte sobre:\n\n• **Cambio de nombre/contraseña WiFi**\n• **Apertura de puertos** (gaming, aplicaciones)\n• **Configuración de banda** (2.4GHz vs 5GHz)\n• **Red de invitados**\n• **Control parental**\n\n*Por seguridad, no puedo acceder remotamente a tu router. Te guiaré paso a paso para que lo configures tú mismo.*\n\n¿Qué configuración necesitas cambiar?'
      },
      {
        keywords: ['factura', 'facturación', 'facturacion', 'cobro', 'cargo', 'importe', 'pagar'],
        response: '💳 **Consulta de Facturación:**\n\nPuedo informarte sobre:\n\n• Cómo consultar tus facturas en Mi Movistar\n• Entender el desglose de tu factura\n• Promociones y descuentos activos\n• Fechas de facturación\n\n*Por protección de datos, no tengo acceso a tus datos de facturación. Para consultas específicas, accede a **Mi Movistar** (app o web) con tus credenciales.*\n\n¿Necesitas ayuda para acceder a Mi Movistar?'
      },
      {
        keywords: ['documentación', 'documentacion', 'técnico', 'tecnico', 'manual', 'guía', 'guia'],
        response: '📚 **Búsqueda de Documentación Técnica:**\n\nNuestro sistema Neural Search procesa más de **10.000 documentos técnicos** con búsqueda semántica avanzada.\n\nPuedo buscar información sobre:\n• Manuales de configuración de equipos\n• Guías de resolución de averías\n• Documentación de servicios fibra/móvil\n• Procedimientos de instalación\n\n¿Qué documento o tema necesitas encontrar?'
      },
      {
        keywords: ['móvil', 'movil', 'cobertura', 'datos', 'roaming', 'línea', 'linea'],
        response: '📱 **Servicio Móvil:**\n\nPuedo orientarte sobre:\n\n• **Cobertura:** consulta en movistar.es/cobertura\n• **Consumo de datos:** revísalo en la app Mi Movistar\n• **Roaming:** activación para viajes internacionales\n• **Configuración APN:** para datos móviles\n\n¿Cuál es tu consulta sobre la línea móvil?'
      },
      {
        keywords: ['avería', 'averia', 'roto', 'no funciona', 'caído', 'caido'],
        response: '🔴 **Reporte de Averías:**\n\nVamos a diagnosticar el problema:\n\n**Si es fibra/internet:**\n1. ¿Las luces del router están encendidas?\n2. ¿La luz PON parpadea o es fija?\n3. ¿Todos los dispositivos fallan?\n\n**Si es línea móvil:**\n1. ¿Tienes cobertura (barras)?\n2. ¿Puedes hacer llamadas?\n3. ¿Los datos funcionan?\n\nSi tras reiniciar el router (30 seg desconectado) el problema persiste, necesitarás contactar con soporte técnico para abrir una incidencia.\n\n¿Qué tipo de servicio tienes afectado?'
      },
      {
        keywords: ['contratar', 'cambiar', 'tarifa', 'plan', 'oferta', 'promoción', 'promocion'],
        response: '📋 **Tarifas y Ofertas:**\n\nPuedo informarte sobre los tipos de servicios disponibles:\n\n• **Fibra + Móvil:** paquetes convergentes\n• **Solo Fibra:** diferentes velocidades\n• **Solo Móvil:** tarifas con/sin permanencia\n• **TV:** paquetes de contenido\n\n*Para consultar ofertas personalizadas y precios actualizados, te recomiendo visitar **movistar.es** o llamar al **1004**.*\n\n¿Qué tipo de servicio te interesa?'
      }
    ],
    defaultResponse: '🔍 Entiendo tu consulta. Como asistente de Telefónica Neural Search puedo ayudarte con:\n\n• **Conexión** — problemas de WiFi, fibra o datos\n• **Router** — configuración y resolución de problemas\n• **Línea móvil** — cobertura, datos, roaming\n• **Averías** — diagnóstico y reporte\n• **Documentación técnica** — manuales y guías\n\n¿Con cuál de estos temas necesitas ayuda?'
  }
};

function checkSecurityRestriction(message: string): string | null {
  const lower = message.toLowerCase();
  if (securityKeywords.some(k => lower.includes(k))) {
    return securityResponse;
  }
  return null;
}

function findBestResponse(chatbot: ProjectChatbot, message: string): string {
  const lowerMessage = message.toLowerCase();

  // Primero comprobar restricciones de seguridad
  const securityCheck = checkSecurityRestriction(lowerMessage);
  if (securityCheck) return securityCheck;

  let bestMatch: KnowledgeBase | null = null;
  let bestScore = 0;

  for (const kb of chatbot.knowledgeBase) {
    let score = 0;
    for (const keyword of kb.keywords) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        score++;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = kb;
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch.response;
  }

  return chatbot.defaultResponse;
}

function selectChatbot(context: string): ProjectChatbot {
  if (context in chatbots) {
    return chatbots[context];
  }

  // Fallback: try to match by partial string
  const lower = context.toLowerCase();
  if (lower.includes('correos')) return chatbots['correos-express'];
  if (lower.includes('seur')) return chatbots['seur-logistics'];
  if (lower.includes('telefonica') || lower.includes('telefónica')) return chatbots['telefonica-neural'];

  return chatbots['correos-express'];
}

export function getChatbotGreeting(context: string): string {
  return selectChatbot(context).greeting;
}

export async function chatWithAI(message: string, context: string): Promise<string> {
  const selectedChatbot = selectChatbot(context);

  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 300));

  return findBestResponse(selectedChatbot, message);
}

export function analyzeText(text: string): { intent: string; sentiment: string; entities: string[] } {
  const lower = text.toLowerCase();

  const intentPatterns: [string[], string][] = [
    [['comprar', 'precio', 'coste', 'presupuesto', 'contratar', 'buy', 'price', 'cost'], 'Intención Comercial'],
    [['ayuda', 'problema', 'error', 'fallo', 'no funciona', 'help', 'issue', 'bug'], 'Solicitud de Soporte'],
    [['cómo', 'como', 'qué es', 'que es', 'explica', 'how', 'what is', 'explain'], 'Consulta Informativa'],
    [['hola', 'buenas', 'hey', 'hi', 'hello', 'buenos días'], 'Saludo / Social'],
    [['quiero', 'necesito', 'busco', 'want', 'need', 'looking for'], 'Expresión de Necesidad'],
    [['gracias', 'genial', 'perfecto', 'thanks', 'great', 'awesome'], 'Feedback Positivo'],
    [['mal', 'horrible', 'pésimo', 'bad', 'terrible', 'awful'], 'Queja'],
    [['proyecto', 'desarrollo', 'implementar', 'crear', 'project', 'develop', 'build'], 'Consulta Técnica'],
  ];

  let intent = 'Consulta General';
  for (const [keywords, label] of intentPatterns) {
    if (keywords.some(k => lower.includes(k))) {
      intent = label;
      break;
    }
  }

  const positiveWords = ['bien', 'genial', 'excelente', 'perfecto', 'bueno', 'increíble', 'fantástico', 'great', 'good', 'excellent', 'amazing', 'love', 'wonderful', 'gracias', 'thanks'];
  const negativeWords = ['mal', 'problema', 'error', 'fallo', 'horrible', 'pésimo', 'terrible', 'bad', 'awful', 'hate', 'worst', 'broken', 'fail'];

  let posScore = 0;
  let negScore = 0;
  for (const w of positiveWords) { if (lower.includes(w)) posScore++; }
  for (const w of negativeWords) { if (lower.includes(w)) negScore++; }

  let sentiment = 'Neutral';
  if (posScore > negScore) sentiment = 'Positivo';
  else if (negScore > posScore) sentiment = 'Negativo';

  const entityPatterns: [string[], string][] = [
    [['ia', 'inteligencia artificial', 'ai', 'artificial intelligence', 'machine learning', 'ml'], 'IA'],
    [['python', 'javascript', 'typescript', 'react', 'node', 'fastapi'], 'Programación'],
    [['chatbot', 'bot', 'asistente', 'assistant', 'agente', 'agent'], 'Chatbots'],
    [['datos', 'data', 'base de datos', 'database', 'sql', 'vector'], 'Datos'],
    [['web', 'frontend', 'backend', 'api', 'servidor', 'server'], 'Web'],
    [['rag', 'retrieval', 'embeddings', 'pinecone', 'langchain'], 'RAG'],
    [['empresa', 'negocio', 'company', 'business', 'startup'], 'Negocios'],
    [['diseño', 'design', 'ux', 'ui', 'interfaz', 'interface'], 'Diseño'],
    [['cloud', 'aws', 'gcp', 'azure', 'docker', 'kubernetes'], 'Cloud'],
    [['logística', 'logistica', 'envío', 'envio', 'delivery', 'logistics'], 'Logística'],
  ];

  const entities: string[] = [];
  for (const [keywords, label] of entityPatterns) {
    if (keywords.some(k => lower.includes(k))) {
      entities.push(label);
    }
  }

  if (entities.length === 0) {
    const words = text.split(/\s+/).filter(w => w.length > 4);
    entities.push(...words.slice(0, 3).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()));
  }

  return { intent, sentiment, entities: entities.slice(0, 5) };
}
