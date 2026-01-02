
/**
 * DEPRECATED: This service has been replaced by localResponseService.ts
 * to ensure offline functionality and remove deprecated dependencies.
 */
export const getCyberAssistantResponse = async (_prompt: string): Promise<string> => {
  return "CORE_OFFLINE: USE_LOCAL_ENGINE_INSTEAD";
};
