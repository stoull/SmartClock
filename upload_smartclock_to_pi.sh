#!/bin/bash
zip -r ./smartclock_build.zip ./build
zip -d ./smartclock_build.zip "__MACOSX*"
scp ./smartclock_build.zip pi@hutpi.local:~/
ssh pi@hutpi.local "cd ~; ./update_smartclock.sh;"