import { describe, expect, test, vi } from 'vitest';
import { logger } from '../../src/middleware/logger.js';

describe('logger middleware', () => {
  test('logs request details when the response finishes', () => {
    const finishHandlers = [];
    const req = { method: 'GET', originalUrl: '/api/health' };
    const res = {
      statusCode: 200,
      on: vi.fn((event, handler) => finishHandlers.push({ event, handler })),
    };
    const next = vi.fn();
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});

    logger(req, res, next);

    expect(res.on).toHaveBeenCalledWith('finish', expect.any(Function));
    expect(next).toHaveBeenCalledOnce();
    finishHandlers[0].handler();
    expect(log).toHaveBeenCalledWith(expect.stringMatching(/^GET \/api\/health → 200 \(\d+ms\)$/));

    log.mockRestore();
  });
});
