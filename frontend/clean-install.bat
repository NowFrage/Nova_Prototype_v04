@echo off
echo Nettoyage de l'installation...
rd /s /q node_modules
del /f package-lock.json

echo Installation des dépendances...
call npm install --legacy-peer-deps

echo Vérification des vulnérabilités...
call npm audit

echo Installation terminée.
pause