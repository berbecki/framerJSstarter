cd ./node_modules/framerjs
make dist
cd ../../
gulp cp:framerjs
gulp cp:sources
gulp postinstallinfo