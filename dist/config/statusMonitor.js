"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    title: 'NestJS Status',
    path: '/status',
    socketPath: '/socket.io',
    port: 3000,
    spans: [
        {
            interval: 1,
            retention: 60,
        },
        {
            interval: 5,
            retention: 60,
        },
        {
            interval: 15,
            retention: 60,
        },
    ],
    chartVisibility: {
        cpu: true,
        mem: true,
        load: true,
        eventLoop: true,
        heap: true,
        responseTime: true,
        rps: true,
        statusCodes: true,
    },
    ignoreStartsWith: ['/admin'],
    healthChecks: [],
};
//# sourceMappingURL=statusMonitor.js.map