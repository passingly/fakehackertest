
const responses = [
  "ACCESS_GRANTED. PACKET_SNIFFING_INITIALIZED.",
  "ENCRYPTING_DATABASE_FRAGMENTS... DONE.",
  "WARNING: TRACE_DETECTED. ROTATING_PROXY_NODES.",
  "SHELL_ACCESS_ESTABLISHED_VIA_PORT_8080.",
  "BUFFER_OVERFLOW_SUCCESSFUL. KERNEL_PANIC_AVOIDED.",
  "DECRYPTING_RSA_KEY... 100% COMPLETE.",
  "NODE_OFFLINE. SWITCHING_TO_BACKUP_SATELLITE_LINK.",
  "INTRUSION_LEVEL_9_DETECTED. DEPLOYING_COUNTER_MEASURES.",
  "ROOT_ACCESS_MAINTAINED. HIDDEN_IN_PLAIN_SIGHT.",
  "SYSTEM_CORES_AT_CRITICAL_TEMPERATURE. OVERCLOCKING..."
];

const specificResponses: Record<string, string> = {
  "whoami": "OPERATOR_ID_#8892. RANK: ELITE_GHOST.",
  "status": "ALL_NODES_NOMINAL. ENCRYPTION_STABLE.",
  "exit": "CONNECTION_TERMINATED. ERAZING_LOGS...",
  "version": "OMNI_OS_V4.2.0_STABLE_BUILD."
};

export const getLocalResponse = (prompt: string): string => {
  const cleanPrompt = prompt.toLowerCase().trim();
  
  if (specificResponses[cleanPrompt]) {
    return specificResponses[cleanPrompt];
  }

  // 간단한 키워드 매칭
  if (cleanPrompt.includes("help")) return "CORE_CMDS: help, hack, clear, status, whoami, version";
  if (cleanPrompt.includes("hi") || cleanPrompt.includes("hello")) return "HANDSHAKE_RECEIVED. STATE_YOUR_INTENT.";
  
  // 랜덤 기술 응답
  return responses[Math.floor(Math.random() * responses.length)];
};
