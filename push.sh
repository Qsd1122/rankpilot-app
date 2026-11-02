#!/data/data/com.termux/files/usr/bin/bash
read -p "Colle ton token ghp_... : " TOKEN
git remote set-url origin https://$TOKEN@github.com/Qsd1122/rankpilot-app.git
git push origin main
git remote set-url origin https://github.com/Qsd1122/rankpilot-app.git
echo "Push OK -> Vercel va déployer en 40s"
