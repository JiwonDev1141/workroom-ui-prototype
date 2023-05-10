#!/bin/bash
function usage() {  
  echo "usage) ./$0 {environment} {runtime}"
  echo "- environment"
  echo "  d) DEV"
  echo "  s) STG"
  echo "  o) OPS"
  echo ""
  echo "- runtime"
  echo "  1) nohup"
  echo "  2) pm2"
  echo "  3) docker"
  echo ""
  exit
}

if [ $# -ne 2 ]; then
  echo "input condition required!"
  echo ""
  usage
fi

APP="mhc-wui"
VER="0.1.0"
PORT=50220
RENV="LOC"

git branch -vv
git pull
node -v
npm install --silent

case $1 in
  d|D)
    PORT=57220
    RENV="DEV"
    cp -f .env.dev .env
    npm run build:dev
    ;;
  s|S)
    PORT=58220
    RENV="STG"
    cp -f .env.stg .env
    npm run build:stg
    ;;
  o|O)
    PORT=59220
    RENV="OPS"
    cp -f .env.ops .env
    npm run build:ops
    ;;
  *)
    echo "[${APP}] invalid environment : $1"
    usage
    ;;
esac

export PORT_NO=${PORT}
export SVC_NM="meta healthcare"
DIV=$(echo ${RENV} | tr '[:upper:]' '[:lower:]')

case $2 in
  1)
    PID=`sudo netstat -anltp | grep LISTEN | grep ${PORT} | awk '{ print $7 }' | cut -d '/' -f 1`
    if [ ! -z ${PID} ]; then
      sudo kill -9 ${PID}
      echo "[${APP}] ${PID} killed & restarting at $(date +'%Y-%m-%d %H:%M:%S')"
      sleep 2
    fi
    nohup npm run "serve:${DIV}" &
    ;;
  2)
    if [ `pm2 ls | grep ${APP} | grep 'online' | wc -l` -ne 0 ]; then
      echo "[${APP}] alive on pm2 at $(date +'%Y-%m-%d %H:%M:%S')"
      pm2 stop ${APP}
      echo "[${APP}] stopped & restarting at $(date +'%Y-%m-%d %H:%M:%S')"
    fi
    pm2 start pm2.yml
    pm2 save
    ;;
  3)
    sudo docker build . -t "${APP}:${VER}" -e "RENV=${RENV}" --build-arg "DIV=${DIV}"
    if [ `sudo docker ps -a | grep "${APP}" | wc -l` -eq 1 ]; then
      echo "[${APP}] alive on docker at $(date +'%Y-%m-%d %H:%M:%S')"
      sudo docker stop "${APP}"; sudo docker rm "${APP}"
      echo "[${APP}] removed & restarting at $(date +'%Y-%m-%d %H:%M:%S')"
    fi
    sudo docker run -d -p "${PORT}:${PORT}" --name="${APP}" "${APP}:${VER}"
    ;;
  *)
    echo "[${APP}] invalid runtime : $2"
    usage
    ;;
esac

echo "[${APP}] runtime mode : ${DIV}"
sudo netstat -anltp | grep LISTEN | egrep -i ${PORT}
echo ""
