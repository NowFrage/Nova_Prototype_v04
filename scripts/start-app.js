const concurrently = require('concurrently');
const { spawn } = require('child_process');

console.log('\x1b[36m%s\x1b[0m', `
🚀 Launching NOVA...

📱 Frontend will be available at: http://localhost:3000
🔌 Backend will be available at: http://localhost:5000

⌛ Starting servers...
`);

// Lancer les serveurs
const { result } = concurrently([
    { 
        command: 'npm run dev:back',
        name: 'backend',
        prefixColor: 'blue'
    },
    { 
        command: 'npm run dev:front',
        name: 'frontend',
        prefixColor: 'green'
    }
], {
    prefix: 'name',
    timestampFormat: 'HH:mm:ss',
    killOthers: ['failure', 'success'],
});

// Utiliser l'objet result qui est une Promise
result.then(
    () => {
        console.log('All processes completed successfully');
    },
    (error) => {
        console.error('One of the processes failed:', error);
    }
);

// Gérer l'arrêt propre
process.on('SIGINT', () => {
    console.log('\nStopping all servers...');
    spawn('npm', ['run', 'stop'], { 
        stdio: 'inherit',
        shell: true 
    }).on('close', () => {
        process.exit(0);
    });
});