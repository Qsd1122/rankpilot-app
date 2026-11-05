#!/bin/bash
read -p "Colle ton token ghp_... : " TOKEN
git remote set-url origin https://$TOKEN@github.com/Qsd1122/rankpilot-app.git
git add .
git commit -m "update whatsapp 212660460410"
git push origin main
echo "Push OK -> Vercel va déployer en 40s"
