const killPort = require('kill-port');

async function clearPorts() {
    const ports = [3000, 5000];
    
    for (const port of ports) {
        try {
            await killPort(port);
            console.log(`✅ Port ${port} has been cleared`);
        } catch (error) {
            if (error.message.includes('No process')) {
                console.log(`ℹ️ Port ${port} is already free`);
            } else {
                console.error(`❌ Error clearing port ${port}:`, error.message);
            }
        }
    }
}

clearPorts().catch(console.error);