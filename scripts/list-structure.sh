#!/bin/bash

# Affiche l'arborescence du projet en excluant node_modules, .git et autres dossiers non pertinents
echo "NOVA Project Structure:"
echo "======================"

# Version Windows-compatible
dir /s /b /a-d | findstr /v /i "node_modules\\ .git\\ dist\\ coverage\\ .cache\\"
echo "======================"
echo "Note: Excluding node_modules, .git, dist, coverage, and .cache directories"