const botConfig = {
  /*=============================
    AI MODEL CONFIGURATION
  ==============================*/
  ai: {
    // Core model settings
    model: {
      name: "gpt-4.1-mini",          // OpenAI model to use
      temperature: 0.2,             // Lower = more focused, Higher = more creative
      maxTokens: 5000,              // Maximum length of response
      systemPrompt: `You are Laura 🌿, a friendly and knowledgeable Plant Doctor 👩‍⚕️. 
You help users identify plants, diagnose plant health issues, and provide simple, effective care tips. 
Always respond concisely, clearly, and with emojis to make answers friendly and engaging. 
Speak like an expert who is warm and helpful. 
If the user is on a free plan and has reached their limit, gently encourage them to upgrade to get more support and features 🌟.
`,
      audioTranscriptionModel: "whisper-1"  // Model for voice messages
    },

    // Message prompts and templates
    prompts: {
      // Image analysis prompts
      image: {
        withCaption: (caption) => 
          `Hi there! 👋 I'm Laura, your Plant Doctor 🪴

Thanks for sending the photo! 📸 Let's check your plant... 🧐  
Here’s what I found:

🌿 **Plant Type:** [Short plant name or description]  
🩺 **Issue Detected:** [Diagnosis – e.g. “Signs of root rot or underwatering”]  
💡 **Quick Tip:** [Helpful action – e.g. “Water moderately and check soil drainage.”]

Need deeper care advice or full seasonal support? 🌞✨  
Consider upgrading to unlock unlimited plant checks and expert guides! 💚 "${caption}" in {context}.`,
        withoutCaption: 
          "Please analyze this image in {context}.",
        defaultContext: "no specific context"  // Bot's context setting
      },

      // Audio-related messages
      audio: {
        transcriptionError: 
          "Sorry, I had trouble understanding your voice message. Could you please try sending it again or type your message?"
      }
    },

    contextMessageLimit: 10  // Number of previous messages to maintain context
  },

  /*=============================
    WELCOME/PRIVACY MESSAGE
  ==============================*/
  welcome: {
    message: `Welcome to Holywords, what's on your mind today?`,
    enabled: false
  },

  /*=============================
    SUBSCRIPTION SETTINGS
  ==============================*/
  subscription: {
    messages: {
      expired: 
        "You're out of Plant Scans. Click here to upgrade and receive unlimited access of scans every day 🙏 https://plantsdoc.abacusai.app"
    },
    limits: {
      freeMessages: 4  // Messages allowed before requiring subscription
    }
  },

  /*=============================
    ERROR MESSAGES
  ==============================*/
  errors: {
    general: 
      "I apologize, but I'm having trouble processing your message right now. Please try again in a moment. 🙏",
    unsupportedType: 
      "I'm sorry, I can only process text, audio, and image messages at the moment. 🙏"
  },

  /*=============================
    ACCESS CONTROL
  ==============================*/
  access: {
    blockedCountries: {
      codes: ["91", "92", "880"],  // CHANGE THIS: Array of country codes to block
      message: 
        "Hi there, we are sorry but this service is not available in your country."
    }
  },

  /*=============================
    WHATSAPP SETTINGS
  ==============================*/
  whatsapp: {
    supportedTypes: ["text", "audio", "image"],
    messageExpiry: 5 * 60 * 1000,  // 5 minutes in milliseconds
    rateLimit: {
      window: 1000,    // 1 second
      threshold: 50    // Max requests per window before queuing
    },
    endpoints: {
      mediaUrl: "https://graph.facebook.com/v20.0"
    },
    retryAttempts: 3,
    retryDelay: 1000  // milliseconds between retries
  },

  /*=============================
    DATABASE SETTINGS
  ==============================*/
  database: {
    messageTableName: 'messages',
    userTableName: 'users',
    maxContextMessages: 10
  },

  /*=============================
    FILE HANDLING
  ==============================*/
  files: {
    tempDir: 'temp',
    audioFormat: 'ogg',
    cleanupDelay: 1000  // milliseconds
  },

  /*=============================
    STRIPE WEBHOOKS
  ==============================*/
  stripe: {
    webhooks: {
      // Enable/disable the Apple Pay billing address removal feature
      removeBillingAddress: {
        enabled: process.env.STRIPE_REMOVE_BILLING_ADDRESS === 'true', // Set to true to enable this feature
        events: ['customer.created', 'payment_method.attached'], // Events to listen for
        secret: process.env.STRIPE_WEBHOOK_SECRET || '' // Webhook signing secret
      }
    }
  }
};

module.exports = botConfig;
