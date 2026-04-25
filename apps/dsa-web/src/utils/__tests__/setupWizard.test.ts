import { describe, expect, test } from 'vitest';

import { buildSetupLLMPayload } from '../setupWizard';
import type { SystemConfigItem } from '../../types/systemConfig';

describe('buildSetupLLMPayload', () => {
  test('builds a vertex_ai payload from runtime-compatible Gemini credentials', () => {
    const items: SystemConfigItem[] = [
      { key: 'LITELLM_MODEL', value: 'vertex_ai/gemini-2.5-flash', rawValueExists: true, isMasked: false },
      { key: 'GEMINI_API_KEY', value: '******', rawValueExists: true, isMasked: true },
    ];

    expect(buildSetupLLMPayload(items, '******')).toEqual({
      name: 'vertex_ai',
      protocol: 'vertex_ai',
      baseUrl: '',
      apiKey: '******',
      models: ['vertex_ai/gemini-2.5-flash'],
      enabled: true,
      maskToken: '******',
    });
  });
});
